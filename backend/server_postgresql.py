from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uuid
import os
from datetime import datetime
import asyncpg
from contextlib import asynccontextmanager

# Environment variables
DATABASE_URL = os.getenv('DATABASE_URL', os.getenv('POSTGRES_URL', ''))
ADMIN_WALLET = os.getenv('ADMIN_WALLET', '0xd9C4b8436d2a235A1f7DB09E680b5928cFdA641a').lower()
CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')

# Global connection pool
db_pool = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    global db_pool
    db_pool = await asyncpg.create_pool(
        DATABASE_URL,
        min_size=1,
        max_size=10
    )
    
    # Create tables if not exist
    async with db_pool.acquire() as conn:
        # Registrations table
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS registrations (
                id VARCHAR(255) PRIMARY KEY,
                wallet VARCHAR(255) UNIQUE NOT NULL,
                tx_hash VARCHAR(255),
                index INTEGER,
                seed VARCHAR(255),
                ticket VARCHAR(255),
                reward VARCHAR(255),
                timestamp BIGINT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Task clicks table
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS task_clicks (
                id VARCHAR(255) PRIMARY KEY,
                user_id VARCHAR(255) NOT NULL,
                platform VARCHAR(50) NOT NULL,
                handle VARCHAR(255),
                clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Giveaway settings table
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS giveaway_settings (
                id VARCHAR(50) PRIMARY KEY,
                started BOOLEAN DEFAULT FALSE,
                start_time TIMESTAMP
            )
        ''')
        
        # Insert default giveaway settings if not exists
        await conn.execute('''
            INSERT INTO giveaway_settings (id, started, start_time)
            VALUES ('main', FALSE, NULL)
            ON CONFLICT (id) DO NOTHING
        ''')
    
    yield
    
    # Shutdown
    await db_pool.close()

# Create FastAPI app with lifespan
app = FastAPI(lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS if CORS_ORIGINS != ['*'] else ['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class TicketCreate(BaseModel):
    wallet: str
    txHash: str
    index: int
    seed: str
    ticket: str
    reward: str
    timestamp: int

class TaskClick(BaseModel):
    wallet: str
    platform: str
    handle: Optional[str] = ""

# Helper function to get connection
async def get_conn():
    return await db_pool.acquire()

# Routes
@app.get("/")
async def root():
    return {"message": "PAYU Draw API - Squid Game Edition (PostgreSQL)"}

@app.get("/api/")
async def api_root():
    return {"message": "PAYU Draw API - Squid Game Edition (PostgreSQL)"}

@app.post("/api/save-ticket")
async def save_ticket(ticket: TicketCreate):
    try:
        ticket_id = str(uuid.uuid4())
        
        async with db_pool.acquire() as conn:
            await conn.execute('''
                INSERT INTO registrations (id, wallet, tx_hash, index, seed, ticket, reward, timestamp, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (wallet) DO UPDATE SET
                    tx_hash = EXCLUDED.tx_hash,
                    index = EXCLUDED.index,
                    seed = EXCLUDED.seed,
                    ticket = EXCLUDED.ticket,
                    reward = EXCLUDED.reward,
                    timestamp = EXCLUDED.timestamp
            ''', ticket_id, ticket.wallet.lower(), ticket.txHash, ticket.index, 
                 ticket.seed, ticket.ticket, ticket.reward, ticket.timestamp, datetime.utcnow())
            
            # Fetch the saved record
            row = await conn.fetchrow(
                'SELECT * FROM registrations WHERE wallet = $1',
                ticket.wallet.lower()
            )
        
        return {
            "success": True,
            "message": "Registration saved",
            "data": dict(row)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/registration/{wallet}")
async def get_registration(wallet: str):
    try:
        async with db_pool.acquire() as conn:
            row = await conn.fetchrow(
                'SELECT * FROM registrations WHERE wallet = $1',
                wallet.lower()
            )
        
        if row:
            return {"success": True, "data": dict(row)}
        else:
            return {"success": False, "data": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/task-click")
async def log_task_click(task: TaskClick):
    try:
        click_id = str(uuid.uuid4())
        
        async with db_pool.acquire() as conn:
            await conn.execute('''
                INSERT INTO task_clicks (id, user_id, platform, handle, clicked_at)
                VALUES ($1, $2, $3, $4, $5)
            ''', click_id, task.wallet.lower(), task.platform, task.handle or "", datetime.utcnow())
        
        return {"success": True, "message": "Task click logged"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tasks/{wallet}")
async def get_user_tasks(wallet: str):
    try:
        async with db_pool.acquire() as conn:
            rows = await conn.fetch(
                'SELECT * FROM task_clicks WHERE user_id = $1 ORDER BY clicked_at DESC',
                wallet.lower()
            )
        
        tasks = [dict(row) for row in rows]
        return {"success": True, "data": tasks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/admin/registrations")
async def get_all_registrations(x_wallet_address: Optional[str] = Header(None)):
    if not x_wallet_address or x_wallet_address.lower() != ADMIN_WALLET:
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    try:
        async with db_pool.acquire() as conn:
            rows = await conn.fetch('SELECT * FROM registrations ORDER BY created_at DESC')
        
        registrations = [dict(row) for row in rows]
        return {"success": True, "data": registrations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/admin/tasks")
async def get_all_tasks(x_wallet_address: Optional[str] = Header(None)):
    if not x_wallet_address or x_wallet_address.lower() != ADMIN_WALLET:
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    try:
        async with db_pool.acquire() as conn:
            rows = await conn.fetch('SELECT * FROM task_clicks ORDER BY clicked_at DESC')
        
        tasks = [dict(row) for row in rows]
        return {"success": True, "data": tasks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/giveaway-status")
async def get_giveaway_status():
    try:
        async with db_pool.acquire() as conn:
            row = await conn.fetchrow('SELECT * FROM giveaway_settings WHERE id = $1', 'main')
        
        if row:
            return {
                "success": True,
                "started": row['started'],
                "start_time": row['start_time'].isoformat() if row['start_time'] else None
            }
        else:
            return {"success": True, "started": False, "start_time": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/admin/start-giveaway")
async def start_giveaway(x_wallet_address: Optional[str] = Header(None)):
    if not x_wallet_address or x_wallet_address.lower() != ADMIN_WALLET:
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    try:
        async with db_pool.acquire() as conn:
            await conn.execute('''
                UPDATE giveaway_settings
                SET started = TRUE, start_time = $1
                WHERE id = $2
            ''', datetime.utcnow(), 'main')
        
        return {"success": True, "message": "Giveaway started"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health check
@app.get("/health")
async def health_check():
    try:
        async with db_pool.acquire() as conn:
            await conn.fetchval('SELECT 1')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}
