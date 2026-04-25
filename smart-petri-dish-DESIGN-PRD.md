# Smart Petri Dish — Design PRD
## Website Design System & Layout Specification

**Version:** 1.0 | **Date:** April 2026
**Primary inspiration:** https://envoll.webflow.io/
**Secondary inspiration:** https://healthcare-institution-128.webflow.io/home-1
**Stack:** React + shadcn/ui + Tailwind CSS

---

## DESIGN PHILOSOPHY

**From Envoll:** organic warmth, generous whitespace, earthy-teal palette, soft imagery, human-centered layouts, flowing section transitions, elegant typography with high contrast between heading weight and body weight.

**From Healthcare 128:** clean grid discipline, structured spacing system, muted sage/dark palette, bold section separators, trust-building through minimal but confident layouts.

**Synthesis for Smart Petri Dish:**
A site that feels like a trusted community health partner — warm enough to welcome a first-generation healthcare user from Robeson County, precise enough to earn the trust of a licensed medical provider. Clean structure, organic warmth, zero unnecessary complexity.

---

## 1. COLOR SYSTEM

### Primary Palette (adapted from Envoll)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-teal` | `#145e69` | Primary brand, CTAs, active states, icons |
| `--color-teal-light` | `#9ed8db` | Hover states, tag backgrounds, subtle accents |
| `--color-teal-xlight` | `#e8f6f7` | Section backgrounds (alternating), card fills |
| `--color-gold` | `#f4d092` | Accent highlights, badge backgrounds, warm details |
| `--color-dark` | `#0f2f35` | Hero background, dark sections, footer |

### Neutral Palette (from Healthcare 128 + Envoll)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-black` | `#0d0d0d` | Primary text, headings |
| `--color-gray-dark` | `#565656` | Body text, secondary labels |
| `--color-gray-mid` | `#afafaf` | Disabled states, placeholders |
| `--color-gray-light` | `#dbdbdb` | Borders, dividers |
| `--color-gray-bg` | `#f5f5f5` | Alternating section backgrounds |
| `--color-white` | `#ffffff` | Cards, main background |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-safe` | `#2a9d5c` | SAFE result flag |
| `--color-positive` | `#e05a2b` | POSITIVE result flag |
| `--color-negative` | `#64748b` | NEGATIVE result flag |
| `--color-warning` | `#f59e0b` | Urgent alerts |

---

## 2. TYPOGRAPHY SYSTEM

**Font family:** `Manrope` (Google Fonts — matches the weight-play style of Envoll)
```
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
```

### Type Scale (adapted from Envoll style guide)

| Element | Size (rem) | Size (px) | Weight | Line Height | Letter Spacing |
|---------|-----------|-----------|--------|-------------|----------------|
| H1 | 3.75rem | 60px | 700 | 1.1 | -0.02em |
| H2 | 2.5rem | 40px | 700 | 1.2 | -0.01em |
| H3 | 1.875rem | 30px | 600 | 1.3 | 0 |
| H4 | 1.5rem | 24px | 600 | 1.4 | 0 |
| H5 | 1.25rem | 20px | 600 | 1.5 | 0 |
| H6 | 1.125rem | 18px | 600 | 1.44 | 0 |
| Body | 1rem | 16px | 400 | 1.65 | 0 |
| Small | 0.875rem | 14px | 500 | 1.7 | 0.01em |
| Button | 1rem | 16px | 600 | 1 | 0.01em |
| Eyebrow | 0.8125rem | 13px | 700 | 1 | 0.12em (uppercase) |

### Responsive Scale

| Breakpoint | H1 | H2 | H3 |
|-----------|----|----|-----|
| Desktop ≥1200px | 60px | 40px | 30px |
| Tablet 768–1199px | 44px | 32px | 24px |
| Mobile <768px | 32px | 26px | 20px |

---

## 3. SPACING SYSTEM

