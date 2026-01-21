# WorkMail iPhone Setup - Step by Step

## ⚠️ Important: Wait 5-10 Minutes After Password Reset

The IMAP server may take a few minutes to sync after a password reset. If you get "Server not responding", wait 5-10 minutes and try again.

---

## 📱 iPhone Setup (iOS Mail App)

### Step 1: Add Account
1. Open **Settings** → **Mail** → **Accounts**
2. Tap **Add Account**
3. Select **Other** (at the bottom)
4. Tap **Add Mail Account**

### Step 2: Enter Your Information
```
Name: Barter Dev
Email: hello@barter-dev.com
Password: Barter2026SecurePass!
Description: Barter Dev Work Email
```
Tap **Next**

### Step 3: Select IMAP
- Make sure **IMAP** is selected (not POP)

### Step 4: Incoming Mail Server (IMAP)
```
Host Name: imap.mail.us-east-1.awsapps.com
User Name: hello@barter-dev.com
Password: Barter2026SecurePass!
```

### Step 5: Outgoing Mail Server (SMTP)
```
Host Name: smtp.mail.us-east-1.awsapps.com
User Name: hello@barter-dev.com
Password: Barter2026SecurePass!
```

### Step 6: Tap Next
- It will verify the settings
- If you see "Cannot Verify Server Identity" - tap **Continue** or **Trust**
- This is normal for WorkMail

### Step 7: Choose What to Sync
- Enable **Mail**, **Notes** (optional)
- Tap **Save**

---

## ⚠️ Troubleshooting

### "Cannot Connect to Server" or "Server Not Responding"

**Try these in order:**

1. **Wait 5-10 minutes** after password reset (most common fix)
   - WorkMail needs time to sync credentials
   - Go have a coffee, come back and try again

2. **Check your credentials exactly:**
   - Email: `hello@barter-dev.com` (lowercase)
   - Password: `Barter2026SecurePass!` (exact case)
   - No spaces before/after

3. **Try web access first:**
   - Go to: https://barter-dev.awsapps.com/mail
   - Login with same credentials
   - If this works, IMAP should work in 5-10 min

4. **Check DNS propagation:**
   ```bash
   nslookup -type=mx barter-dev.com 8.8.8.8
   ```
   Should show: `10 inbound-smtp.us-east-1.awsapps.com`

5. **Manual port configuration:**
   - After entering servers, tap on the server name
   - Make sure:
     - IMAP: Port **993**, SSL **ON**
     - SMTP: Port **465**, SSL **ON**

6. **Restart your iPhone:**
   - Sometimes iOS Mail app needs a restart
   - Hold power button → Slide to power off
   - Wait 30 seconds, turn back on

---

## 📧 Alternative: Outlook App

If iOS Mail still doesn't work, try Microsoft Outlook app:

1. **Download Outlook** from App Store
2. Open Outlook → **Add Account**
3. Enter: `hello@barter-dev.com`
4. Select **IMAP**
5. Enter password: `Barter2026SecurePass!`
6. Should auto-configure!

---

## 🔍 Verify Setup

Once configured, try:
1. Send test email to yourself
2. Check if you receive it
3. Reply to confirm sending works

---

## 📞 Current Settings Summary

| Setting | Value |
|---------|-------|
| **Email** | hello@barter-dev.com |
| **Password** | Barter2026SecurePass! |
| **IMAP Server** | imap.mail.us-east-1.awsapps.com |
| **IMAP Port** | 993 (SSL/TLS) |
| **SMTP Server** | smtp.mail.us-east-1.awsapps.com |
| **SMTP Port** | 465 (SSL/TLS) |
| **Username** | hello@barter-dev.com (full email) |

---

## ⏰ Timeline

- **Just reset password?** Wait 5-10 minutes
- **DNS just updated?** Wait up to 30 minutes
- **Still not working?** Check web access first

---

**Most Common Issue:** Not waiting after password reset. Give it 5-10 minutes! ⏰

