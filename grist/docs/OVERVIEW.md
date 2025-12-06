# APSC Bulletin Board

## Vision

A **Bulletin Board** for APSC members - the online version of what you'd see pinned up in the clubhouse. Log in, see what's happening, sign up for stuff, post something for sale, find crew. Simple.

The Bulletin Board connects to Grist (the club's membership database) so only verified members have access.

**Core Philosophy:**
- Keep it simple - no new apps, no accounts to create
- Verified members only - tied to Grist membership
- Feels familiar - like a clubhouse bulletin board, just online

---

## Target Users

- **Club members** (primary audience)
- **Committee leads / Board members** (post announcements, manage jobs)
- **Administrators** (system management)

---

## Features

### [Job Board](./JOB_BOARD.md) ⬅️ *Building First*
Volunteer work obligation tracking and job signup system. Sign up for Duty Officer, Shuttle Driver, or event shifts.

### [Community Board](./COMMUNITY.md)
Member-to-member posts:
- **Classifieds**: For sale, wanted, free stuff
- **Crew Board**: Looking for crew / available to crew
- **General Posts**: Anything else members want to share

### [Announcements](./ANNOUNCEMENTS.md)
Club news from the board - one-way, official notices. Also includes the club **Newsletter** (Markdown editor for the Communications Director).

### [Member Profile](./MEMBER_PROFILE.md)
See what the club has on file for you:
- Contact info, boat details, mooring assignment
- Flag anything that's wrong
- **Membership card** for mobile wallet (for reciprocal visits)

### [Insurance Submission](./INSURANCE.md)
Upload your proof of insurance each year. Track status.

### [Reciprocal Visitors](./RECIPROCAL_VISITORS.md) *(public - no login)*
Booking form for visiting sailors from partner clubs to request a mooring.

### Links & Resources
Some things don't need to be built - just linked:
- **Documents**: → Google Drive folder (club rules, forms, minutes)
- **Calendar**: → Embedded Google Calendar

### Future Ideas (Backlog)
- Online dues payment
- Boat ramp / crane scheduling
- Guest registration
- Racing results and standings
- Photo gallery
- Member directory (opt-in)
- Maintenance request submission

---

## How It Works

### Member Identity
- Log in with your email (must match Grist membership record)
- See your stuff: hours, boat, mooring
- Family members share access to household info
- Board members get extra capabilities

### Notifications
Email notifications for:
- Job signup reminders
- Insurance expiration warnings
- Replies to your posts (optional)

### Mobile-Friendly
- Works great on phone browsers
- No app to install
- "Add to home screen" if you want

---

## Technical Overview

See [TECHNICAL.md](./TECHNICAL.md) for details on:
- Frontend stack (React, Vite, Tailwind)
- Grist integration strategy
- Authentication approach
- Hosting options

---

## Documentation Index

| Document | Description |
|----------|-------------|
| [OVERVIEW.md](./OVERVIEW.md) | This file - vision and feature summary |
| [JOB_BOARD.md](./JOB_BOARD.md) | Work obligations, signups, approvals |
| [COMMUNITY.md](./COMMUNITY.md) | Classifieds, crew board, member posts |
| [ANNOUNCEMENTS.md](./ANNOUNCEMENTS.md) | Official news from the board |
| [MEMBER_PROFILE.md](./MEMBER_PROFILE.md) | Profile viewing and data verification |
| [INSURANCE.md](./INSURANCE.md) | Annual insurance submission workflow |
| [RECIPROCAL_VISITORS.md](./RECIPROCAL_VISITORS.md) | Booking system for visiting sailors |
| [TECHNICAL.md](./TECHNICAL.md) | Stack, auth, Grist integration |
| [CURRENT_SCHEMA.md](./CURRENT_SCHEMA.md) | Current Grist data model |
| [PROPOSED_SCHEMA.md](./PROPOSED_SCHEMA.md) | Proposed schema changes |
