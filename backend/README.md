# Portfolio Backend — Contact Form Email Server

Node.js/Express backend that receives contact form submissions and emails them to `nirajankarki5432@gmail.com` using Gmail + Nodemailer.

---

## 🚀 Quick Setup

### 1. Install dependencies
```powershell
cd backend
npm install
```

### 2. Create your `.env` file
```powershell
copy .env.example .env
```
Then open `.env` and fill in your **Gmail App Password**:
```env
GMAIL_USER=nirajankarki5432@gmail.com
GMAIL_PASS=xxxx xxxx xxxx xxxx   ← paste your 16-char app password here
PORT=3000
RECIPIENT_EMAIL=nirajankarki5432@gmail.com
ALLOWED_ORIGIN=*
```

### 3. Get a Gmail App Password
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (required)
3. Search **"App Passwords"** → create one → pick **Mail** + **Windows Computer**
4. Copy the 16-character password into `.env` as `GMAIL_PASS`

### 4. Start the server
```powershell
npm start
```
You should see:
```
✅ Portfolio backend running on http://localhost:3000
   POST /api/contact  →  sends email to nirajankarki5432@gmail.com
```

### 5. Test with curl (optional)
```powershell
curl -X POST http://localhost:3000/api/contact `
  -H "Content-Type: application/json" `
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","subject":"Hello","message":"This is a test."}'
```
Expected: `{"success":true,"message":"Email sent successfully!"}`

---

## 📡 API Reference

### `POST /api/contact`

**Request body (JSON):**
| Field | Required | Max Length |
|-------|----------|------------|
| `firstName` | ✅ | 60 chars |
| `lastName` | ➖ | 60 chars |
| `email` | ✅ | 100 chars |
| `subject` | ✅ | 120 chars |
| `message` | ✅ | 2000 chars |

**Success response:**
```json
{ "success": true, "message": "Email sent successfully!" }
```

**Error response:**
```json
{ "success": false, "error": "Description of the error" }
```

---

## ☁️ Deploying to the Cloud

### Option A — Railway (easiest, free tier)
1. Push this `backend/` folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add your environment variables in the Railway dashboard
4. Copy the generated URL (e.g. `https://your-app.up.railway.app`)
5. Update `BACKEND_URL` in `js/components.js` to that URL

### Option B — Render (free tier)
1. Push to GitHub → [render.com](https://render.com) → New Web Service
2. Build command: `npm install` — Start command: `npm start`
3. Add env vars, copy URL, update `BACKEND_URL` in `components.js`

### Option C — Your own VPS / Linux server
```bash
# On your server
git clone <repo>
cd backend && npm install
# Create .env with your values
# Use PM2 to keep it running
npm install -g pm2
pm2 start server.js --name portfolio-backend
pm2 save && pm2 startup
```

---

> **Frontend note:** After deploying, open `js/components.js` and change:
> ```js
> const BACKEND_URL = 'http://localhost:3000';
> // to:
> const BACKEND_URL = 'https://your-deployed-backend-url.com';
> ```
