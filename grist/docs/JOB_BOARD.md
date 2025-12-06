# Job Board

Volunteer work obligation tracking and job signup system.

**Status:** 🔨 Building First

**Schema:** [Jobs, Job_Signups, Work_Log, Hour_Adjustments, Board_Members, Job_Categories](./PROPOSED_SCHEMA.md#job-board-tables)

---

## Overview

The Job Board allows members to:
- See their work obligation status
- Browse and sign up for volunteer jobs
- Log ad-hoc volunteer hours
- Track confirmation status

Board members can:
- Post jobs and events
- Confirm submitted hours
- Monitor signup status

---

## Work Obligation Model

### Hours Requirement
- Determined by membership type (stored in Grist)
- Some membership classes have zero obligation (e.g., Dormant, Ex Member, Lifetime)
- **Board members are exempt** - serving on the board counts as their volunteer contribution (0 hours required)
- Unfulfilled hours result in a buyout fee: **$25/hour** (+ HST = $28.25)

### Board Member Exemption

Members serving on the board in the current season are **automatically exempt** from work hour requirements:

- Board membership tracked by year in the `Board_Members` table
- Any member with a record for the current season has:
  - **0 hours required** (regardless of membership type)
  - **Board member privileges** in the app
- Historical board service preserved for reporting
- Mid-season appointments: effective immediately upon being added
- Mid-season departures: exemption ends, pro-rated hours may apply

**Board Positions:**
- Commodore
- Vice Commodore  
- Treasurer
- Secretary
- Harbour Master
- Fleet Captain
- Duty Officer Director
- H&G Director
- Social Director
- Race Director
- Safety Officer
- Communications Director
- Member at Large

### Membership Types & Work Obligations (2025)

| Type | Count | Hours Required | Notes |
|------|-------|----------------|-------|
| Senior Sailor | 72 | 30 hrs | Primary sailing membership |
| Family | 68 | 0 hrs | Family members on a Senior Sailor membership (hours pooled) |
| Consortium | 10 | 10 hrs | Boat co-owners (NOT spouses) - tracked separately |
| Fleet Member | 9 | 10 hrs | Use of shared fleet boats |
| Paddler | 7 | 9 hrs | Kayak/paddle members |
| Paddler - Shared | 4 | 9 hrs | Shared paddle membership |
| Paddler - 2 Boats | 1 | 0 hrs | |
| Dormant | 23 | 0 hrs | Inactive members |
| Lifetime | 3 | 0 hrs | Honorary/lifetime members |
| Ex Member | 55 | 0 hrs | Former members |

### Family/Shared Memberships
- Spouses/partners share a membership number
- Their volunteer hours are pooled together toward the shared obligation
- Consortium memberships (boat co-owners who are NOT spouses) are tracked separately

### Hour Adjustments

While membership type defines the **base hours** required per season, board members can apply **adjustments** to individual members for specific years.

**Adjustment Types:**

| Type | Hours | Example Scenario |
|------|-------|------------------|
| Pro-rated start | Negative | Member joined mid-season (25 → 15 hrs) |
| No-show penalty | Positive | Missed a Duty Officer shift without notice (+5 hrs) |
| Medical/hardship | Negative | Injury prevented participation (-10 hrs) |
| Board discretion | +/- | Special circumstances |

**Rules:**
- All adjustments are **manual** - only board members can create them
- Adjustments apply to a **specific member** and **specific season**
- A **comment is always required** explaining the reason
- Multiple adjustments can exist for the same member/season
- Adjustments stack additively with base hours

**Calculation:**
```
Effective Requirement = Base Hours (from membership type) + Sum of Adjustments
```

**Example:**
- Sarah is a Senior Sailor → base requirement: 30 hours
- Joined August 15 (pro-rated): -15 hours adjustment
- **Effective requirement: 15 hours** for the season

**Another Example:**
- Tom is a Senior Sailor → base requirement: 30 hours  
- No-showed his Duty Officer shift: +5 hours adjustment
- **Effective requirement: 35 hours** for the season

**Audit Trail:**
Each adjustment records:
- Who made the adjustment
- When it was made
- Reason/comment (required)
- The adjustment amount (+/-)

---

## Volunteer Work Types

### 1. Recurring Seasonal Jobs (Duty Officer & Shuttle Driver)
- Required every Saturday, Sunday, and Ontario statutory holidays
- Sailing season: ~mid-April to ~mid/late October (admin configures dates each year)
- Bulk generated at season start
- **Duty Officer**: 9 hours per shift
- **Shuttle Driver**: 8 hours per shift

**Statutory holidays during sailing season:**
- Good Friday, Victoria Day, Canada Day, Civic Holiday, Labour Day, Thanksgiving

**Holiday Date Source:**
- At the start of each season, fetch Ontario statutory holiday dates from a public API or official listing
- Recommended: [Canada Public Holidays API](https://canada-holidays.ca/api) or [Government of Canada open data](https://www.canada.ca/en/revenue-agency/services/tax/public-holidays.html)
- Holidays are stored with the season configuration and used during bulk job generation
- Admin can review/override dates if needed before generating the schedule

### 2. Special Event Jobs
- Posted by board members on an ad-hoc basis before events
- Configurable number of volunteers needed (e.g., "Setup: 3 needed")

### 3. Ad-Hoc Volunteer Work
- Members perform work on their own initiative
- Log hours after the fact
- Examples: grounds maintenance, boat help, etc.

---

## Signup & Logging Rules

### Prevent Double-Booking
- A member cannot sign up for two conflicting roles on the same day (e.g., both Duty Officer and Shuttle Driver)
- One person = one role per day
- Spouses doing both roles together should each sign up for their own role

### Signing Up on Behalf of Others
- Members CAN sign up or log hours for other members (like a bulletin board)
- Common scenario: one spouse signs up both themselves and their partner
- System tracks BOTH:
  - **Who did the work** (the volunteer getting credit)
  - **Who entered the data** (for audit trail)

### Cancellations
- Members can cancel/remove themselves from signups
- **Last-minute cancellations require an explanation**
  - "Last-minute" = within 48 hours of the job start
  - Reason is required (free-text field)
  - Reason is visible to the board member responsible for that category
- Early cancellations (48+ hours out) do not require a reason
- All cancellations trigger notification to board member so replacement can be found

---

## Confirmation Workflow

- **All logged hours require confirmation**
- Each job category has a designated board member responsible
- That board member confirms/rejects hours for their category

### Confirmation Actions

When reviewing submitted hours, board members can:

1. **Confirm as submitted** - Hours credited exactly as logged
2. **Confirm with adjustment** - Modify hours up or down (requires comment)
   - "Showed up 1 hour late" → reduce hours
   - "Stayed extra to help cleanup" → increase hours
3. **Reject** - No hours credited (requires reason + comment)
   - No-show, event cancelled, duplicate entry, etc.

### Category Ownership

| Category | Board Position |
|----------|----------------|
| Duty Officer | Duty Officer Director |
| Shuttle Driver | Duty Officer Director |
| House & Grounds | H&G Director |
| Harbour | Harbour Master |
| Social | Social Director |
| Race | Race Director |
| Fleet Program | Fleet Captain |
| Safety | Safety Officer |
| Communications | Communications Director |
| Other/Special | Commodore |

---

## Permissions Model

| Role | Capabilities |
|------|--------------|
| Member | View job board, sign up for jobs, log ad-hoc hours, view own status |
| Board Member | All member abilities + post jobs + confirm hours in their category + hour adjustments |
| Admin | All abilities + system configuration + reports + manage board members |

### Board Member Privileges

Board member status is determined by the `Board_Members` table:

```
IF member has Board_Members record for current season:
  → Grant board member privileges
  → Set work hours required = 0
ELSE:
  → Standard member privileges
  → Work hours from membership type
```

**Privilege Assignment:**
- Automatic based on current season's board roster
- No manual role assignment needed
- Updates immediately when board roster changes
- Each board position maps to approval categories (see Category Ownership below)

---

## Notifications

### For Members
- Confirmation when you sign up for a job
- Reminder before your upcoming shift
- Alert when your submitted hours are confirmed/rejected
- Season summary of your hours

### For Board Members
- Alert when someone signs up for a job in your category
- Alert when someone cancels a job in your category
- Alert when hours are submitted for confirmation
- Weekly digest of pending confirmations
- Alert when a job is approaching with no signup

### For Admins
- Unfilled shifts approaching (X days out)
- Weekly/monthly activity summary

### Notification Priority
**Must-have for launch:**
- Shift reminder (before your job)
- Cancellation alert to board member
- Hours confirmed/rejected notification
- Pending confirmation alert for board members

**Soon after launch:**
- Signup confirmation
- Unfilled shifts warning

**Nice-to-have:**
- Weekly digests
- Season summaries

### Open Questions
- Preferred reminder timing: 1 day before? 2 days? Morning of?
- Digest frequency: Weekly? Daily for board members?

---

## High-Level Requirements

### R1: Member Dashboard
Members see their work obligation status at a glance:
- **Base hours** from membership type
- **Adjustments** applied (if any) with reasons
- **Effective hours required** for the season
- Hours completed (confirmed)
- Hours pending confirmation
- Hours remaining / surplus
- For shared memberships: combined household total
- History of all volunteer work

**Hours Breakdown Example:**
```
Base requirement (Senior Sailor):    30 hrs
Pro-rated start (joined Aug 15):    -15 hrs
─────────────────────────────────────────
Effective requirement:               15 hrs
Completed:                            8 hrs
Pending confirmation:                 3 hrs
─────────────────────────────────────────
Remaining:                            4 hrs
```

### R2: Job Board / Sign-Up Sheets
A **visual bulletin board** metaphor with signup sheets that look like paper forms.

**UX Concept:**
- Main view resembles a bulletin board with pinned signup sheets
- Each sheet looks like a physical paper form with fillable slots
- Interactive form controls for signing up
- Visual feedback when slots are filled vs. open

**Signup Sheet Types:**

1. **Duty Officer & Shuttle Driver (Combined Sheet)**
   - One sheet covers the entire season
   - Calendar/list format showing each Saturday, Sunday, and holiday
   - Each date has TWO slots: Duty Officer + Shuttle Driver
   - Members click to claim an open slot

2. **Event Signup Sheets**
   - Created by board members for special events
   - Custom title, description, date
   - Configurable number of volunteer slots

**Visual Design Ideas:**
- Paper texture / slightly askew pinned look
- Checkmarks or filled-in appearance for claimed slots
- Member's name appears when they sign up
- "Full" badge when all slots claimed

**Functionality:**
- Filter/search by date range
- Show only sheets with open slots
- "My Signups" view to see your commitments
- Cancel signup (with confirmation)

### R3: Ad-Hoc Work Logging
Submit hours for unscheduled volunteer work:
- Select category (determines who confirms)
- Enter date, hours, description
- Track submission status
- Receive notification when confirmed/rejected

### R4: Job Posting (Board Members)
Create volunteer opportunities:
- **Bulk generation**: Create Duty Officer + Shuttle Driver slots for entire season
  - Input: season start date, end date
  - Auto-generate for all Saturdays, Sundays, statutory holidays
- **Single job posting**: For special events
  - Title, description, category, date, hours, # of volunteers needed
- View signups for posted jobs

### R5: Hour Confirmation (Board Members)
Review and confirm submitted hours:
- See pending hours in your category
- **Confirm**: Accept hours as submitted, or adjust hours up/down
- **Reject**: Decline hours with required reason and comment
- View confirmation history

**Confirmation Options:**

| Action | Fields Required |
|--------|----------------|
| Confirm (as-is) | None |
| Confirm (adjusted) | New hour amount + comment explaining adjustment |
| Reject | Rejection reason + comment |

**Rejection Reasons:**
- `No-Show` - Member did not show up for the work
- `Event Cancelled` - The event/work was cancelled
- `Duplicate` - Hours already logged elsewhere
- `Other` - Requires detailed explanation in comment

**Hour Adjustments (during confirmation):**
- Board member can adjust hours up, down, or even negative
- **Positive adjustment**: "Stayed extra 2 hours to help cleanup"
- **Reduced hours**: "Left 1 hour early", "Arrived 30 min late"
- **Negative hours (penalty)**: "No-show without notice" → e.g., -5 hours as penalty
- Comment required to explain any adjustment
- Member sees both submitted and confirmed hours

**Example - No-Show Penalty:**
```
Submitted hours:   8 hrs (Duty Officer shift)
Confirmed hours:  -5 hrs (penalty)
Comment:          "No-show without notice. Must arrange replacement."
```
This adds 5 hours to the member's remaining obligation instead of crediting any.

### R6: Administration
System management for admins:
- View all members and work status
- Configure season dates
- Manage job categories and approvers
- Generate reports:
  - Member hours summary
  - Unfulfilled obligations
  - Job board utilization
  - Export for billing/fees

### R7: Hour Adjustments (Board Members)
Modify individual member's hour requirements:
- Create adjustment for a specific member and season
- Select adjustment type:
  - **Pro-rated start** - member joined mid-season
  - **No-show penalty** - missed scheduled duty without notice
  - **Medical/hardship** - accommodation for health issues
  - **Board discretion** - other approved circumstances
- Enter hours (+/-) and **required comment**
- View adjustment history for any member
- Adjustments visible to the affected member on their dashboard

**UI Workflow:**
1. Navigate to member's profile or search for member
2. Click "Adjust Hours" button
3. Select season (defaults to current)
4. Choose adjustment reason from dropdown
5. Enter hours (negative to reduce, positive to add)
6. Enter required comment explaining the adjustment
7. Submit - member's effective requirement updates immediately

---

## Board Member Dashboard

Board members need real-time visibility into volunteer hours:

- **Pending confirmations** - Hours submitted, awaiting their review
- **Recent activity** - Recently confirmed/logged hours
- **Upcoming jobs** - Scheduled jobs in their category and signup status
- **Unfilled slots** - Jobs needing volunteers

**Visibility Requirements:**
- Real-time updates - no stale data
- Filterable by date range
- Member drill-down - click to see individual history
- Export capability

**Visibility Model:**
- Small club, no compartmentalization - everyone with board/admin access can see all data
- Board members can confirm hours only for their category
- Reporting is club-wide, not siloed

---

## User Stories

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

### Hour Adjustment Stories

**US-H1**: As a board member, I want to pro-rate a new member's hours when they join mid-season so they have a fair obligation.

**US-H2**: As a board member, I want to add penalty hours when a member no-shows a scheduled duty so there are consequences for unreliability.

**US-H3**: As a board member, I want to reduce a member's hours for medical or hardship reasons so we can accommodate special circumstances.

**US-H4**: As a member, I want to see any adjustments applied to my account so I understand my actual hour requirement.

**US-H5**: As an admin, I want to view all adjustments with their reasons so I have an audit trail of hour modifications.

### Board Member Stories

**US-BM1**: As an admin, I want to add members to the board for a season so they automatically get board privileges.

**US-BM2**: As an admin, I want to assign board positions (Commodore, Harbour Master, etc.) so the right people can approve hours in their category.

**US-BM3**: As a board member, I want my work hours to be automatically waived so I don't have to track volunteer hours while serving.

**US-BM4**: As an admin, I want to view the board roster history so I can see who served in previous years.

**US-BM5**: As a member, I want to see that I'm exempt from work hours when I'm on the board so I understand my status.

---

## Open Questions

1. ~~**Category → Board Member mapping**: Currently Roles table has no FK to Member_List.~~
   - ✅ **Resolved**: New `Board_Members` table tracks board membership by year with proper member references
   - Enables: historical record, automatic privilege assignment, year-over-year reporting
   - Board members for current season automatically get board privileges and 0 hour requirement

2. **Signup compliance reminders**: Should there be a deadline by which members must sign up for at least one Duty Officer or Shuttle Driver shift?
   - What is the deadline?
   - How many shifts are expected?
   - What are consequences of not signing up?
