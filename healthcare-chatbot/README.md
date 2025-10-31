# 🏥 AI-Driven Public Health Chatbot for Disease Awareness

**An intelligent multilingual healthcare chatbot accessible via WhatsApp, SMS, and Web Interface**

**🏆 Developed by Team Matrix Mavericks 🏆**

*Parth Ajmera • Yashvardhan Dobhal • Aashu Joshi • Anshika Bijalwan*

**B.Tech Computer Science, Doon University, Dehradun**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Team](#-team)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Team](#-team)

---

## 🎯 Overview

**Matrix Mavericks Healthcare Chatbot** is an AI-powered health assistant designed to provide accessible healthcare information to users across India through multiple channels. The chatbot leverages Google's Gemini AI to deliver accurate, multilingual health guidance while maintaining user privacy and data security.

**Developed by**: Team Matrix Mavericks
- **Parth Ajmera** - 
- **Yashvardhan Dobhal** - 
- **Aashu Joshi** - 
- **Anshika Bijalwan** - 

**Institution**: B.Tech Computer Science, Doon University, Dehradun

### 🌟 Key Highlights

- ✅ **24/7 Availability**: Round-the-clock health guidance
- ✅ **Multilingual Support**: 13+ Indian languages including Hinglish
- ✅ **Multi-Channel Access**: WhatsApp, SMS, and Web Interface
- ✅ **AI-Powered**: Google Gemini 2.0 Flash for intelligent responses
- ✅ **Session Management**: Maintains conversation context

---

## ✨ Features

### 🤖 AI Intelligence
- **Symptom Analysis**: Describes symptoms and gets AI-powered insights
- **Health Recommendations**: General wellness and preventive care advice
- **Emergency Detection**: Recognizes urgent medical situations
- **Disclaimer Compliance**: Always includes medical disclaimer

### 🌍 Multilingual Support
Supports **13+ languages**:
- English, Hindi (हिंदी), Marathi (मराठी)
- Bengali (বাংলা), Gujarati (ગુજરાતી), Telugu (తెలుగు)
- Tamil (தமிழ்), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം)
- Odia (ଓଡ଼ିଆ), Punjabi (ਪੰਜਾਬੀ), Urdu (اردو)
- Hinglish (Hindi + English)

### 📱 Multiple Access Channels

#### 1. WhatsApp Bot
- Send messages to: **+91 7017067297**
- Instant responses via WaSender API
- Rich media support (text, images)
- Group chat compatibility

#### 2. SMS Bot
- Send SMS to: **+91 7895032847**
- Text-based responses (160 char limit)
- No internet required
- Works on any mobile phone

#### 3. Web Interface
- Modern, responsive UI
- Real-time chat
- Image upload support
- Conversation history

---

## 🛠 Tech Stack

### Backend
- **Framework**: Flask 3.0.0
- **AI Model**: Google Gemini 2.0 Flash
- **Language**: Python 3.9+
- **API Integration**: WaSender API, Fast2SMS API

### Frontend
- **Framework**: React 19.0+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

