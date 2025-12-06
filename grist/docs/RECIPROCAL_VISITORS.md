# Reciprocal Visitors

Booking system for visiting sailors from reciprocal clubs.

**This is a public-facing feature - no APSC member login required.**

---

## Overview

APSC has reciprocal agreements with many yacht clubs around Lake Ontario and beyond. Members of partner clubs can visit APSC, and APSC members can visit partner clubs.

Visitors book themselves through a public form - they don't need (and can't have) an APSC member account.

---

## UX Concept: Sign-In Sheet

Visually, the booking form should look like a **sign-in sheet pinned to the bulletin board** - matching the metaphor of the rest of the site.

- Paper/clipboard aesthetic
- Simple form fields (like filling out a guest log)
- Maybe show recent/upcoming visitors in a "who's visiting" list style
- Feels welcoming, not bureaucratic

---

## Two Flows: Reserve & Check-In

### 1. Reservation (Before Arrival)
Visitors can reserve a mooring ahead of time via the website:
- Check availability for their dates
- Submit reservation request
- Receive confirmation with assigned mooring

### 2. Check-In (On Arrival)
All visitors must check in when they arrive - **with or without a reservation**.

**QR codes posted at the club** link to the check-in form:
- Scan QR → opens check-in on phone
- If you have a reservation → confirm arrival, enter boat details
- If sail-in (no reservation) → fill out visitor info, get assigned a mooring (if available)

This captures visitors who:
- Made a reservation online
- Called/emailed ahead but aren't in the system
- Just sailed in (no reservation)

### Check-In Form
- Name, home club, boat name
- Reservation confirmation # (if applicable)
- Actual arrival date
- Expected departure
- Mooring assignment confirmation

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

## Visitor Mooring Management

The Harbour Master controls which moorings are available for visitors.

### Harbour Master Capabilities

- **Define visitor moorings**: Select which mooring balls are available for reciprocal visitors
- **Change availability**: Add/remove moorings from visitor pool as needed (e.g., if a member goes on vacation and offers their ball, or a visitor ball needs maintenance)
- **Block dates**: Mark specific dates when visitor moorings are unavailable (regatta weekend, crane day, etc.)
- **View calendar**: See reservations across all visitor moorings

### Reservation System

Visitors should be able to **reserve** a mooring, not just request:
- Show availability calendar (which dates have open moorings)
- Visitor selects dates → system checks availability
- If space available → instant confirmation (or pending Harbour Master approval?)
- If full → waitlist or "no availability" message

### Data Model

**Visitor_Moorings** (managed by Harbour Master):
| Field | Type | Notes |
|-------|------|-------|
| mooring_id | Reference | Which mooring ball |
| available_from | Date | When it becomes available for visitors |
| available_until | Date | Optional end date |
| notes | Text | "Member on vacation" etc. |

**Visitor_Reservations**:
| Field | Type | Notes |
|-------|------|-------|
| id | Auto | |
| visitor_name | Text | |
| visitor_email | Text | |
| visitor_phone | Text | |
| home_club | Text/Reference | |
| home_club_membership_number | Text | For verification of reciprocal privileges |
| arrival_date | Date | |
| departure_date | Date | |
| boat_name | Text | |
| boat_length | Number | |
| assigned_mooring | Reference | Set by Harbour Master or auto-assigned |
| status | Choice | Pending / Confirmed / Cancelled / Completed |
| created_at | DateTime | |

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

**US-RV1**: As a visiting sailor, I want to reserve a mooring ahead of time so I know I have a spot.

**US-RV2**: As a visiting sailor, I want to check in when I arrive by scanning a QR code.

**US-RV3**: As a sail-in visitor (no reservation), I want to check in and get a mooring if available.

**US-RV4**: As a visiting sailor, I want to receive confirmation with my mooring assignment and instructions.

**US-RV3**: As the Harbour Master, I want to see incoming reservations so I can review and approve them.

**US-RV4**: As the Harbour Master, I want to assign a mooring to a visitor so they know where to go.

**US-RV5**: As the Harbour Master, I want to define which moorings are available for visitors.

**US-RV6**: As the Harbour Master, I want to add or remove moorings from the visitor pool as availability changes.

**US-RV7**: As the Harbour Master, I want to block dates when we can't accept visitors (e.g., regatta weekend).

**US-RV8**: As the Harbour Master, I want to see a calendar of all visitor reservations.

**US-RV9**: As an admin, I want to manage the list of reciprocal clubs.

**US-RV10**: As an admin, I want to see a log of past visitors for record-keeping.

---

## Open Questions

1. How are reciprocal memberships verified? (Call home club? Trust visitor? Check their club website?)
2. How are fees collected for stays >3 nights? (On arrival? Invoice? E-transfer?)
3. Is there a maximum length of stay?
4. How far in advance can/should visitors book?
5. Should reservations be instant-confirmed, or require Harbour Master approval?
6. Auto-assign moorings, or let Harbour Master manually assign?
