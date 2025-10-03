#!/usr/bin/env python3
"""
Test script to verify PostgreSQL connection and basic functionality
"""
import asyncio
import asyncpg
import os
from datetime import datetime

async def test_postgres_connection():
    """Test PostgreSQL connection and basic operations"""
    
    # Use environment variable or default
    database_url = os.getenv('DATABASE_URL', 'postgresql://localhost:5432/payu_draw')
    
    try:
        print("🔄 Testing PostgreSQL connection...")
        
        # Create connection pool
        pool = await asyncpg.create_pool(database_url, min_size=1, max_size=2)
        
        async with pool.acquire() as conn:
            # Test basic query
            result = await conn.fetchval('SELECT 1')
            print(f"✅ Basic query successful: {result}")
            
            # Test table creation
            await conn.execute('''
                CREATE TABLE IF NOT EXISTS test_table (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            print("✅ Table creation successful")
            
            # Test insert
            await conn.execute('''
                INSERT INTO test_table (name) VALUES ($1)
            ''', 'test_entry')
            print("✅ Insert operation successful")
            
            # Test select
            rows = await conn.fetch('SELECT * FROM test_table')
            print(f"✅ Select operation successful: {len(rows)} rows found")
            
            # Cleanup
            await conn.execute('DROP TABLE IF EXISTS test_table')
            print("✅ Cleanup successful")
        
        await pool.close()
        print("🎉 All PostgreSQL tests passed!")
        return True
        
    except Exception as e:
        print(f"❌ PostgreSQL test failed: {e}")
        return False

if __name__ == "__main__":
    success = asyncio.run(test_postgres_connection())
    exit(0 if success else 1)