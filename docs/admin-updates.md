# Admin Panel Updates - Enhanced Security & Features

## 🔒 Enhanced Security: TOTP Authentication

We've upgraded from password-based authentication to **Time-based One-Time Password (TOTP)** authentication using authenticator apps like Google Authenticator.

### Why TOTP is Better

| Feature | Old (Password) | New (TOTP) |
|---------|----------------|------------|
| **Security** | Static password can be stolen | Dynamic code changes every 30 seconds |
| **Phishing Protection** | Vulnerable | Protected (codes expire quickly) |
| **Brute Force** | Possible with time | Nearly impossible (codes change) |
| **Best Practice** | Basic | Industry standard (2FA) |

### How It Works

1. **Setup Phase** (one-time):
   - Generate TOTP secret
   - Scan QR code with authenticator app
   - App is now linked to your admin panel

2. **Login Phase** (every time):
   - Open authenticator app on your phone
   - View 6-digit code (changes every 30 seconds)
   - Enter code in login page
   - Get authenticated for 7 days

### Setup Instructions

#### Step 1: Visit Setup Page

```
http://localhost:3000/api/admin/setup
```

This page shows:
- QR code to scan
- Secret key (backup)
- Step-by-step instructions

**Note**: This page only works when `ADMIN_TOTP_SECRET` is not set in environment variables.

#### Step 2: Install Authenticator App

Choose one:
- **Google Authenticator** (iOS/Android)
- **Authy** (iOS/Android/Desktop)
- **Microsoft Authenticator** (iOS/Android)
- **1Password** (All platforms)

#### Step 3: Scan QR Code

1. Open your authenticator app
2. Tap "Add account" or "+"
3. Scan the QR code from setup page
4. Account "Barter Admin" appears in app

#### Step 4: Configure Environment

Add to `.env.local`:
```bash
ADMIN_TOTP_SECRET=YOUR_SECRET_FROM_SETUP_PAGE
```

#### Step 5: Restart & Login

1. Restart development server
2. Go to `/admin/login`
3. Enter 6-digit code from app
4. Login successful!

### Migration from Password Auth

If you were using the old password-based system:

1. **Remove old environment variable**:
   ```bash
   # Remove this line
   ADMIN_PASSWORD=...
   ```

2. **Add new TOTP secret**:
   ```bash
   # Add this line
   ADMIN_TOTP_SECRET=...
   ```

3. **Set up authenticator app** (follow steps above)

### Troubleshooting TOTP

| Problem | Solution |
|---------|----------|
| Invalid code | Check phone's time is correct (TOTP requires accurate time) |
| Code not working | Wait for next code (they change every 30 seconds) |
| Can't scan QR | Manually enter secret key in authenticator app |
| Lost phone | Need to regenerate secret (backup your secret!) |
| Setup page not accessible | TOTP already configured - remove `ADMIN_TOTP_SECRET` temporarily |

### Security Best Practices

1. **Backup Your Secret**:
   - Save TOTP secret in password manager
   - Store in multiple secure locations
   - Never commit to version control

2. **Phone Security**:
   - Use phone lock screen
   - Enable biometric authentication
   - Keep authenticator app updated

3. **Account Recovery**:
   - Keep backup of TOTP secret
   - Document recovery process
   - Store in secure location

---

## 🗑️ Delete Functionality

We've added the ability to permanently delete applications from the admin panel.

### Features

- **Delete Button**: Red delete button in application detail page
- **Confirmation Modal**: Prevents accidental deletion
- **Permanent Action**: Cannot be undone
- **Clean UI**: Clear warning and confirmation flow

### How to Delete

1. Navigate to application detail page
2. Click "Delete" button (top right, red)
3. Confirmation modal appears
4. Click "Delete" to confirm
5. Application is permanently removed
6. Redirected to dashboard

### Confirmation Modal

The modal shows:
- ⚠️ Warning icon
- Application name
- Clear warning message
- Cancel and Delete buttons
- Loading state during deletion

### Use Cases

- **Spam/Test Submissions**: Remove test applications
- **Duplicate Applications**: Clean up duplicates
- **Invalid Submissions**: Remove clearly invalid entries
- **Data Cleanup**: Maintain clean pipeline

### Caution

⚠️ **Deletion is permanent** - There is no undo or recovery!

Best practices:
- Always verify you're deleting the right application
- Consider adding a note before deleting (for records)
- Export important applications before deletion (future feature)
- Use sparingly - rejected status often better than deletion

### API Endpoint

```
DELETE /api/admin/applications/:id
```

**Authentication**: Required (JWT token)

**Response**:
```json
{
  "success": true,
  "message": "Application deleted successfully"
}
```

---

## 📦 New Dependencies

