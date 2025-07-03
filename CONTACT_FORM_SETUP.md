# 📧 Contact Form Setup Guide

Your contact form is ready to collect: **Full Name**, **Email**, **Subject**, and **Message**. Here are 3 ways to receive these submissions via email:

## 🚀 Option 1: Formspree (Recommended - Free & Easy)

### Step 1: Sign up for Formspree
1. Go to [formspree.io](https://formspree.io)
2. Create a free account
3. Click "New Form"
4. Enter your email address (where you want to receive submissions)
5. Copy your unique form endpoint URL

### Step 2: Update your form
Replace `YOUR_FORM_ID` in your HTML with your actual Formspree ID:

```html
<form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_ACTUAL_ID" method="POST">
```

### Step 3: Test it!
- Fill out your form and submit
- Check your email for the submission
- Formspree will send you a confirmation email first

**✅ Benefits:**
- No coding required
- Free tier: 50 submissions/month
- Spam protection included
- Works immediately

---

## 🔧 Option 2: EmailJS (Frontend Only)

### Step 1: Setup EmailJS
1. Go to [emailjs.com](https://emailjs.com)
2. Create account and get your keys:
   - User ID
   - Service ID  
   - Template ID

### Step 2: Add EmailJS script
Add this to your HTML `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
```

### Step 3: Update JavaScript
I can help you modify your `js/main.js` to use EmailJS.

**✅ Benefits:**
- No backend required
- Free tier: 200 emails/month
- Real-time sending
- Customizable email templates

---

## 🛠️ Option 3: Backend Solution (Advanced)

### Using Node.js + Nodemailer
If you want full control, you'll need:

1. **Backend server** (Node.js/Express)
2. **Email service** (Gmail, SendGrid, etc.)
3. **Hosting** (Netlify Functions, Vercel, Railway)

This requires more setup but gives you complete control.

---

## 📝 Current Form Data Structure

Your form will send:
```json
{
  "name": "User's full name",
  "email": "user@example.com", 
  "subject": "Form subject",
  "message": "User's message content"
}
```

---

## 🎯 Quick Start (Recommended)

**For immediate setup, use Formspree:**

1. Visit [formspree.io](https://formspree.io)
2. Sign up with your email
3. Create new form
4. Replace `YOUR_FORM_ID` in your HTML
5. Test the form

**Need help with any of these options?** Let me know which one you'd prefer and I'll provide detailed implementation steps! 