# Smart Petri Dish — Claude Code Implementation Prompt

---

## CONTEXT

Build the landing page for **Smart Petri Dish**, an AI-powered health diagnostic platform.
Read both attached documents before writing any code:
- `CONTENT-PRD.md` — every text string, label, and copy on the page
- `DESIGN-PRD.md` — every color, spacing, component, and layout spec

**Stack:** React + Tailwind CSS + shadcn/ui
**Font:** Manrope (Google Fonts)
**Icons:** lucide-react

**Two inspiration sites (do not copy, use as visual reference):**
- Layout & warmth: https://envoll.webflow.io/
- Grid discipline & spacing: https://healthcare-institution-128.webflow.io/home-1

---

## CORE DESIGN RULES — NEVER BREAK THESE

1. **Font is always Manrope.** No other font family anywhere.
2. **Primary teal is `#145e69`.** Not blue, not green — teal.
3. **Hero background is dark teal** `#0f2f35` → `#145e69` gradient. Not navy, not black.
4. **Section padding: 120px top/bottom desktop, 80px tablet, 60px mobile.** No exceptions.
5. **All buttons are pill-shaped** (`border-radius: 999px`). No square corners on buttons.
6. **All cards have `border-radius: 16px`** and use `box-shadow: 0 2px 16px rgba(0,0,0,0.07)`.
7. **Eyebrow labels are uppercase, 13px, letter-spacing 0.12em, teal color** with a short line before text.
8. **Stats and impact numbers use gold `#f4d092`** on dark backgrounds.
9. **H1 is 60px / weight 700 / line-height 1.1** on desktop. Scale down at breakpoints.
10. **Every section alternates background**: white → light-teal `#e8f6f7` → white → dark `#0f2f35`.

---

## WHAT TO BUILD — 13 SECTIONS IN ORDER

### 1. Navbar
- Sticky, blur backdrop on scroll
- Logo left: teal icon + "Smart Petri Dish" dark wordmark
- Nav links center: Home · Our Mission · How It Works · Services · Team · FAQ · Contact
- Right: cart icon with counter badge + "Order Now" pill button (teal)
- Mobile: hamburger → full-screen slide drawer

### 2. Hero
- Full-viewport height, dark gradient background
- LEFT: gold eyebrow tag + H1 (3 lines) + subtext + 2 buttons + 4 trust indicators
- RIGHT: Smart Petri Dish 3D product image, floating animation, 2 white pill badges
- Subtle dot-grid overlay on background (opacity 0.04)
- All text white on dark background

### 3. Services
- White background
- Editorial split header: eyebrow + H2 left, subtext + link right (asymmetric)
- 4-column card grid
- Each card: square teal icon, H5 title, 14px body, "Read More" arrow link
- Cards lift on hover with teal shadow

### 4. Marquee Statement
- Light gray `#f5f5f5` background
- Small centered Petri Dish icon above text
- Giant Manrope 700 text (72px), 2 inline images embedded in text flow
- Words "health equity" in teal color

### 5. Stats Bar
- Dark teal `#0f2f35` background
- 4 stats in a horizontal row, vertical dividers between
- Numbers in gold, labels in white/70%
- Count-up animation on scroll

### 6. How It Works
- White background
- Centered header (eyebrow + H2 + subtext)
- 4-step row with dashed connector arrows between steps
- Mini infographic strip (3 nodes) below steps — light teal background
- Accordion FAQ below (3 questions, chevron toggle)
- Photo mosaic (3 overlapping photos, CSS grid) on left side

### 7. Our Mission
- Light teal `#e8f6f7` background
- 50/50 split: text left, photo right
- Key sentence from paragraph 1 styled as a visual pullquote
- Floating stat chip on photo overlay (bottom-left)

### 8. Partner Providers
- White background
- 4 provider cards with circular photos, specialty in teal uppercase, italic quote

### 9. Our Impact
- Dark `#0f2f35` background
- 45/55 split: text left (white), metrics right
- 4 stacked metrics with gold numbers, animated progress bars

### 10. Why Smart Petri Dish
- White background
- Centered header
- 4 full-width advantage rows with number + title + body + arrow
- Hover reveals teal background tint on each row

### 11. Order the Device
- Light teal background
- Centered product card (large, white, shadow)
- Image left / content right inside card
- Star rating, feature checklist, price, 2 buttons
- 3 trust badges below card
- 3 "What's Included" cards below

### 12. Contact
- White background
- 45/55 split: contact info left, form card right
- Dropdown for "I am a..." field
- Full-width submit button

### 13. Footer + Sticky Bar
- Footer: dark `#0f2f35`, 3-column links + logo/tagline
- Sticky bar: infinite ticker animation alternating "Order Now ↗" and "Bring Health Home ↗"

---

## COMPONENT ARCHITECTURE

```
src/
├── app/
│   └── page.tsx              ← assembles all sections
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── MarqueeStatement.tsx
│   │   ├── StatsBar.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── OurMission.tsx
│   │   ├── PartnerProviders.tsx
│   │   ├── OurImpact.tsx
│   │   ├── WhySmartPetri.tsx
│   │   ├── OrderDevice.tsx
│   │   ├── Contact.tsx
│   │   └── StickyBar.tsx
│   └── ui/
│       ├── Button.tsx          ← pill variants: primary, secondary, dark
│       ├── Eyebrow.tsx         ← uppercase label + line
│       ├── ServiceCard.tsx
│       ├── ProviderCard.tsx
│       ├── MetricItem.tsx
│       ├── AdvantageRow.tsx
│       ├── AccordionItem.tsx
│       ├── CartDrawer.tsx
│       └── ScrollReveal.tsx    ← IntersectionObserver wrapper
└── lib/
    ├── content.ts              ← all text strings from CONTENT-PRD
    └── animations.ts           ← countUp, scrollReveal utilities
```