### Infrastructure
- **Tunneling**: Ngrok
- **Deployment**: Railway / Render / AWS
- **Database**: In-memory session storage

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Inputs                          │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────────┐  │
│  │ WhatsApp │    │   SMS    │    │   Web Interface      │  │
│  └─────┬────┘    └─────┬────┘    └──────────┬───────────┘  │
└────────┼───────────────┼────────────────────┼───────────────┘
         │               │                    │
         └───────────────┴────────────────────┘
                         │
         ┌───────────────▼────────────────┐
         │      Ngrok Tunnel              │
         │  (Public HTTPS endpoint)       │
         └───────────────┬────────────────┘
                         │
         ┌───────────────▼────────────────┐
         │      Flask Backend             │
         │  ┌──────────────────────────┐  │
         │  │  Webhook Handlers        │  │
         │  │  - /webhook/whatsapp     │  │
         │  │  - /webhook/sms          │  │
         │  │  - /api/chat             │  │
         │  └──────────┬───────────────┘  │
         │             │                   │
         │  ┌──────────▼───────────────┐  │
         │  │  Session Management      │  │
         │  │  - Language tracking     │  │
         │  │  - Chat history          │  │
         │  └──────────┬───────────────┘  │
         └─────────────┼───────────────────┘
                       │
         ┌─────────────▼────────────────┐
         │   Google Gemini AI           │
         │   - Natural language proc.   │
         │   - Health query analysis    │
         │   - Multilingual responses   │
         └─────────────┬────────────────┘
                       │
         ┌─────────────▼────────────────┐
         │  Response Delivery           │
         │  ┌────────┐  ┌────────────┐  │
         │  │WaSender│  │  Fast2SMS  │  │
         │  │  API   │  │    API     │  │
         │  └────────┘  └────────────┘  │
         └──────────────────────────────┘
```

---

## 📥 Installation

### Prerequisites

- **Python**: 3.9 or higher
- **Node.js**: 16.0 or higher (for frontend)
- **Ngrok Account**: For public URL tunneling
- **API Keys**: WaSender, Fast2SMS, Google Gemini

### Step 1: Clone Repository
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Create `requirements.txt`:**
```txt
Flask==3.0.0
flask-cors==4.0.0
google-generativeai==0.3.2
requests==2.31.0
```

### Step 3: Frontend Setup (Optional)

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Build for production
npm run build
```

---

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in the `backend` folder:

```env
# API Keys
GEMINI_API_KEY=your_gemini_api_key_here
WASENDER_API_KEY=your_wasender_api_key_here
SMS_API_KEY=your_fast2sms_api_key_here

# Phone Numbers
WHATSAPP_NUMBER= +91 701706xxxx
SMS_NUMBER=  +91 789503xxxx

# Ngrok Configuration
NGROK_DOMAIN=sheiklike-magnus-cheliferous.ngrok-free.dev
NGROK_AUTHTOKEN=your_ngrok_token_here

# Team Information
TEAM_NAME=Matrix Mavericks
```

### 2. API Key Setup

#### Get Google Gemini API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Create new API key
3. Copy and add to `.env`

#### Get WaSender API Key
1. Visit: https://www.wasenderapi.com
2. Sign up and verify account
3. Navigate to API section
4. Copy API key

#### Get Fast2SMS API Key
1. Visit: https://www.fast2sms.com
2. Sign up and complete KYC
3. Go to Dev API section
4. Copy authorization key
5. **Note**: Add ₹100 credit to activate API

#### Get Ngrok Auth Token
1. Visit: https://dashboard.ngrok.com
2. Sign up for free account
3. Copy authtoken from dashboard
4. Reserve domain: `sheiklike-magnus-cheliferous.ngrok-free.dev`

### 3. Configure Webhooks

#### WaSender Webhook
1. Login to WaSender dashboard
2. Go to Settings → Webhooks
3. Add webhook URL: `https://sheiklike-magnus-cheliferous.ngrok-free.dev/webhook/whatsapp`
4. Select events: "Message Received"
5. Save configuration

#### Fast2SMS Webhook (if supported)
1. Login to Fast2SMS dashboard
2. Navigate to API settings
3. Add webhook URL: `https://sheiklike-magnus-cheliferous.ngrok-free.dev/webhook/sms`

---

## 🚀 Running the Application

### Method 1: Development Mode

#### Terminal 1: Start Backend

```bash
cd backend
python backend\app.py
```

**Expected Output:**
```
======================================================================
🏥 MATRIX MAVERICKS - HEALTHCARE CHATBOT BACKEND
======================================================================

👥 Team: Parth Ajmera, Yashvardhan Dobhal, Aashu Joshi, Anshika Bijalwan

📱 WhatsApp Number: +91701706xxxx
📱 SMS Number: +91789503xxxx
🌐 Ngrok Domain: sheiklike-magnus-cheliferous.ngrok-free.dev

🚀 Local Server: http://localhost:5000
📊 Health Check: http://localhost:5000/api/health

✅ Backend running successfully!
```

