# Racing

Wednesday night racing and race standings.

**Schema:** [Racing Tables](./PROPOSED_SCHEMA.md#racing-tables)

---

## Overview

APSC runs a Wednesday evening race series throughout the sailing season (typically May–September). Racing is casual, fun, and followed by a communal dinner at the clubhouse.

---

## What's Included

### Race Schedule
- **When**: Wednesday evenings, weather permitting
- **Season**: May through September
- **Dinner**: After racing at the clubhouse (potluck style or organized)

### Race Results & Standings
- Post results after each race
- Running season standings with points
- Historical results archive

### Race Committee Signup
- Volunteers needed to run the race committee boat
- Ties into [Job Board](./JOB_BOARD.md) for work hour credit

---

## How It Works

### For Race Committee (Fleet Captain / Race Director)
1. Log in → Racing → Post Results
2. Enter finish order, times, any DNF/DNS/DSQ
3. System auto-calculates points based on scoring rules
4. Results appear on bulletin board + optional email notification

### For Members
- View this week's race results
- See season standings
- Browse past seasons (archive)
- Sign up for Race Committee duty (via Job Board)

---

## Data Model (Grist)

*Full schema: [PROPOSED_SCHEMA.md](./PROPOSED_SCHEMA.md#racing-tables)*

### Key Tables
- **Race_Series**: Season/series info (e.g., "2026 Wednesday Night Series")
- **Races**: Individual race events with date, conditions, notes
- **Race_Results**: Boat, finish position, time, points, status (DNS/DNF/DSQ)
- **Race_Standings**: Calculated view of cumulative points

### Scoring
- Low-point scoring (1st = 1 pt, 2nd = 2 pts, etc.)
- DNF/DNS/DSQ = boats registered + 1
- Drop worst race(s) for season standings (configurable)

---

## What We're NOT Building

- **Live race tracking**: Just post results after the race
- **Start sequence timer**: Use a phone app for that
- **Protest management**: Handle offline, just record outcomes
- **Complex handicap calculations**: Keep it simple (PHRF or one-design)

---

## User Stories

**US-RC1**: As the Race Director, I want to post race results so members can see how they did.

**US-RC2**: As the Race Director, I want the system to calculate standings automatically based on race results.

**US-RC3**: As a racing member, I want to see my current season standings on the bulletin board.

**US-RC4**: As a racing member, I want to see this week's race results.

**US-RC5**: As a member, I want to browse past race results and standings.

**US-RC6**: As the Race Director, I want to configure scoring rules (drop races, DNF points, etc.).

**US-RC7**: As a member, I want to sign up for Race Committee duty and get work hour credit.

---

## Wednesday Night Flow

```
5:30 PM   Race Committee arrives, sets marks
6:00 PM   Competitors arrive, rig boats
6:30 PM   Skipper's meeting (if needed)
6:45 PM   First warning signal
7:00 PM   Race start
8:00 PM   Racing complete, boats return
8:30 PM   Dinner at clubhouse
9:00 PM   Results posted (or next morning)
```

---

## Integration Points

- **Job Board**: Race Committee duty counts toward work hours
- **Events**: Wednesday dinner RSVPs (optional)
- **Announcements**: Race cancellations due to weather
- **Community Board**: Find crew for racing

