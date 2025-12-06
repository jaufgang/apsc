# Insurance Submission

Streamline the yearly insurance verification process.

**Schema:** [Insurance_Submissions](./PROPOSED_SCHEMA.md#insurance-tables)

---

## Overview

Members must submit proof of insurance annually. This feature replaces the current email-based process with a proper upload/approval workflow.

---

## Current Pain Point

Insurance submission is currently done via email, which is:
- Hard to track
- Easy to lose
- No automated reminders
- No self-service status checking

---

## Portal Solution

### Member Experience

1. Log in to portal
2. Go to "Insurance" section
3. See current status:
   - ✅ Valid until [date]
   - ⚠️ Expiring Soon
   - ❌ Expired/Missing
4. Upload new insurance document (PDF, image)
5. Enter policy details:
   - Insurance carrier
   - Policy number
   - Expiration date
6. Submit for review
7. Track status: Submitted → Under Review → Approved / Rejected

### Board/Admin Experience

- Queue of pending insurance submissions
- View document, verify details
- Approve or reject with notes
- Dashboard of compliance status across all members
- Export list of non-compliant members

---

## Automated Reminders

- **30 days before expiration**: "Your insurance expires soon"
- **7 days before**: "Reminder: Insurance expiring"
- **Day of / past due**: "Your insurance has expired - submit immediately"

---

## User Stories

**US-I1**: As a member, I want to see my current insurance status so I know if I need to submit new proof.

**US-I2**: As a member, I want to upload my insurance document so I can fulfill my requirement.

**US-I3**: As a member, I want to receive reminders before my insurance expires.

**US-I4**: As a member, I want to see my submission history so I have a record.

**US-I5**: As a board member, I want to review pending insurance submissions so I can approve or reject them.

**US-I6**: As an admin, I want to see a compliance dashboard so I know which members are missing insurance.

**US-I7**: As an admin, I want to export a list of non-compliant members.

---

## Open Questions

1. Who reviews and approves insurance submissions? (Harbour Master? Admin?)
2. What are the consequences of not submitting? (Can't use mooring?)
3. Should there be a submission deadline (e.g., by May 1)?
4. Do we need to store the actual policy documents, or just metadata?
