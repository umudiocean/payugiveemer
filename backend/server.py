from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from database import db  # Real PostgreSQL database


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# PostgreSQL connection - Vercel Neon
# Database connection is handled in database.py

# Admin wallet address (lowercase for comparison)
ADMIN_WALLET = '0xd9C4b8436d2a235A1f7DB09E680b5928cFdA641a'.lower()

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await db.connect()
    yield
    # Shutdown
    await db.disconnect()

# Create the main app with lifespan
app = FastAPI(lifespan=lifespan)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class TicketRegistration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    wallet: str
    tx_hash: str
    index: int
    seed: str
    ticket: str
    reward: str
    timestamp: int
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TicketRegistrationCreate(BaseModel):
    wallet: str
    txHash: str
    index: int
    seed: str
    ticket: str
    reward: str
    timestamp: int

class TaskClick(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str  # wallet address
    platform: str  # telegram, x, instagram_story
    handle: Optional[str] = None
    clicked_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TaskClickCreate(BaseModel):
    wallet: str
    platform: str
    handle: Optional[str] = None

# Helper function to prepare data for PostgreSQL
def prepare_for_db(data):
    """Prepare data for database insertion"""
    if isinstance(data, dict):
        result = {}
        for k, v in data.items():
            if isinstance(v, datetime):
                result[k] = v.isoformat()
            else:
                result[k] = v
        return result
    return data

def parse_from_db(item):
    """Parse data from database"""
    if not item:
        return item
    
    # Parse datetime strings back to datetime objects
    if isinstance(item.get('created_at'), str):
        item['created_at'] = datetime.fromisoformat(item['created_at'].replace('Z', '+00:00'))
    if isinstance(item.get('clicked_at'), str):
        item['clicked_at'] = datetime.fromisoformat(item['clicked_at'].replace('Z', '+00:00'))
    if isinstance(item.get('timestamp'), str):
        item['timestamp'] = datetime.fromisoformat(item['timestamp'].replace('Z', '+00:00'))
    
    return item

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "PAYU Draw API - Squid Game Edition"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    # Status checks are not stored in PostgreSQL for this app
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Status checks are not stored in PostgreSQL for this app
    return []

# Registration endpoints
@api_router.post("/save-ticket")
async def save_ticket(registration: TicketRegistrationCreate):
    try:
        result = await db.save_registration(registration.dict())
        return result
    except Exception as e:
        logging.error(f"Failed to save ticket: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/registration/{wallet}")
async def get_registration(wallet: str):
    try:
        registration = await db.get_registration(wallet)
        if not registration:
            return {"success": False, "message": "No registration found"}
        
        return {"success": True, "data": registration}
    except Exception as e:
        logging.error(f"Failed to get registration: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Task endpoints
@api_router.post("/task-click")
async def log_task_click(task: TaskClickCreate):
    try:
        result = await db.save_task_click(task.dict())
        return result
    except Exception as e:
        logging.error(f"Failed to log task click: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/tasks/{wallet}")
async def get_task_history(wallet: str):
    try:
        tasks = await db.get_task_history(wallet)
        return {"success": True, "data": tasks}
    except Exception as e:
        logging.error(f"Failed to get task history: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Admin verification helper
def verify_admin(wallet_address: str) -> bool:
    """Verify if the wallet address is admin"""
    if not wallet_address:
        return False
    return wallet_address.lower() == ADMIN_WALLET
    
# Admin endpoints
@api_router.get("/admin/registrations")
async def get_all_registrations(x_wallet_address: Optional[str] = Header(None)):
    """Get all registrations (Admin only)"""
    if not verify_admin(x_wallet_address):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        registrations = await db.get_all_registrations()
        return {"success": True, "data": registrations}
    except Exception as e:
        logging.error(f"Failed to get registrations: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admin/tasks")
async def get_all_tasks(x_wallet_address: Optional[str] = Header(None)):
    """Get all task completions (Admin only)"""
    if not verify_admin(x_wallet_address):
        raise HTTPException(status_code=403, detail="Admin access required")
        
    try:
        tasks = await db.get_all_tasks()
        return {"success": True, "data": tasks}
    except Exception as e:
        logging.error(f"Failed to get tasks: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/admin/start-giveaway")
async def start_giveaway(x_wallet_address: Optional[str] = Header(None)):
    """Start the giveaway countdown (Admin only)"""
    if not verify_admin(x_wallet_address):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        result = await db.start_giveaway()
        return result
    except Exception as e:
        logging.error(f"Failed to start giveaway: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/giveaway-status")
async def get_giveaway_status():
    """Get giveaway status (public endpoint)"""
    try:
        result = await db.get_giveaway_status()
        return result
    except Exception as e:
        logging.error(f"Failed to get giveaway status: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
