# Member Profile

Members view and verify their profile information stored in Grist.

---

## Overview

The Member Profile feature gives members visibility into what the club has on record for them. This builds trust and helps catch data errors.

---

## What Members Can See

Everything Grist has on record for them:

- **Personal**: Name, email, phone, address
- **Membership**: Type, status, membership number, join date
- **Boat**: Name, make/model, length, sail number
- **Mooring**: Ball number, location
- **Family**: Other members on the same membership
- **History**: How long they've been a member, past statuses

---

## Data Integrity Model

Members can **view** but not directly **edit** their information.

**Why?**
- Grist is the source of truth
- Some fields have implications (mooring assignments, fees, etc.)
- Prevents accidental data corruption

**Instead, members can:**
- **Flag for review**: "This is incorrect" with a note
- **Submit update request**: Structured form for common changes (new phone, address change)
- Admin/board reviews and makes changes in Grist
- Member sees updated info on next sync

---

## Key Use Cases

### Boat & Mooring Information
Particularly useful info for members to verify:
- "Is my mooring ball correctly recorded?"
- "Does the club have my boat's correct dimensions?" (matters for fees)
- "Is my boat type right for racing handicaps?"

### Contact Information
- Verify email and phone on file
- Update address after a move
- Ensure emergency contact is current

### Family Members
- See who else is on your membership
- Verify spouse/family details are correct

---

## User Stories

**US-P1**: As a member, I want to see my profile information so I know what the club has on record for me.

**US-P2**: As a member, I want to see my boat and mooring details so I can verify they're correct.

**US-P3**: As a member, I want to flag incorrect information so the club can fix it.

**US-P4**: As a member, I want to submit a change request (new phone, address) so my info stays current.

**US-P5**: As a member, I want to see other family members on my membership.

**US-P6**: As an admin, I want to see flagged data issues so I can review and correct them in Grist.

---

## Open Questions

1. What fields should be editable via request vs. view-only?
2. Should change requests go to a specific person or a queue?
3. How quickly do Grist changes sync to the portal?
