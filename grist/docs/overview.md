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

### [Job Board](./job-board.md) ⬅️ *Building First*
Volunteer work obligation tracking and job signup system. Sign up for Duty Officer, Shuttle Driver, or event shifts.

### [Community Board](./community.md)
Member-to-member posts:
- **Classifieds**: For sale, wanted, free stuff
- **Crew Board**: Looking for crew / available to crew
- **General Posts**: Anything else members want to share

### [Announcements](./announcements.md)
Club news from the board - one-way, official notices.

### [Member Profile](./member-profile.md)
See what the club has on file for you:
- Contact info, boat details, mooring assignment
- Flag anything that's wrong
- **Membership card** for mobile wallet (for reciprocal visits)

### [Insurance Submission](./insurance.md)
Upload your proof of insurance each year. Track status.

### [Reciprocal Visitors](./reciprocal-visitors.md)
Booking system for visiting sailors from partner clubs.

### Links & Resources
Some things don't need to be built - just linked:
- **Documents**: → Google Drive folder (club rules, forms, minutes)
- **Calendar**: → Embedded Google Calendar
- **Newsletter**: → Emailed directly (no portal feature needed)

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
| [community.md](./community.md) | Classifieds, crew board, member posts |
| [announcements.md](./announcements.md) | Official news from the board |
| [member-profile.md](./member-profile.md) | Profile viewing and data verification |
| [insurance.md](./insurance.md) | Annual insurance submission workflow |
| [reciprocal-visitors.md](./reciprocal-visitors.md) | Booking system for visiting sailors |
| [technical.md](./technical.md) | Stack, auth, Grist integration |
| [current-schema.md](./current-schema.md) | Current Grist data model |
| [proposed-schema.md](./proposed-schema.md) | Proposed schema changes |
