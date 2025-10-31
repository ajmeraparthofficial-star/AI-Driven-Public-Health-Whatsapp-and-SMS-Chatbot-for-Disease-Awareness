"""
Fast2SMS Testing Script - Matrix Mavericks
Tests SMS sending with different methods
"""

import requests

SMS_API_KEY = "CicyAl1wmM4L2XVZgQrT3t9baYs6dDx5fJh0eENS7qIFUOGuvjMwgOifsE8BclS1HI243KnW7yxJGtmX"
BASE_URL = "https://www.fast2sms.com/dev/bulkV2"
PHONE = "7895032847"

print("="*70)
print("  FAST2SMS API TESTING - MATRIX MAVERICKS")
print("="*70)
print(f"\n🔑 API Key (first 20 chars): {SMS_API_KEY[:20]}...")
print(f"📱 Testing phone number: {PHONE}\n")

# ============================================================
# TEST 1: GET Method with Query Parameters (Fast2SMS Standard)
# ============================================================
print("\n" + "="*70)
print("  TEST 1: GET Method with Query Parameters")
print("="*70)

try:
    params = {
        "authorization": SMS_API_KEY,
        "sender_id": "TXTIND",
        "message": "Test SMS from Matrix Mavericks - Method 1",
        "language": "english",
        "route": "q",
        "numbers": PHONE
    }
    
    print("📤 Sending SMS via GET method...")
    response = requests.get(BASE_URL, params=params, timeout=15)
    
    print(f"📋 Status Code: {response.status_code}")
    print(f"📋 Response: {response.text}")
    
    if response.status_code == 200:
        result = response.json()
        if result.get('return'):
            print("✅ TEST 1 PASSED - SMS sent successfully!")
        else:
            print(f"❌ TEST 1 FAILED - {result.get('message', 'Unknown error')}")
    else:
        print(f"❌ TEST 1 FAILED - HTTP {response.status_code}")
        
except Exception as e:
    print(f"❌ TEST 1 ERROR: {e}")

# ============================================================
# TEST 2: POST Method with JSON Body
# ============================================================
print("\n" + "="*70)
print("  TEST 2: POST Method with JSON Body")
print("="*70)

try:
    headers = {
        "authorization": SMS_API_KEY,
        "Content-Type": "application/json"
    }
    
    payload = {
        "sender_id": "TXTIND",
        "message": "Test SMS from Matrix Mavericks - Method 2",
        "language": "english",
        "route": "q",
        "numbers": PHONE
    }
    
    print("📤 Sending SMS via POST method...")
    response = requests.post(BASE_URL, json=payload, headers=headers, timeout=15)
    
    print(f"📋 Status Code: {response.status_code}")
    print(f"📋 Response: {response.text}")
    
    if response.status_code == 200:
        result = response.json()
        if result.get('return'):
            print("✅ TEST 2 PASSED - SMS sent successfully!")
        else:
            print(f"❌ TEST 2 FAILED - {result.get('message', 'Unknown error')}")
    else:
        print(f"❌ TEST 2 FAILED - HTTP {response.status_code}")
        
except Exception as e:
    print(f"❌ TEST 2 ERROR: {e}")

# ============================================================
# TEST 3: Different Routes
# ============================================================
print("\n" + "="*70)
print("  TEST 3: Testing Different Routes")
print("="*70)

routes = ["q", "v3", "dlt", "otp"]

for route in routes:
    print(f"\n🔄 Testing route: {route}")
    try:
        params = {
            "authorization": SMS_API_KEY,
            "message": f"Matrix Mavericks - Route {route}",
            "route": route,
            "numbers": PHONE
        }
        
        response = requests.get(BASE_URL, params=params, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if result.get('return'):
                print(f"   ✅ Route '{route}' works!")
            else:
                print(f"   ❌ Route '{route}': {result.get('message', 'Failed')}")
        else:
            print(f"   ❌ Route '{route}': HTTP {response.status_code}")
            
    except Exception as e:
        print(f"   ❌ Route '{route}' error: {e}")

# ============================================================
# TEST 4: Verify API Key
# ============================================================
print("\n" + "="*70)
print("  TEST 4: API Key Verification")
print("="*70)

try:
    # Simple verification request
    params = {
        "authorization": SMS_API_KEY,
        "sender_id": "TXTIND",
        "message": "API Key Test",
        "route": "q",
        "numbers": PHONE
    }
    
    response = requests.get(BASE_URL, params=params, timeout=10)
    
    if response.status_code == 401:
        print("❌ API KEY IS INVALID!")
        print("   Please check:")
        print("   1. Login to https://www.fast2sms.com")
        print("   2. Go to Dev API section")
        print("   3. Copy the correct API key")
        print(f"   4. Current key starts with: {SMS_API_KEY[:20]}...")
    elif response.status_code == 200:
        result = response.json()
        if result.get('return'):
            print("✅ API KEY IS VALID!")
        else:
            print(f"⚠️ API Key valid but request failed: {result.get('message')}")
    else:
        print(f"⚠️ Unexpected status: {response.status_code}")
        print(f"Response: {response.text}")
        
except Exception as e:
    print(f"❌ Verification error: {e}")

# ============================================================
# SUMMARY
# ============================================================
print("\n" + "="*70)
print("  SUMMARY & RECOMMENDATIONS")
print("="*70)

print("\n📋 If all tests failed with 401 error:")
print("   → Your API key is incorrect or expired")
print("   → Get a new key from Fast2SMS dashboard\n")

print("📋 If tests show 'insufficient balance':")
print("   → Add credits to your Fast2SMS account\n")

print("📋 If only certain routes fail:")
print("   → Use the route that works in your backend code\n")

print("📋 To update backend code:")
print("   1. Open: backend/app.py")
print("   2. Find line ~18: SMS_API_KEY = '...'")
print("   3. Replace with correct key")
print("   4. Restart Flask: python app.py\n")

print("="*70)