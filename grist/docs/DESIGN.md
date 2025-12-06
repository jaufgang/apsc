# Design Language

Visual design principles and patterns for the APSC Bulletin Board.

**Examples:** [View live examples](./design-examples/index.html)

---

## Core Principles

### 1. Familiar Foundation
Modern, clean, and intuitive - users should feel at home if they've used any Material Design or Apple HIG app. No learning curve.

### 2. Bulletin Board Character
Stylized nods to a clubhouse bulletin board - warm and welcoming, not literally cork and pushpins.

### 3. Clubhouse Vibe
The personality of a small, off-grid sailing club: friendly, unpretentious, a bit quirky, community-focused.

---

## Visual Elements

### Icons
- **Simple line art** - Clean 2px strokes, not filled
- **Rounded caps and joins** - Friendly, approachable
- **Consistent sizing** - 24px base, scale as needed
- Nautical touches where appropriate (anchor, compass, rope knot)

### Typography
- **Headers**: Clean sans-serif (Inter, SF Pro, or system font)
- **Body**: Same family, readable sizes (16px+ base)
- **Accents**: Optional handwritten/script font for warmth (post attribution, section labels)

### Colors

#### Primary Palette
| Name | Hex | Usage |
|------|-----|-------|
| **Ocean Blue** | `#2563EB` | Primary actions, links |
| **Deep Navy** | `#1E3A5F` | Headers, emphasis |
| **Sky Blue** | `#E0F2FE` | Backgrounds, highlights |

#### Warm Accents
| Name | Hex | Usage |
|------|-----|-------|
| **Cork** | `#D4A574` | Bulletin board accents |
| **Warm Sand** | `#F5E6D3` | Card backgrounds |
| **Weathered Wood** | `#8B7355` | Borders, subtle details |

#### Semantic
| Name | Hex | Usage |
|------|-----|-------|
| **Success** | `#16A34A` | Approved, complete |
| **Warning** | `#EA580C` | Pending, attention |
| **Error** | `#DC2626` | Rejected, urgent |

### Shadows & Elevation
- Subtle, warm-toned shadows (not pure black)
- Cards appear "pinned" - slight lift off the background
- Interactive elements lift slightly on hover

---

## Component Patterns

### Cards (Pinned Posts)
The core UI element - everything is a "card" on the board.

```
┌─────────────────────────────────────┐
│  📌                                 │  ← Subtle pin/tack icon
│                                     │
│  Duty Officer Signup                │  ← Title
│  Saturday, June 15                  │
│                                     │
│  ○ ○ ○ ────────────────             │  ← Open slots
│  ✓ John Smith                       │  ← Filled slot
│                                     │
│  Posted by Marina Committee         │  ← Attribution (script font)
└─────────────────────────────────────┘
     ↑
     Slight rotation (1-2°), paper texture hint
```

### Signup Sheet
Job board items look like clipboards or paper forms.

```
┌──────────────────────────────────────────┐
│ ═══════════════════════════════════════  │
│         DUTY OFFICER SCHEDULE            │
│         Summer 2025                      │
│ ═══════════════════════════════════════  │
│                                          │
│  Date          │ Duty Officer │ Shuttle  │
│  ─────────────────────────────────────   │
│  Sat Jun 7     │ [Sign Up]    │ J. Doe   │
│  Sun Jun 8     │ M. Smith     │ [Sign Up]│
│  Sat Jun 14    │ [Sign Up]    │ [Sign Up]│
│                                          │
└──────────────────────────────────────────┘
```

### Bulletin Board Layout
Main view shows cards arranged on a board, slightly scattered.

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ┌─────────┐      ┌─────────┐      ┌─────────┐    │
│   │ Duty    │      │ FOR     │      │ ⚠️ SAFETY│    │
│   │ Officer │      │ SALE    │      │ NOTICE  │    │
│   │ Jun 15  │      │ Blocks  │      │         │    │
│   └─────────┘      └─────────┘      └─────────┘    │
│                                                     │
│        ┌─────────┐           ┌─────────┐           │
│        │ Looking │           │ Club    │           │
│        │ for     │           │ BBQ     │           │
│        │ Crew    │           │ July 4  │           │
│        └─────────┘           └─────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Interaction Patterns

### Hover States
- Cards lift slightly (shadow increases)
- Subtle scale (1.01x)
- Cursor changes to pointer

### Selected/Active
- Blue border or glow
- Pin icon animates (slight wiggle)

### Loading
- Skeleton cards with subtle shimmer
- Paper texture visible through loading state

### Empty States
- Friendly illustration (sailboat, empty board)
- Encouraging message ("No jobs posted yet - check back soon!")

---

## Mobile Considerations

- Cards stack vertically (no scattered layout)
- Full-width on small screens
- Touch-friendly tap targets (44px+)
- Swipe gestures for common actions

---

## What to Avoid

❌ Heavy gradients or glossy effects
❌ Photorealistic skeuomorphism (actual cork photos)
❌ Busy patterns or textures
❌ Corporate/sterile aesthetic ("enterprise software")
❌ Too many nautical puns or clip art
❌ Animations that slow down the experience

---

## Inspiration

- Physical bulletin boards in community spaces
- Notion's clean but warm aesthetic
- Basecamp's friendly, unpretentious design
- Sailing club websites (for what NOT to do - often dated)
- Japanese train station notice boards (organized chaos)