```json
{
  "@otplib/preset-default": "^12.0.1",
  "qrcode": "^1.5.3",
  "@types/qrcode": "^1.5.5" (dev)
}
```

Install with:
```bash
npm install @otplib/preset-default qrcode
npm install --save-dev @types/qrcode
```

---

## 🔄 Updated Files

### Authentication System
- `src/lib/auth/admin.ts` - Added TOTP functions
- `src/app/api/admin/login/route.ts` - TOTP verification
- `src/app/api/admin/setup/route.ts` - NEW: Setup endpoint
- `src/app/admin/login/page.tsx` - Updated UI for 6-digit code
- `src/app/admin/setup/page.tsx` - NEW: Setup page UI

### Delete Functionality
- `src/lib/db/mongodb.ts` - Added `deleteApplication()` function
- `src/app/api/admin/applications/[id]/route.ts` - Added DELETE endpoint
- `src/app/admin/applications/[id]/application-detail.tsx` - Added delete button & modal

---

## 🎯 Feature Comparison

### Authentication

| Aspect | Before | After |
|--------|--------|-------|
| Method | Static password | TOTP (6-digit code) |
| Security Level | Basic | High (2FA) |
| Setup Complexity | Simple | Moderate (one-time) |
| Login Experience | Type password | Type code from phone |
| Phishing Risk | High | Low |
| Brute Force Risk | Possible | Nearly impossible |

### Application Management

| Feature | Before | After |
|---------|--------|-------|
| View | ✅ Yes | ✅ Yes |
| Edit Status | ✅ Yes | ✅ Yes |
| Add Notes | ✅ Yes | ✅ Yes |
| Delete | ❌ No | ✅ Yes |

---

## 📊 Routes Added

- `/api/admin/setup` (GET) - TOTP setup page with QR code
- `/admin/setup` (Page) - Visual setup interface
- `/api/admin/applications/:id` (DELETE) - Delete application

---

## 🚀 Deployment Checklist

When deploying with new features:

### For TOTP

- [ ] Install new dependencies
- [ ] Generate TOTP secret (use setup page or manual)
- [ ] Add `ADMIN_TOTP_SECRET` to production environment
- [ ] Remove old `ADMIN_PASSWORD` variable
- [ ] Set up authenticator app with production secret
- [ ] Test login with authenticator
- [ ] Backup TOTP secret securely
- [ ] Document recovery process

### For Delete Functionality

- [ ] Review permissions (who can delete?)
- [ ] Test delete functionality
- [ ] Set up application backup strategy (if needed)
- [ ] Document deletion policy
- [ ] Train admins on delete feature

---

## 🎓 Training Updates

### For Admins

**New Login Process**:
1. Open authenticator app on phone
2. Find "Barter Admin" entry
3. View 6-digit code
4. Enter code on login page
5. Session lasts 7 days

**Delete Applications**:
1. Open application detail
2. Click red "Delete" button
3. Read confirmation message
4. Click "Delete" to confirm
5. Application removed permanently

### For Developers

**TOTP Integration**:
- Using `@otplib/preset-default` library
- QR codes generated with `qrcode` library
- TOTP secret stored in environment variable
- Verification happens on every login

**Delete Endpoint**:
- Standard REST DELETE method
- Requires authentication
- Returns success/error response
- Redirects to dashboard on success

---

## 🔮 Future Enhancements

### Authentication
- [ ] Backup codes (recovery codes)
- [ ] Multiple admin accounts
- [ ] Audit log for logins
- [ ] Session management page
- [ ] Device tracking

### Delete Functionality
- [ ] Soft delete (mark as deleted instead of removing)
- [ ] Trash/recycle bin (recover within 30 days)
- [ ] Bulk delete
- [ ] Delete with reason/note
- [ ] Deleted applications report

---

## ❓ FAQ

### TOTP Authentication

**Q: What if I lose my phone?**
A: You'll need access to your TOTP secret (from environment variable or backup) to set up on a new device.

**Q: Can I use the same authenticator for multiple services?**
A: Yes! Authenticator apps can store multiple accounts.

**Q: Do the codes work offline?**
A: Yes! TOTP codes are generated locally on your device.

**Q: How long is each code valid?**
A: 30 seconds. After that, a new code is generated.

### Delete Functionality

**Q: Can I recover deleted applications?**
A: No, deletion is permanent. There's no recovery.

**Q: Should I delete or reject applications?**
A: Usually reject. Only delete spam or obvious mistakes.

**Q: Is there an audit log for deletions?**
A: Not currently. This is a future enhancement.

**Q: Can I bulk delete applications?**
A: Not currently. Delete one at a time for safety.

---

**Last Updated**: January 2026
**Version**: 2.0.0 with TOTP & Delete

