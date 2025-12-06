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

**Potluck Events:**
- Many (but not all) social events are potlucks
- Main course is typically provided by the club
- Members bring appetizers, side dishes, or desserts
- RSVP includes "What are you bringing?" field
- Potluck contributions visible to all members on the bulletin board
  - Helps coordination (avoid 5 Caesar salads!)
  - Builds anticipation and community

**Ticketed Events:**
- Some events require ticket purchase (e.g., catered dinners, special parties)
- Configurable ticket price per event
- Members can purchase tickets during RSVP

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

**Potluck RSVPs:**
- For potluck events, RSVP asks: "What are you bringing?"
- Categories to choose from: Appetizer, Side Dish, Dessert, Beverage, Other
- Free-text field for specific item (e.g., "Caesar salad", "Brownies")
- All potluck contributions visible on the event poster
- Members can update their contribution anytime before the event

**Ticket Purchases:**
- For ticketed events, RSVP includes ticket purchase flow
- Select quantity (for self + guests)
- Choose payment method:
  - **PayPal** - Redirects to PayPal checkout, auto-confirmed on return
  - **Interac e-Transfer** - Instructions displayed, marked pending until treasurer confirms
  - **Offline (cash)** - Pay treasurer or social director in person, marked pending until confirmed
- Payment status visible on member's RSVP: Paid, Pending, Unpaid
- Organizer can manually mark payments as received

### For Board Members (Event Organizers)

**Creating Events:**
1. New Event → fill in details
2. Set RSVP options (yes/no/maybe, guest count, notes)
3. **Potluck toggle**: If enabled, members prompted for food contribution
4. **Ticketed toggle**: If enabled, set ticket price and payment options
5. Optionally add volunteer slots (links to Job Board)
6. Post to bulletin board

**Managing Events:**
- See RSVP list and headcount
- View potluck items list (what everyone is bringing)
- View ticket sales and payment status
- Manually confirm offline/e-Transfer payments
- Send reminders to RSVPs
- Export attendee list
- Post-event: mark complete

---

## Data Model (Grist)

*Full schema: [PROPOSED_SCHEMA.md](./PROPOSED_SCHEMA.md#events-tables)*

**Events**: `title`, `date`, `time`, `location`, `description`, `organizer_id`, `rsvp_enabled`, `is_potluck`, `is_ticketed`, `ticket_price`, `payment_methods` (PayPal/e-Transfer/Offline)

**Event_RSVPs**: `event_id`, `member_id`, `response` (Yes/No/Maybe), `guest_count`, `note`, `potluck_category`, `potluck_item`, `ticket_quantity`, `payment_method`, `payment_status` (Paid/Pending/Unpaid), `payment_confirmed_by`, `payment_confirmed_at`

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

**Potluck Display:**
- "What's on the Menu" section on event poster
- Grouped by category: Appetizers | Sides | Desserts | Beverages
- Shows member name + item they're bringing
- Visible to ALL members (full transparency)
- Encourages variety and builds excitement

**Ticketed Event Display:**
- Ticket price prominently shown
- "Buy Tickets" button
- Payment options listed
- Your ticket status shown after purchase

See [design examples](./design-examples/index.html) for visual reference.

---

## Ticket Payment Flow

### PayPal
1. Member clicks "Buy Tickets"
2. Selects quantity
3. Chooses PayPal → redirects to PayPal checkout
4. On successful payment, returns to app
5. RSVP + payment automatically confirmed

### Interac e-Transfer
1. Member clicks "Buy Tickets"
2. Selects quantity
3. Chooses e-Transfer
4. Instructions displayed:
   - Send to: [treasurer email]
   - Amount: $X.XX
   - Message: "Event Name - Your Name"
5. RSVP created with payment status = "Pending"
6. Treasurer receives e-Transfer, marks payment confirmed in system

### Offline (Cash)
1. Member clicks "Buy Tickets"
2. Selects quantity
3. Chooses "Pay in Person"
4. Instructions: "Pay the Treasurer or Social Director at the club"
5. RSVP created with payment status = "Pending"
6. Treasurer/Social Director confirms receipt in system

### Payment Confirmation (Organizer View)
- List of pending payments for their event
- One-click to mark as "Paid"
- Audit trail: who confirmed, when

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

### Potluck Stories

**US-PL1**: As a member, I want to indicate what dish I'm bringing to a potluck so others can coordinate.

**US-PL2**: As a member, I want to see what everyone else is bringing so I don't duplicate.

**US-PL3**: As a member, I want to update my potluck contribution if my plans change.

**US-PL4**: As an organizer, I want to see the full potluck menu at a glance so I know if we need more of something.

### Ticket Stories

**US-TK1**: As a member, I want to buy tickets for myself and my guests online.

**US-TK2**: As a member, I want to pay via PayPal for instant confirmation.

**US-TK3**: As a member, I want to pay via e-Transfer if I prefer not to use PayPal.

**US-TK4**: As a member, I want to pay cash in person if I prefer offline payment.

**US-TK5**: As a treasurer, I want to mark e-Transfer and cash payments as received.

**US-TK6**: As an organizer, I want to see who has paid and who still owes money.

**US-TK7**: As an organizer, I want to see total ticket revenue for my event.

---

## Open Questions

1. ~~Should RSVPs be visible to all members, or just organizers?~~
   - ✅ **Resolved**: Full visibility - RSVPs and potluck items visible to all members on the bulletin board

2. Do we need a "Maybe" option, or just Yes/No?

3. Should there be a deadline for RSVPs?

4. Integration with calendar (export to Google Calendar, iCal)?

5. **PayPal integration**: Use PayPal.me links for simplicity, or full API integration?
   - PayPal.me: Simpler, but requires manual confirmation
   - API: Auto-confirmation, but more development effort

6. **e-Transfer details**: Single club email for all payments, or per-event?

7. **Refund policy**: What happens if a ticketed event is cancelled? Process for refunds?
