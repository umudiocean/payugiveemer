import asyncpg
import os
from typing import Optional, List, Dict, Any
import logging

logger = logging.getLogger(__name__)

class Database:
    def __init__(self):
        self.pool: Optional[asyncpg.Pool] = None
    
    async def connect(self):
        """Connect to PostgreSQL database"""
        try:
            database_url = os.environ.get('DATABASE_URL')
            if not database_url:
                raise ValueError("DATABASE_URL environment variable is required")
            
            self.pool = await asyncpg.create_pool(
                database_url,
                min_size=1,
                max_size=10,
                command_timeout=60
            )
            
            # Create tables if they don't exist
            await self.create_tables()
            logger.info("Connected to PostgreSQL database")
            
        except Exception as e:
            logger.error(f"Failed to connect to database: {e}")
            raise
    
    async def disconnect(self):
        """Disconnect from database"""
        if self.pool:
            await self.pool.close()
            logger.info("Disconnected from database")
    
    async def create_tables(self):
        """Create database tables"""
        async with self.pool.acquire() as conn:
            # Registrations table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS registrations (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    wallet VARCHAR(42) UNIQUE NOT NULL,
                    tx_hash VARCHAR(66) NOT NULL,
                    index INTEGER NOT NULL,
                    seed VARCHAR(66) NOT NULL,
                    ticket VARCHAR(20) NOT NULL,
                    reward VARCHAR(20) NOT NULL,
                    timestamp BIGINT NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW()
                )
            """)
            
            # Task clicks table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS task_clicks (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    user_id VARCHAR(42) NOT NULL,
                    platform VARCHAR(20) NOT NULL,
                    handle VARCHAR(50),
                    clicked_at TIMESTAMP DEFAULT NOW()
                )
            """)
            
            # Giveaway settings table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS giveaway_settings (
                    id VARCHAR(10) PRIMARY KEY DEFAULT 'main',
                    started BOOLEAN DEFAULT FALSE,
                    start_time TIMESTAMP
                )
            """)
            
            logger.info("Database tables created/verified")
    
    async def save_registration(self, registration_data: Dict[str, Any]) -> Dict[str, Any]:
        """Save user registration"""
        async with self.pool.acquire() as conn:
            try:
                # Check if wallet already exists
                existing = await conn.fetchrow(
                    "SELECT * FROM registrations WHERE wallet = $1",
                    registration_data['wallet']
                )
                
                if existing:
                    return {
                        "success": True,
                        "message": "Already registered",
                        "data": dict(existing)
                    }
                
                # Insert new registration
                result = await conn.fetchrow("""
                    INSERT INTO registrations (wallet, tx_hash, index, seed, ticket, reward, timestamp)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING *
                """, 
                    registration_data['wallet'],
                    registration_data['txHash'],
                    registration_data['index'],
                    registration_data['seed'],
                    registration_data['ticket'],
                    registration_data['reward'],
                    registration_data['timestamp']
                )
                
                return {
                    "success": True,
                    "message": "Registration saved",
                    "data": dict(result)
                }
                
            except Exception as e:
                logger.error(f"Failed to save registration: {e}")
                raise
    
    async def get_registration(self, wallet: str) -> Optional[Dict[str, Any]]:
        """Get user registration by wallet"""
        async with self.pool.acquire() as conn:
            result = await conn.fetchrow(
                "SELECT * FROM registrations WHERE wallet = $1",
                wallet
            )
            return dict(result) if result else None
    
    async def save_task_click(self, task_data: Dict[str, Any]) -> Dict[str, Any]:
        """Save task click"""
        async with self.pool.acquire() as conn:
            try:
                await conn.execute("""
                    INSERT INTO task_clicks (user_id, platform, handle)
                    VALUES ($1, $2, $3)
                """,
                    task_data['wallet'],
                    task_data['platform'],
                    task_data.get('handle', '')
                )
                
                return {
                    "success": True,
                    "message": "Task click logged"
                }
                
            except Exception as e:
                logger.error(f"Failed to save task click: {e}")
                raise
    
    async def get_task_history(self, wallet: str) -> List[Dict[str, Any]]:
        """Get user task history"""
        async with self.pool.acquire() as conn:
            results = await conn.fetch(
                "SELECT * FROM task_clicks WHERE user_id = $1 ORDER BY clicked_at DESC",
                wallet
            )
            return [dict(row) for row in results]
    
    async def get_all_registrations(self) -> List[Dict[str, Any]]:
        """Get all registrations (admin only)"""
        async with self.pool.acquire() as conn:
            results = await conn.fetch(
                "SELECT * FROM registrations ORDER BY created_at DESC"
            )
            return [dict(row) for row in results]
    
    async def get_all_tasks(self) -> List[Dict[str, Any]]:
        """Get all task clicks (admin only)"""
        async with self.pool.acquire() as conn:
            results = await conn.fetch(
                "SELECT * FROM task_clicks ORDER BY clicked_at DESC"
            )
            return [dict(row) for row in results]
    
    async def get_giveaway_status(self) -> Dict[str, Any]:
        """Get giveaway status"""
        async with self.pool.acquire() as conn:
            result = await conn.fetchrow(
                "SELECT * FROM giveaway_settings WHERE id = 'main'"
            )
            
            if not result:
                return {
                    "success": True,
                    "started": False,
                    "start_time": None
                }
            
            return {
                "success": True,
                "started": result['started'],
                "start_time": result['start_time'].isoformat() if result['start_time'] else None
            }
    
    async def start_giveaway(self) -> Dict[str, Any]:
        """Start giveaway (admin only)"""
        async with self.pool.acquire() as conn:
            try:
                from datetime import datetime, timezone
                start_time = datetime.now(timezone.utc)
                
                await conn.execute("""
                    INSERT INTO giveaway_settings (id, started, start_time)
                    VALUES ('main', TRUE, $1)
                    ON CONFLICT (id) DO UPDATE SET
                        started = TRUE,
                        start_time = $1
                """, start_time)
                
                return {
                    "success": True,
                    "message": "Giveaway started successfully",
                    "start_time": start_time.isoformat()
                }
                
            except Exception as e:
                logger.error(f"Failed to start giveaway: {e}")
                raise

# Global database instance
db = Database()
