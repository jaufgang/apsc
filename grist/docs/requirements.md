# APSC Member Portal

## Vision

A **Member Portal** that serves as the central hub for APSC members to interact with the club. The portal connects directly to Grist (the club's source of truth for membership data) and provides members with self-service access to their information, obligations, and club activities.

**Core Philosophy**: 
- Members own their data - they can view and verify what the club has on record
- Single source of truth - everything syncs with Grist
- Start simple, grow features over time

---

## Project Overview

**Purpose**: A member-facing web portal for Aquatic Park Sailing Club that gives members visibility into their membership information, work obligations, and club activities - all backed by the Grist database.

**Target Users**:
- Club members (primary audience)
- Committee leads / Board members (administrative functions)
- Administrators (system management)

---

## Portal Features (Roadmap)

### Phase 1: Job Board ⬅️ *Building First*
Volunteer work obligation tracking and job signup system. This is the most immediate pain point and the first feature to launch.

### Phase 2: Member Profile & Data Verification
Members view and verify their profile information stored in Grist:
- Personal details (name, contact info)
- Boat information (name, size, type)
- Mooring ball assignment
- Membership type and status
- Emergency contacts
- Family members on the membership

**Key Capability**: Members can flag incorrect information for review (not direct edit - maintains data integrity while enabling corrections).

### Phase 3: Annual Insurance Submission
Streamline the yearly insurance verification process:
- Upload proof of insurance documents
- Track submission status (submitted, reviewed, approved, expired)
- Automated reminders before deadline
- Board member review workflow
- Historical record of submissions

### Phase 4: Communications & Community
- **Announcements**: Club news, events, important notices
- **Newsletter**: Club publication authored and distributed through portal
- **Message Board / Forum**: Member discussions, Q&A, for-sale posts *(deferred - evaluate need later)*
- **Event Calendar**: Club events, races, social gatherings
- **Document Library**: Club rules, forms, guides, meeting minutes

### Future Ideas (Backlog)
- Online dues payment
- Boat ramp / crane scheduling
- Guest registration
- Racing results and standings
- Photo gallery
- Member directory (opt-in)
- Maintenance request submission

---

## Feature Deep Dive: Job Board (Phase 1)

---

## Feature Deep Dive: Member Profile (Phase 2)

### What Members Can See
Everything Grist has on record for them:
- **Personal**: Name, email, phone, address
- **Membership**: Type, status, membership number, join date
- **Boat**: Name, make/model, length, sail number
- **Mooring**: Ball number, location
- **Family**: Other members on the same membership
- **History**: How long they've been a member, past statuses

### Data Integrity Model
Members can **view** but not directly **edit** their information. Why?
- Grist is the source of truth
- Some fields have implications (mooring assignments, fees, etc.)
- Prevents accidental data corruption

Instead, members can:
- **Flag for review**: "This is incorrect" with a note
- **Submit update request**: Structured form for common changes (new phone, address change)
- Admin/board reviews and makes changes in Grist
- Member sees updated info on next sync

### Boat & Mooring Information
This is particularly useful info for members to verify:
- "Is my mooring ball correctly recorded?"
- "Does the club have my boat's correct dimensions?" (matters for fees)
- "Is my boat type right for racing handicaps?"

---

## Feature Deep Dive: Insurance Submission (Phase 3)

### Current Pain Point
Members must submit proof of insurance annually. Currently done via email, which is:
- Hard to track
- Easy to lose
- No automated reminders
- No self-service status checking

### Portal Solution

**Member Experience:**
1. Log in to portal
2. Go to "Insurance" section
3. See current status: ✅ Valid until [date] / ⚠️ Expiring Soon / ❌ Expired/Missing
4. Upload new insurance document (PDF, image)
5. Enter policy details (carrier, policy #, expiration date)
6. Submit for review
7. Track status: Submitted → Under Review → Approved / Rejected

**Board/Admin Experience:**
- Queue of pending insurance submissions
- View document, verify details
- Approve or reject with notes
- Dashboard of compliance status across all members
- Export list of non-compliant members

**Automated Reminders:**
- 30 days before expiration: "Your insurance expires soon"
- 7 days before: "Reminder: Insurance expiring"
- Day of / past due: "Your insurance has expired - submit immediately"

---

## Feature Deep Dive: Communications (Phase 4)

### Newsletter (New Club Publication)
A newsletter authored and distributed entirely through the portal.

**For Editors/Board:**
- Compose issues in the portal using a rich text editor
- Structure with sections (Commodore's Message, Upcoming Events, Member Spotlight, etc.)
- Embed photos and links
- Save drafts, preview before publishing
- Publish immediately or schedule for later
- Auto-distribute via email to all members on publish

**For Members:**
- Read current and past issues in the portal
- Receive email when new issue is published (full content or teaser + link)
- Searchable archive of past issues

**Technical Approach:**
- Rich text editor (TipTap, Lexical, or React-Quill)
- Store content in Grist or app database
- Email integration (SendGrid, AWS SES, Resend) for distribution
- Simple workflow: Draft → Preview → Publish → Email

### Announcements
- One-way communication from board to members
- Short, timely notices (not full articles)
- Posted by board members / admin
- Categories: General, Safety, Events, Harbour, etc.
- Optional email notification for important announcements
- Displayed on portal dashboard
- Archive of past announcements

**Newsletter vs. Announcements:**
| | Announcements | Newsletter |
|---|---------------|------------|
| Length | Short (a paragraph) | Long (multiple sections) |
| Frequency | As needed | Periodic (monthly? seasonal?) |
| Author | Any board member | Designated editor(s) |
| Email | Optional | Always |

### Message Board / Forum
*Deferred for now.* 

Evaluate after other features are live. Options:
- Homebrew with Grist (if tight integration wanted)
- Slack/Discord (free, already exists)
- Hosted forum like Discourse (if demand warrants)

For now, discussions can happen in existing channels (Facebook group, email, etc.).

### Document Library
Static repository of club documents:
- Club bylaws and rules
- Forms (insurance, guest registration, etc.)
- Meeting minutes
- Guides (new member handbook, mooring map, etc.)

Simple implementation: Grist table with title, category, file attachment, upload date.

### Event Calendar
*Could be Phase 4 or later.*
- Club events, races, social gatherings
- Sync with external calendar (Google Calendar embed?)
- RSVP capability (optional)
- Ties into announcements ("Don't forget: Spring Social this Saturday!")

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
- Message board replies
- All configurable per-member

### Mobile-Friendly
Not a native app, but:
- Fully responsive web design
- Works great on phone browsers
- PWA capability for "add to home screen"
- Touch-friendly interactions

---

## Confirmed Requirements (Job Board)

### Work Obligation Model

**Hours Requirement:**
- Determined by membership type (stored in Grist)
- Some membership classes have zero obligation (e.g., Dormant, Ex Member, Lifetime)
- Unfulfilled hours result in a fee ($/hour buyout rate - TBD: what is the rate?)

**Membership Types & Work Obligations (2025):**

| Type | Count | WO Required | Notes |
|------|-------|-------------|-------|
| Senior Sailor | 72 | 30 hrs | Primary sailing membership (some show 0 - exceptions?) |
| Family | 68 | 0 hrs | Family members on a Senior Sailor membership (hours pooled) |
| Consortium | 10 | 10 hrs | Boat co-owners (NOT spouses) - tracked separately |
| Fleet Member | 9 | 10 hrs | Use of shared fleet boats |
| Paddler | 7 | 9 hrs | Kayak/paddle members |
| Paddler - Shared | 4 | 9 hrs | Shared paddle membership |
| Paddler - 2 Boats | 1 | 0 hrs | |
| Dormant | 23 | 0 hrs | Inactive members |
| Lifetime | 3 | 0 hrs | Honorary/lifetime members |
| Ex Member | 55 | 0 hrs | Former members |

**Family/Shared Memberships:**
- Spouses/partners share a membership number
- Their volunteer hours are pooled together toward the shared obligation
- Consortium memberships (boat co-owners who are NOT spouses) are tracked separately

### Signup & Logging Rules

**Prevent Double-Booking:**
- A member cannot sign up for two conflicting roles on the same day (e.g., both DO and Shuttle)
- System should enforce: one person = one role per day
- Spouses doing both roles together should each sign up for their own role

**Signing Up on Behalf of Others:**
- Members CAN sign up or log hours for other members (like a bulletin board)
- Common scenario: one spouse signs up both themselves and their partner
- System must track BOTH:
  - **Who did the work** (the volunteer getting credit)
  - **Who entered the data** (for audit trail)
- This replaces the legacy problem where spouses weren't in the system

**Data Integrity:**
- New system syncs with Grist membership - all members (including spouses) are available
- No more "member not found" issues from legacy system
- All family members under a membership number appear in dropdowns

### Volunteer Work Types

**1. Recurring Seasonal Jobs (Duty Officer & Shuttle Driver)**
- Required every Saturday, Sunday, and Ontario statutory holidays
- Sailing season: ~mid-April to ~mid/late October (exact dates vary yearly)
- These form a "sign-up sheet" members can browse and claim
- Need: Bulk generation of these slots at season start

**2. Special Event Jobs**
- Posted by board members on an ad-hoc basis before events
- Need: UI for board members to create job postings

**3. Ad-Hoc Volunteer Work**
- Members perform work on their own initiative
- Log hours after the fact
- Examples: grounds maintenance, boat help, etc.

### Approval Workflow

- **All logged hours require approval**
- Each job category has a designated board member responsible
- That board member approves/rejects hours for their category
- Need: Clear assignment of categories → approvers

### Permissions Model

| Role | Can Do |
|------|--------|
| Member | View job board, sign up for jobs, log ad-hoc hours, view own status |
| Board Member | All member abilities + post jobs + approve hours in their category |
| Admin | All abilities + system configuration + reports + manual adjustments |

### Authentication

- **Primary identifier**: Member's email address in Grist
- **Auth methods** (flexible):
  - Google OAuth
  - Other common OAuth providers (Microsoft, Apple?)
  - Email/password
  - Email magic link (passwordless)
- Must match against email in Member_List table

### User Experience

- **Responsive design**: Equal experience on mobile and desktop
- Not a native app - web-based
- PWA capabilities optional but nice-to-have

---

## Open Questions

1. ~~**Buyout rate**~~: **$25/hour** (+ HST = $28.25) - confirmed from Mooring_Rates table

2. ~~**Statutory holidays**~~: **Auto-generate if reliable**, otherwise manual fallback
   - Use Ontario statutory holidays for the season
   - Must be accurate - verify library/data source before committing
   - Ontario holidays: New Year's, Family Day, Good Friday, Victoria Day, Canada Day, 
     Civic Holiday (Aug), Labour Day, Thanksgiving, Christmas, Boxing Day
   - Only relevant ones during sailing season (~April-October): Good Friday, Victoria Day, 
     Canada Day, Civic Holiday, Labour Day, Thanksgiving

3. ~~**Multiple signups**~~: **Depends on job type**
   - **Duty Officer / Shuttle Driver**: Exactly 1 volunteer per slot
   - **Special events**: Configurable number of volunteers needed (e.g., 3 for setup, 3 for cleanup)
   - Job posting should specify "volunteers needed" count
   - Job is "filled" when all slots are claimed

4. ~~**Hours per shift**~~: Confirmed from 2025 hours report:
   - **Duty Officer**: 9 hours
   - **Shuttle Driver**: 8 hours

5. ~~**Season configuration**~~: 
   - Dates vary yearly (depends on crane booking for dock in/out)
   - Known in early spring before season starts
   - Admin configures start/end dates each year
   - System generates DO/Shuttle slots based on these dates

6. **Category → Board Member mapping**: Currently Roles table has no FK to Member_List. 
   - **Proposed**: Track board membership by year with proper member references
   - This enables: historical record, proper auth lookup, year-over-year reporting

7. ~~**Notifications**~~: **Key new feature** - legacy system lacked notifications, which was a pain point.
   See detailed notification requirements below.

8. ~~**Cancellation policy**~~: 
   - Members can cancel/remove themselves from signups
   - Last-minute cancellations frowned upon but allowed (emergencies happen)
   - "Call in sick" mechanism for illness/emergency
   - Cancellation triggers notification to board member so replacement can be found
   - Consider: tracking cancellation history for repeat offenders?

---

## Notifications (New Feature)

Lack of notifications was a major pain point in the legacy system. The new system should have robust email notifications.

### Notification Types - ALL CONFIRMED AS WANTED

**For Members:**
- [x] Confirmation when you sign up for a job
- [x] Reminder before your upcoming shift (timing TBD - 1 day? morning of?)
- [x] Alert when your submitted hours are approved
- [x] Alert when your submitted hours are rejected (with reason)
- [x] Season summary of your hours

**For Board Members:**
- [x] Alert when someone signs up for a job in your category
- [x] Alert when someone CANCELS a job in your category (so replacement can be found)
- [x] Alert when hours are submitted for approval in your category
- [x] Weekly digest of pending approvals
- [x] Alert when a job in your category is approaching with no signup

**For Admins:**
- [x] Unfilled shifts approaching (X days out)
- [x] Weekly/monthly activity summary

### Implementation Priority
**Phase 1 (Must-have for launch):**
- Shift reminder (before your job)
- Cancellation alert to board member
- Hours approved/rejected notification
- Pending approval alert for board members

**Phase 2 (Soon after launch):**
- Signup confirmation
- Unfilled shifts warning
- Board member signup notification

**Phase 3 (Nice-to-have):**
- Weekly digests
- Season summaries
- Activity summaries

### Potential Future Feature: Signup Compliance Reminders
**Pain point**: Days with no Shuttle Driver signed up

**Possible approach** (needs team discussion):
- Deadline by which members must sign up for at least 1 DO or SD shift
- Automated reminders/"harassment" to members who haven't signed up by deadline
- Escalating reminders? (friendly → firm → final warning)
- Report of non-compliant members for board review

**Questions for team:**
- What is the deadline (e.g., May 1st? 2 weeks after season opens?)
- How many DO/SD shifts are members expected to sign up for?
- What are consequences of not signing up?
- Who receives the compliance report?

### Open Questions
- Preferred reminder timing: 1 day before? 2 days? Morning of?
- Digest frequency: Weekly? Daily for board members?

---

## Key Feature: Real-Time Board Visibility

Board members responsible for specific categories need **real-time visibility** into volunteer hours:

### Dashboard for Board Members
Each board member should see for their category:
- **Pending approvals** - Hours submitted, awaiting their review
- **Recent activity** - Recently approved/logged hours
- **Upcoming jobs** - Scheduled jobs in their category and signup status
- **Unfilled slots** - Jobs needing volunteers

### Visibility Requirements
- **Real-time updates** - No stale data; see submissions as they happen
- **Filterable by date range** - Current week, month, season, custom
- **Member drill-down** - Click to see individual member's full history
- **Export capability** - Download data for reporting

### Category Ownership
Each job category is the domain of **exactly one board member** (no deputies/backups).

**Purpose**: Category ownership is purely for the **approval workflow** - determining who approves hours logged in that category. It is NOT for compartmentalizing visibility or reporting.

| Category | Board Position |
|----------|----------------|
| Duty Officer | Duty Officer Director |
| Shuttle Driver | Duty Officer Director |
| House & Grounds | H&G Director |
| Harbour | Harbour Master |
| Social | Social Director |
| Race | Race Director |
| Fleet Program | Fleet Captain (TBD) |
| Safety | Safety Officer |
| Communications | Communications Director |
| Other/Special | Commodore |

_Note: Need to confirm these mappings._

### Visibility Model
- **Small club, no compartmentalization** - Everyone with board/admin access can see all data
- Board members can approve hours **only for their category**
- Reporting is club-wide, not siloed by category

---

## High-Level Requirements (Job Board - Phase 1)

### R1: Member Dashboard
Members see their work obligation status at a glance:
- Hours required for the season
- Hours completed (approved)
- Hours pending approval
- Hours remaining / surplus
- For shared memberships: combined household total
- History of all volunteer work

### R2: Job Board / Sign-Up Sheets
A **visual bulletin board** metaphor with signup sheets that look like paper forms:

#### UX Concept
- Main view resembles a **bulletin board** with pinned signup sheets
- Each sheet looks like a **physical paper form** with fillable slots
- Interactive form controls for signing up (dropdowns, buttons)
- Visual feedback when slots are filled vs. open

#### Signup Sheet Types

**1. Duty Officer & Shuttle Driver (Combined Sheet)**
- One sheet covers the entire season
- Calendar/list format showing each Saturday, Sunday, and holiday
- Each date has TWO slots: Duty Officer + Shuttle Driver
- Members click to claim an open slot

**2. Event Signup Sheets**
- Created by board members for special events
- Custom title, description, date
- Configurable number of volunteer slots (e.g., "Setup: 3 needed", "Cleanup: 3 needed")
- Each sheet is a separate "paper" on the board

#### Visual Design Ideas
- Paper texture / slightly askew pinned look
- Handwriting-style font for headers (optional)
- Checkmarks or filled-in appearance for claimed slots
- Member's name appears when they sign up
- "Full" badge when all slots claimed

#### Functionality
- Filter/search by date range
- Show only sheets with open slots
- "My Signups" view to see your commitments
- Cancel signup (with confirmation)

### R3: Ad-Hoc Work Logging
Submit hours for unscheduled volunteer work:
- Select category (determines approver)
- Enter date, hours, description
- Track submission status
- Receive notification when approved/rejected

### R4: Job Posting (Board Members)
Create volunteer opportunities:
- **Bulk generation**: Create Duty Officer + Shuttle Driver slots for entire season
  - Input: season start date, end date
  - Auto-generate for all Saturdays, Sundays, statutory holidays
- **Single job posting**: For special events
  - Title, description, category, date, hours, # of volunteers needed
- View signups for posted jobs
- Send reminders for unfilled slots

### R5: Hour Approval (Board Members)
Review and approve submitted hours:
- See pending hours in your category
- Approve or reject with optional comment
- View approval history

### R6: Administration
System management for admins:
- View all members and work status
- Manual hour adjustments (credits, corrections)
- Configure season dates
- Manage job categories and approvers
- Generate reports:
  - Member hours summary
  - Unfulfilled obligations
  - Job board utilization
  - Export for billing/fees

### R7: Authentication & Authorization
Secure, flexible access:
- Login via Google, Microsoft, or email/password
- Email must match Member_List record
- Role-based access (Member, Board Member, Admin)
- Session management

---

## User Stories (Job Board - Phase 1)

### Member Stories

**US-M1**: As a member, I want to see my work obligation status so I know how many hours I still need to complete.

**US-M2**: As a member, I want to browse available jobs so I can find opportunities that fit my schedule.

**US-M3**: As a member, I want to sign up for a job with one click so the process is quick and easy.

**US-M4**: As a member, I want to see my upcoming commitments so I don't forget scheduled volunteer work.

**US-M5**: As a member, I want to log ad-hoc volunteer work so I get credit for work I did outside the job board.

**US-M6**: As a member, I want to see the status of my submitted hours so I know if they've been approved.

**US-M7**: As a member in a shared membership, I want to see combined household hours so I understand our family's total progress.

**US-M8**: As a member, I want to cancel a job signup if I can no longer attend.

### Board Member Stories

**US-B1**: As a board member, I want to generate the season's Duty Officer and Shuttle Driver slots in bulk so I don't have to create them one by one.

**US-B2**: As a board member, I want to post special event jobs so members can sign up for them.

**US-B3**: As a board member, I want to see who has signed up for jobs in my area so I can plan accordingly.

**US-B4**: As a board member, I want to approve or reject submitted hours in my category so members get proper credit.

**US-B5**: As a board member, I want to see unfilled upcoming jobs so I can recruit volunteers.

### Admin Stories

**US-A1**: As an admin, I want to view all members' work status so I can identify those behind on obligations.

**US-A2**: As an admin, I want to manually adjust hours so I can handle special cases and corrections.

**US-A3**: As an admin, I want to configure the season dates so the system knows the active period.

**US-A4**: As an admin, I want to manage job categories and assign approvers so the workflow is correct.

**US-A5**: As an admin, I want to generate reports of unfulfilled obligations so we can calculate fees owed.

**US-A6**: As an admin, I want to manage user roles so the right people have the right access.

---

## Open Design Decisions

### Grist Integration Strategy
- **Option A**: Grist as pure backend API - React app handles all UI
- **Option B**: Hybrid - React for member-facing, Grist UI for admin functions
- **Recommendation**: Option A for consistency, but leverage Grist views for quick reports

### Recurring Job Generation
- Auto-generate on season config save?
- Or manual "Generate Season Jobs" button?
- How to handle Ontario statutory holidays? (Manual list vs. API/library)

### Consortium Membership Handling
- Currently members share a Membership_Number but are tracked separately
- Need to identify consortium vs. family memberships
- Is there a field that distinguishes these, or need to add one?

### Email Notifications
- What email service to use? (SendGrid, AWS SES, etc.)
- Which notifications are essential vs. nice-to-have?

---

## Technical Considerations

### Frontend Stack (Proposed)
- **React** with TypeScript
- **Vite** for build tooling
- **TanStack Query** for data fetching/caching
- **React Router** for navigation
- **Tailwind CSS** for styling
- **shadcn/ui** or similar component library

### Backend
- **Grist API** as primary data store
- **Auth provider** (Auth0, Clerk, or Firebase Auth) for authentication
- **Serverless functions** (if needed) for complex operations

### Hosting
- Static site hosting (Vercel, Netlify, Cloudflare Pages)
- Or self-hosted if preferred

---

## Next Steps

1. ✅ Document confirmed requirements
2. ⬜ Answer remaining open questions
3. ⬜ Finalize data model (update proposed-schema.md)
4. ⬜ Design UI/UX (wireframes or mockups)
5. ⬜ Plan implementation phases
6. ⬜ Set up project structure
7. ⬜ Build iteratively

---

## Notes

_This is a living document. Add answers and refinements as we discuss._

---

## Brainstorming Notes

### Why "Member Portal" vs. "Work Management System"?
- Work tracking is just ONE thing members care about
- Members want to see their boat info, mooring, insurance status
- Creates a foundation for future features
- More engaging - "here's YOUR stuff" vs. "do your chores"
- Portal becomes the go-to place for member-club interaction

### What Makes This Valuable?
1. **Self-service**: Members don't have to email/call for basic info
2. **Accuracy**: Members verify their own data, catch errors
3. **Convenience**: Submit insurance from your phone
4. **Community**: A club-specific space for discussions
5. **Transparency**: See your obligations, status, history

### Potential Member Reactions
- "Oh cool, I can see my mooring assignment"
- "Wait, my boat length is wrong - let me flag that"
- "Nice, I can submit insurance without digging for that email"
- "Good to know I'm at 15 hours for the year"
- "Someone's selling a dinghy!"

### Risks / Concerns
- **Scope creep**: Keep Phase 1 focused on job board
- **Data sync**: Grist must be the source of truth
- **Adoption**: Will members actually use it?
- **Moderation**: Message board needs light oversight
- **Maintenance**: More features = more to maintain

### Questions to Ponder
- What's the club's appetite for a message board?
- Is the insurance submission process worth automating?
- What other "paperwork" do members deal with annually?
- Are there features the BOARD wants that would make their lives easier?
