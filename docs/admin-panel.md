# Admin Panel Documentation

## Overview

The Admin Panel is a secure dashboard for managing barter application submissions and tracking the pipeline. It provides a complete view of all applications with filtering, search, status management, and note-taking capabilities.

## Features

### 🔐 Authentication
- Secure password-based authentication
- JWT session management with 7-day expiration
- Protected routes with automatic redirect to login

### 📊 Dashboard
- View all submissions in one place
- Real-time statistics (Total, Pending, Reviewing, Accepted, Rejected)
- Filter applications by status
- Search by name, email, project type, or trade type
- Refresh functionality for latest data

### 📝 Application Management
- Detailed view of each application
- Update application status:
  - **Pending**: Newly submitted applications
  - **Reviewing**: Applications under review
  - **Accepted**: Applications approved for trade
  - **Rejected**: Applications declined
- Add internal notes for tracking communication and decisions
- View complete applicant information including:
  - Contact details (name, email, website)
  - Project requirements and description
  - Trade offer and description
  - Timeline and technical metadata

### 🔍 Pipeline Tracking
- Visual status indicators with color coding
- Notes history for each application
- Timestamp tracking for all activities
- Quick status overview on dashboard

## Access

### URL
```
https://barter-dev.com/admin
```

### Login
Navigate to `/admin/login` and enter your admin password.

## Environment Variables

Add these to your `.env` file:

```bash
# Admin Panel Authentication
ADMIN_PASSWORD=your_secure_admin_password
ADMIN_JWT_SECRET=your_jwt_secret_key_min_32_chars

# Database (required for admin to work)
MONGODB_URI=your_mongodb_connection_string

# Site URL
NEXT_PUBLIC_SITE_URL=https://barter-dev.com
```

### Security Notes
- **ADMIN_PASSWORD**: Choose a strong password (min 12 characters recommended)
- **ADMIN_JWT_SECRET**: Use a random string of at least 32 characters
- Never commit these values to version control
- Use different credentials for production and development

## API Endpoints

### Authentication
- `POST /api/admin/login` - Login with password
- `POST /api/admin/logout` - Logout and clear session

### Applications
- `GET /api/admin/applications` - Get all applications with filters
  - Query params: `status`, `search`, `limit`
- `GET /api/admin/applications/[id]` - Get single application
- `PATCH /api/admin/applications/[id]` - Update application status/notes
  - Body: `{ status?, note? }`

## Database Schema

### Application Collection

```typescript
{
  _id: ObjectId,
  // Applicant Info
  name: string,
  email: string,
  website?: string,
  
  // Project Requirements
  projectType: string, // marketing-site | web-app | ecommerce | cms | other
  projectDescription: string,
  timeline: string, // less-than-1-month | 1-3-months | 3-6-months | flexible
  
  // Trade Offer
  tradeType: string, // services | physical-goods | hybrid | other
  tradeDescription: string,
  
  // Additional
  additionalInfo?: string,
  
  // Metadata
  ipAddress: string,
  userAgent: string,
  referrer?: string,
  
  // Pipeline Management
  status: "pending" | "reviewing" | "accepted" | "rejected",
  notes?: [{ text: string, createdAt: Date }],
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Workflow

### 1. Review New Applications
1. Login to admin panel
2. View pending applications on dashboard
3. Click on an application to see full details

### 2. Evaluate Application
1. Read project requirements and trade offer
2. Check applicant contact information
3. Review any additional information provided

### 3. Update Status
1. Select appropriate status from sidebar:
   - **Reviewing** - When you start evaluating
   - **Accepted** - When you want to proceed
   - **Rejected** - When it's not a fit
2. Add notes about your decision or next steps
3. Click "Save Changes"

### 4. Track Pipeline
1. Use status filters on dashboard to see applications by stage
2. Review notes history for context on previous decisions
3. Use search to find specific applications

## Best Practices

### Status Management
- Move to "Reviewing" as soon as you start evaluating
- Add notes when changing status to document reasoning
- Keep "Pending" for unreviewed applications only

### Note Taking
- Document key decisions and reasoning
- Note any communication with applicant
- Track follow-up actions needed
- Use clear, concise language

### Regular Monitoring
- Check dashboard regularly for new applications
- Respond to pending applications within 48 hours
- Keep pipeline moving by updating statuses promptly

## Troubleshooting

### Can't Login
- Verify ADMIN_PASSWORD environment variable is set
- Check browser console for errors
- Clear cookies and try again

### Applications Not Loading
- Verify MONGODB_URI is correct
- Check database connection
- Review server logs for errors

### Changes Not Saving
- Check network tab in browser for API errors
- Verify authentication token hasn't expired
- Try logging out and back in

## Security Considerations

1. **Password Protection**: Admin password is required for all access
2. **Session Management**: JWT tokens expire after 7 days
3. **HTTP-Only Cookies**: Tokens stored securely in HTTP-only cookies
4. **API Protection**: All admin API endpoints check authentication
5. **HTTPS Required**: Always use HTTPS in production

## Future Enhancements

Potential features to add:
- [ ] Email notifications to applicants
- [ ] Bulk status updates
- [ ] Advanced filtering and sorting
- [ ] Export applications to CSV
- [ ] Activity timeline for each application
- [ ] Multiple admin users with roles
- [ ] Application tags/categories
- [ ] Integration with calendar for scheduling calls

