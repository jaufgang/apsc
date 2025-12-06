# Technical Considerations

Stack, architecture, and implementation decisions.

**See also:** [DESIGN.md](./DESIGN.md) for visual design language and examples.

---

## Frontend Stack (Proposed)

- **React** with TypeScript
- **Vite** for build tooling
- **TanStack Query** for data fetching/caching
- **React Router** for navigation
- **Tailwind CSS** for styling
- **shadcn/ui** or similar component library

---

## Backend

- **Grist API** as primary data store
- **Auth provider** (Auth0, Clerk, or Firebase Auth) for authentication
- **Serverless functions** (if needed) for complex operations
- **Email service** (SendGrid, AWS SES, or Resend) for notifications

---

## Hosting

Options:
- Static site hosting (Vercel, Netlify, Cloudflare Pages)
- Self-hosted if preferred

---

## Authentication

### Requirements
- **Primary identifier**: Member's email address in Grist
- Must match against email in Member_List table

### Auth Methods (flexible)
- Google OAuth
- Other common OAuth providers (Microsoft, Apple?)
- Email/password
- Email magic link (passwordless)

### Flow
1. User authenticates via provider
2. System looks up email in Grist Member_List
3. If found → grant access with appropriate role
4. If not found → deny access ("Email not recognized as a member")

---

## Grist Integration Strategy

### Option A: Grist as Pure Backend API
- React app handles all UI
- Grist is just the data layer
- Full control over UX

### Option B: Hybrid
- React for member-facing features
- Grist UI for admin/reporting functions
- Leverage Grist's built-in views

**Recommendation:** Option A for consistency, but use Grist views for quick ad-hoc reports.

---

## Open Design Decisions

### Recurring Job Generation
- Auto-generate on season config save?
- Or manual "Generate Season Jobs" button?
- Use a library for Ontario statutory holidays, or manual list?

### Consortium Membership Handling
- Members share a Membership_Number but are tracked separately
- Need to distinguish consortium vs. family memberships
- Is there an existing field, or do we need to add one?

### Email Notifications
- Which service? (SendGrid, AWS SES, Resend)
- Template management approach
- Rate limiting / batching for bulk sends

### File Storage
- Where do uploaded documents (insurance PDFs) live?
- Grist attachments? S3? Cloudflare R2?

---

## Data Sync

### Grist → Portal
- Portal reads from Grist API
- Caching strategy (TanStack Query handles this)
- Real-time updates not critical for most features
- Consider polling interval vs. webhooks

### Portal → Grist
- Portal writes to Grist for:
  - Job signups
  - Hour submissions
  - Insurance uploads (metadata)
- Optimistic updates with error handling

---

## User Experience

- **Responsive design**: Equal experience on mobile and desktop
- Not a native app - web-based
- PWA capabilities optional but nice-to-have:
  - Add to home screen
  - Offline indicator
  - Push notifications (future)

---

## Security Considerations

- All API calls authenticated
- Role-based access control
- Audit trail for sensitive operations (who entered what, when)
- HTTPS everywhere
- Secure handling of uploaded documents

---

## Development Approach

1. Set up project structure (Vite + React + TypeScript)
2. Implement auth flow
3. Build Job Board features (priority)
4. Add other features incrementally
5. Deploy to staging for testing
6. Launch to members

---

## Dev / Prod Environments

### Grist Environment Setup

Use a **duplicate Grist document** for development:

1. Open production Grist document
2. Click document menu (⋮) → "Duplicate Document"
3. Name it "APSC Dev" or "APSC Bulletin Board - Dev"
4. Use the dev copy for all development/testing

This gives you:
- Same schema and sample data
- Complete isolation from production
- Free (same Grist account)

### Environment Configuration

Your app should switch Grist endpoints based on environment:

```typescript
// config.ts
const config = {
  development: {
    gristDocId: 'DEV_DOC_ID_HERE',
    gristApiUrl: 'https://docs.getgrist.com/api',
  },
  production: {
    gristDocId: 'PROD_DOC_ID_HERE',
    gristApiUrl: 'https://docs.getgrist.com/api',
  },
};

export const gristConfig = config[process.env.NODE_ENV] || config.development;
```

### API Keys

- **Dev API key**: Can be less restricted, stored in `.env.local`
- **Prod API key**: More restricted, stored in production secrets

Never commit API keys to git. Use environment variables.

### Schema Changes Workflow

1. Make schema changes in dev Grist document
2. Test thoroughly with dev app
3. Document changes needed
4. Apply same changes to production Grist document
5. Deploy app update

**Note:** Grist doesn't have built-in migrations. Schema changes are manual but straightforward for a small project.

### Alternative: Self-Hosted Grist for Dev

If you want complete isolation, run Grist locally:

```bash
docker run -p 8484:8484 -v ~/grist-dev:/persist gristlabs/grist
```

Then access at `http://localhost:8484`. Useful for:
- Offline development
- Experimenting without affecting any hosted data
- Testing destructive operations
