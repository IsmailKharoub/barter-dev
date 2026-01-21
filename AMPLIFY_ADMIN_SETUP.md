# AWS Amplify Admin Panel Setup

## ✅ Environment Variables Added

I've successfully added the admin panel environment variables to your Amplify app using AWS CLI:

```bash
✅ ADMIN_TOTP_SECRET=RZUACII63W7Q6M2QWFWKYQTMOT7KNUDN
✅ ADMIN_JWT_SECRET=985a709ca924c01bdef29b18bb914b6001dc7acda87c989e6c68fd00c2ea5419
```

**App ID**: `d2c1w3ga1c6ojg`  
**Domain**: `d2c1w3ga1c6ojg.amplifyapp.com`

---

## 🔐 Set Up Your Authenticator App

### Option 1: Scan QR Code (Easiest)

1. Open your authenticator app (Google Authenticator, Authy, etc.)
2. Tap "Add account" or "+"
3. Scan this QR code:

**Visit this URL to see the QR code:**
```
https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=otpauth://totp/Barter%20Admin:barter-dev.com?secret=RZUACII63W7Q6M2QWFWKYQTMOT7KNUDN%26issuer=barter-dev.com
```

### Option 2: Manual Entry

If you can't scan the QR code:

1. Open your authenticator app
2. Choose "Enter a setup key" or "Manual entry"
3. Enter these details:
   - **Account name**: Barter Admin
   - **Your email/account**: barter-dev.com
   - **Key**: `RZUACII63W7Q6M2QWFWKYQTMOT7KNUDN`
   - **Time based**: Yes

---

## 📝 Next Steps

### 1. Push Your Code

```bash
git add .
git commit -m "Add admin panel with TOTP authentication and delete functionality"
git push origin main
```

### 2. Wait for Deployment

Amplify will automatically:
- Install dependencies (including new admin packages)
- Build your app with admin panel
- Deploy to production

### 3. Set Up Authenticator (First Time Only)

After deployment, visit your admin setup page:
```
https://barter-dev.com/api/admin/setup
```

**Note**: This page will show an error after TOTP is configured (for security). Use the info above to set up your authenticator app.

### 4. Login to Admin Panel

Once your authenticator is set up:

1. Go to: `https://barter-dev.com/admin`
2. You'll be redirected to: `https://barter-dev.com/admin/login`
3. Open your authenticator app
4. Enter the 6-digit code
5. You're in! 🎉

---

## 🔒 Security Notes

### Backup Your TOTP Secret

**IMPORTANT**: Save this secret securely!

```
ADMIN_TOTP_SECRET=RZUACII63W7Q6M2QWFWKYQTMOT7KNUDN
```

Store it in:
- ✅ Password manager (1Password, LastPass, etc.)
- ✅ Secure notes app
- ✅ Encrypted file

**DO NOT**:
- ❌ Share it publicly
- ❌ Commit it to git
- ❌ Send it in plain text

### If You Lose Access

If you lose your phone or can't access your authenticator:

1. You'll need the TOTP secret above
2. Set up a new device with the secret
3. Generate new codes from the new device

---

## 📊 What Was Deployed

### New Features
- ✅ TOTP authentication (Google Authenticator)
- ✅ Delete button for applications
- ✅ Setup page for QR codes
- ✅ Enhanced security

### Environment Variables in Amplify
```bash
ADMIN_TOTP_SECRET=RZUACII63W7Q6M2QWFWKYQTMOT7KNUDN
ADMIN_JWT_SECRET=985a709ca924c01bdef29b18bb914b6001dc7acda87c989e6c68fd00c2ea5419

# Your existing variables (already set):
MONGODB_URI=<your_mongodb_uri>
SLACK_WEBHOOK_URL=<your_slack_webhook>
NEXT_PUBLIC_SITE_URL=https://barter-dev.com
```

---

## 🧪 Testing After Deployment

### 1. Test Admin Login
```
https://barter-dev.com/admin
→ Should redirect to /admin/login
→ Enter 6-digit code from authenticator
→ Should login successfully
```

### 2. Test Dashboard
```
→ Should see all applications
→ Should see statistics
→ Filter and search should work
```

### 3. Test Application Detail
```
→ Click any application
→ Should see full details
→ Update status - should save
→ Add note - should appear in history
→ Delete button - should show confirmation
```

### 4. Test Delete
```
→ Click delete button
→ Confirm deletion
→ Application removed
→ Redirected to dashboard
```

---

## 🚨 Troubleshooting

### "Invalid authentication code"
- Make sure your phone's time is accurate (TOTP requires correct time)
- Wait for the next code (they change every 30 seconds)
- Check you scanned the right QR code

### "Setup page shows error"
- This is expected after TOTP is configured
- Use the QR code/secret from this document
- Or temporarily remove `ADMIN_TOTP_SECRET` from Amplify to regenerate

### Environment variables not working
- Check they're set in Amplify console
- Rebuild the app after setting variables
- Variables are case-sensitive

---

## 📱 Recommended Authenticator Apps

- **Google Authenticator** - Simple, reliable (iOS/Android)
- **Authy** - Backups, multi-device (iOS/Android/Desktop)
- **Microsoft Authenticator** - Good UI (iOS/Android)
- **1Password** - If you use 1Password already

---

## ✅ Deployment Checklist

- [x] Environment variables added to Amplify
- [x] Code ready to push
- [ ] Push code to GitHub
- [ ] Wait for Amplify build
- [ ] Set up authenticator app
- [ ] Test admin login
- [ ] Test all admin features
- [ ] Backup TOTP secret securely

---

## 🎉 You're Ready!

Now push your code and you'll have a fully secure admin panel with:
- 🔐 TOTP authentication (industry standard)
- 📊 Dashboard with statistics
- 🔍 Search and filters
- ✏️ Status management
- 📝 Internal notes
- 🗑️ Delete functionality
- 📱 Responsive design

**Push command:**
```bash
git push origin main
```

Then watch your Amplify build and test the admin panel!

---

**Generated**: January 21, 2026  
**App ID**: d2c1w3ga1c6ojg  
**Domain**: barter-dev.com

