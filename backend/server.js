'use strict';

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ─── Middleware ─────────────────────────────────────────────── */
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['POST', 'GET', 'OPTIONS'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ─── Nodemailer transporter ─────────────────────────────────── */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,   // Gmail App Password (NOT regular password)
  },
});

/* ─── Helper: basic input sanitisation ───────────────────────── */
function sanitise(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen);
}

/* ─── Health check ───────────────────────────────────────────── */
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Portfolio backend is running.' });
});

/* ─── POST /api/contact ──────────────────────────────────────── */
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  /* -- Validate required fields -------------------------------- */
  if (!firstName || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: firstName, email, subject, message.',
    });
  }

  /* -- Basic email format check -------------------------------- */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }

  /* -- Sanitise ------------------------------------------------ */
  const safe = {
    firstName : sanitise(firstName,  60),
    lastName  : sanitise(lastName,   60),
    email     : sanitise(email,     100),
    subject   : sanitise(subject,   120),
    message   : sanitise(message,  2000),
  };

  const fullName    = safe.lastName ? `${safe.firstName} ${safe.lastName}` : safe.firstName;
  const receivedAt  = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });

  /* -- Build the email ----------------------------------------- */
  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background:#0f172a; color:#e2e8f0; margin:0; padding:0; }
    .wrapper { max-width:600px; margin:0 auto; background:#1e293b; border-radius:12px; overflow:hidden; }
    .header { background:linear-gradient(135deg,#3b82f6,#6366f1); padding:32px 32px 24px; }
    .header h1 { margin:0; font-size:22px; color:#fff; }
    .header p  { margin:6px 0 0; font-size:14px; color:rgba(255,255,255,.75); }
    .body { padding:32px; }
    .field { margin-bottom:20px; }
    .label { font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:#94a3b8; margin-bottom:4px; }
    .value { font-size:15px; color:#f1f5f9; line-height:1.6; background:#0f172a;
             padding:10px 14px; border-radius:8px; border-left:3px solid #3b82f6; }
    .message-value { white-space:pre-wrap; }
    .footer { padding:16px 32px; background:#0f172a; font-size:12px; color:#64748b; text-align:center; }
    a { color:#3b82f6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>📬 New Contact Form Submission</h1>
      <p>Received via your portfolio website · ${receivedAt} (NPT)</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${fullName} &lt;<a href="mailto:${safe.email}" style="color:#3b82f6">${safe.email}</a>&gt;</div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${safe.subject}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="value message-value">${safe.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>
    </div>
    <div class="footer">
      Reply directly to <a href="mailto:${safe.email}">${safe.email}</a> to respond to ${safe.firstName}.
    </div>
  </div>
</body>
</html>`;

  const mailOptions = {
    from    : `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
    to      : process.env.RECIPIENT_EMAIL || 'nirajankarki5432@gmail.com',
    replyTo : safe.email,
    subject : `[Portfolio] ${safe.subject}`,
    text    : `New message from ${fullName} <${safe.email}>\n\nSubject: ${safe.subject}\n\nMessage:\n${safe.message}\n\nReceived: ${receivedAt} (NPT)`,
    html    : htmlBody,
  };

  /* -- Send ---------------------------------------------------- */
  try {
    await transporter.sendMail(mailOptions);
    console.log(`[${new Date().toISOString()}] Email sent from: ${safe.email}`);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Email error:`, err.message);
    return res.status(500).json({
      success: false,
      error  : 'Failed to send email. Please try again or contact me directly.',
    });
  }
});

/* ─── 404 catch-all ──────────────────────────────────────────── */
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

/* ─── Start server ───────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\n✅ Portfolio backend running on http://localhost:${PORT}`);
  console.log(`   POST /api/contact  →  sends email to ${process.env.RECIPIENT_EMAIL || 'nirajankarki5432@gmail.com'}\n`);
});
