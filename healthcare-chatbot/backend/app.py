"""
COMPLETE Healthcare Chatbot Backend
WhatsApp + SMS Integration with Frontend Support
Team: Matrix Mavericks

UPDATED WITH CORRECT WASENDER API ENDPOINT
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import requests
import traceback
from datetime import datetime
import json
import os
from dotenv import load_dotenv

# =====================================================
# CONFIGURATION
# =====================================================

# Load environment variables from .env (development)
load_dotenv()

# API Keys (set these in environment or .env)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "your_gemini_api_key_here")
WASENDER_API_KEY = os.getenv("WASENDER_API_KEY", "your_wasender_api_key_here")
SMS_API_KEY = os.getenv("SMS_API_KEY", "your_sms_api_key_here")

# Phone Numbers
WHATSAPP_NUMBER = "+91701706xxxx"  # Your WhatsApp number with country code
SMS_NUMBER = "+9178950xxxxx"       # Your SMS number with country code

# Team Info
TEAM_NAME = "Matrix Mavericks"
TEAM_MEMBERS = ["Parth Ajmera", "Yashvardhan Dobhal", "Aashu Joshi", "Anshika Bijalwan"]

# Ngrok Configuration (set NGROK_DOMAIN if using ngrok tunnels)
NGROK_DOMAIN = os.getenv("NGROK_DOMAIN", "your_ngrok_subdomain.ngrok.io")
NGROK_AUTHTOKEN = os.getenv("NGROK_AUTHTOKEN", "your_ngrok_authtoken_here")

# API Endpoints - UPDATED WITH CORRECT WASENDER ENDPOINT (from env)
WASENDER_API_URL = os.getenv("WASENDER_API_URL", "your_wasender_api_endpoint_here")  # Correct WaSender API endpoint
FAST2SMS_URL = os.getenv("FAST2SMS_URL", "your_fast2sms_api_endpoint_here")      # Fast2SMS API endpoint

# Development mode: when true, avoid calling external APIs and simulate sends
# Set DEV_MODE=0 in your environment to disable simulation
DEV_MODE = os.environ.get("DEV_MODE", "true").lower() in ("1", "true", "yes")
# =====================================================
# FLASK APP INITIALIZATION
# =====================================================

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure Gemini AI (uses GEMINI_API_KEY from env/.env)
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel("models/gemini-2.0-flash-exp")

# =====================================================
# DATA STRUCTURES
# =====================================================

# Store user sessions (language preferences, chat history)
user_sessions = {}

# Supported Languages
SUPPORTED_LANGUAGES = {
    'en': {'name': 'English', 'greeting': '👋 Welcome to Matrix Mavericks Healthcare Bot! Please describe your symptoms.'},
    'hi': {'name': 'Hindi', 'greeting': '👋 नमस्ते! Matrix Mavericks स्वास्थ्य सहायक में आपका स्वागत है। कृपया अपने लक्षण बताएं।'},
    'mr': {'name': 'Marathi', 'greeting': '👋 नमस्कार! Matrix Mavericks आरोग्य सहायक। कृपया आपल्या लक्षणांचे वर्णन करा।'},
    'bn': {'name': 'Bengali', 'greeting': '👋 স্বাগতম Matrix Mavericks! দয়া করে আপনার লক্ষণগুলি বর্ণনা করুন।'},
    'gu': {'name': 'Gujarati', 'greeting': '👋 સ્વાગતમ Matrix Mavericks! કૃપા કરીને તમારા લક્ષણો વર્ણવો।'},
    'te': {'name': 'Telugu', 'greeting': '👋 స్వాగతం Matrix Mavericks! దయచేసి మీ లక్షణాలను వివరించండి।'},
    'ta': {'name': 'Tamil', 'greeting': '👋 வணக்கம் Matrix Mavericks! உங்கள் அறிகுறிகளை விவரிக்கவும்।'},
    'kn': {'name': 'Kannada', 'greeting': '👋 ಸ್ವಾಗತ Matrix Mavericks! ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ।'},
    'ml': {'name': 'Malayalam', 'greeting': '👋 സ്വാഗതം Matrix Mavericks! നിങ്ങളുടെ ലക്ഷണങ്ങൾ വിവരിക്കുക।'},
    'or': {'name': 'Odia', 'greeting': '👋 ସ୍ୱାଗତ Matrix Mavericks! ଆପଣଙ୍କ ଲକ୍ଷଣ ବର୍ଣ୍ଣନା କରନ୍ତୁ।'},
    'pa': {'name': 'Punjabi', 'greeting': '👋 ਸੁਆਗਤ Matrix Mavericks! ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਰਣਨ ਕਰੋ।'},
    'ur': {'name': 'Urdu', 'greeting': '👋 خوش آمدید Matrix Mavericks! اپنی علامات بیان کریں۔'},
    'hinglish': {'name': 'Hinglish', 'greeting': '👋 Welcome Matrix Mavericks! Apne lakshan batayein.'},
}

LANGUAGE_SELECTION_MENU = """
👋 Welcome to Matrix Mavericks Healthcare Bot!
Select Language / भाषा चुनें:

