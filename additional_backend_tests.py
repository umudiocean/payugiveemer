#!/usr/bin/env python3

import requests
import json
import time
from datetime import datetime

class AdditionalPayuTests:
    def __init__(self, base_url="https://cryptogame-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")

    def test_realistic_registration_scenarios(self):
        """Test with realistic wallet addresses and transaction data"""
        try:
            # Test realistic registration scenarios
            realistic_registrations = [
                {
                    "wallet": "0x742d35Cc6634C0532925a3b8D4C9db96590c4C87",
                    "txHash": "0x8f4c9b2a1e3d7f6a5b8c9d2e1f4a7b6c9d2e1f4a7b6c9d2e1f4a7b6c9d2e1f4a",
                    "index": 1,
                    "seed": "payu_seed_2024_001",
                    "ticket": "SQUID-GAME-001",
                    "reward": "250000000 PAYU",
                    "timestamp": int(time.time())
                },
                {
                    "wallet": "0x8ba1f109551bD432803012645Hac136c30c6213",
                    "txHash": "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
                    "index": 2,
                    "seed": "payu_seed_2024_002",
                    "ticket": "SQUID-GAME-002",
                    "reward": "250000000 PAYU",
                    "timestamp": int(time.time())
                }
            ]
            
            for i, reg_data in enumerate(realistic_registrations):
                # Save registration
                response = requests.post(f"{self.base_url}/api/save-ticket", json=reg_data, timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success"):
                        self.log_test(f"Realistic Registration {i+1}", True, f"Wallet: {reg_data['wallet'][:10]}...")
                    else:
                        self.log_test(f"Realistic Registration {i+1}", False, f"Failed: {data}")
                        return False
                else:
                    self.log_test(f"Realistic Registration {i+1}", False, f"Status: {response.status_code}")
                    return False
                    
                # Verify retrieval
                response = requests.get(f"{self.base_url}/api/registration/{reg_data['wallet']}", timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success") and data.get("data"):
                        retrieved = data["data"]
                        if retrieved.get("wallet") == reg_data["wallet"]:
                            self.log_test(f"Registration Retrieval {i+1}", True)
                        else:
                            self.log_test(f"Registration Retrieval {i+1}", False, "Data mismatch")
                            return False
                    else:
                        self.log_test(f"Registration Retrieval {i+1}", False, f"Failed: {data}")
                        return False
                else:
                    self.log_test(f"Registration Retrieval {i+1}", False, f"Status: {response.status_code}")
                    return False
            
            return True
            
        except Exception as e:
            self.log_test("Realistic Registration Scenarios", False, f"Exception: {str(e)}")
            return False

    def test_social_media_tasks(self):
        """Test all social media platform tasks"""
        try:
            test_wallet = "0x742d35Cc6634C0532925a3b8D4C9db96590c4C87"
            
            social_tasks = [
                {"wallet": test_wallet, "platform": "telegram", "handle": "@payu_official"},
                {"wallet": test_wallet, "platform": "x", "handle": "@PayuToken"},
                {"wallet": test_wallet, "platform": "instagram_story", "handle": "@payu.token"},
                {"wallet": test_wallet, "platform": "telegram", "handle": "@payu_community"},
                {"wallet": test_wallet, "platform": "x", "handle": "@PayuDraw"}
            ]
            
            for i, task in enumerate(social_tasks):
                response = requests.post(f"{self.base_url}/api/task-click", json=task, timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success"):
                        self.log_test(f"Social Task {i+1} ({task['platform']})", True)
                    else:
                        self.log_test(f"Social Task {i+1} ({task['platform']})", False, f"Failed: {data}")
                        return False
                else:
                    self.log_test(f"Social Task {i+1} ({task['platform']})", False, f"Status: {response.status_code}")
                    return False
            
            # Verify all tasks were logged
            response = requests.get(f"{self.base_url}/api/tasks/{test_wallet}", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and isinstance(data.get("data"), list):
                    tasks = data["data"]
                    if len(tasks) >= len(social_tasks):
                        self.log_test("Social Tasks Verification", True, f"Found {len(tasks)} tasks")
                        return True
                    else:
                        self.log_test("Social Tasks Verification", False, f"Expected {len(social_tasks)}, found {len(tasks)}")
                        return False
                else:
                    self.log_test("Social Tasks Verification", False, f"Failed: {data}")
                    return False
            else:
                self.log_test("Social Tasks Verification", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Social Media Tasks", False, f"Exception: {str(e)}")
            return False

    def test_database_persistence(self):
        """Test that data persists across multiple requests"""
        try:
            # Create a unique wallet for this test
            test_wallet = f"0x{int(time.time()):x}{'0' * (40 - len(hex(int(time.time()))[2:]))}"
            
            # Register
            reg_data = {
                "wallet": test_wallet,
                "txHash": f"0x{int(time.time()):x}{'a' * (64 - len(hex(int(time.time()))[2:]))}",
                "index": 999,
                "seed": f"persistence_test_{int(time.time())}",
                "ticket": "PERSISTENCE-TEST",
                "reward": "1000000000 PAYU",
                "timestamp": int(time.time())
            }
            
            # Save registration
            response = requests.post(f"{self.base_url}/api/save-ticket", json=reg_data, timeout=10)
            if response.status_code != 200 or not response.json().get("success"):
                self.log_test("Database Persistence - Save", False, "Failed to save")
                return False
            
            # Wait a moment
            time.sleep(1)
            
            # Retrieve multiple times to ensure persistence
            for i in range(3):
                response = requests.get(f"{self.base_url}/api/registration/{test_wallet}", timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success") and data.get("data"):
                        retrieved = data["data"]
                        if retrieved.get("ticket") == "PERSISTENCE-TEST":
                            self.log_test(f"Database Persistence - Retrieve {i+1}", True)
                        else:
                            self.log_test(f"Database Persistence - Retrieve {i+1}", False, "Data corrupted")
                            return False
                    else:
                        self.log_test(f"Database Persistence - Retrieve {i+1}", False, f"Failed: {data}")
                        return False
                else:
                    self.log_test(f"Database Persistence - Retrieve {i+1}", False, f"Status: {response.status_code}")
                    return False
                    
                time.sleep(0.5)
            
            return True
            
        except Exception as e:
            self.log_test("Database Persistence", False, f"Exception: {str(e)}")
            return False

    def run_additional_tests(self):
        """Run additional comprehensive tests"""
        print("🔍 Running Additional PAYU Draw Backend Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)

        self.test_realistic_registration_scenarios()
        self.test_social_media_tasks()
        self.test_database_persistence()

        print("=" * 60)
        print(f"📊 Additional Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All additional tests passed!")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} additional tests failed")
            return False

def main():
    tester = AdditionalPayuTests()
    return tester.run_additional_tests()

if __name__ == "__main__":
    main()