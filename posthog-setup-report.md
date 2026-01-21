# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into your Next.js App Router project. The integration includes client-side event tracking via `instrumentation-client.ts`, server-side tracking using `posthog-node`, and a reverse proxy configuration for improved reliability. Events are captured across the application funnel, user engagement interactions, and admin authentication flows.

## Events Implemented

| Event Name | Description | File Path |
|------------|-------------|-----------|
| `application_started` | User starts filling out the application form by clicking Continue from step 1 | `src/components/sections/apply/index.tsx` |
| `application_step_completed` | User completes a step in the multi-step application form | `src/components/sections/apply/index.tsx` |
| `application_submitted` | User successfully submits their trade application | `src/components/sections/apply/index.tsx` |
| `application_submission_failed` | Application submission fails due to error | `src/components/sections/apply/index.tsx` |
| `application_received` | Server-side event when a new application is successfully created in the database | `src/app/api/apply/route.ts` |
| `admin_login_succeeded` | Admin successfully logs in via TOTP authentication | `src/app/api/admin/login/route.ts` |
| `admin_login_failed` | Admin login attempt fails due to invalid TOTP code | `src/app/api/admin/login/route.ts` |
| `admin_logged_out` | Admin logs out of the admin panel | `src/app/api/admin/logout/route.ts` |
| `faq_item_toggled` | User expands or collapses an FAQ item | `src/components/sections/faq/index.tsx` |
| `cta_button_clicked` | User clicks on a call-to-action button (Apply Now, How it Works, etc.) | `src/components/sections/footer-cta/index.tsx`, `src/components/sections/header/index.tsx` |
| `navigation_link_clicked` | User clicks a navigation link in the header | `src/components/sections/header/index.tsx` |
| `mobile_menu_toggled` | User opens or closes the mobile menu | `src/components/sections/header/index.tsx` |
| `language_changed` | User changes the site language using the language picker | `src/components/ui/language-picker.tsx` |

## Files Created/Modified

### New Files
- `instrumentation-client.ts` - Client-side PostHog initialization
- `src/lib/posthog-server.ts` - Server-side PostHog client helper

### Modified Files
- `next.config.ts` - Added reverse proxy rewrites for PostHog
- `.env.local` - Added PostHog environment variables
- `src/components/sections/apply/index.tsx` - Application funnel tracking
- `src/app/api/apply/route.ts` - Server-side application received event
- `src/app/api/admin/login/route.ts` - Admin login tracking
- `src/app/api/admin/logout/route.ts` - Admin logout tracking
- `src/components/sections/faq/index.tsx` - FAQ interaction tracking
- `src/components/sections/footer-cta/index.tsx` - CTA button click tracking
- `src/components/sections/header/index.tsx` - Navigation and mobile menu tracking
- `src/components/ui/language-picker.tsx` - Language change tracking

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/295598/dashboard/1104589) - Core analytics dashboard with application funnel, engagement, and admin activity

### Insights
- [Application Funnel](https://us.posthog.com/project/295598/insights/cRgpxyjY) - Tracks user progression through the application form
- [Application Submissions Over Time](https://us.posthog.com/project/295598/insights/rPxOQdde) - Weekly trend of successful vs failed submissions
- [User Engagement Events](https://us.posthog.com/project/295598/insights/xPpdT6vG) - Overview of CTA clicks, FAQ interactions, navigation, and language changes
- [Admin Activity](https://us.posthog.com/project/295598/insights/ar143WFC) - Tracks admin login successes, failures, and logouts
- [Application Step Completion Breakdown](https://us.posthog.com/project/295598/insights/4oze9yCh) - Shows which application steps users complete most/least

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
