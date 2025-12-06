# APSC Member Portal

## Vision

A **Member Portal** that serves as the central hub for APSC members to interact with the club. The portal connects directly to Grist (the club's source of truth for membership data) and provides members with self-service access to their information, obligations, and club activities.

**Core Philosophy:**
- Members own their data - they can view and verify what the club has on record
- Single source of truth - everything syncs with Grist
- Start simple, grow features over time

---

## Target Users

- **Club members** (primary audience)
- **Committee leads / Board members** (administrative functions)
- **Administrators** (system management)

---

## Portal Features

### [Job Board](./job-board.md) ⬅️ *Building First*
Volunteer work obligation tracking and job signup system. This is the most immediate pain point and the first feature to launch.

### [Member Profile](./member-profile.md)
Members view and verify their profile information stored in Grist:
- Personal details (name, contact info)
- Boat information (name, size, type)
- Mooring ball assignment
- Membership type and status
- Emergency contacts
- Family members on the membership

### [Insurance Submission](./insurance.md)
Streamline the yearly insurance verification process:
- Upload proof of insurance documents
- Track submission status
- Automated reminders before deadline
- Board member review workflow

### [Communications](./communications.md)
- **Newsletter**: Club publication authored and distributed through portal
- **Announcements**: Club news, events, important notices
- **Document Library**: Club rules, forms, guides, meeting minutes
- **Event Calendar**: Club events, races, social gatherings
- **Message Board**: *(deferred - evaluate need later)*

### Future Ideas (Backlog)
- Online dues payment
- Boat ramp / crane scheduling
- Guest registration
- Racing results and standings
- Photo gallery
- Member directory (opt-in)
- Maintenance request submission

---

## Cross-Cutting Concerns

### Member Identity
All portal features know who you are:
- Authenticated via email (matches Grist record)
- Your membership type determines what you see
- Family members see shared data (work hours, boat info)
- Board members get additional capabilities

### Notifications Hub
Unified notification system across all features:
- Job signups and reminders
- Insurance expiration warnings
- Announcement alerts
- All configurable per-member

### Mobile-Friendly
Not a native app, but:
- Fully responsive web design
- Works great on phone browsers
- PWA capability for "add to home screen"
- Touch-friendly interactions

---

## Technical Overview

See [technical.md](./technical.md) for details on:
- Frontend stack (React, Vite, Tailwind)
- Grist integration strategy
- Authentication approach
- Hosting options

---

## Documentation Index

| Document | Description |
|----------|-------------|
| [overview.md](./overview.md) | This file - vision and feature summary |
| [job-board.md](./job-board.md) | Work obligations, signups, approvals |
| [member-profile.md](./member-profile.md) | Profile viewing and data verification |
| [insurance.md](./insurance.md) | Annual insurance submission workflow |
| [communications.md](./communications.md) | Newsletter, announcements, documents |
| [technical.md](./technical.md) | Stack, auth, Grist integration |
| [current-schema.md](./current-schema.md) | Current Grist data model |
| [proposed-schema.md](./proposed-schema.md) | Proposed schema changes |
