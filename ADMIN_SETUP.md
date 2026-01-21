# Admin Panel Quick Setup Guide

## 1. Install Dependencies

The admin panel requires authentication libraries:

```bash
npm install jose @otplib/preset-default qrcode
npm install --save-dev @types/qrcode
```

## 2. Generate TOTP Secret

**Option A: Use Setup Page (Recommended)**

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit the setup page:
   ```
   http://localhost:3000/api/admin/setup
   ```

3. Follow the on-screen instructions to:
   - See your QR code
   - Get your secret key
   - Set up your authenticator app

**Option B: Generate Manually**

Generate a random TOTP secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 3. Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Admin Authentication (TOTP - Time-based One-Time Password)
ADMIN_TOTP_SECRET=your_base64_totp_secret_from_setup
ADMIN_JWT_SECRET=your_random_32_char_secret_key_here

# MongoDB (if not already configured)
MONGODB_URI=your_mongodb_connection_string

# Site URL (if not already configured)
NEXT_PUBLIC_SITE_URL=https://barter-dev.com
```

### Generate Secure Credentials

**For ADMIN_TOTP_SECRET:**
- Use the secret from `/api/admin/setup` page
- Or generate manually with the command above
- Keep this secret secure - it's your master key

**For ADMIN_JWT_SECRET:**
- Generate a random 32+ character string
- You can use this command:
  ```bash
  openssl rand -base64 32
  ```
- Or use an online generator

## 3. Access the Admin Panel

### Development
```
http://localhost:3000/admin
```

### Production
```
https://barter-dev.com/admin
```

## 4. Set Up Authenticator App

1. Install an authenticator app on your phone:
   - Google Authenticator
   - Authy
   - Microsoft Authenticator
   - 1Password

2. Scan the QR code from the setup page (or enter secret manually)

3. Your app will show a 6-digit code that changes every 30 seconds

## 5. First Login

1. Navigate to the admin login page
2. Enter the 6-digit code from your authenticator app
3. You'll be redirected to the dashboard

## Features Overview

### Dashboard (`/admin`)
- View all application submissions
- Filter by status (All, Pending, Reviewing, Accepted, Rejected)
- Search by name, email, or project type
- See real-time statistics

### Application Details (`/admin/applications/[id]`)
- View complete application information
- Update application status
- Add internal notes
- Track communication history

## Application Status Flow

```
Pending → Reviewing → Accepted/Rejected
```

- **Pending**: New submissions awaiting review
- **Reviewing**: Applications currently being evaluated
- **Accepted**: Applications approved for trade
- **Rejected**: Applications declined

## Common Tasks

### Review a New Application
1. Go to dashboard
2. Click on a pending application
3. Review all details
4. Update status to "Reviewing"
5. Add notes about your evaluation

### Accept an Application
1. Open the application detail page
2. Select "Accepted" status
3. Add a note with next steps
4. Click "Save Changes"
5. Contact the applicant via email

### Add Notes
1. Open any application
2. Scroll to the "Add Note" section in the sidebar
3. Type your note
4. Click "Save Changes"
5. Note will appear in the notes history

## Security Best Practices

1. **Never share your admin password**
2. **Use HTTPS in production** (already configured)
3. **Change default password immediately**
4. **Use a unique JWT secret**
5. **Keep credentials out of version control**
6. **Log out when done** (especially on shared computers)

## Troubleshooting

### "Unauthorized" Error
- Your session may have expired (7-day limit)
- Log out and log back in
- Verify ADMIN_PASSWORD in .env.local

### Applications Not Loading
- Check MongoDB connection (MONGODB_URI)
- Verify database has "applications" collection
- Check browser console for errors

### Can't Save Changes
- Ensure you're logged in
- Check network tab for API errors
- Verify MongoDB write permissions

## API Endpoints (for reference)

All admin endpoints require authentication:

```
POST   /api/admin/login              - Login
POST   /api/admin/logout             - Logout
GET    /api/admin/applications       - List applications
GET    /api/admin/applications/:id   - Get single application
PATCH  /api/admin/applications/:id   - Update application
```

## Database Indexes

The system automatically creates these indexes for performance:
- `email + createdAt` (for rate limiting)
- `status + createdAt` (for filtering)
- `createdAt` (for sorting)

## Next Steps

After setup:
1. Test login with your credentials
2. Explore the dashboard
3. Review any existing applications
4. Set up your workflow for handling new submissions
5. Consider setting up email notifications (see main docs)

## Support

For issues or questions:
- Check the full documentation in `/docs/admin-panel.md`
- Review application logs for errors
- Verify all environment variables are set correctly

---

**Important**: Keep your `.env.local` file secure and never commit it to version control!