#### Terminal 2: Start Ngrok Tunnel

```bash
ngrok http 5000 --domain=sheiklike-magnus-cheliferous.ngrok-free.dev
```

**Expected Output:**
```
Session Status                online
Account                       Your Account
Region                        India (in)
Forwarding                    https://sheiklike-magnus-cheliferous.ngrok-free.dev -> http://localhost:5000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

#### Terminal 3: Start Frontend (Optional)

```bash
cd frontend
npm run dev
```

### Method 2: Production Deployment

See [Deployment](#-deployment) section below.

---

## 📚 API Documentation

### Base URL
```
Local: http://localhost:5000
Public: https://sheiklike-magnus-cheliferous.ngrok-free.dev
```

### Endpoints

#### 1. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-31T07:18:19.190470",
  "services": {
    "gemini": "✅ Connected",
    "whatsapp": "✅ WaSender API configured",
    "sms": "✅ Fast2SMS configured"
  },
  "active_sessions": 0
}
```

#### 2. Web Chat API
```http
POST /api/chat
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": "user-123",
  "message": "I have fever and headache",
  "language": "en"
}
```

**Response:**
```json
{
  "response": "Based on your symptoms of fever and headache...",
  "language": "en",
  "timestamp": "2025-10-31T07:18:32.000000"
}
```

#### 3. Language Detection
```http
POST /api/detect-language
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "मुझे बुखार है"
}
```

**Response:**
```json
{
  "language": "hi"
}
```

#### 4. WhatsApp Webhook
```http
POST /webhook/whatsapp
Content-Type: application/json
```

**Triggered by WaSender when messages are received**

#### 5. SMS Webhook
```http
POST /webhook/sms
Content-Type: application/json
```

**Triggered by Fast2SMS when SMS is received**

#### 6. Test WhatsApp Sending
```http
POST /test/whatsapp
Content-Type: application/json
```

**Request Body:**
```json
{
  "phone": "917017067297",
  "message": "Test message"
}
```

#### 7. Test SMS Sending
```http
POST /test/sms
Content-Type: application/json
```

**Request Body:**
```json
{
  "phone": "917895032847",
  "message": "Test SMS"
}
```

---

## 🧪 Testing

### Automated Testing

```bash
# Run all tests
cd backend
python test_api.py
```

**Test Coverage:**
- ✅ Backend health check
- ✅ WhatsApp message sending
- ✅ SMS message sending
- ✅ Web chat API
- ✅ WhatsApp webhook simulation
- ✅ SMS webhook simulation

### Manual Testing

#### Test WhatsApp Bot
1. Open WhatsApp
2. Send message to: **+91 7017067297**
3. Type: `Hello`
4. Select language from menu
5. Start asking health questions

#### Test SMS Bot
1. Open SMS app
2. Send SMS to: **+91 7895032847**
3. Type: `Hello`
4. Select language (reply with number)
5. Ask health questions

#### Test Web Interface
1. Open browser: `http://localhost:5173`
2. Accept disclaimer
3. Type initial message
4. Confirm language or select manually
5. Start chatting

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend Not Starting

**Error**: `ModuleNotFoundError: No module named 'flask'`

**Solution**:
```bash
pip install -r requirements.txt
```

#### 2. Port Already in Use

**Error**: `Address already in use`

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

#### 3. WhatsApp Not Sending

**Check**:
- WaSender API key is correct
- Webhook URL is configured
- Rate limits (1 msg/min on free tier)

**Solution**:
- Verify API key in dashboard
- Wait 1 minute between messages
- Upgrade to paid plan

#### 4. SMS Not Sending

**Error**: `"You need to complete one transaction of 100 INR or more"`

**Solution**:
- Add ₹100 credit to Fast2SMS account
- Wait for activation (5-10 minutes)

