# Local test database - Simple in-memory storage
from typing import Optional, List, Dict, Any
import logging
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

class LocalDatabase:
    def __init__(self):
        self.registrations = []
        self.task_clicks = []
        self.giveaway_settings = {"id": "main", "started": False, "start_time": None}
    
    async def connect(self):
        """Mock connection for local testing"""
        logger.info("Connected to Local Database (for testing)")
    
    async def disconnect(self):
        """Mock disconnect"""
        logger.info("Disconnected from Local Database")
    
    async def create_tables(self):
        """Mock table creation"""
        logger.info("Local tables created")
    
    async def save_registration(self, registration_data: Dict[str, Any]) -> Dict[str, Any]:
        """Save user registration"""
        try:
            # Check if wallet already exists
            existing = next((reg for reg in self.registrations if reg['wallet'] == registration_data['wallet']), None)
            
            if existing:
                return {
                    "success": True,
                    "message": "Already registered",
                    "data": existing
                }
            
            # Create new registration
            new_registration = {
                "id": f"local-{len(self.registrations) + 1}",
                "wallet": registration_data['wallet'],
                "tx_hash": registration_data['txHash'],
                "index": registration_data['index'],
                "seed": registration_data['seed'],
                "ticket": registration_data['ticket'],
                "reward": registration_data['reward'],
                "timestamp": registration_data['timestamp'],
                "created_at": datetime.now(timezone.utc).isoformat()
            }
            
            self.registrations.append(new_registration)
            
            return {
                "success": True,
                "message": "Registration saved",
                "data": new_registration
            }
            
        except Exception as e:
            logger.error(f"Failed to save registration: {e}")
            raise
    
    async def get_registration(self, wallet: str) -> Optional[Dict[str, Any]]:
        """Get user registration by wallet"""
        return next((reg for reg in self.registrations if reg['wallet'] == wallet), None)
    
    async def save_task_click(self, task_data: Dict[str, Any]) -> Dict[str, Any]:
        """Save task click"""
        try:
            new_task = {
                "id": f"task-{len(self.task_clicks) + 1}",
                "user_id": task_data['wallet'],
                "platform": task_data['platform'],
                "handle": task_data.get('handle', ''),
                "clicked_at": datetime.now(timezone.utc).isoformat()
            }
            
            self.task_clicks.append(new_task)
            
            return {
                "success": True,
                "message": "Task click logged"
            }
            
        except Exception as e:
            logger.error(f"Failed to save task click: {e}")
            raise
    
    async def get_task_history(self, wallet: str) -> List[Dict[str, Any]]:
        """Get user task history"""
        return [task for task in self.task_clicks if task['user_id'] == wallet]
    
    async def get_all_registrations(self) -> List[Dict[str, Any]]:
        """Get all registrations (admin only)"""
        return self.registrations.copy()
    
    async def get_all_tasks(self) -> List[Dict[str, Any]]:
        """Get all task clicks (admin only)"""
        return self.task_clicks.copy()
    
    async def get_giveaway_status(self) -> Dict[str, Any]:
        """Get giveaway status"""
        return {
            "success": True,
            "started": self.giveaway_settings["started"],
            "start_time": self.giveaway_settings["start_time"]
        }
    
    async def start_giveaway(self) -> Dict[str, Any]:
        """Start giveaway (admin only)"""
        try:
            start_time = datetime.now(timezone.utc)
            
            self.giveaway_settings["started"] = True
            self.giveaway_settings["start_time"] = start_time.isoformat()
            
            return {
                "success": True,
                "message": "Giveaway started successfully",
                "start_time": start_time.isoformat()
            }
            
        except Exception as e:
            logger.error(f"Failed to start giveaway: {e}")
            raise

# Use local database for testing
db = LocalDatabase()
