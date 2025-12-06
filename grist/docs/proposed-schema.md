# Proposed Schema: Volunteer Job Management

## Overview
Extend the existing Grist database to support a complete volunteer work management system similar to the legacy Ionic app.

## New Tables Required

### Jobs
Posted volunteer jobs that members can sign up for.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key (Grist provides this) |
| Title | Text | Job title (e.g., "Duty Officer - Saturday") |
| Category | Choice | Job category (see categories below) |
| Description | Text | Detailed job description |
| Date | Date | When the job needs to be done |
| Hours | Numeric | Estimated hours for the job |
| Season | Text | Season year (e.g., "2025") |
| Posted_By | Ref:Member_List | Who posted this job |
| Posted_Date | DateTime | When the job was posted |
| Status | Choice | Open, Filled, Completed, Cancelled |

### Job_Signups
When a member signs up for a posted job.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| Job | Ref:Jobs | The job being signed up for |
| Volunteer | Ref:Member_List | Member who signed up |
| Contact_Phone | Text | Phone for this job (may differ from profile) |
| Signup_Date | DateTime | When they signed up |
| Status | Choice | Signed_Up, Completed, Cancelled, No_Show |
| Actual_Hours | Numeric | Actual hours worked (may differ from estimate) |
| Completed_Date | DateTime | When marked complete |
| Notes | Text | Any notes about the work |

### Work_Log
For logging volunteer work NOT from the job board (member-initiated).

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| Volunteer | Ref:Member_List | Member who did the work |
| Category | Choice | Job category |
| Description | Text | What work was done |
| Date | Date | When work was done |
| Hours | Numeric | Hours worked |
| Season | Text | Season year |
| Submitted_By | Ref:Member_List | Who submitted this log entry |
| Submitted_Date | DateTime | When submitted |
| Status | Choice | Pending, Approved, Rejected |
| Approved_By | Ref:Member_List | Who approved (if applicable) |
| Approved_Date | DateTime | When approved |
| Notes | Text | Admin notes |

### Job_Categories
Reference table for job categories.

| Column | Type | Description |
|--------|------|-------------|
| id | Auto | Primary key |
| Name | Text | Category name |
| Email | Text | Committee email for this category |
| Description | Text | What this category covers |
| Active | Bool | Whether this category is active |

**Initial Categories (from legacy app):**
- Duty Officer → duty_officer@aquaticpark.com
- House & Grounds → h_g@aquaticpark.com  
- Harbor → harbour@aquaticpark.com
- Social → social@aquaticpark.com
- Race → race@aquaticpark.com
- Fleet Program → fleet_program@aquaticpark.com
- Safety → safety@aquaticpark.com
- Special Request / Other → commodore@aquaticpark.com
- Shuttle Driver → duty_officer@aquaticpark.com
- Communications → communication@aquaticpark.com

## Changes to Existing Tables

### Member_List
No changes needed - we'll reference existing members.

### Consider Replacing T{YEAR}_WO_Completed
The current pattern of creating a new table each year is not ideal. The new `Job_Signups` and `Work_Log` tables with a `Season` field will track this more elegantly.

A summary view can aggregate:
- Total hours from `Job_Signups` (where Status = Completed)
- Total hours from `Work_Log` (where Status = Approved)

## Views to Create

### Member_Hours_Summary
Summary table grouping by Member + Season:
- Total hours from job signups
- Total hours from work log
- Combined total
- Hours required (from Member_List)
- Hours remaining

### Job_Board_View
Active jobs view filtered to:
- Status = Open
- Date >= Today

## Relationships Diagram

```
Member_List
    │
    ├──< Job_Signups >── Jobs
    │       │
    │       └── Volunteer hours (completed signups)
    │
    └──< Work_Log
            │
            └── Ad-hoc volunteer hours
            
Job_Categories ──< Jobs (via Category)
                 < Work_Log (via Category)
```

## Migration Notes

1. **No data migration needed** - Starting fresh for job tracking
2. **Keep T2023/T2024_WO_Completed** - For historical reference, but new system won't use this pattern
3. **Member_List unchanged** - New tables reference existing members
4. **Consider cleanup** - Eventually remove year-specific WO columns from Member_List in favor of computed summaries

## API Endpoints Needed

For the React app, we'll need:

```
# Jobs
GET  /tables/Jobs/records - List jobs (with filters)
POST /tables/Jobs/records - Create job
PATCH /tables/Jobs/records - Update job

# Signups
GET  /tables/Job_Signups/records - List signups
POST /tables/Job_Signups/records - Sign up for job
PATCH /tables/Job_Signups/records - Update signup (complete, cancel)

# Work Log
GET  /tables/Work_Log/records - List work entries
POST /tables/Work_Log/records - Submit work
PATCH /tables/Work_Log/records - Approve/reject

# Reference Data
GET /tables/Job_Categories/records - List categories
GET /tables/Member_List/records - List members (for dropdowns)
```

## Next Steps

1. Create `Job_Categories` table with initial data
2. Create `Jobs` table
3. Create `Job_Signups` table  
4. Create `Work_Log` table
5. Create summary views
6. Test API access from scratch scripts
7. Build React frontend