1️⃣ English
2️⃣ हिंदी (Hindi)
3️⃣ मराठी (Marathi)
4️⃣ বাংলা (Bengali)
5️⃣ ગુજરાતી (Gujarati)
6️⃣ తెలుగు (Telugu)
7️⃣ தமிழ் (Tamil)
8️⃣ ಕನ್ನಡ (Kannada)
9️⃣ മലയാളം (Malayalam)
🔟 Hinglish

Reply with number (1-10) or language name.
"""

LANG_MAP = {
    '1': 'en', '2': 'hi', '3': 'mr', '4': 'bn', '5': 'gu',
    '6': 'te', '7': 'ta', '8': 'kn', '9': 'ml', '10': 'hinglish',
    'english': 'en', 'hindi': 'hi', 'marathi': 'mr', 'bengali': 'bn',
    'gujarati': 'gu', 'telugu': 'te', 'tamil': 'ta', 'kannada': 'kn',
    'malayalam': 'ml', 'hinglish': 'hinglish', 'odia': 'or', 'punjabi': 'pa', 'urdu': 'ur'
}

# =====================================================
# HELPER FUNCTIONS
# =====================================================

def get_user_session(user_id):
    """Get or create user session"""
    if user_id not in user_sessions:
        user_sessions[user_id] = {
            'language': None,
            'chat_history': [],
            'created_at': datetime.now().isoformat()
        }
    return user_sessions[user_id]

def process_health_query(message, language='en'):
    """Process health query with Gemini AI"""
    try:
        # In development mode avoid calling external Gemini API to prevent rate limits
        if DEV_MODE:
            return (f"(DEV) Simulated response for '{message[:50]}...' in {language}. "
                    "This is a development-only placeholder. Set DEV_MODE=0 to enable real AI.")
        lang_name = SUPPORTED_LANGUAGES.get(language, {}).get('name', 'English')
        
        prompt = f"""You are a healthcare assistant from Matrix Mavericks team.
Language: {lang_name}
User Query: {message}

Provide a helpful health response in {lang_name} within 100 words.
Include:
- Brief symptom analysis with possible causes
- General advice
- When to see a doctor
- Disclaimer: "This is not medical advice. Consult a healthcare professional." 

Response in {lang_name}:"""
        
        response = gemini_model.generate_content(prompt)
        return response.text
        
    except Exception as e:
        print(f"❌ Gemini Error: {e}")
        if language == 'hi':
            return "क्षमा करें, AI सेवा अस्थायी रूप से अनुपलब्ध है। कृपया पुनः प्रयास करें।"
        return "Sorry, AI service temporarily unavailable. Please try again."

def detect_language_from_text(text):
    """Detect language using Gemini"""
    try:
        # Short-circuit language detection in dev mode to avoid external calls
        if DEV_MODE:
            return 'en'
        prompt = f"""Detect the language of this text and return ONLY the language code:
Text: "{text}"

