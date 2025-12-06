# Events & RSVPs

Social events, gatherings, and attendance tracking.

**Schema:** [Events, Event_RSVPs](./PROPOSED_SCHEMA.md#events-tables)

---

## Overview

Club social events - BBQs, potlucks, parties, races, regattas, work parties. Members can see what's coming up and RSVP.

This is **distinct from volunteer signups**:
- **Events**: "Are you coming?" (attendance)
- **Job Board**: "Will you work this shift?" (volunteer hours)

Some events have both - e.g., Summer BBQ needs RSVPs *and* volunteers for setup/cleanup. These appear together on the bulletin board.

---

## Event Types

### Social Events
- Summer BBQ & Potluck
- Season opener / closer parties
- Holiday gatherings
- Informal get-togethers

### Racing & Regattas
- Club races
- AHMEN, other regattas
- Race committee sign-up

### Work Parties
- Spring crane-in
- Fall haul-out
- Dock/grounds cleanup days

---

## How It Works

### For Members

**Viewing Events:**
- See upcoming events on the bulletin board
- Event "posters" show date, time, description
- See who's already coming

**RSVPing:**
- Click "Count Me In" / "I'll Be There"
- Optionally add number of guests ("+2")
- Add a note ("Bringing potato salad!")
- Change RSVP if plans change

### For Board Members (Event Organizers)

**Creating Events:**
1. New Event → fill in details
2. Set RSVP options (yes/no/maybe, guest count, notes)
3. Optionally add volunteer slots (links to Job Board)
4. Post to bulletin board

**Managing Events:**
- See RSVP list and headcount
- Send reminders to RSVPs
- Export attendee list
- Post-event: mark complete

---

## Data Model (Grist)

*Full schema: [PROPOSED_SCHEMA.md](./PROPOSED_SCHEMA.md#events-tables)*

**Events**: `title`, `date`, `time`, `location`, `description`, `organizer_id`, `rsvp_enabled`

**Event_RSVPs**: `event_id`, `member_id`, `response` (Yes/No/Maybe), `guest_count`, `note`

---

## Integration with Job Board

Events can have associated volunteer jobs:
- "BBQ Setup - 2:00 PM" (2 slots)
- "Grill Master" (1 slot)
- "Cleanup Crew - 8:00 PM" (3 slots)

These are regular Job Board entries linked to the event. Displayed together on the event poster.

---

## UX Concept

Event posters on the bulletin board:
- Festive/colorful for social events
- Practical for work parties
- Racing flag motif for regattas
- Show attendee count and names
- Volunteer slots visible if applicable

See [design examples](./design-examples/index.html) for visual reference.

---

## User Stories

**US-EV1**: As a member, I want to see upcoming club events so I know what's happening.

**US-EV2**: As a member, I want to RSVP to an event so the organizers know I'm coming.

**US-EV3**: As a member, I want to see who else is coming to an event.

**US-EV4**: As a member, I want to add guests to my RSVP (e.g., bringing family).

**US-EV5**: As an event organizer, I want to create an event with RSVP tracking.

**US-EV6**: As an event organizer, I want to see the attendee list and headcount.

**US-EV7**: As an event organizer, I want to attach volunteer jobs to my event.

**US-EV8**: As an event organizer, I want to send a reminder to people who RSVPed.

---

## Open Questions

1. Should RSVPs be visible to all members, or just organizers?
2. Do we need a "Maybe" option, or just Yes/No?
3. Should there be a deadline for RSVPs?
4. Integration with calendar (export to Google Calendar, iCal)?
