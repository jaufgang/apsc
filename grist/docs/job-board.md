# Job Board

Volunteer work obligation tracking and job signup system.

**Status:** 🔨 Building First

---

## Overview

The Job Board allows members to:
- See their work obligation status
- Browse and sign up for volunteer jobs
- Log ad-hoc volunteer hours
- Track approval status

Board members can:
- Post jobs and events
- Approve submitted hours
- Monitor signup status

---

## Work Obligation Model

### Hours Requirement
- Determined by membership type (stored in Grist)
- Some membership classes have zero obligation (e.g., Dormant, Ex Member, Lifetime)
- Unfulfilled hours result in a buyout fee: **$25/hour** (+ HST = $28.25)

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
- Last-minute cancellations allowed (emergencies happen)
- Cancellation triggers notification to board member so replacement can be found

---

## Approval Workflow

- **All logged hours require approval**
- Each job category has a designated board member responsible
- That board member approves/rejects hours for their category

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
| Board Member | All member abilities + post jobs + approve hours in their category |
| Admin | All abilities + system configuration + reports + manual adjustments |

---

## Notifications

### For Members
- Confirmation when you sign up for a job
- Reminder before your upcoming shift
- Alert when your submitted hours are approved/rejected
- Season summary of your hours

### For Board Members
- Alert when someone signs up for a job in your category
- Alert when someone cancels a job in your category
- Alert when hours are submitted for approval
- Weekly digest of pending approvals
- Alert when a job is approaching with no signup

### For Admins
- Unfilled shifts approaching (X days out)
- Weekly/monthly activity summary

### Notification Priority
**Must-have for launch:**
- Shift reminder (before your job)
- Cancellation alert to board member
- Hours approved/rejected notification
- Pending approval alert for board members

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
- Hours required for the season
- Hours completed (approved)
- Hours pending approval
- Hours remaining / surplus
- For shared memberships: combined household total
- History of all volunteer work

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

---

## Board Member Dashboard

Board members need real-time visibility into volunteer hours:

- **Pending approvals** - Hours submitted, awaiting their review
- **Recent activity** - Recently approved/logged hours
- **Upcoming jobs** - Scheduled jobs in their category and signup status
- **Unfilled slots** - Jobs needing volunteers

**Visibility Requirements:**
- Real-time updates - no stale data
- Filterable by date range
- Member drill-down - click to see individual history
- Export capability

**Visibility Model:**
- Small club, no compartmentalization - everyone with board/admin access can see all data
- Board members can approve hours only for their category
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

---

## Open Questions

1. **Category → Board Member mapping**: Currently Roles table has no FK to Member_List.
   - Proposed: Track board membership by year with proper member references
   - This enables: historical record, proper auth lookup, year-over-year reporting

2. **Signup compliance reminders**: Should there be a deadline by which members must sign up for at least one Duty Officer or Shuttle Driver shift?
   - What is the deadline?
   - How many shifts are expected?
   - What are consequences of not signing up?