*(adapted from Healthcare 128's strict spacing spec)*

| Context | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Section padding top/bottom | 120px | 80px | 60px |
| Content block internal gap | 60px | 48px | 40px |
| Component gap (cards, items) | 32px | 24px | 20px |
| Inline element gap | 16px | 12px | 12px |
| Max container width | 1200px | 100% | 100% |
| Container padding (sides) | 80px | 40px | 24px |

---

## 4. COMPONENT SYSTEM

### Buttons

**Primary button** (Envoll style — filled teal, arrow icon)
```
background: #145e69
color: #ffffff
padding: 14px 28px
border-radius: 999px
font-size: 1rem
font-weight: 600
display: inline-flex
align-items: center
gap: 10px
transition: background 0.2s ease, transform 0.15s ease

Hover: background: #0f4a54, transform: translateX(2px)
Icon: small diagonal arrow → (SVG, 16x16)
```

**Secondary / Ghost button** (Healthcare 128 style — outlined)
```
background: transparent
color: #145e69
border: 1.5px solid #145e69
padding: 13px 28px
border-radius: 999px
font-size: 1rem
font-weight: 600

Hover: background: #e8f6f7
```

**Dark button** (for hero / dark sections)
```
background: #ffffff
color: #0f2f35
padding: 14px 28px
border-radius: 999px
font-size: 1rem
font-weight: 600

Hover: background: #f4d092, color: #0f2f35
```

---

### Cards

**Service card** (Envoll style — image top, clean content below)
```
background: #ffffff
border-radius: 16px
overflow: hidden
box-shadow: 0 2px 16px rgba(0,0,0,0.07)
transition: box-shadow 0.2s ease, transform 0.2s ease

Image: full-width, aspect-ratio 4/3, object-fit cover
Content padding: 24px
Title: H5, color #0d0d0d
Body: 14px, color #565656
Link: teal color, flex with arrow icon

Hover: box-shadow: 0 8px 32px rgba(20,94,105,0.15), translateY(-4px)
```

**Provider / Team card**
```
background: #ffffff
border-radius: 16px
padding: 28px 24px
border: 1px solid #e8f6f7
text-align: center

Photo: circle, 80px diameter, border: 3px solid #9ed8db
Name: H5, font-weight 700
Specialty: 13px, teal color, uppercase, letter-spacing 0.1em
Quote: 14px italic, color #565656, margin-top 16px
```

**Metric / Stat card**
```
background: transparent (inline in section)
Number: H1 size (60px), font-weight 800, color #145e69
Title: H5, font-weight 700, color #0d0d0d
Description: 14px, color #565656
Progress bar: height 2px, background #dbdbdb
Progress fill: background #145e69, animated width on scroll
Separator: 1px solid #dbdbdb between metrics
```

**Advantage card** (numbered, Healthcare 128 style)
```
border-top: 1px solid #dbdbdb
padding: 32px 0
display: flex
align-items: flex-start
gap: 24px

Number: 3rem, font-weight 800, color #9ed8db (light teal)
Title: H4, font-weight 700, color #0d0d0d
Body: 16px, color #565656
Arrow: diagonal ↗ SVG, color #145e69, top-right corner

Hover: background: #e8f6f7, border-radius: 12px, padding-left: 20px
Transition: all 0.2s ease
```

---

### Eyebrow Label
```
font-size: 13px
font-weight: 700
letter-spacing: 0.12em
text-transform: uppercase
color: #145e69
display: inline-flex
align-items: center
gap: 8px
margin-bottom: 16px

Before element: 20px horizontal line, background #145e69, height 2px
```

---

### Tags / Badges
```
padding: 6px 14px
border-radius: 999px
font-size: 13px
font-weight: 600

Variant teal: background #e8f6f7, color #145e69
Variant gold: background #fdf3e0, color #a0692a
Variant safe: background #dcfce7, color #166534
Variant positive: background #fee2e2, color #991b1b
Variant neutral: background #f1f5f9, color #475569
```

---

### Form Inputs
```
height: 52px
border: 1.5px solid #dbdbdb
border-radius: 10px
padding: 0 16px
font-size: 1rem
font-weight: 400
color: #0d0d0d
background: #ffffff
transition: border-color 0.2s

Focus: border-color #145e69, box-shadow: 0 0 0 3px rgba(20,94,105,0.1)
Placeholder: color #afafaf
```

---

## 5. SECTION-BY-SECTION LAYOUT SPEC

### Section 1 — Navbar
```
Position: sticky top, z-index 100
Height: 72px
Background: rgba(255,255,255,0.95) + backdrop-filter: blur(12px)
Border-bottom: 1px solid #dbdbdb (appears on scroll)
Max-width container: 1200px, centered

Left: Logo (teal icon + dark wordmark, height 36px)
Center: Nav links (Manrope 15px, weight 500, color #565656)
  Active/hover: color #145e69
Right: Cart icon + counter badge + "Order Now" button (primary)

Mobile: hamburger menu (3 lines → X transition)
  Drawer: full screen, dark overlay, slide from right
```

---

### Section 2 — Hero
```
Min-height: 100vh
Background: linear-gradient(135deg, #0a2428 0%, #0f2f35 50%, #145e69 100%)
Overflow: hidden

Layout: 2-column grid, 55% / 45%
Padding: 120px 80px

LEFT COLUMN:
  Eyebrow tag (gold bg, dark text): "3-in-1 Bio-Sensor Platform"
  H1: white, 60px, weight 700, line-height 1.1
  Subtext: white/75%, 18px, max-width 480px, line-height 1.65
  Button row: [Primary dark btn] [Ghost btn white border] — gap 16px
  Trust row: 4 items inline, icon + text, white/60%, 13px — margin-top 40px

RIGHT COLUMN:
  Product image: Smart Petri Dish 3D, max-width 500px
  Float animation: translateY 0px ↔ -14px, 4s ease-in-out infinite
  Glow: radial gradient behind device, teal-cyan, opacity 0.3
  Badge 1 (top-right of image): white pill, teal text, shadow
  Badge 2 (bottom-left): white pill, teal text, shadow

Background detail: subtle grid/dot pattern overlay, opacity 0.04
```

---

### Section 3 — Services
```
Background: #ffffff
Padding: 120px 80px

Top row: [Eyebrow left] [H2 left, max-width 500px] [Subtext right, max-width 400px] [Link right]
  This creates an asymmetric editorial split header (Envoll signature)

Card grid: 4 columns desktop, 2 tablet, 1 mobile
Gap: 24px

Each card:
  Top: square icon in teal-light circle (48px)
  Title: H5, weight 700
  Body: 14px, color gray-dark
  "Read More" link with arrow →
```

---

### Section 4 — Marquee Statement
```
Background: #f5f5f5
Padding: 80px 80px

Centered small icon (Petri Dish logo, teal, 32px) above text

Text block: full-width, Manrope 700, 72px desktop / 40px mobile
Line-height: 1.05
Color: #0d0d0d
"health equity" in #145e69 teal

2 images inline (in text flow):
  Border-radius: 12px
  Height: 80px
  Width: auto
  Vertical-align: middle
  Margin: 0 16px
```

---

### Section 5 — Stats Bar
```
Background: #0f2f35 (dark teal)
Padding: 60px 80px

Layout: 4 equal columns, dividers between each (1px white/20%)

Each stat:
  Number: 48px, weight 800, color #f4d092 (gold)
  Label: 14px, weight 500, color white/70%, uppercase, letter-spacing 0.08em
  Count-up animation on scroll into view
```

---

### Section 6 — How It Works
```
Background: #ffffff
Padding: 120px 80px

TOP: Full-width area
  Eyebrow centered
  H2 centered, max-width 600px
  Subtext centered, max-width 500px

STEPS ROW: 4 columns
  Each step:
    Circle number: 48px, background #e8f6f7, color #145e69, weight 800
    Icon: 24px, teal
    Title: H5, weight 700
    Body: 14px, gray-dark
    Connector arrow between steps: dashed SVG line, teal, animated
  Mobile: vertical stack, left-aligned

MINI INFOGRAPHIC BAR:
  Background: #e8f6f7
  3 nodes connected by arrow line
  Each node: icon + title + 3 bullet points
  Padding: 40px

ACCORDION FAQ: below
  Border-top: 1px solid #dbdbdb per item
  Question: H5, weight 600
  Chevron: rotates on open
  Answer: 16px, gray-dark, max-height animated
  Open state: background #f5f5f5, border-left: 3px solid #145e69

LEFT PHOTO MOSAIC (below fold or same section):
  3 photos in CSS grid overlap composition
  Border-radius: 16px
  Photo sizes: large (60%), small-top-right (35%), small-bottom (50%)
```

---

### Section 7 — Our Mission
```
Background: #e8f6f7 (very light teal)
Padding: 120px 80px

Layout: 50/50 split, text left, image right

LEFT:
  Eyebrow: "Why We Exist"
  H2: 2 lines, tight
  Paragraph 1: with a visual break / pullquote treatment for the key sentence
  Paragraph 2
  No CTA button — this section ends with the human message

RIGHT:
  Full photo, border-radius 20px
  Subtle drop shadow
  Optional: floating stat chip (e.g. "500k Lives Impacted") overlaid bottom-left
    White pill, teal text, bold number
```

---

### Section 8 — Partner Providers
```
Background: #ffffff
Padding: 120px 80px

Header: Eyebrow + H2 left, "View All Providers →" link right

Card grid: 4 columns, gap 24px
  Photo: circle, 80px
  Name: H5, weight 700
  Specialty: 13px, teal uppercase
  Quote: italic, 14px, gray, with opening " mark in teal
  Hover: card lifts, thin teal border appears
```

---

### Section 9 — Our Impact
```
Background: #0f2f35 (dark)
Padding: 120px 80px

Layout: 45% left text, 55% right metrics

LEFT (on dark):
  Small logo (white)
  Label: "Our Impact" — eyebrow in gold
  H2: white
  2 paragraphs: white/80%
  No button

RIGHT:
  4 metrics stacked, separated by 1px white/10% lines
  Number: 64px, weight 800, color #f4d092
  Title: H5, white, weight 700
  Body: 14px, white/60%
  Progress bar: 2px height, white/20% base, #9ed8db fill, animated on scroll
```

---

### Section 10 — Why Smart Petri Dish
```
Background: #ffffff
Padding: 120px 80px

Header: Eyebrow + H2 + subtext — centered, max-width 700px, margin-bottom 60px

4 advantage blocks stacked vertically
  Each: full-width row, border-top 1px #dbdbdb
  Left: bold 2-digit number (light teal, 48px)
  Center: H4 title + body text
  Right: diagonal arrow ↗ (teal)
  Hover: background tint #e8f6f7, smooth transition
```

---

### Section 11 — Order the Device
```
Background: #e8f6f7 (very light teal)
Padding: 120px 80px

Eyebrow + H2 centered

PRODUCT CARD: centered, max-width 800px
  Background: #ffffff
  Border-radius: 24px
  Box-shadow: 0 8px 40px rgba(20,94,105,0.12)
  Padding: 48px
  Layout: image left (40%) | content right (60%)

  Image: Smart Petri Dish 3D, contain, dark bg rounded
  Star rating row: teal stars + count
  Feature list: teal checkmarks, 14px
  Price: H3, weight 800, color #0f2f35
  Buttons: [Add to Cart primary] [Order Now dark] — row, gap 12px

TRUST ROW: 3 items below card
  Icon + text, centered, color gray-dark, 14px

WHAT'S INCLUDED: 3 cards in a row below
  Border: 1px solid #dbdbdb
  Border-radius: 12px
  Padding: 24px
  Icon: teal circle background
  Title: H6, weight 700
  Body: 14px
```

---

### Section 12 — Contact
```
Background: #ffffff
Padding: 120px 80px

Layout: 45% left (info), 55% right (form) — Healthcare 128 style

LEFT:
  H2 + subtext
  3 contact info rows: icon + text (teal icons)
  Background image: subtle medical/community photo, 40% opacity, bottom-right

RIGHT:
  Form card: white, border-radius 16px, shadow, padding 40px
  2-col grid for First/Last name
  Full-width fields for phone, email, dropdown, message
  Submit button: primary, full-width
  Success/error message below
```

---

### Section 13 — Footer
```
Background: #0f2f35
Padding: 80px 80px 40px

TOP ROW:
  Logo (white) + tagline (white/60%, 14px)
  3 column link lists (white/70%, hover white)
  Column titles: uppercase, 12px, letter-spacing 0.1em, white/40%

DIVIDER: 1px white/10% line

BOTTOM ROW:
  Copyright (white/40%, 14px)
  Social icons (white/40%, hover white)
```

---

### Sticky Bottom Bar
```
Position: fixed bottom 0, full width
Height: 52px
Background: #0f2f35
Z-index: 999
Overflow: hidden

Content: ticker strip, white text, 14px, weight 600
Text repeats: "Order Now ↗ · Bring Health Home ↗ · " (duplicate for seamless loop)

Animation:
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  animation: ticker 25s linear infinite;

Hover on link item: color #f4d092 (gold)
```

---

## 6. ANIMATION & INTERACTIONS

### Scroll Reveal (all sections)
```css
/* Base state */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger children: add delay-100, delay-200, delay-300 */
```

### Hero Device Float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-14px); }
}
.float { animation: float 4s ease-in-out infinite; }
```

### Counter Animation (Stats + Impact)
- Trigger: IntersectionObserver, threshold 0.3
- Duration: 2s, easing: ease-out
- Library: `react-countup` or vanilla requestAnimationFrame

### Progress Bars (Impact section)
- Width animates from 0% to target% on scroll enter
- Transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1)
- Staggered: 200ms delay per bar

### Button Hover
```css
.btn-primary:hover {
  background: #0f4a54;
  transform: translateX(3px);
}
/* Arrow icon inside also shifts: translateX(3px) */
```

---

## 7. RESPONSIVE BREAKPOINTS

| Name | Width | Notes |
|------|-------|-------|
| Desktop | ≥ 1200px | Full layouts, all columns |
| Tablet | 768–1199px | 2-column adapts, nav collapses |
| Mobile | < 768px | Single column, stack everything |
| Small | < 480px | Tighten paddings, smaller type |

---

## 8. ICON STYLE

- Style: **line icons**, consistent stroke width (1.5px), rounded caps
- Size: 20px inline, 24px feature icons, 48px hero-level
- Color: teal `#145e69` primary, gold `#f4d092` accent, white on dark backgrounds
- Library: `lucide-react` (matches line style of Envoll)

