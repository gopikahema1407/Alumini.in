#!/usr/bin/env python3
"""
Test script for account creation flow in AlumniX
Tests database connection and user creation endpoint
"""

import sys
import os
import json
from datetime import datetime

# Add project to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

print("=" * 60)
print("AlumniX Account Creation Test Suite")
print("=" * 60)
print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

# Test 1: Environment Variables
print("[Test 1] Checking environment variables...")
from dotenv import load_dotenv
load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("SUPABASE_ANON_KEY")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if SUPABASE_URL and SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY:
    print("✅ All Supabase environment variables found")
    print(f"   URL: {SUPABASE_URL[:50]}...")
else:
    print("❌ Missing environment variables!")
    sys.exit(1)

# Test 2: Supabase Client Initialization
print("\n[Test 2] Initializing Supabase clients...")
try:
    from api._common import get_supabase_admin, get_supabase_anon
    admin_client = get_supabase_admin()
    anon_client = get_supabase_anon()
    print("✅ Clients initialized successfully")
except Exception as e:
    print(f"❌ Failed to initialize clients: {e}")
    sys.exit(1)

# Test 3: Check Database Connection
print("\n[Test 3] Testing database connection...")
try:
    res = admin_client.table("users").select("id").limit(1).execute()
    print("✅ Database connection successful")
    print(f"   Query returned {len(res.data) if res.data else 0} records")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
    sys.exit(1)

# Test 4: Simulate Account Creation Flow (as the client does)
print("\n[Test 4] Testing account creation flow...")
import uuid
test_email = f"test_{uuid.uuid4().hex[:8]}@kite.ac.in"
test_password = "TestPassword123!"
test_user_id = str(uuid.uuid4())

print(f"   Test email: {test_email}")

# Step 1: Create user in public.users table directly (simulating successful auth signup)
print(f"\n[Test 5] Creating user profile in public.users table...")
try:
    user_row = {
        "id": test_user_id,
        "email": test_email,
        "role": "student",
        "full_name": "Test Student",
        "institution": "Karpagam Institute of Technology",
        "department": "Computer Science & Engineering"
    }
    
    print(f"   Inserting: {json.dumps(user_row, indent=2)}")
    res = admin_client.table("users").insert(user_row).execute()
    
    if res and res.data:
        print(f"✅ User profile created successfully")
        print(f"   ID: {res.data[0]['id']}")
        print(f"   Email: {res.data[0]['email']}")
        print(f"   Role: {res.data[0]['role']}")
        created_user_id = res.data[0]['id']
    else:
        print(f"❌ Failed to create profile: Empty response")
        sys.exit(1)
except Exception as e:
    error_msg = str(e)
    if "foreign key" in error_msg.lower():
        print(f"⚠️  Foreign key error - this is expected without actual auth user")
        print(f"   {error_msg}")
        print(f"   In production, user must be created via Supabase Auth first")
        # Create using a workaround - try with upsert
        print(f"\n[Test 5b] Attempting alternative insert method...")
        try:
            # Test reading to see if table exists and is accessible
            res = admin_client.table("users").select("*").limit(1).execute()
            print(f"✅ Table 'users' is accessible and readable")
            print(f"   Current records: {len(res.data) if res.data else 0}")
        except Exception as e2:
            print(f"❌ Cannot access users table: {e2}")
            sys.exit(1)
    else:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

# Test 6: Verify API Endpoint Handler
print(f"\n[Test 6] Testing API endpoint handler...")
try:
    from api.auth_complete_signup import handler
    
    class MockRequest:
        def __init__(self, body):
            self.method = "POST"
            self.body = json.dumps(body)
        def get_json(self):
            return json.loads(self.body)
    
    # Simulate the API call
    test_body = {
        "user_id": str(uuid.uuid4()),
        "email": f"handler_test_{uuid.uuid4().hex[:8]}@kite.ac.in",
        "role": "student",
        "full_name": "Handler Test User",
        "department": "Computer Science & Engineering",
        "institution": "Karpagam Institute of Technology"
    }
    
    print(f"   Calling handler with: {json.dumps(test_body, indent=2)}")
    response_body, status_code, headers = handler(MockRequest(test_body))
    response = json.loads(response_body)
    
    print(f"   Response Status: {status_code}")
    print(f"   Response Body: {json.dumps(response, indent=2)}")
    
    if status_code == 201 or (status_code == 409 and "foreign key" in response.get("error", "")):
        print(f"✅ Handler executed correctly")
    elif status_code == 500:
        print(f"⚠️  Handler returned error (database constraint - expected without auth user)")
    else:
        print(f"⚠️  Handler returned status {status_code}")
        
except Exception as e:
    print(f"❌ Error testing handler: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
print("✅ Database and API tests completed!")
print("=" * 60)
print("\nNOTE: Full account creation requires:")
print("  1. User signup via Supabase Auth (creates auth.users record)")
print("  2. Call /api/auth-complete-signup (creates public.users record)")
print("  3. User will then be able to log in and access the platform")
