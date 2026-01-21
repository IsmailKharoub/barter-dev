# WorkMail Mobile Setup Guide

## 📱 Add hello@barter-dev.com to Your Phone

### iPhone (iOS Mail App)

1. **Open Settings** → **Mail** → **Accounts** → **Add Account**
2. Select **Other** → **Add Mail Account**
3. Enter your information:
   - **Name**: Barter Dev
   - **Email**: hello@barter-dev.com
   - **Password**: Your WorkMail password
   - **Description**: Barter Dev

4. Tap **Next**, select **IMAP**, and enter:

**Incoming Mail Server (IMAP):**
- **Host Name**: `imap.mail.us-east-1.awsapps.com`
- **User Name**: `hello@barter-dev.com`
- **Password**: Your WorkMail password

**Outgoing Mail Server (SMTP):**
- **Host Name**: `smtp.mail.us-east-1.awsapps.com`
- **User Name**: `hello@barter-dev.com`
- **Password**: Your WorkMail password

5. Tap **Next** → **Save**

---

### Android (Gmail App)

1. **Open Gmail app** → **Menu** (☰) → **Settings**
2. Tap **Add account** → **Other**
3. Enter: **hello@barter-dev.com**
4. Select **Personal (IMAP)**
5. Enter your WorkMail password

6. **Incoming server settings:**
   - **Server**: `imap.mail.us-east-1.awsapps.com`
   - **Port**: 993
   - **Security type**: SSL/TLS
   - **Username**: `hello@barter-dev.com`

7. **Outgoing server settings:**
   - **SMTP server**: `smtp.mail.us-east-1.awsapps.com`
   - **Port**: 465
   - **Security type**: SSL/TLS
   - **Username**: `hello@barter-dev.com`

8. Tap **Next** → Configure account options → **Done**

---

### Outlook App (iOS/Android)

1. **Download Outlook app** from App Store/Play Store
2. Open app → **Add Account**
3. Enter: **hello@barter-dev.com**
4. Tap **Continue** → **IMAP**
5. Enter:
   - **IMAP Hostname**: `imap.mail.us-east-1.awsapps.com`
   - **SMTP Hostname**: `smtp.mail.us-east-1.awsapps.com`
   - **Username**: `hello@barter-dev.com`
   - **Password**: Your WorkMail password
6. **Sign in**

---

## 🔐 Reset Your Password

If you don't know your WorkMail password, I can reset it:

```bash
aws workmail reset-password \
  --organization-id m-087e18431adb4310bf475aa6ed77339f \
  --user-id 76f10bc1-7875-4f5e-b4f8-a31808b8109e \
  --password "YourNewPassword123!"
```

Replace `YourNewPassword123!` with a strong password.

**Or tell me and I'll run it for you!**

---

## 🌐 Web Access (No Setup Needed)

**URL**: https://echo-journal.awsapps.com/mail

**Login:**
- Email: `hello@barter-dev.com`
- Password: Your WorkMail password

---

## ⚙️ Full Server Settings

| Setting | Value |
|---------|-------|
| **Email** | hello@barter-dev.com |
| **Account Type** | IMAP |
| **IMAP Server** | imap.mail.us-east-1.awsapps.com |
| **IMAP Port** | 993 |
| **IMAP Security** | SSL/TLS |
| **SMTP Server** | smtp.mail.us-east-1.awsapps.com |
| **SMTP Port** | 465 |
| **SMTP Security** | SSL/TLS |
| **Username** | hello@barter-dev.com |
| **Password** | Your WorkMail password |

---

## 🔔 Push Notifications

**iOS**: Native Mail app supports push via IMAP IDLE  
**Android**: Gmail/Outlook apps support push notifications  
**Outlook App**: Full push support on both platforms

---

## ❓ Troubleshooting

### "Cannot Verify Server Identity"
- This is normal for WorkMail
- Tap **Continue** or **Trust**

### "Username or Password Incorrect"
- Double-check email: `hello@barter-dev.com`
- Reset password (see above)
- Make sure you're using the WorkMail password, not AWS password

### "Cannot Connect to Server"
- Check internet connection
- Verify server addresses are correct
- Try web access first to confirm password works

---

**Need help? Let me know which phone you have and I'll guide you through it!**