---

## 9. IMAGE TREATMENT

| Context | Treatment |
|---------|-----------|
| Hero product | Dark background, 3D render, teal glow |
| Community/mission | Warm, natural light, real people, minimal medical props |
| Doctor photos | Circle crop, teal ring border |
| Section backgrounds | Low opacity overlays (max 15%), never obscure text |
| Cards | Rounded corners (16px), consistent aspect ratio |

---

## 10. TAILWIND CONFIG TOKENS

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#145e69',
          light:   '#9ed8db',
          xlight:  '#e8f6f7',
          dark:    '#0f2f35',
        },
        gold: '#f4d092',
        'text-primary': '#0d0d0d',
        'text-secondary': '#565656',
        'text-muted': '#afafaf',
        border: '#dbdbdb',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2':      ['2.5rem',  { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3':      ['1.875rem',{ lineHeight: '1.3' }],
        'h4':      ['1.5rem',  { lineHeight: '1.4' }],
        'h5':      ['1.25rem', { lineHeight: '1.5' }],
        'body':    ['1rem',    { lineHeight: '1.65' }],
        'small':   ['0.875rem',{ lineHeight: '1.7' }],
        'eyebrow': ['0.8125rem',{ lineHeight: '1', letterSpacing: '0.12em' }],
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '24px',
        'pill': '999px',
      },
      boxShadow: {
        'card': '0 2px 16px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 32px rgba(20,94,105,0.15)',
        'product': '0 8px 40px rgba(20,94,105,0.12)',
      },
    },
  },
}
```

---

*Design PRD v1.0 — Smart Petri Dish.
Primary inspiration: Envoll (warmth, typography, organic layouts).
Secondary inspiration: Healthcare 128 (grid discipline, spacing system, trust).
Stack: React + shadcn/ui + Tailwind CSS.*
