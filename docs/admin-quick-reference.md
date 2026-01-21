# Admin Panel Quick Reference

## 🔗 URLs

| Page | URL | Description |
|------|-----|-------------|
| Login | `/admin/login` | Admin authentication |
| Dashboard | `/admin` | Main dashboard |
| Application Detail | `/admin/applications/[id]` | View/edit application |

## 🔑 Environment Variables

```bash
# Required
ADMIN_PASSWORD=your_secure_password
ADMIN_JWT_SECRET=your_random_32_char_secret
MONGODB_URI=your_mongodb_connection_string

# Optional
NEXT_PUBLIC_SITE_URL=https://barter-dev.com
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

## 📊 Application Status Flow

```
New Submission
      ↓
   Pending (yellow)
      ↓
  Reviewing (blue)
      ↓
   ┌──────┴──────┐
   ↓             ↓
Accepted      Rejected
(green)       (red)
```

## 🎯 Common Tasks

### Review New Application
1. Dashboard → Click pending application
2. Read details
3. Change status to "Reviewing"
4. Add note with thoughts
5. Save changes

### Accept Application
1. Open application
2. Select "Accepted" status
3. Add note: "Next steps: [...]"
4. Save changes
5. Email applicant

### Search Applications
1. Dashboard → Search bar
2. Type: name, email, or keyword
3. Results filter instantly

### Filter by Status
1. Dashboard → Status buttons
2. Click: All, Pending, Reviewing, Accepted, or Rejected
3. View filtered list

## 📝 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/admin/login` | Login |
| POST | `/api/admin/logout` | Logout |
| GET | `/api/admin/applications` | List all |
| GET | `/api/admin/applications/:id` | Get one |
| PATCH | `/api/admin/applications/:id` | Update |

## 🎨 Status Colors

| Status | Color | Icon | Use When |
|--------|-------|------|----------|
| Pending | 🟡 Yellow | 🕐 | New, unreviewed |
| Reviewing | 🔵 Blue | 👁️ | Currently evaluating |
| Accepted | 🟢 Green | ✅ | Approved for trade |
| Rejected | 🔴 Red | ❌ | Not a fit |

## 🔍 Search Tips

Search finds matches in:
- Applicant name
- Email address
- Project type
- Trade type

Examples:
- `john` → Finds "John Doe"
- `@gmail` → Finds all Gmail users
- `marketing` → Finds marketing site projects
- `services` → Finds service trades

## 📋 Dashboard Stats

| Stat | Description |
|------|-------------|
| Total | All applications ever |
| Pending | Awaiting review |
| Reviewing | Currently evaluating |
| Accepted | Approved applications |
| Rejected | Declined applications |

## 💡 Best Practices

### Status Management
- ✅ Move to "Reviewing" when you start
- ✅ Keep "Pending" for unreviewed only
- ✅ Update status within 48 hours
- ❌ Don't leave in "Reviewing" indefinitely

### Note Taking
- ✅ Document decisions and reasoning
- ✅ Note communication with applicant
- ✅ Track next steps
- ✅ Be clear and concise
- ❌ Don't include sensitive info

### Security
- ✅ Log out on shared computers
- ✅ Use strong password
- ✅ Keep credentials private
- ❌ Don't share admin access
- ❌ Don't commit .env files

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't login | Check ADMIN_PASSWORD in .env |
| Session expired | Log in again (7-day limit) |
| Applications not loading | Check MONGODB_URI |
| Changes not saving | Verify you're logged in |
| Page not found | Check URL spelling |

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Navigate elements |
| Enter | Activate button/link |
| Escape | Close (future) |
| ⌘/Ctrl + R | Refresh page |

## 📱 Mobile Usage

### Supported
- ✅ View applications
- ✅ Update status
- ✅ Add notes
- ✅ Search and filter

### Tips
- Use landscape for better layout
- Sidebar appears below content
- All features work on touch

## 🔐 Security Features

- 🔒 Password authentication
- 🔑 JWT session tokens
- 🍪 HTTP-only cookies
- 🔐 7-day auto-logout
- 🚫 No search engine indexing
- 🔒 HTTPS required (production)