#### 5. Ngrok Tunnel Not Working

**Error**: `ERR_NGROK_3200: Tunnel not found`

**Solution**:
```bash
# Re-authenticate
ngrok config add-authtoken YOUR_TOKEN

# Start with domain
ngrok http 5000 --domain=sheiklike-magnus-cheliferous.ngrok-free.dev
```

#### 6. CORS Errors

**Error**: `Access to fetch has been blocked by CORS policy`

**Solution**: Backend already has CORS enabled. If issues persist:
```python
# In app.py, update CORS config:
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "https://your-domain.com"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})
```

---

## 📊 Project Structure

```
healthcare-chatbot/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── test_api.py           # API testing script
│   ├── test_sms_only.py      # SMS-specific tests
│   └── .env                   # Environment variables (create this)
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Main React component
│   │   ├── components/       # UI components
│   │   ├── services/         # API service layer
│   │   │   └── geminiService.ts
│   │   ├── types.ts          # TypeScript types
│   │   └── constants.ts      # App constants
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── docs/
│   └── API_DOCUMENTATION.md  # Detailed API docs
│
├── .gitignore
├── README.md                  # This file
└── LICENSE
```


## 👥 Team

### 🏆 Matrix Mavericks

**Team Members:**

<table>
  <tr>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Parth Ajmera"/><br />
      <sub><b>Parth Ajmera</b></sub><br />
      </td>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Yashvardhan Dobhal"/><br />
      <sub><b>Yashvardhan Dobhal</b></sub><br />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Aashu Joshi"/><br />
      <sub><b>Aashu Joshi</b></sub><br />
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Anshika Bijalwan"/><br />
      <sub><b>Anshika Bijalwan</b></sub><br />
    </td>
  </tr>
</table>

**Institution**: B.Tech Computer Science, Doon University, Dehradun

**Project Type**: Academic Research & Development Project 

---

### 🎓 About Matrix Mavericks

Matrix Mavericks is a student development team from Doon University, dedicated to creating innovative technology solutions for healthcare accessibility. This project represents our commitment to leveraging AI for social good and bridging the healthcare information gap in India.

**Our Mission**: To make quality healthcare information accessible to everyone, regardless of language barriers or technological constraints.

**Our Vision**: To become a leading force in healthcare technology innovation, creating solutions that positively impact millions of lives.

---

## 📞 Contact

**Team Matrix Mavericks**

- **Project Lead**: Parth Ajmera
- **Institution**: Doon University, Dehradun, Uttarakhand, India
- **GitHub**: 

**Team Members:**
- Parth Ajmera 
- Yashvardhan Dobhal
- Aashu Joshi
- Anshika Bijalwan

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language model
- **WaSender** for WhatsApp API integration
- **Fast2SMS** for SMS gateway services
- **Ngrok** for secure tunneling
- **Flask** and **React** communities

---

## 📈 Future Enhancements

- [ ] Voice message support
- [ ] Image-based symptom analysis
- [ ] Integration with healthcare providers
- [ ] Appointment booking system
- [ ] Medicine reminder feature
- [ ] Health records management
- [ ] Emergency services integration
- [ ] Telemedicine video calls

---

## ⚠️ Disclaimer

**IMPORTANT**: This chatbot is an **educational project** and provides **general health information only**. It is **NOT** a substitute for professional medical advice, diagnosis, or treatment.

**Always seek the advice of your physician or other qualified health provider** with any questions you may have regarding a medical condition.

**Never disregard professional medical advice** or delay in seeking it because of something you have read from this chatbot.

**In case of emergency**, call your local emergency services immediately.

---

<div align="center">

**Made with ❤️ by Team Matrix Mavericks**

*Parth Ajmera • Yashvardhan Dobhal • Aashu Joshi • Anshika Bijalwan*

**B.Tech Computer Science, Doon University, Dehradun**


---

© 2024 Matrix Mavericks. All Rights Reserved.

</div>