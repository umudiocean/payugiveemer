#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class PayuDrawAPITester:
    def __init__(self, base_url="https://cryptogame-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })

    def test_api_root(self):
        """Test the root API endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "PAYU Draw API" in data.get("message", ""):
                    self.log_test("API Root Endpoint", True)
                    return True
                else:
                    self.log_test("API Root Endpoint", False, f"Unexpected message: {data}")
                    return False
            else:
                self.log_test("API Root Endpoint", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_admin_registrations(self):
        """Test admin registrations endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/admin/registrations", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") is True:
                    registrations = data.get("data", [])
                    self.log_test("Admin Registrations Endpoint", True, f"Found {len(registrations)} registrations")
                    return True
                else:
                    self.log_test("Admin Registrations Endpoint", False, f"Success=False: {data}")
                    return False
            else:
                self.log_test("Admin Registrations Endpoint", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Admin Registrations Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_admin_tasks(self):
        """Test admin tasks endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/admin/tasks", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") is True:
                    tasks = data.get("data", [])
                    self.log_test("Admin Tasks Endpoint", True, f"Found {len(tasks)} tasks")
                    return True
                else:
                    self.log_test("Admin Tasks Endpoint", False, f"Success=False: {data}")
                    return False
            else:
                self.log_test("Admin Tasks Endpoint", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Admin Tasks Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_status_endpoints(self):
        """Test status check endpoints"""
        try:
            # Test POST status
            test_data = {"client_name": "test_client"}
            response = requests.post(f"{self.base_url}/api/status", json=test_data, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("client_name") == "test_client":
                    self.log_test("Status POST Endpoint", True)
                else:
                    self.log_test("Status POST Endpoint", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Status POST Endpoint", False, f"Status code: {response.status_code}")
                return False

            # Test GET status
            response = requests.get(f"{self.base_url}/api/status", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Status GET Endpoint", True, f"Found {len(data)} status checks")
                    return True
                else:
                    self.log_test("Status GET Endpoint", False, f"Expected list, got: {type(data)}")
                    return False
            else:
                self.log_test("Status GET Endpoint", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Status Endpoints", False, f"Exception: {str(e)}")
            return False

    def test_save_ticket_endpoint(self):
        """Test save ticket registration endpoint"""
        try:
            # Test data for registration
            test_wallet = "0xabcdef1234567890abcdef1234567890abcdef12"
            registration_data = {
                "wallet": test_wallet,
                "txHash": "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef123456",
                "index": 1,
                "seed": "random_seed_12345",
                "ticket": "SQUID-001",
                "reward": "1000 PAYU",
                "timestamp": 1703097600
            }
            
            # Test POST save-ticket
            response = requests.post(f"{self.base_url}/api/save-ticket", json=registration_data, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") is True and "saved" in data.get("message", "").lower():
                    self.log_test("Save Ticket Endpoint", True)
                    return True
                elif data.get("success") is True and "already registered" in data.get("message", "").lower():
                    self.log_test("Save Ticket Endpoint (Duplicate)", True, "Duplicate registration handled correctly")
                    return True
                else:
                    self.log_test("Save Ticket Endpoint", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Save Ticket Endpoint", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Save Ticket Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_registration_flow(self):
        """Test complete registration flow - save and retrieve"""
        try:
            # Test data for registration
            test_wallet = "0xfedcba0987654321fedcba0987654321fedcba09"
            registration_data = {
                "wallet": test_wallet,
                "txHash": "0xabcdef987654321abcdef987654321abcdef987654321abcdef987654321abcd",
                "index": 2,
                "seed": "test_seed_67890",
                "ticket": "SQUID-002",
                "reward": "2000 PAYU",
                "timestamp": 1703184000
            }
            
            # Step 1: Save registration
            save_response = requests.post(f"{self.base_url}/api/save-ticket", json=registration_data, timeout=10)
            if save_response.status_code != 200:
                self.log_test("Registration Flow", False, f"Save failed with status: {save_response.status_code}")
                return False
            
            save_data = save_response.json()
            if not save_data.get("success"):
                self.log_test("Registration Flow", False, f"Save failed: {save_data}")
                return False
            
            # Step 2: Retrieve registration
            get_response = requests.get(f"{self.base_url}/api/registration/{test_wallet}", timeout=10)
            if get_response.status_code != 200:
                self.log_test("Registration Flow", False, f"Retrieve failed with status: {get_response.status_code}")
                return False
            
            get_data = get_response.json()
            if get_data.get("success") is True and get_data.get("data"):
                retrieved_data = get_data["data"]
                if (retrieved_data.get("wallet") == test_wallet and 
                    retrieved_data.get("ticket") == "SQUID-002"):
                    self.log_test("Registration Flow", True, "Complete save/retrieve flow working")
                    return True
                else:
                    self.log_test("Registration Flow", False, f"Data mismatch: {retrieved_data}")
                    return False
            else:
                self.log_test("Registration Flow", False, f"Retrieve failed: {get_data}")
                return False
                
        except Exception as e:
            self.log_test("Registration Flow", False, f"Exception: {str(e)}")
            return False

    def test_registration_endpoint(self):
        """Test registration endpoint with non-existent wallet"""
        try:
            # Test with non-existent wallet
            dummy_wallet = "0x1234567890123456789012345678901234567890"
            response = requests.get(f"{self.base_url}/api/registration/{dummy_wallet}", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") is False and "No registration found" in data.get("message", ""):
                    self.log_test("Registration Endpoint (No Data)", True)
                    return True
                else:
                    self.log_test("Registration Endpoint (No Data)", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Registration Endpoint (No Data)", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Registration Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_task_click_endpoint(self):
        """Test task click logging endpoint"""
        try:
            # Test data for task click
            task_data = {
                "wallet": "0xabcdef1234567890abcdef1234567890abcdef12",
                "platform": "telegram",
                "handle": "@payu_official"
            }
            
            # Test POST task-click
            response = requests.post(f"{self.base_url}/api/task-click", json=task_data, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") is True and "logged" in data.get("message", "").lower():
                    self.log_test("Task Click Endpoint", True)
                    return True
                else:
                    self.log_test("Task Click Endpoint", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Task Click Endpoint", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Task Click Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_task_flow(self):
        """Test complete task flow - log and retrieve"""
        try:
            test_wallet = "0x9876543210fedcba9876543210fedcba98765432"
            
            # Log multiple tasks
            tasks = [
                {"wallet": test_wallet, "platform": "telegram", "handle": "@payu_draw"},
                {"wallet": test_wallet, "platform": "x", "handle": "@payu_official"},
                {"wallet": test_wallet, "platform": "instagram_story"}
            ]
            
            # Log each task
            for task in tasks:
                response = requests.post(f"{self.base_url}/api/task-click", json=task, timeout=10)
                if response.status_code != 200 or not response.json().get("success"):
                    self.log_test("Task Flow", False, f"Failed to log task: {task}")
                    return False
            
            # Retrieve task history
            response = requests.get(f"{self.base_url}/api/tasks/{test_wallet}", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") is True and isinstance(data.get("data"), list):
                    task_history = data["data"]
                    # Check if we have at least the tasks we just logged
                    if len(task_history) >= len(tasks):
                        self.log_test("Task Flow", True, f"Task logging and retrieval working - {len(task_history)} tasks found")
                        return True
                    else:
                        self.log_test("Task Flow", False, f"Expected at least {len(tasks)} tasks, found {len(task_history)}")
                        return False
                else:
                    self.log_test("Task Flow", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Task Flow", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Task Flow", False, f"Exception: {str(e)}")
            return False

    def test_task_history_endpoint(self):
        """Test task history endpoint with non-existent wallet"""
        try:
            # Test with non-existent wallet
            dummy_wallet = "0x1234567890123456789012345678901234567890"
            response = requests.get(f"{self.base_url}/api/tasks/{dummy_wallet}", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") is True and isinstance(data.get("data"), list):
                    self.log_test("Task History Endpoint (Empty)", True, f"Found {len(data['data'])} tasks")
                    return True
                else:
                    self.log_test("Task History Endpoint (Empty)", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Task History Endpoint (Empty)", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Task History Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_error_handling(self):
        """Test error handling with invalid data"""
        try:
            # Test save-ticket with missing required fields
            invalid_registration = {"wallet": "0x123"}  # Missing required fields
            response = requests.post(f"{self.base_url}/api/save-ticket", json=invalid_registration, timeout=10)
            
            # Should return 422 for validation error or 500 for server error
            if response.status_code in [422, 500]:
                self.log_test("Error Handling (Invalid Registration)", True, f"Properly rejected invalid data with status {response.status_code}")
            else:
                self.log_test("Error Handling (Invalid Registration)", False, f"Unexpected status code: {response.status_code}")
                return False
            
            # Test task-click with invalid platform
            invalid_task = {"wallet": "0x123", "platform": "invalid_platform"}
            response = requests.post(f"{self.base_url}/api/task-click", json=invalid_task, timeout=10)
            
            # Should handle gracefully (either accept or reject properly)
            if response.status_code in [200, 422, 500]:
                self.log_test("Error Handling (Invalid Task)", True, f"Handled invalid task data with status {response.status_code}")
                return True
            else:
                self.log_test("Error Handling (Invalid Task)", False, f"Unexpected status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Error Handling", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting PAYU Draw Backend API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)

        # Test all endpoints in logical order
        self.test_api_root()
        self.test_admin_registrations()
        self.test_admin_tasks()
        self.test_status_endpoints()
        
        # Test core functionality
        self.test_save_ticket_endpoint()
        self.test_registration_flow()
        self.test_registration_endpoint()
        
        self.test_task_click_endpoint()
        self.test_task_flow()
        self.test_task_history_endpoint()
        
        # Test error handling
        self.test_error_handling()

        # Print summary
        print("=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All backend tests passed!")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return False

    def get_test_summary(self):
        """Get detailed test summary"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "test_details": self.test_results
        }

def main():
    tester = PayuDrawAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    summary = tester.get_test_summary()
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(summary, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())