Return one of: en, hi, mr, bn, gu, te, ta, kn, ml, or, pa, ur, hinglish
Only return the code, nothing else."""
        
        response = gemini_model.generate_content(prompt)
        detected = response.text.strip().lower()
        
        if detected in SUPPORTED_LANGUAGES:
            return detected
        return 'en'
    except:
        return 'en'

# =====================================================
# WHATSAPP MESSAGE SENDING - CORRECTED VERSION
# =====================================================

def send_whatsapp_message(phone_number, message):
    """
    Send WhatsApp message via WaSender API
    CORRECTED: Using proper endpoint from documentation
    """
    try:
        # Clean phone number - remove +, spaces, and whatsapp suffix
        phone = phone_number.replace("+", "").replace(" ", "")
        phone = phone.replace("@s.whatsapp.net", "").replace("@g.us", "")
        
        # WaSender API endpoint (from their documentation)
        url = WASENDER_API_URL
        
        # Headers as per WaSender documentation
        headers = {
            "Authorization": f"Bearer {WASENDER_API_KEY}",
            "Content-Type": "application/json"
        }
        
        # Payload as per WaSender documentation
        payload = {
            "to": phone,  # Phone number without + or @s.whatsapp.net
            "text": message
        }
        
        print(f"📤 Sending WhatsApp to: {phone}")
        print(f"📤 URL: {url}")
        print(f"📤 Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(
            url,
            json=payload,
            headers=headers,
            timeout=15
        )
        
        print(f"📋 Status Code: {response.status_code}")
        print(f"📋 Response: {response.text}")
        
        if response.status_code in [200, 201]:
            print(f"✅ WhatsApp message sent successfully!")
            return True
        else:
            print(f"⚠️ WaSender API returned status {response.status_code}")
            print(f"⚠️ Response body: {response.text}")
            return False
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Network Error sending WhatsApp: {e}")
        return False
    except Exception as e:
        print(f"❌ WhatsApp Error: {e}")
        print(traceback.format_exc())
        return False

# =====================================================
# SMS SENDING
# =====================================================

def send_sms_message(phone_number, message):
    """Send SMS via Fast2SMS - CORRECTED VERSION"""
    try:
        # Clean phone number
        phone = phone_number.replace("+", "").replace(" ", "")
        if phone.startswith("91"):
            phone = phone[2:]  # Remove country code for Fast2SMS
        
        # Truncate message to SMS limit
        sms_text = message[:160]
        
        # Method 1: Try POST with authorization header (recommended)
        headers = {
            "authorization": SMS_API_KEY,
            "Content-Type": "application/json"
        }
        
        payload = {
            "route": "q",
            "message": sms_text,
            "language": "english",
            "flash": 0,
            "numbers": phone
        }
        
        print(f"📱 Sending SMS to: {phone}")
        print(f"📱 Message: {sms_text[:50]}...")
        print(f"📱 Using POST method with header authorization")
        
        try:
            response = requests.post(FAST2SMS_URL, json=payload, headers=headers, timeout=10)
            
            print(f"📋 SMS Status: {response.status_code}")
            print(f"📋 SMS Response: {response.text}")
            
            if response.status_code == 200:
                result = response.json()
                if result.get('return'):
                    print("✅ SMS sent successfully via POST!")
                    return True
        except Exception as post_error:
            print(f"⚠️ POST method failed: {post_error}")
        
        # Method 2: Try GET with authorization in query params (fallback)
        print(f"📱 Trying GET method with query parameter authorization...")
        
        get_params = {
            "authorization": SMS_API_KEY,
            "route": "q",
            "message": sms_text,
            "language": "english",
            "flash": 0,
            "numbers": phone
        }
        
        response = requests.get(FAST2SMS_URL, params=get_params, timeout=10)
        
        print(f"📋 SMS Status: {response.status_code}")
        print(f"📋 SMS Response: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            if result.get('return'):
                print("✅ SMS sent successfully via GET!")
                return True
        
        print("⚠️ SMS sending failed with both methods")
        return False
        
    except Exception as e:
        print(f"❌ SMS Error: {e}")
        print(traceback.format_exc())
        return False

# =====================================================
# FRONTEND API ENDPOINTS
# =====================================================

@app.route('/')
def home():
    """Home page with API info"""
    return jsonify({
        "status": "🟢 Active",
        "project": "AI-Driven Public Health Chatbot",
        "team": TEAM_NAME,
        "members": TEAM_MEMBERS,
        "services": {
            "whatsapp": WHATSAPP_NUMBER,
            "sms": SMS_NUMBER,
            "web": "Available"
        },
        "endpoints": {
            "web_chat": "/api/chat",
            "detect_language": "/api/detect-language",
            "whatsapp_webhook": "/webhook/whatsapp",
            "sms_webhook": "/webhook/sms",
            "health": "/api/health"
        },
        "webhook_urls": {
            "whatsapp": f"https://{NGROK_DOMAIN}/webhook/whatsapp",
            "sms": f"https://{NGROK_DOMAIN}/webhook/sms"
        }
    }), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "gemini": "✅ Connected",
            "whatsapp": "✅ WaSender API configured",
            "sms": "✅ Fast2SMS configured"
        },
        "active_sessions": len(user_sessions)
    }), 200

@app.route('/api/chat', methods=['POST'])
def web_chat():
    """
    Web Frontend Chat Endpoint
    Receives messages from React frontend
    """
    try:
        data = request.get_json()
        
        user_id = data.get('userId', 'web-user')
        message = data.get('message', '').strip()
        language = data.get('language', 'en')
        
        if not message:
            return jsonify({"error": "Message is required"}), 400
        
        print(f"\n💬 Web Chat - User: {user_id}")
        print(f"🌐 Language: {language}")
        print(f"📝 Message: {message}")
        
        # Get user session
        session = get_user_session(user_id)
        
        # Process message
        response_text = process_health_query(message, language)
        
        # Save to history
        session['chat_history'].append({
            'user': message,
            'bot': response_text,
            'timestamp': datetime.now().isoformat()
        })
        
        print(f"🤖 Response: {response_text[:100]}...")
        
        return jsonify({
            "response": response_text,
            "language": language,
            "timestamp": datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        print(f"❌ Web Chat Error: {e}")
        print(traceback.format_exc())
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/detect-language', methods=['POST'])
def detect_lang():
    """Detect language from text"""
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({"language": "en"}), 200
        
        detected = detect_language_from_text(text)
        return jsonify({"language": detected}), 200
        
    except Exception as e:
        print(f"❌ Language detection error: {e}")
        return jsonify({"language": "en"}), 200

# =====================================================
# WHATSAPP WEBHOOK
# =====================================================

@app.route('/webhook/whatsapp', methods=['POST', 'GET'])
def whatsapp_webhook():
    """WhatsApp webhook - Receive messages from WaSender"""
    
    # Handle GET request (webhook verification)
    if request.method == 'GET':
        return jsonify({"status": "webhook_active", "service": "whatsapp"}), 200
    
    try:
        data = request.get_json()
        print(f"\n📨 WhatsApp Webhook Received")
        print(f"📦 Raw Data: {json.dumps(data, indent=2)[:500]}")
        
        # Extract messages (handle various formats from WaSender)
        messages_data = data.get('data', {}).get('messages', [])
        
        if not messages_data:
            print("⚠️ No messages in webhook data")
            return jsonify({"status": "no_messages"}), 200
        
        # Handle different message formats
        message_info = messages_data[0] if isinstance(messages_data, list) else messages_data
        if isinstance(message_info, list):
            message_info = message_info[0] if message_info else {}
        
        # Extract text and sender
        incoming_text = ''
        sender = ''
        
        if isinstance(message_info, dict):
            # Try multiple possible locations for message text
            incoming_text = (
                message_info.get('message', {}).get('conversation', '') or
                message_info.get('text', '') or
                message_info.get('body', '') or
                message_info.get('message', {}).get('extendedTextMessage', {}).get('text', '')
            ).strip()
            
            # Try multiple possible locations for sender
            sender = (
                message_info.get('key', {}).get('remoteJid', '') or
                message_info.get('from', '') or
                message_info.get('sender', '') or
                message_info.get('remoteJid', '')
            ).replace('@s.whatsapp.net', '').replace('@g.us', '')
        
        if not incoming_text or not sender:
            print("⚠️ Missing text or sender in message")
            print(f"Text: '{incoming_text}', Sender: '{sender}'")
            return jsonify({"status": "invalid_message"}), 200
        
        print(f"📱 From: {sender}")
        print(f"💬 Message: {incoming_text}")
        
        # Get user session
        session = get_user_session(sender)
        
        # Check if language is selected
        if not session['language']:
            # Check if user is selecting language
            choice = incoming_text.lower().strip()
            lang_code = LANG_MAP.get(choice)
            
            if lang_code:
                session['language'] = lang_code
                reply = SUPPORTED_LANGUAGES[lang_code]['greeting']
                print(f"✅ Language selected: {lang_code} ({SUPPORTED_LANGUAGES[lang_code]['name']})")
            else:
                reply = LANGUAGE_SELECTION_MENU
                print("ℹ️ Showing language selection menu")
            
            # Send response
            success = send_whatsapp_message(sender, reply)
            return jsonify({
                "status": "success" if success else "failed",
                "action": "language_selection"
            }), 200
        
        # Process health query
        language = session['language']
        print(f"🔄 Processing in {SUPPORTED_LANGUAGES[language]['name']}")
        response_text = process_health_query(incoming_text, language)
        
        print(f"🤖 AI Response: {response_text[:100]}...")
        
        # Send response
        success = send_whatsapp_message(sender, response_text)
        
        # Save to history
        if success:
            session['chat_history'].append({
                'user': incoming_text,
                'bot': response_text,
                'timestamp': datetime.now().isoformat()
            })
        
        return jsonify({
            "status": "success" if success else "failed",
            "action": "message_processed"
        }), 200
        
    except Exception as e:
        print(f"❌ WhatsApp Webhook Error: {e}")
        print(traceback.format_exc())
        return jsonify({"status": "error", "message": str(e)}), 500

# =====================================================
# SMS WEBHOOK
# =====================================================

@app.route('/webhook/sms', methods=['POST', 'GET'])
def sms_webhook():
    """SMS webhook - Receive messages from Fast2SMS"""
    
    if request.method == 'GET':
        return jsonify({"status": "webhook_active", "service": "sms"}), 200
    
    try:
        # Fast2SMS can send data as JSON or form data
        data = request.get_json() if request.is_json else request.form.to_dict()
        
        print(f"\n📱 SMS Webhook Received")
        print(f"📦 Data: {data}")
        
        sender = data.get('from', data.get('sender', data.get('mobile', '')))
        message = data.get('message', data.get('text', '')).strip()
        
        if not sender or not message:
            print("⚠️ Missing sender or message")
            return jsonify({"status": "invalid"}), 200
        
        print(f"📱 From: {sender}")
        print(f"💬 Message: {message}")
        
        # Get user session
        session = get_user_session(sender)
        
        # Check language selection
        if not session['language']:
            choice = message.lower().strip()
            lang_code = LANG_MAP.get(choice)
            
            if lang_code:
                session['language'] = lang_code
                reply = SUPPORTED_LANGUAGES[lang_code]['greeting'][:160]
                print(f"✅ Language selected: {lang_code}")
            else:
                reply = "Matrix Mavericks Bot. Select: 1=EN, 2=HI, 3=MR, 4=BN, 5=GU, 6=TE"
                print("ℹ️ Showing language menu")
            
            send_sms_message(sender, reply)
            return jsonify({"status": "success"}), 200
        
        # Process query
        language = session['language']
        response_text = process_health_query(message, language)
        
        # Truncate for SMS (160 chars)
        sms_response = response_text[:155] + "..." if len(response_text) > 160 else response_text
        
        print(f"🤖 Response: {sms_response}")
        
        send_sms_message(sender, sms_response)
        
        # Save to history
        session['chat_history'].append({
            'user': message,
            'bot': response_text,
            'timestamp': datetime.now().isoformat()
        })
        
        return jsonify({"status": "success"}), 200
        
    except Exception as e:
        print(f"❌ SMS Webhook Error: {e}")
        print(traceback.format_exc())
        return jsonify({"status": "error"}), 500

# =====================================================
# TEST ENDPOINTS (for manual testing)
# =====================================================

@app.route('/test/whatsapp', methods=['POST'])
def test_whatsapp():
    """Test WhatsApp sending manually"""
    try:
        data = request.get_json()
        phone = data.get('phone', WHATSAPP_NUMBER)
        message = data.get('message', 'Test message from Matrix Mavericks Bot')
        
        success = send_whatsapp_message(phone, message)
        
        return jsonify({
            "status": "success" if success else "failed",
            "phone": phone,
            "message": message
        }), 200 if success else 500
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/test/sms', methods=['POST'])
def test_sms():
    """Test SMS sending manually"""
    try:
        data = request.get_json()
        phone = data.get('phone', SMS_NUMBER)
        message = data.get('message', 'Test from Matrix Mavericks')
        
        success = send_sms_message(phone, message)
        
        return jsonify({
            "status": "success" if success else "failed",
            "phone": phone,
            "message": message
        }), 200 if success else 500
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/test/sms-direct', methods=['GET'])
def test_sms_direct():
    """Test Fast2SMS API directly to verify API key"""
    try:
        import requests as req
        
        # Test with GET method (as per Fast2SMS docs)
        params = {
            "authorization": SMS_API_KEY,
            "sender_id": "TXTIND",
            "message": "Test from Matrix Mavericks",
            "language": "english",
            "route": "q",
            "numbers": "7895032847"
        }
        
        print(f"🧪 Testing Fast2SMS API directly...")
        print(f"🔑 API Key (first 20 chars): {SMS_API_KEY[:20]}...")
        
        response = req.get("https://www.fast2sms.com/dev/bulkV2", params=params, timeout=10)
        
        result = {
            "status_code": response.status_code,
            "response": response.json() if response.status_code == 200 else response.text,
            "api_key_preview": SMS_API_KEY[:20] + "...",
            "method": "GET with query params"
        }
        
        print(f"📋 Direct Test Result: {result}")
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({
            "error": str(e),
            "traceback": traceback.format_exc()
        }), 500

# =====================================================
# RUN SERVER
# =====================================================

if __name__ == '__main__':
    print("\n" + "="*70)
    print("🏥 MATRIX MAVERICKS - HEALTHCARE CHATBOT BACKEND")
    print("="*70)
    print(f"\n👥 Team: {', '.join(TEAM_MEMBERS)}")
    print(f"\n📱 WhatsApp Number: {WHATSAPP_NUMBER}")
    print(f"📱 SMS Number: {SMS_NUMBER}")
    print(f"🌐 Ngrok Domain: {NGROK_DOMAIN}")
    print(f"\n🚀 Local Server: http://localhost:5000")
    print(f"📊 Health Check: http://localhost:5000/api/health")
    print(f"📖 API Info: http://localhost:5000/")
    print(f"\n📍 Webhook URLs (use these in WaSender/Fast2SMS):")
    print(f"   WhatsApp: https://{NGROK_DOMAIN}/webhook/whatsapp")
    print(f"   SMS: https://{NGROK_DOMAIN}/webhook/sms")
    print(f"\n🧪 Test Endpoints:")
    print(f"   Test WhatsApp: POST http://localhost:5000/test/whatsapp")
    print(f"   Test SMS: POST http://localhost:5000/test/sms")
    print(f"\n✅ WaSender API: {WASENDER_API_URL}")
    print(f"✅ Fast2SMS API: {FAST2SMS_URL}")
    print("="*70 + "\n")
    
    # Allow controlling debug and reloader behavior via env vars to avoid unexpected
    # restarts in development or CI environments.
    flask_debug = os.environ.get("FLASK_DEBUG", "1").lower() in ("1", "true", "yes")
    use_reloader = os.environ.get("USE_RELOADER", "1").lower() in ("1", "true", "yes")
    app.run(host='0.0.0.0', port=5000, debug=flask_debug, use_reloader=use_reloader)