## 📈 Performance

| Action | Expected Time |
|--------|---------------|
| Login | < 1s |
| Load dashboard | < 2s |
| Search | < 300ms |
| Save changes | < 1s |
| Refresh | < 1s |

## 🎓 Training Checklist

New admin should:
- [ ] Understand status flow
- [ ] Know how to search
- [ ] Practice adding notes
- [ ] Test status updates
- [ ] Review all documentation
- [ ] Know when to accept/reject
- [ ] Understand security practices

## 📚 Documentation Links

- [Setup Guide](../ADMIN_SETUP.md)
- [Full Documentation](./admin-panel.md)
- [Features & Architecture](./admin-features.md)
- [Visual Guide](./admin-screenshots.md)

## 🆘 Emergency Contacts

If you encounter issues:
1. Check documentation
2. Review error logs
3. Verify environment variables
4. Test database connection
5. Contact system administrator

## 📝 Notes Template

Use this template when adding notes:

```
Status: [Pending/Reviewing/Accepted/Rejected]
Reason: [Why this decision]
Next Steps: [What happens next]
Contact: [Any communication]
Timeline: [When to follow up]
```

Example:
```
Status: Accepted
Reason: Great project fit, solid trade offer
Next Steps: Schedule intro call, discuss timeline
Contact: Sent email to john@example.com
Timeline: Follow up in 2 days if no response
```

## 🔄 Workflow Example

### Daily Routine
1. Login to admin panel
2. Check pending applications
3. Review new submissions
4. Update statuses
5. Add notes
6. Follow up on reviewing applications
7. Logout

### Weekly Review
1. Check pipeline metrics
2. Review accepted applications
3. Follow up on pending items
4. Clean up old reviewing items
5. Update documentation if needed

## 🎯 Success Metrics

Track these metrics:
- Response time (target: < 48 hours)
- Acceptance rate
- Time in reviewing status
- Notes per application
- Follow-up completion rate

## 🛠️ Maintenance

### Regular Tasks
- **Daily**: Review new applications
- **Weekly**: Check pipeline health
- **Monthly**: Review metrics
- **Quarterly**: Update dependencies

### Health Checks
- ✅ Can login successfully
- ✅ Dashboard loads quickly
- ✅ Search works correctly
- ✅ Status updates save
- ✅ Notes appear in history

## 💼 Business Rules

### Accept When
- Project is a good fit
- Trade offer is valuable
- Timeline is reasonable
- Applicant is professional

### Reject When
- Project scope too large/small
- Trade offer not valuable
- Timeline unrealistic
- Red flags in application

### Review Longer When
- Need more information
- Waiting for team input
- Evaluating trade value
- Checking availability

## 🎨 UI Elements

| Element | Purpose |
|---------|---------|
| Stats Cards | Quick metrics overview |
| Search Bar | Find specific applications |
| Filter Buttons | View by status |
| Application Cards | Summary view |
| Status Badges | Visual status indicator |
| Notes Section | Internal tracking |
| Save Button | Commit changes |

## 🔔 Notifications

Currently supported:
- ✅ Slack (new applications)

Future enhancements:
- 📧 Email to applicants
- 🔔 Browser notifications
- 📱 Mobile push notifications

## 📊 Data Retention

- Applications: Stored indefinitely
- Notes: Stored indefinitely
- Sessions: 7 days
- Logs: Per server config

## 🌐 Browser Requirements

- JavaScript: Required
- Cookies: Required
- Modern browser: Required
- Internet: Required
- HTTPS: Required (production)

## ✅ Pre-Launch Checklist

Before going live:
- [ ] Environment variables set
- [ ] Admin password is strong
- [ ] JWT secret is random
- [ ] Database connected
- [ ] HTTPS enabled
- [ ] Test login works
- [ ] Test status updates
- [ ] Test notes work
- [ ] Mobile tested
- [ ] Documentation reviewed

---

**Last Updated**: January 2026
**Version**: 1.0.0
**Support**: See full documentation

