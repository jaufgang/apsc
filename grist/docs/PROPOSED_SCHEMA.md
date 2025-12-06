# Proposed Schema: APSC Bulletin Board

## Overview

Extend the existing Grist database to support the full APSC Bulletin Board application, including:
- **[Job Board](./JOB_BOARD.md)** - Volunteer work tracking and signups
- **[Events & RSVPs](./EVENTS.md)** - Social events, work parties, attendance tracking
- **[Announcements](./ANNOUNCEMENTS.md)** - Official club news
- **[Newsletter](./ANNOUNCEMENTS.md#newsletter)** - Periodic member newsletter
- **[Community Board](./COMMUNITY.md)** - Member-to-member posts (classifieds, crew, general)
- **[Reciprocal Visitors](./RECIPROCAL_VISITORS.md)** - Booking system for visiting sailors
- **[Insurance](./INSURANCE.md)** - Annual insurance submission and tracking
- **[Member Profile](./MEMBER_PROFILE.md)** - View/verify profile info, data change requests

---

## New Tables Required

### Job Board Tables

*Feature details: [JOB_BOARD.md](./JOB_BOARD.md)*

#### Jobs
Posted volunteer jobs that members can sign up for.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| title | Text | Job title (e.g., "Duty Officer - Saturday") |
| category | Ref:Job_Categories | Job category |
| description | Text | Detailed job description |
| date | Date | When the job needs to be done |
| hours | Numeric | Estimated hours for the job |
| slots | Numeric | Number of volunteers needed (default: 1) |
| season | Text | Season year (e.g., "2025") |
| posted_by | Ref:Member_List | Who posted this job |
| posted_date | DateTime | When the job was posted |
| status | Choice | Open / Filled / Completed / Cancelled |

#### Job_Signups
When a member signs up for a posted job.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| job | Ref:Jobs | The job being signed up for |
| volunteer | Ref:Member_List | Member who signed up |
| signed_up_by | Ref:Member_List | Who entered the signup (may differ from volunteer) |
| contact_phone | Text | Phone for this job (may differ from profile) |
| signup_date | DateTime | When they signed up |
| status | Choice | Signed_Up / Completed / Cancelled / No_Show |
| actual_hours | Numeric | Actual hours worked (may differ from estimate) |
| completed_date | DateTime | When marked complete |
| notes | Text | Any notes about the work |

#### Work_Log
For logging volunteer work NOT from the job board (ad-hoc/member-initiated).

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| volunteer | Ref:Member_List | Member who did the work |
| category | Ref:Job_Categories | Job category |
| description | Text | What work was done |
| date | Date | When work was done |
| hours | Numeric | Hours worked |
| season | Text | Season year |
| submitted_by | Ref:Member_List | Who submitted this log entry |
| submitted_date | DateTime | When submitted |
| status | Choice | Pending / Approved / Rejected |
| approved_by | Ref:Member_List | Who approved (if applicable) |
| approved_date | DateTime | When approved |
| notes | Text | Admin notes |

#### Job_Categories
Reference table for job categories.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| name | Text | Category name |
| email | Text | Committee email for this category |
| approver_role | Text | Board position responsible for approvals |
| description | Text | What this category covers |
| active | Bool | Whether this category is active |

**Initial Categories:**
- Duty Officer → duty_officer@aquaticpark.com
- Shuttle Driver → duty_officer@aquaticpark.com
- House & Grounds → h_g@aquaticpark.com  
- Harbor → harbour@aquaticpark.com
- Social → social@aquaticpark.com
- Race → race@aquaticpark.com
- Fleet Program → fleet_program@aquaticpark.com
- Safety → safety@aquaticpark.com
- Communications → communication@aquaticpark.com
- Special Request / Other → commodore@aquaticpark.com

---

### Announcements & Newsletter Tables

*Feature details: [ANNOUNCEMENTS.md](./ANNOUNCEMENTS.md)*

#### Announcements
Official club announcements from the board.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| author_id | Ref:Member_List | Board member who posted |
| title | Text | Announcement title |
| body | Text | Announcement content |
| category | Choice | General / Safety / Events / Harbour / Board |
| send_email | Boolean | Did this trigger an email blast? |
| created_at | DateTime | When posted |

#### Newsletters
Club newsletter issues (Markdown content).

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| title | Text | Issue title (e.g., "Spring 2025 Issue") |
| content | Text | Markdown content |
| author_id | Ref:Member_List | Communications Director |
| status | Choice | Draft / Published |
| published_at | DateTime | When published |
| email_sent | Boolean | Was email blast sent? |

---

### Events Tables

*Feature details: [EVENTS.md](./EVENTS.md)*

#### Events
Club social events, work parties, races.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| title | Text | Event name |
| description | Text | Event details |
| date | Date | Event date |
| time | Text | Start time |
| end_time | Text | Optional end time |
| location | Text | Where (e.g., "Clubhouse", "South Dock") |
| category | Choice | Social / Racing / Work Party / Other |
| organizer_id | Ref:Member_List | Who's organizing |
| rsvp_enabled | Boolean | Is RSVP tracking on? |
| rsvp_deadline | DateTime | Optional deadline for RSVPs |
| max_attendees | Numeric | Optional capacity limit |
| created_at | DateTime | When posted |
| status | Choice | Upcoming / Completed / Cancelled |

#### Event_RSVPs
Member responses to events.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| event_id | Ref:Events | Which event |
| member_id | Ref:Member_List | Who's responding |
| response | Choice | Yes / No / Maybe |
| guest_count | Numeric | Additional guests (default: 0) |
| note | Text | Optional note ("Bringing dessert!") |
| created_at | DateTime | When they RSVPed |
| updated_at | DateTime | Last change |

---

### Community Board Tables

*Feature details: [COMMUNITY.md](./COMMUNITY.md)*

#### Community_Posts
Member-to-member posts (classifieds, crew board, general).

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| member_id | Ref:Member_List | Who posted |
| type | Choice | Classifieds / Crew / General |
| category | Choice | For Sale / Wanted / Free (classifieds only) |
| crew_type | Choice | Looking for Crew / Available to Crew (crew board only) |
| title | Text | Post title |
| body | Text | Post content |
| price | Numeric | Optional (for classifieds) |
| contact_pref | Choice | Show Email / Show Phone / Both |
| status | Choice | Active / Resolved / Expired |
| created_at | DateTime | When posted |
| expires_at | DateTime | Auto-set to created + 60 days |

---

### Reciprocal Visitors Tables

*Feature details: [RECIPROCAL_VISITORS.md](./RECIPROCAL_VISITORS.md)*

#### Reciprocal_Clubs
Partner clubs with reciprocal agreements.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| name | Text | Club name |
| location | Text | City/region |
| website | Text | Club website URL |
| free_nights | Numeric | Number of free nights offered |
| nightly_fee | Numeric | Fee after free nights |
| notes | Text | Visitor policies, amenities, etc. |
| active | Boolean | Is agreement active? |

#### Mooring_Balls
All mooring balls in the harbour with GPS coordinates.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| ball_number | Numeric | Mooring ball number |
| latitude | Numeric | GPS latitude |
| longitude | Numeric | GPS longitude |
| notes | Text | Location notes (e.g., "Near the dock") |
| last_updated | DateTime | When position was last verified |
| updated_by | Ref:Member_List | Who updated it |

#### Visitor_Moorings
Which moorings are available for reciprocal visitors (managed by Harbour Master).

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| mooring_id | Ref:Mooring_Balls | Which mooring ball |
| available_from | Date | When it becomes available |
| available_until | Date | Optional end date |
| notes | Text | e.g., "Member on vacation" |

#### Visitor_Reservations
Visitor booking requests and confirmations.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| visitor_name | Text | Visitor's name |
| visitor_email | Text | Visitor's email |
| visitor_phone | Text | Visitor's phone |
| home_club | Ref:Reciprocal_Clubs | Or Text if club not in list |
| home_club_membership_number | Text | For verification |
| arrival_date | Date | Planned arrival |
| departure_date | Date | Planned departure |
| boat_name | Text | Vessel name |
| boat_length | Numeric | Length in feet |
| boat_draft | Numeric | Draft in feet |
| crew_count | Numeric | Number of people |
| arriving_from_usa | Boolean | CBSA reminder flag |
| special_requests | Text | Any notes |
| assigned_mooring | Ref:Mooring_Balls | Set by Harbour Master |
| status | Choice | Pending / Confirmed / Checked_In / Cancelled / Completed |
| checked_in_at | DateTime | When they scanned QR / checked in |
| created_at | DateTime | When reservation was made |
| notes | Text | Admin notes |

#### Visitor_Blocked_Dates
Dates when visitors cannot be accepted (regatta, crane day, etc.).

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| date | Date | Blocked date |
| reason | Text | Why blocked (e.g., "Regatta weekend") |
| created_by | Ref:Member_List | Who blocked it |

---

### Insurance Tables

*Feature details: [INSURANCE.md](./INSURANCE.md)*

#### Insurance_Submissions
Annual insurance proof submissions.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| member_id | Ref:Member_List | Who submitted |
| carrier | Text | Insurance company |
| policy_number | Text | Policy number |
| expiration_date | Date | When policy expires |
| document_url | Text | Link to uploaded document |
| submitted_at | DateTime | When submitted |
| status | Choice | Pending / Approved / Rejected |
| reviewed_by | Ref:Member_List | Who reviewed |
| reviewed_at | DateTime | When reviewed |
| review_notes | Text | Notes (especially if rejected) |

---

### Member Profile Tables

*Feature details: [MEMBER_PROFILE.md](./MEMBER_PROFILE.md)*

#### Data_Change_Requests
Member requests to update their profile info.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| member_id | Ref:Member_List | Who submitted |
| field_name | Text | Which field to change |
| current_value | Text | What's currently on record |
| requested_value | Text | What they want it changed to |
| reason | Text | Why the change |
| submitted_at | DateTime | When submitted |
| status | Choice | Pending / Approved / Rejected |
| reviewed_by | Ref:Member_List | Who reviewed |
| reviewed_at | DateTime | When reviewed |
| notes | Text | Admin notes |

---

## Changes to Existing Tables

### Member_List
No schema changes needed - we reference existing members.

**Considerations:**
- Verify `Membership_Type` field exists for work obligation lookup
- Verify `email` field exists for notifications
- May want to add `role` or reference to Roles table for permission checks

### Roles Table
Currently no FK to Member_List.

**Proposed Enhancement:**
| Column | Type | Description |
|--------|------|-------------|
| member_id | Ref:Member_List | Which member holds this role |
| year | Text | Board year (e.g., "2025") |

This enables: historical tracking, proper auth lookup, year-over-year reporting.

### Consider Replacing T{YEAR}_WO_Completed
The current pattern of creating a new table each year is not ideal. The new `Job_Signups` and `Work_Log` tables with a `Season` field will track this more elegantly.

---

## Views to Create

### Member_Hours_Summary
Summary view grouping by Member + Season:
- Total hours from Job_Signups (Status = Completed)
- Total hours from Work_Log (Status = Approved)
- Combined total
- Hours required (from Member_List/Membership_Type)
- Hours remaining

### Job_Board_View
Active jobs filtered to:
- Status = Open
- Date >= Today
- Has open slots

### Pending_Approvals_By_Category
For board member dashboard:
- Work_Log entries with Status = Pending
- Grouped by category
- Sorted by submitted_date

### Insurance_Compliance
Member insurance status:
- Latest submission per member
- Current status
- Days until expiration
- Flagged if expired or expiring soon

### Visitor_Calendar
All visitor reservations:
- Grouped by date range
- Shows mooring assignments
- Filters for pending/confirmed

---

## Relationships Diagram

```
Member_List
    │
    ├──< Job_Signups >── Jobs ──< Job_Categories
    │       │
    │       └── Volunteer hours (completed signups)
    │
    ├──< Work_Log ──────────────< Job_Categories
    │       │
    │       └── Ad-hoc volunteer hours
    │
    ├──< Announcements
    │
    ├──< Newsletters
    │
    ├──< Community_Posts
    │
    ├──< Insurance_Submissions
    │
    ├──< Data_Change_Requests
    │
    └──< Mooring_Balls (updated_by)

Mooring_Balls
    │
    ├──< Visitor_Moorings
    │
    └──< Visitor_Reservations (assigned_mooring)

Reciprocal_Clubs ──< Visitor_Reservations (home_club)
```

---

## Migration Notes

1. **No data migration needed** - Starting fresh for new features
2. **Keep T2023/T2024_WO_Completed** - For historical reference
3. **Member_List unchanged** - New tables reference existing members
4. **Reciprocal clubs** - Import current list from website into Reciprocal_Clubs table
5. **Mooring balls** - Initial setup requires GPS coordinates for each ball

---

## API Endpoints Needed

```
# Jobs
GET    /tables/Jobs/records
POST   /tables/Jobs/records
PATCH  /tables/Jobs/records

# Signups
GET    /tables/Job_Signups/records
POST   /tables/Job_Signups/records
PATCH  /tables/Job_Signups/records

# Work Log
GET    /tables/Work_Log/records
POST   /tables/Work_Log/records
PATCH  /tables/Work_Log/records

# Announcements
GET    /tables/Announcements/records
POST   /tables/Announcements/records

# Newsletters
GET    /tables/Newsletters/records
POST   /tables/Newsletters/records
PATCH  /tables/Newsletters/records

# Community Posts
GET    /tables/Community_Posts/records
POST   /tables/Community_Posts/records
PATCH  /tables/Community_Posts/records

# Reciprocal Visitors (public endpoints - no auth)
GET    /tables/Reciprocal_Clubs/records
GET    /tables/Mooring_Balls/records
POST   /tables/Visitor_Reservations/records
PATCH  /tables/Visitor_Reservations/records

# Mooring Management (Harbour Master)
PATCH  /tables/Mooring_Balls/records
GET    /tables/Visitor_Moorings/records
POST   /tables/Visitor_Moorings/records
GET    /tables/Visitor_Blocked_Dates/records
POST   /tables/Visitor_Blocked_Dates/records

# Insurance
GET    /tables/Insurance_Submissions/records
POST   /tables/Insurance_Submissions/records
PATCH  /tables/Insurance_Submissions/records

# Profile
GET    /tables/Member_List/records (filtered to current user)
GET    /tables/Data_Change_Requests/records
POST   /tables/Data_Change_Requests/records
PATCH  /tables/Data_Change_Requests/records

# Reference Data
GET    /tables/Job_Categories/records
```

---

## Next Steps

1. **Phase 1: Job Board** (priority)
   - Create Job_Categories, Jobs, Job_Signups, Work_Log tables
   - Build React frontend for job board features
   
2. **Phase 2: Announcements & Newsletter**
   - Create Announcements, Newsletters tables
   - Build posting and viewing UI
   
3. **Phase 3: Community Board**
   - Create Community_Posts table
   - Build classifieds/crew board UI
   
4. **Phase 4: Reciprocal Visitors**
   - Create visitor-related tables
   - Build public booking form and Harbour Master UI
   
5. **Phase 5: Insurance & Profile**
   - Create Insurance_Submissions, Data_Change_Requests tables
   - Build submission and review workflows
