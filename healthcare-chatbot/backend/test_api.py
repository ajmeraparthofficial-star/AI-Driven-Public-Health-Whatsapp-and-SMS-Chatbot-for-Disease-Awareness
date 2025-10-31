"""
Simple Testing Script for Matrix Mavericks Healthcare Bot
Run this to test all endpoints easily
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def print_section(title):
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60)

def test_health():
    """Test if backend is healthy"""
    print_section("TEST 1: Health Check")
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        print(f"✅ Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_whatsapp():
    """Test WhatsApp sending"""
    print_section("TEST 2: WhatsApp Message Sending")
    try:
        payload = {
            "phone": "917017067297",
            "message": "Test from Matrix Mavericks Bot!"
        }
        print(f"Sending to: {payload['phone']}")
        print(f"Message: {payload['message']}")
        
        response = requests.post(
            f"{BASE_URL}/test/whatsapp",
            json=payload,
            timeout=15
        )
        
        print(f"\n📋 Status Code: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if result.get('status') == 'success':
            print("✅ WhatsApp test PASSED!")
            return True
        else:
            print("❌ WhatsApp test FAILED!")
            print("Check the Flask backend console for detailed error messages")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_sms():
    """Test SMS sending"""
    print_section("TEST 3: SMS Message Sending")
    try:
        payload = {
            "phone": "917895032847",
            "message": "Test SMS from Matrix Mavericks!"
        }
        print(f"Sending to: {payload['phone']}")
        print(f"Message: {payload['message']}")
        
        response = requests.post(
            f"{BASE_URL}/test/sms",
            json=payload,
            timeout=15
        )
        
        print(f"\n📋 Status Code: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        
        if result.get('status') == 'success':
            print("✅ SMS test PASSED!")
            return True
        else:
            print("❌ SMS test FAILED!")
            print("Check the Flask backend console for detailed error messages")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_web_chat():
    """Test web chat API"""
    print_section("TEST 4: Web Chat API")
    try:
        payload = {
            "userId": "test-user-123",
            "message": "I have fever and headache",
            "language": "en"
        }
        print(f"User ID: {payload['userId']}")
        print(f"Message: {payload['message']}")
        print(f"Language: {payload['language']}")
        
        response = requests.post(
            f"{BASE_URL}/api/chat",
            json=payload,
            timeout=15
        )
        
        print(f"\n📋 Status Code: {response.status_code}")
        result = response.json()
        print(f"\n🤖 AI Response:")
        print(result.get('response', 'No response'))
        print(f"\n✅ Web Chat test PASSED!")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_whatsapp_webhook():
    """Test WhatsApp webhook (simulate incoming message)"""
    print_section("TEST 5: WhatsApp Webhook (Simulated)")
    try:
        payload = {
            "data": {
                "messages": [{
                    "key": {"remoteJid": "919760010213@s.whatsapp.net"},
                    "message": {"conversation": "Hello"}
                }]
            }
        }
        print("Simulating WhatsApp message: 'Hello' from 919760010213")
        
        response = requests.post(
            f"{BASE_URL}/webhook/whatsapp",
            json=payload,
            timeout=15
        )
        
        print(f"\n📋 Status Code: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        print("✅ Webhook test PASSED!")
        print("Check Flask console to see if language menu was sent")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_sms_webhook():
    """Test SMS webhook (simulate incoming SMS)"""
    print_section("TEST 6: SMS Webhook (Simulated)")
    try:
        payload = {
            "from": "919760010213",
            "message": "Hello"
        }
        print("Simulating SMS: 'Hello' from 919760010213")
        
        response = requests.post(
            f"{BASE_URL}/webhook/sms",
            json=payload,
            timeout=15
        )
        
        print(f"\n📋 Status Code: {response.status_code}")
        result = response.json()
        print(f"Response: {json.dumps(result, indent=2)}")
        print("✅ SMS webhook test PASSED!")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("\n" + "🏥"*30)
    print("  MATRIX MAVERICKS - HEALTHCARE CHATBOT TESTING")
    print("🏥"*30)
    print("\nMake sure your Flask backend is running on http://localhost:5000")
    input("Press Enter to start testing...")
    
    results = {
        "Health Check": test_health(),
        "WhatsApp Send": test_whatsapp(),
        "SMS Send": test_sms(),
        "Web Chat API": test_web_chat(),
        "WhatsApp Webhook": test_whatsapp_webhook(),
        "SMS Webhook": test_sms_webhook()
    }
    
    # Summary
    print("\n" + "="*60)
    print("  TEST SUMMARY")
    print("="*60)
    
    for test_name, passed in results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name:.<40} {status}")
    
    passed_count = sum(results.values())
    total_count = len(results)
    
    print(f"\nTotal: {passed_count}/{total_count} tests passed")
    
    if passed_count == total_count:
        print("\n🎉 All tests passed! Your backend is working perfectly!")
    else:
        print("\n⚠️ Some tests failed. Check the Flask backend console for error details.")
        print("\nCommon issues:")
        print("- WhatsApp/SMS fail: Check API keys and account credits")
        print("- Backend not responding: Make sure Flask is running")

if __name__ == "__main__":
    main()