---

## IMPLEMENTATION ORDER

Build in this exact sequence. Test each section before moving to the next.

```
Phase 1 — Foundation
  [ ] Install dependencies: manrope font, lucide-react, tailwind config
  [ ] Configure tailwind tokens (colors, spacing, typography) from DESIGN-PRD
  [ ] Build Button component (3 variants)
  [ ] Build Eyebrow component
  [ ] Build ScrollReveal wrapper
  [ ] Build Navbar (desktop + mobile drawer)
  [ ] Build Footer
  [ ] Build StickyBar (ticker animation)

Phase 2 — Hero + Above fold
  [ ] Hero section (layout + floating animation + badges)
  [ ] StatsBar (dark section + countup)

Phase 3 — Core content sections
  [ ] Services (editorial header + 4-card grid)
  [ ] MarqueeStatement (inline images in text)
  [ ] HowItWorks (steps + infographic + accordion + photo mosaic)

Phase 4 — Mission + Trust sections
  [ ] OurMission (split + pullquote + floating chip)
  [ ] PartnerProviders (4 cards + quotes)
  [ ] OurImpact (dark + metrics + progress bars)

Phase 5 — Conversion sections
  [ ] WhySmartPetri (advantage rows + hover)
  [ ] OrderDevice (product card + trust + included)
  [ ] Contact (split layout + form + dropdown)

Phase 6 — Polish
  [ ] All scroll reveal animations
  [ ] All hover states
  [ ] Responsive: tablet breakpoints
  [ ] Responsive: mobile breakpoints
  [ ] Performance: image lazy loading
  [ ] Accessibility: focus states, aria labels, semantic HTML
```

---

## CRITICAL IMPLEMENTATION NOTES

### Inline images in Marquee text (Section 4)
```jsx
// Images sit inside a <span> within the heading text, like characters
<h2 className="text-[72px] font-bold leading-tight">
  Bringing Advanced Health Analysis
  {' '}to the Communities that need it{' '}
  <span className="inline-block align-middle">
    <img src="/petri-device.jpg" className="h-20 w-20 rounded-xl object-cover inline" />
  </span>
  {' '}most. We are turning cutting-edge biotechnology into everyday{' '}
  <span className="text-teal-DEFAULT">health equity.</span>
</h2>
```

### Ticker animation (Section 13 sticky bar)
```jsx
// Duplicate content for seamless loop
<div className="flex whitespace-nowrap animate-ticker">
  <span>Order Now ↗ · Bring Health Home ↗ · </span>
  <span aria-hidden>Order Now ↗ · Bring Health Home ↗ · </span>
</div>
// tailwind: animate-ticker = ticker 25s linear infinite
```

### Progress bars (Section 9)
```jsx
// Animate on scroll entry using IntersectionObserver
// Width transitions from 0 to target value
// Stagger each bar by 200ms
```

### Cart drawer
```jsx
// Slide-in from right, dark overlay behind
// State: isOpen (boolean), items (array)
// Accessible: focus trap when open, close on overlay click or Escape
```

### Accordion FAQ
```jsx
// Single open at a time (controlled)
// Max-height animation: 0 → auto (use max-height with overflow hidden)
// Chevron rotates 180deg on open
```

---

## ALL TEXT COMES FROM CONTENT-PRD.md

Do not invent or paraphrase any text.
Copy every headline, body, label, button, and badge exactly from `CONTENT-PRD.md`.
If a text string is not in CONTENT-PRD, ask before adding it.

---

## QUALITY CHECKLIST (run before delivering)

```
Typography
[ ] Manrope loaded and applied globally
[ ] H1 60px / H2 40px / Body 16px at desktop
[ ] All eyebrows uppercase, teal, letter-spaced
[ ] No other font family anywhere

Colors
[ ] Primary teal #145e69 used consistently
[ ] Hero background correct dark gradient
[ ] Stats/Impact numbers in gold #f4d092
[ ] Correct alternating section backgrounds

Layout
[ ] 1200px max container, centered
[ ] 120px section padding desktop
[ ] All cards 16px border-radius
[ ] All buttons pill-shaped (999px radius)

Interactions
[ ] Hero device float animation running
[ ] Scroll reveal on all sections
[ ] Counter animation triggers on scroll
[ ] Progress bars animate on scroll
[ ] Accordion opens/closes smoothly
[ ] Buttons have hover states with transitions
[ ] Advantage rows have teal tint on hover
[ ] Sticky ticker running

Responsive
[ ] Navbar collapses to hamburger on mobile
[ ] Hero stacks vertically on mobile
[ ] 4-column grids become 2-col tablet, 1-col mobile
[ ] Section padding reduces on mobile
[ ] Typography scales down at breakpoints

Accessibility
[ ] All images have alt text
[ ] Focus states visible on all interactive elements
[ ] Form inputs have labels
[ ] Accordion uses aria-expanded
[ ] Cart drawer traps focus
[ ] Color contrast passes WCAG AA
```
