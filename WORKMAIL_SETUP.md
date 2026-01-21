# AWS WorkMail Setup for Barter Dev

## ✅ Email Account Created

**Email**: `hello@barter-dev.com`  
**Organization**: echo-journal (m-087e18431adb4310bf475aa6ed77339f)  
**Status**: ✅ Active and Enabled

## 📧 Access Your Email

### Web Access
```
https://echo-journal.awsapps.com/mail
```

**Login Credentials:**
- **Email**: `hello@barter-dev.com`
- **Password**: I've reset it - check your AWS WorkMail admin panel or reset it yourself

### Reset Password (If Needed)
```bash
aws workmail reset-password \
  --organization-id m-087e18431adb4310bf475aa6ed77339f \
  --user-id 76f10bc1-7875-4f5e-b4f8-a31808b8109e \
  --password "YourNewPassword123!"
```

## 🔧 Email Configuration in Amplify

I've added these environment variables to your Amplify app:

```bash
FROM_EMAIL=hello@barter-dev.com
NOTIFICATION_EMAIL=hello@barter-dev.com
```

## ⚠️ Important: Switch from Resend to AWS SES

Your code currently uses **Resend** for sending emails, but you don't have a Resend API key configured. 

**You have 2 options:**

### Option 1: Use AWS SES (Recommended - Free & Already Set Up)
Since you already have AWS SES enabled and barter-dev.com verified, I can update your code to use AWS SES instead of Resend. This is free for the first 62,000 emails per month.

Would you like me to update the code to use AWS SES?

### Option 2: Use Resend
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to Amplify:
```bash
aws amplify update-app --app-id d2c1w3ga1c6ojg \
  --environment-variables \
  ADMIN_TOTP_SECRET="RZUACII63W7Q6M2QWFWKYQTMOT7KNUDN",\
  ADMIN_JWT_SECRET="985a709ca924c01bdef29b18bb914b6001dc7acda87c989e6c68fd00c2ea5419",\
  FROM_EMAIL="hello@barter-dev.com",\
  NOTIFICATION_EMAIL="hello@barter-dev.com",\
  RESEND_API_KEY="re_your_key_here"
```

## 📱 Mobile Access

You can also set up the email on your phone:

**IMAP Settings:**
- Server: `imap.mail.us-east-1.awsapps.com`
- Port: 993
- Security: SSL/TLS
- Username: `hello@barter-dev.com`
- Password: Your WorkMail password

**SMTP Settings:**
- Server: `smtp.mail.us-east-1.awsapps.com`
- Port: 465
- Security: SSL/TLS
- Username: `hello@barter-dev.com`
- Password: Your WorkMail password

## 🎯 What Happens Now

Once you choose an email provider (AWS SES or Resend) and I update the code:

1. **New applications** will trigger email notifications to `hello@barter-dev.com`
2. **Applicants** will receive confirmation emails from `hello@barter-dev.com`
3. You can access all emails via the WorkMail web interface

## 📊 Current Status

- ✅ WorkMail account created and active
- ✅ Email environment variables added to Amplify
- ⏳ Waiting for you to choose email provider (AWS SES or Resend)
- ⏳ Code needs update to actually send emails

---

**Which email provider would you like to use?**
- AWS SES (free, already set up, I can update code now)
- Resend (requires API key, you need to sign up)

