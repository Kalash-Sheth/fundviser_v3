# Fundviser Capital — Home Page Design Document

> Complete extraction of design, structure, content, colour palette, typography, animations, and components for the Home page (`/`).

---

## Table of Contents

1. [Colour Palette](#1-colour-palette)
2. [Typography](#2-typography)
3. [Animation & Motion System](#3-animation--motion-system)
4. [Page Architecture (Section Order)](#4-page-architecture-section-order)
5. [Section 1 — Navbar](#5-section-1--navbar)
6. [Section 2 — Hero Section](#6-section-2--hero-section)
7. [Section 3 — Stock Widget](#7-section-3--stock-widget)
8. [Section 4 — About Section](#8-section-4--about-section)
9. [Section 5 — Investment Sectors](#9-section-5--investment-sectors)
10. [Section 6 — Subsidiaries](#10-section-6--subsidiaries)
11. [Section 7 — Mission, Vision & Values](#11-section-7--mission-vision--values)
12. [Section 8 — Contact Section](#12-section-8--contact-section)
13. [Section 9 — Footer](#13-section-9--footer)
14. [Reusable UI Primitives](#14-reusable-ui-primitives)
15. [Responsive Breakpoints](#15-responsive-breakpoints)
16. [Logo Animation (Intro Screen)](#16-logo-animation-intro-screen)

---

## 1. Colour Palette

### Primary Brand Colours

| Role | Hex | Usage |
|---|---|---|
| **Deep Purple (Primary)** | `#360153` | Buttons, active states, navbar accent, borders, icons |
| **Deep Purple Dark** | `#5a0280` | Gradient pair with primary, hover states |
| **Darkest Purple** | `#0d0018` | Section headings (dark) |
| **Midnight BG** | `#06000f` | Investment Sectors section background |
| **Near Black BG** | `#06000d` | Hero section background |

### Accent / Gold Colours

| Role | Hex | Usage |
|---|---|---|
| **Gold (Primary)** | `#c5963c` | GoldLine dividers, gradient accent |
| **Gold Light** | `#f0c060` | Gradient highlight on GoldLine |
| **Amber/Yellow** | `#f59e0b` | Capital Markets accent, hero slide accent |
| **Yellow Bright** | `#eab308` | Image grid gold shimmer, footer links |
| **Yellow 400** | `#fde047` | Portfolio card highlight |

### Sector / Tag Accent Colours

| Sector | Hex | Usage |
|---|---|---|
| Real Estate | `#a78bfa` | Lavender — sector tag & accent bar |
| Capital Markets | `#f59e0b` | Amber — sector tag & accent |
| Strategic Advisory | `#34d399` | Emerald — sector tag & accent |
| Entertainment | `#f43f5e` | Rose — sector tag & accent |
| Global Trade | `#38bdf8` | Sky blue — sector tag & accent |
| Technology | `#818cf8` | Indigo — sector tag & accent |

### Neutral & Surface Colours

| Role | Hex | Usage |
|---|---|---|
| **White** | `#ffffff` | Cards, form inputs, navbar bg |
| **Light Purple Tint** | `#faf5fc` | Stock widget bg, form section bg, contact cards bg |
| **Purple Tint Soft** | `#f3e5f5` | About pill bg, subsidiaries glow blobs |
| **Purple Border** | `#e1bee7` | Form input borders |
| **Text Dark** | `#1a0030` | Stat labels |
| **Text Mid Purple** | `#3d2060` | About body copy |
| **Text Muted Purple** | `#6b5080` | About secondary copy |
| **Text Subtle Purple** | `#9070b0` | Stat sub-labels |
| **Gray 400** | `#9ca3af` / `gray-400` | Muted text throughout |
| **Gray 500** | `#6b7280` / `gray-500` | Body text light |
| **Gray 900** | `#111827` / `gray-900` | Strong headings (Tailwind) |

### Dark Section Colours (Sectors, Mission/Vision, Footer)

| Role | Hex | Usage |
|---|---|---|
| **Dark BG** | `#06000f` | Sectors section |
| **Dark BG 2** | `#12041e` | Sector row hover |
| **Slate 950 + Purple** | `from-slate-950 via-[#1a002b] to-slate-950` | Mission/Vision section gradient |
| **Footer Gradient** | `from-slate-900 via-[#360153] to-slate-900` | Footer background |

### Gradient Recipes

```
Purple → Gold:  linear-gradient(135deg, #360153, #c5963c)
Purple → Violet: linear-gradient(135deg, #360153, #5a0280)
Lavender → Gold: linear-gradient(135deg, #a78bfa, #c5963c)
Gold line: linear-gradient(to right, #c5963c, #f0c060, #c5963c)
Purple → Yellow (Tailwind): bg-gradient-to-r from-[#360153] to-yellow-500
Footer bar top: linear-gradient(90deg, #360153, #a855f7, #eab308)
```

---

## 2. Typography

### Font Family
- **Primary font**: System / Tailwind default (Inter-like sans-serif)
- All weights via Tailwind: `font-black` (900), `font-bold` (700), `font-semibold` (600), `font-medium` (500)

### Heading Scale

| Element | Size | Weight | Notes |
|---|---|---|---|
| Hero H1 | `clamp(1.9rem, 5vw, 4rem)` | 900 | Per headline line |
| About H2 | `clamp(2.8rem, 4.5vw, 5rem)` | 900 | "Shaping the Future of Investment" |
| Section H2 (light) | `3xl–6xl` (Tailwind responsive) | 900 | AboutSection, Subsidiaries |
| Sectors H2 | `clamp(2.1rem, 5vw, 5.5rem)` | 900 | "Sectors We Dominate" |
| Sector Row H3 | `clamp(1.8rem, 2.4vw, 3rem)` | 900 | Individual sector title |
| Mission/Vision H2 | `3xl–6xl` | 900 | "What Sets Us Apart" |
| Contact H2 | `4xl–5xl` | 700 | "Let's Start a Conversation" |
| Footer H3 | `xl` (1.25rem) | 700 | Column headers |
| Body Large | `18px` / `text-xl` | 400 | About body copy |
| Body Regular | `16px` / `text-base–lg` | 400 | General sections |
| Tags/Labels | `10–11px` | 700–800 | `letter-spacing: 0.13–0.22em`, uppercase |
| Stat Numbers | `22–26px` inline, `2xl–4xl` Tailwind | 900 | Counter values |

### Letter Spacing
- Tags & labels: `0.13em` to `0.22em` (tracking-widest)
- Ghost numbers on sector rows: `-0.06em`
- Headline: `-0.02em` to `-0.03em`

---

## 3. Animation & Motion System

### Scroll Reveal (`useScrollReveal` / `useInView`)
- **Trigger**: IntersectionObserver at `threshold: 0.1–0.15`
- **Duration**: `0.75s–0.85s`
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like)
- **Directions**: `up` (translateY 48–60px), `left` (translateX -48–60px), `right` (translateX 48–60px), `scale` (scale 0.85)
- **Stagger delay**: via `delay` prop in ms (0, 80, 100, 120, 150, 200, 400ms)

### `Reveal` / `FadeIn` Wrapper
```
opacity: 0 → 1
transform: [dir offset] → none
transition: opacity Xs ease Yms, transform Xs ease Yms
```

### Animated Counter
- Triggers on scroll into view (threshold 0.3)
- Cubic ease-out: `eased = 1 - (1 - progress)^3`
- Duration: 1800–2000ms
- Counts from 0 to target integer/float

### GoldLine (Animated Divider)
- Width animates 0 → target px on scroll reveal
- `transition: width 1.2s cubic-bezier(0.16,1,0.3,1) 200ms`

### Hero Slide Transition
- Auto-advance every **6000ms**
- Text: opacity + translateY/−12px, staggered per line (80ms increments)
- Background images: opacity crossfade `1.2s ease`
- Progress bar: updates every 50ms, `width` driven by state

### 3D Cube (Sectors visual)
- Continuous rotation: `rotateX(rot*0.4deg) rotateY(rot deg)`
- Increments +0.25deg per RAF frame (~15fps equivalent)

### Card Hover States
- Lift: `translateY(-3px)` to `translateY(-8px)`
- Shadow amplification: `box-shadow` deepens on hover
- Scale: `scale(1.03–1.12)` on image zooms
- Transition duration: `0.25s–0.4s ease`

### Sector Row Hover
- Image: `scale(1.02) → scale(1.09)` on hover, `1.1s cubic-bezier(0.4,0,0.2,1)`
- Accent bar width: `36px → 72px`
- Content bg: `#06000f → rgba(18,4,30,1)`
- CTA arrow gap: `8px → 14px`

### Subsidiary Flip Cards
- Desktop: true 3D CSS flip `rotateY(0 → 180deg)`, `0.75s cubic-bezier(0.4,0.2,0.2,1)`
- Mobile: opacity fade between front/back faces, `0.4s ease`
- Hover delay on leave: 400ms (prevents accidental flip-out)

### Navbar Scroll Effect
- Scroll > 30px: backdrop-blur(20px), semi-transparent white bg, purple bottom border glows
- Bottom border animates from 0% → 100% width on scroll

---

## 4. Page Architecture (Section Order)

```
┌─────────────────────────────────────────┐
│  [INTRO]  Logo Animation (first visit)  │
├─────────────────────────────────────────┤
│  1. Navbar (fixed, z-50, h-72px)        │
│  2. Hero Section (min-h-screen)         │
│  3. Stock Widget (py-4/6 strip)         │
│  4. About Section (white bg)            │
│  5. Investment Sectors (dark bg)        │
│  6. Subsidiaries Section (white bg)     │
│  7. Mission / Vision / Values (dark bg) │
│  8. Contact Section (white bg)          │
│  9. Footer (gradient dark bg)           │
└─────────────────────────────────────────┘
```

Alternating dark/light rhythm:
- Dark: Hero → Sectors → Mission/Vision → Footer
- Light: Stock Widget → About → Subsidiaries → Contact

---

## 5. Section 1 — Navbar

**File**: [frontend/src/components/Navbar.jsx](frontend/src/components/Navbar.jsx)

### Structure
```
<nav fixed top-0 z-50>
  ├── Animated purple bottom border (0% → 100% on scroll)
  └── Container (max-w-7xl, h-72px)
      ├── Logo (img: /fundviser-logo.png, h-11)
      ├── Desktop Nav Links
      │   ├── Home → /
      │   ├── Company Overview → /the-firm
      │   ├── What We Do (dropdown)
      │   │   ├── Our Business → /what-we-do
      │   │   ├── Investment Sectors → /investment-sectors
      │   │   └── Our Subsidiaries → /our-subsidiaries
      │   └── Governance (dropdown)
      │       ├── Board of Directors → /board-of-directors
      │       ├── Investor Info → /investor-info
      │       └── Compliance → /compliance
      └── Right: "Contact Us" CTA + Mobile Hamburger
```

### Navbar Colours
- **Default BG**: `#ffffff`
- **Scrolled BG**: `rgba(255,255,255,0.96)` + `backdrop-blur(20px)`
- **Active link / hover**: `text-[#360153]`
- **Default link**: `text-gray-700`
- **CTA button**: `linear-gradient(135deg, #360153, #5a0280)`, white text
- **Bottom border on scroll**: `linear-gradient(90deg, #360153, #a855f7, #eab308)`

### Dropdown Panel
- White bg, `rounded-2xl`, `shadow-2xl shadow-[#360153]/20`
- Purple top gradient bar: `from-[#360153] via-purple-500 to-yellow-400`, `h-1`
- Item hover: `bg-gradient-to-r from-[#360153]/8 to-purple-50`
- Icon morphs: bg `#360153]/8 → #360153`, icon `text-[#360153] → white`

### Mobile Drawer
- Slides from right: `w-[85vw] max-w-sm`
- White bg, `shadow-2xl`
- Backdrop: `bg-black/40 backdrop-blur-sm`
- Accordion for dropdown sections (max-h transition)
- Footer CTA: `linear-gradient(135deg, #360153, #5a0280)`

---

## 6. Section 2 — Hero Section

**File**: [frontend/src/components/HeroSection.jsx](frontend/src/components/HeroSection.jsx)

### Layout
- Full viewport: `min-h-screen`, flex-col
- Background: `#06000d`
- 12-column grid: left col-span-7 (content), right col-span-5 (image frame)

### Slides (3 total, auto-advance 6s)

| # | Tag | Accent Colour | Image Source |
|---|---|---|---|
| 1 | Real Estate | `#a78bfa` | Unsplash buildings |
| 2 | Capital Markets | `#f59e0b` | `/capital_market2.jpg` |
| 3 | Strategic Growth | `#34d399` | Unsplash charts |

### Background Layers (bottom to top)
1. Slide images crossfade: `opacity 0.18` active, `0.06` prev, `0` others
2. `bg-gradient-to-br from-[#360153]/40 via-transparent to-black/60`
3. `bg-gradient-to-t from-black/70 via-transparent to-black/20`
4. Dot grid: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`, 48px × 48px, `opacity-[0.025]`
5. Accent glow blob left: `radial-gradient(circle, {accent}18, transparent)`, `blur(60px)`

### Left Content Column
- **Tag pill**: accent colour border + bg, `tracking-[0.2em]`, animated dot `glow-shadow`
- **Headline** (3 lines): line-0 = accent colour, lines 1-2 = white; each line staggered `opacity + translateY(32px)`
- **Body text**: `text-gray-400`, max-w-xl
- **CTA Buttons**:
  - Primary: accent bg, `text-gray-900`, `px-7 py-3.5 rounded-xl`, `hover:scale-105`
  - Secondary: `border border-white/15 bg-white/5 backdrop-blur-sm`, white text
- **Divider**: `w-12 h-px` gradient `accent → transparent`
- **Metrics row** (3 items): `BSE Listed`, `30+ Years`, `Diversified Portfolio`
  - Each: coloured icon box + label/sub-label

### Right Image Frame (desktop only)
- Decorative gradient border: `linear-gradient(135deg, {accent}40, transparent 50%, {accent}20)`
- Image container: `rounded-3xl`, `aspectRatio: 4/3`, `shadow-2xl`
- Active image: `scale(1.03)`, inactive: `scale(1)`, `7s ease` scale transition
- Bottom-right floating badge: `BSE: 530197` + green pulsing dot
- **Slide selector pills** (below image): icon + label, active = accent bg + border, `translateY(-2px)`

### Bottom Controls Bar
- `border-t border-white/[0.06]`
- Left: BSE link with pulsing green dot
- Center: progress dots (expand to 28px pill on active)
- Right: `01 / 03` counter + prev/next arrows

### Mobile Enhancements
- Top progress strip (3 segments, fill active slide)
- No right image column (hidden on mobile)
- Font scaling: `clamp(1.9rem, 5vw, 4rem)`

---

## 7. Section 3 — Stock Widget

**File**: [frontend/src/components/StockWidget.jsx](frontend/src/components/StockWidget.jsx)

### Container
- `bg-gradient-to-br from-[#faf5fc] to-[#faf5fc]`
- `border-y border-[#f3e5f5]`
- `py-4 sm:py-6`
- Data refreshes every **60 seconds** from `/api/stock`

### Desktop Layout (flex row)
| Column | Content |
|---|---|
| Symbol block | Purple icon box (BarChart3) + "BSE: 530197" + "FUNDVISER" |
| Current Price | `₹{price}` — 3xl bold |
| Change | TrendingUp/Down icon + `+/- change (%)` in green/red |
| Volume | Formatted number (en-IN locale) |
| Last Updated | Time string |
| CTA | "View on BSE" — `bg-[#360153]` button |

### Mobile Layout (stacked)
- Top row: symbol block + "View on BSE" button
- 2×2 grid of white cards: Price / Change / Volume / Last Updated

### Fallback State
- Fallback data shown when backend offline
- Amber badge indicator when showing cached data

---

## 8. Section 4 — About Section

**File**: [frontend/src/components/AboutSection.jsx](frontend/src/components/AboutSection.jsx)

### Container
- `bg-white`, `py-16 sm:py-28`
- Decorative blobs: top-right `#f3e5f5` blur, bottom-left `yellow-50` blur

### Sub-sections

#### 8a. Header (centered)
- Tag pill: `bg-[#f3e5f5] text-[#360153]`, "A Wealth of Experience"
- H2: `3xl–6xl font-black`, "Shaping the Future of **Investment**"
  - "Investment" = `bg-gradient-to-r from-[#360153] to-yellow-500` text gradient
- Sub: `text-gray-500`, max-w-2xl

#### 8b. Main 2-Column Grid
**Left — Image Grid (desktop: mosaic, mobile: 2×2)**

Desktop mosaic (`ImageGrid`): 660px tall, 4-col × 3-row, gap 5px
```
Columns: 1.8fr | 1.7fr | 0.4fr | 1.7fr
Row heights: 260px | 210px | 180px

Image placements:
  chess.jpg         col:1       row:1/3   (tall, spans rows 1-2)
  /Market_Int.png   col:2/5     row:1     (wide, spans cols 2-4)
  Unsplash venture  col:2       row:2
  Unsplash finance  col:3/5     row:2
  Unsplash realty   col:1/4     row:3     (wide, spans cols 1-3)
  Unsplash UAE      col:4       row:3
```

Each image cell on hover:
- `scale(1.03 → 1.12)`
- Gradient overlay deepens: `rgba(54,1,83,0.92)` purple
- Gold shimmer: `rgba(234,179,8,0.13)`
- Label slides up (translateY 10→0), gold underline draws in (scaleX 0→1)
- Top-right gold corner accent appears
- Dimmed neighbours: `brightness(0.28) saturate(0.3)`

**Right — Text Content**
- Tag pill: "Who We Are"
- H3: "We are not just investors — **we are innovators.**"
  - Gradient: `from-[#360153] to-yellow-500`
- 2 body paragraphs
- 3 Highlight rows (icon + title + desc):
  1. Multi-Sector Portfolio (TrendingUp icon)
  2. BSE Listed Credibility (Globe icon)
  3. Risk-Managed Returns (Shield icon)
  - Each row: `hover:bg-[#faf5fc]`, icon box = `bg-gradient-to-br from-[#360153] to-[#5a0280]`, `group-hover:scale-110`
- CTA: "Learn More About Us" → `/the-firm` — purple gradient button

#### 8c. Stats Row (4 cards, 2×2 on mobile, 4 across on desktop)

| # | Icon | Value | Label | Sub | Image |
|---|---|---|---|---|---|
| 1 | Award | 30+ | Years of Legacy | Since 1993 | `/Trust.png` |
| 2 | Target | 50+ | Investments Made | Across sectors | Unsplash |
| 3 | Shield | 98% | Client Satisfaction | Stakeholder trust | Unsplash |
| 4 | Sparkles | 100+ | Crore Portfolio Value | Assets under mgmt | `growth.jpg` |

**Card hover effect:**
- Default: white bg, gray border, normal
- Hover: `translateY(-8px)`, border `rgba(54,1,83,0.15)`, shadow deepens
- Background image reveals (white overlay fades to `opacity-0`)
- Gradient tint overlays (30% opacity on hover)
- Text colour transitions: `gray-900 → white`, `gray-400 → white/60`
- Divider line draws from center (scaleX 0 → 1)
- Bottom accent bar sweeps left → right

---

## 9. Section 5 — Investment Sectors

**File**: [frontend/src/pages/Home.jsx](frontend/src/pages/Home.jsx) (inline `SectorRow`)

### Container
- `background: #06000f`
- Ambient glow blobs: purple top-left, gold bottom-right (radial gradients, 600–700px)

### Section Header (centered, max-w-900)
- Tag pill: `bg-[rgba(197,150,60,0.1)] border-[rgba(197,150,60,0.28)]`, gold text, "Investment Universe"
- H2: "Sectors We **Dominate**"
  - "Dominate" = `linear-gradient(135deg, #a78bfa, #c5963c)` gradient
- Sub: `rgba(255,255,255,0.45)`, max-w-580

### 6 Sector Rows (alternating left/right image)

| # | Title | Subtitle | Accent | Image |
|---|---|---|---|---|
| 01 | Real Estate | Commercial & Residential | `#a78bfa` | `/Main_header_building.png` |
| 02 | Capital Markets | Equity & Commodity Trading | `#f59e0b` | Unsplash finance |
| 03 | Strategic Advisory | Financial Structuring | `#34d399` | Unsplash exec |
| 04 | Entertainment | Box Cinema Revolution | `#f43f5e` | Unsplash cinema |
| 05 | Global Trade | Import / Export Operations | `#38bdf8` | Unsplash Dubai |
| 06 | Technology | Fleet & GPS Solutions | `#818cf8` | `/Tech.jpg` |

### Sector Row Anatomy

**Image Half (58% width desktop)**
- Full-height image with `scale(1.02 → 1.09)` on hover
- Directional vignette: left-side → right for odd rows, reversed for even
- Colour tint: `{accent}16` gradient, brightens on hover
- Ghost number: `140px font-black, rgba(255,255,255,0.05)` (desktop only)
- Subtitle pill: `{accent}22 bg, {accent}38 border`, top-left corner

**Content Half (42% width desktop)**
- Dark bg `#06000f → rgba(18,4,30,1)` on hover
- Sector counter: `01 / 06` in accent colour, 11px, 0.22em tracking
- H3: white, clamp size
- Animated accent bar: `36px → 72px` wide on hover
- Description: `rgba(255,255,255,0.48 → 0.72)` on hover
- Tags: pill chips with `{accent}14` bg and `{accent}28` border
- CTA: "Explore {Title}" + circle arrow button in accent gradient

### Bottom CTA
- "View All Investment Sectors →" button: `linear-gradient(135deg, #360153, #c5963c)`, `rounded-14`, shadow on hover

---

## 10. Section 6 — Subsidiaries

**File**: [frontend/src/components/SubsidiariesSection.jsx](frontend/src/components/SubsidiariesSection.jsx)

### Container
- `bg-white`, `py-16 sm:py-28`
- Large blur blobs: top-left `#f3e5f5`, bottom-right `yellow-50`

### Section Header (centered)
- Tag: "Our Group of Companies" — pulsing dot
- H2: "Our **Subsidiaries**" — gradient text
- Sub + "Hover over a card to explore" hint

### 3 Flip Cards (3-column grid)

| # | Company | Tag | Accent |
|---|---|---|---|
| 1 | Starlight Box Theatres Pvt. Ltd. | Entertainment · India | `#f59e0b` (amber) |
| 2 | DARS Transtrade Pvt. Ltd. | Global Trading · India | `#34d399` (emerald) |
| 3 | Silver Sage Trading LLC | General Trading · UAE | `#a78bfa` (lavender) |

**Card Height**: 520px
**Card BG Gradients** (each unique, dark purple/green/violet tones)

**Front Face:**
- Tag pill with animated pulse dot
- Logo (white bg card) or styled text logo (DARS)
- Company full name, accent underline
- "Hover/Tap to explore" hint

**Back Face (on hover/tap):**
- Tag pill + company short name + × close button
- Description paragraph
- 6 bullet points with coloured CheckCircle icons
- "Visit Website" CTA (accent bg) or "Website Coming Soon" ghost button

**Desktop**: True 3D CSS flip `rotateY(180deg)`, `0.75s cubic-bezier(0.4,0.2,0.2,1)`
**Mobile**: Opacity crossfade `0.4s ease` (avoids 3D rendering bugs)

### Bottom CTA Strip
- `rounded-3xl`, bg image with dark overlay `from-slate-900/95 via-[#360153]/85 to-slate-900/90`
- Left: company group title + tagline
- Right: "About the Firm" (yellow-400 bg) + "Get In Touch" (glass white)

---

## 11. Section 7 — Mission, Vision & Values

**File**: [frontend/src/components/MissionVisionSection.jsx](frontend/src/components/MissionVisionSection.jsx)

### Container
- `bg-gradient-to-br from-slate-950 via-[#1a002b] to-slate-950`
- Top/bottom `h-px` separator lines: `via-white/10`
- Animated orbs: purple top-left `opacity-20 animate-pulse`, gold bottom-right `opacity-10`
- Grid overlay: white lines 60px×60px, `opacity-[0.03]`

### Section Header (centered)
- Tag: "Our Objective" — pulsing yellow dot, `bg-white/5 border-white/10 text-yellow-400`
- H2: "What Sets Us **Apart**" — `from-yellow-400 to-yellow-200` gradient
- Sub: `text-gray-400`

### Mission & Vision Cards (2-col grid)

**Mission Card** (left):
- Accent: `#360153` purple
- Background image: low opacity, scales on hover
- Overlay: `from-[#360153]/40 via-slate-900/60 to-slate-900/90`
- Icon: Target in `from-[#360153] to-[#5a0280]` box
- Content: "At Fundviser Capital, our mission is to identify and capitalize on unique investment opportunities that drive consistent, long-term growth…"
- Bottom bar: `from-[#360153] to-transparent`

**Vision Card** (right):
- Accent: `#f59e0b` yellow
- Background image: tech/global
- Overlay: `from-yellow-900/30 via-slate-900/60 to-slate-900/90`
- Icon: Eye in `from-yellow-500 to-yellow-700` box
- Content: "To establish Fundviser Capital as a premier investment company renowned for its strategic foresight…"
- Bottom bar: `from-yellow-500 to-transparent`

### Core Values (3 interactive cards)

| # | Title | Icon | Gradient |
|---|---|---|---|
| 1 | Stability | Shield | `from-[#360153] to-[#5a0280]` |
| 2 | Strategic Foresight | Zap | `from-yellow-500 to-yellow-700` |
| 3 | Sustainable Growth | TrendingUp | `from-emerald-500 to-emerald-700` |

**Active Card State:**
- `translateY(-6px)`, glow shadow `{glow}20`
- Border: `{glow}50` colored
- Background: `{glow}12`
- Inner glow blob appears (opacity 0.15)
- Bottom progress bar fills 100%
- Icon scales to 1.1

### Bottom Quote Block
- `bg-white/5 border-white/10 backdrop-blur-md`, `rounded-3xl`
- Italic quote text, white, `text-lg–3xl`
- Attribution: `text-yellow-400`, "Fundviser Capital", flanked by `h-px w-10 bg-yellow-400/50`

---

## 12. Section 8 — Contact Section

**File**: [frontend/src/components/ContactSection.jsx](frontend/src/components/ContactSection.jsx)

### Container
- `bg-white`, `py-24`
- Corner blobs: `#f3e5f5`, `blur-3xl opacity-30`

### Section Header (centered)
- Tag: "Get In Touch" pill
- H2: "Let's Start a **Conversation**" — `bg-[#360153]` text gradient
- Sub: `text-gray-600`

### 2-Column Grid

**Left — Contact Info:**
- Border-left accent: `border-l-4 border-[#360153]`
- Company tagline: "Excellence in Investment"
- Description paragraph
- 3 contact cards (`bg-[#faf5fc] rounded-xl hover:shadow-lg`):
  - Phone: `+91-22-31236586` — purple icon box
  - Email: `info@fundvisercapital.in` — purple icon box
  - Location: Mumbai, Maharashtra, India — purple icon box

**Right — Contact Form:**
- `bg-[#faf5fc] rounded-2xl p-8 shadow-xl`
- Fields: Full Name / Email Address / Phone Number / Message (textarea)
- Input style: `bg-white border border-[#e1bee7] rounded-lg focus:ring-2`
- Submit: "Send Message" + Send icon — `bg-[#360153]` full-width button

---

## 13. Section 9 — Footer

**File**: [frontend/src/components/Footer.jsx](frontend/src/components/Footer.jsx)

### Container
- `bg-gradient-to-br from-slate-900 via-[#360153] to-slate-900`
- Faint grid pattern: `rgba(255,255,255,0.05)`, 50px×50px
- `py-16`

### 4-Column Grid (lg)

**Col 1 — Company Info:**
- Logo: `bg-white rounded-xl`, `/footer-fundviser-logo.png`
- Tagline text `text-gray-300`
- "View on BSE India" → gold link with ExternalLink icon
- Social icons (Facebook, Twitter, LinkedIn, Instagram): `bg-white/10 hover:bg-white/20`, `hover:scale-110`

**Col 2 — Quick Links:**
- 9 internal links (all pages)
- `text-gray-300 hover:text-yellow-400`
- Hover arrow `→` reveals

**Col 3 — Subsidiary Companies:**
- 3 subsidiary links
- Same hover style

**Col 4 — Get In Touch:**
- MapPin icon (yellow-400): 22/7 Manek Mahal, 90 Veer Nariman Road, Churchgate, Mumbai 400020
- Phone icon: +91-22-31236586
- Mail icon: info@fundvisercapital.in

### Bottom Bar
- `border-t border-white/10`
- Left: "© 2026 **Fundviser Capital**. All Rights Reserved." — yellow brand name link
- Right: "Developed by **CSN**" — yellow link

---

## 14. Reusable UI Primitives

### Section Tag Pill (light bg)
```
bg-[#f3e5f5] text-[#360153]
px-5 py-2 rounded-full
text-sm font-bold tracking-widest uppercase
```

### Section Tag Pill (dark bg)
```
bg-rgba(197,150,60,0.1) border border-rgba(197,150,60,0.28)
text-[#c5963c] text-xs font-700 tracking-[0.18em] uppercase
px-18px py-7px rounded-full
Leading dot: w-6px h-6px rounded-full bg-[#c5963c]
```

### GoldLine Divider
```
height: 2px
background: linear-gradient(to right, #c5963c, #f0c060, #c5963c)
borderRadius: 2px
Animates width 0 → target on scroll reveal
```

### Primary CTA Button (dark bg)
```
background: linear-gradient(135deg, #360153, #c5963c)
px-16px py-40px rounded-14px
color: white font-700 text-16px
boxShadow: 0 8px 40px rgba(54,1,83,0.45)
hover: translateY(-3px) + deeper shadow
```

### Primary CTA Button (light bg)
```
background: linear-gradient(135deg, #360153, #5a0280)
text-white font-bold rounded-xl
hover:scale-105 hover:-translate-y-0.5
shadow-xl hover:shadow-[#360153]/40
```

### Ghost CTA Button
```
border: 1.5px solid rgba(54,1,83,0.2)
color: #360153 font-700 rounded-12px
hover: bg-rgba(54,1,83,0.06) border stronger
```

### Sector Tag Chip
```
padding: 5px 13px rounded-full
background: {accent}14 border: {accent}28
color: {accent} font-700 text-11px tracking-[0.07em]
```

### Counter Component
- Scroll-triggered animated count-up (eased cubic, 1800-2000ms)

### Reveal / FadeIn Component
- Directions: `up | left | right | scale`
- Delay prop for stagger
- Uses IntersectionObserver

---

## 15. Responsive Breakpoints

| Breakpoint | Alias | Key Changes |
|---|---|---|
| `< 768px` | Mobile | Single column layouts, smaller font, no 3D cube ghost numbers, image grid = 2×2 simple, sector rows stack vertically |
| `768px–1023px` | Tablet | Some 2-col grids, sector row image 50%/50% |
| `≥ 1024px` | Desktop | Full grids, 3D flip cards in true 3D, hero right image panel visible |
| `≥ 1280px` | XL Desktop | Wider gaps, hero content col shifts to col-span-6 |

### Sector Row Responsive
- Mobile: `flexDirection: column`, image height 260px, content stacked below
- Tablet: `50% / 50%` split, height 420px
- Desktop: `58% / 42%` split, full height (min 520px)

### Font Clamp Values
- Hero H1: `clamp(1.9rem, 5vw, 4rem)`
- About H2: `clamp(2.8rem, 4.5vw, 5rem)`
- Sectors H2: `clamp(2.1rem, 5vw, 5.5rem)`
- Sector Row H3: `clamp(1.8rem, 2.4vw, 3rem)` — mobile: `1.75rem` fixed

---

## 16. Logo Animation (Intro Screen)

**File**: [frontend/src/components/LogoAnimation.jsx](frontend/src/components/LogoAnimation.jsx)

- Shown **only on first visit** per session (`sessionStorage.getItem('hasSeenLogoAnimation')`)
- Duration: **2500ms** before page content fades in
- After completion: `setShowLogoAnimation(false)`, content fades in via `opacity-0 → opacity-100 duration-500`
- On repeat visits: skips animation, immediately shows content

---

## Summary: Design Personality

| Trait | Description |
|---|---|
| **Premium / Luxury** | Deep purple + gold palette, heavy font weights (900), large whitespace |
| **Dark & Light Rhythm** | Alternating dark (hero, sectors, mission) / light (about, subsidiaries, contact) sections |
| **Motion-Rich** | Every section has scroll-reveal, counters, hover microinteractions |
| **Brand Authority** | BSE listing prominently featured throughout (navbar, hero badge, stock widget, footer) |
| **Spatial Depth** | 3D flip cards, rotating cube, tilted image collage, layered gradients |
| **Typography Hierarchy** | 900-weight headlines, 11px uppercase tracking labels, clean readable body at 16-18px |
| **Consistent Brand Signal** | Purple `#360153` / Gold `#c5963c` pair appears in every single section |
