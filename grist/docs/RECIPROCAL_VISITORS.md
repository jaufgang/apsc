# Reciprocal Visitors

Booking system for visiting sailors from reciprocal clubs.

---

## Overview

APSC has reciprocal agreements with many yacht clubs around Lake Ontario and beyond. Members of partner clubs can visit APSC, and APSC members can visit partner clubs.

**Current Policy:**
- 3 free nights at an assigned mooring
- Additional nights: $30/night
- No water or electrical hookup available
- Must sign up before arriving
- USA visitors must follow Canada Border Services regulations

---

## Current State

Visitors are directed to sign up before arriving, but the process is manual. This feature would formalize the booking system.

---

## Booking System

### For Visiting Sailors

A public-facing form to request a visit:

- **Visitor details**: Name, email, phone
- **Home club**: Select from list of reciprocal clubs
- **Home club membership #**: For verification
- **Visit dates**: Arrival and departure (auto-calculate if >3 nights = fees)
- **Boat details**: Name, length, draft (for mooring assignment)
- **Number of people**: Crew/guests
- **Arriving from USA?**: Checkbox (show CBSA reminder)
- **Special requests**: Any additional notes

### For APSC (Harbour Master/Admin)

- Queue of incoming visit requests
- Review and approve/deny requests
- Assign mooring
- Notify visitor of approval + instructions
- Calendar view of upcoming/current visitors
- Log of past visitors
- Fee tracking for stays >3 nights

---

## Confirmation Email Content

When approved, visitor receives:
- Approval confirmation
- Assigned mooring location
- Club address and access instructions (see [Getting Here](https://www.aquaticpark.com/about-2))
- Reminder: No water or electrical hookups
- Amenities info: Clubhouse, bonfire, kitchen facilities
- Nearby services: Outer Harbour Marina for fuel, pumpout, potable water
- Grocery/hardware stores: 20 min walk from park
- Weekend shuttle bus: 9am-6pm
- USA visitors: CBSA reminder
- Contact info for questions

---

## Reciprocal Club Management

Admin capability to manage partner clubs:

- List of clubs with reciprocal agreements
- Club name, location, website
- Active/inactive status

**Note:** The current list of reciprocal clubs is on the website. This would move that list into Grist for easier management.

---

## APSC Members Visiting Other Clubs

The portal could also help APSC members when they visit partner clubs:

- Directory of reciprocal clubs with contact info
- Each club's visitor policies (free nights, fees, amenities)
- Log your own visits (optional, for personal tracking)

---

## User Stories

**US-RV1**: As a visiting sailor, I want to request a visit to APSC so I can use the facilities under reciprocal agreement.

**US-RV2**: As a visiting sailor, I want to receive confirmation of my booking with mooring assignment and instructions.

**US-RV3**: As the Harbour Master, I want to see incoming visit requests so I can review and approve them.

**US-RV4**: As the Harbour Master, I want to assign a mooring to a visitor so they know where to go.

**US-RV5**: As an admin, I want to manage the list of reciprocal clubs.

**US-RV6**: As an admin, I want to see a log of past visitors for record-keeping.

**US-RV7**: As an admin, I want to block dates when we can't accept visitors (e.g., regatta weekend).

---

## Open Questions

1. How are reciprocal memberships verified? (Call home club? Trust visitor? Check their club website?)
2. How are fees collected for stays >3 nights? (On arrival? Invoice? E-transfer?)
3. How many visitor moorings are available?
4. Is there a maximum length of stay?
5. How far in advance can/should visitors book?
6. Should visitors see mooring availability before submitting?
7. Who handles visitor requests? (Harbour Master? Duty Officer on duty?)
