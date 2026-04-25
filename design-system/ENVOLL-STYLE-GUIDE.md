# Envoll Design System — Applied to Smart Petri Dish
> Source: https://envoll.webflow.io/style-guide
> Applied: April 2026

---

## 🎨 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--teal` | `#145e69` | Primary brand, CTA borders, line icons |
| `--teal-dark` | `#0f2f35` | Dark backgrounds, hero, footer |
| `--teal-light` | `#9ed8db` | Soft backgrounds, accent fills |
| `--teal-xlight` | `#e8f6f7` | Section backgrounds (alternating light) |
| `--gold` | `#f4d092` | Primary button fill, stats accent, highlights |
| `--black` | `#000000` | Primary text |
| `--black-olive` | `#2c2500` | Dark border, subtle overlays |
| `--gray-text` | `#565656` | Secondary body text |
| `--gray-border` | `#dbdbdb` | Dividers, input borders, card edges |
| `--gray-soft` | `#ebebeb` | Subtle backgrounds |
| `--gray-bg` | `#f5f5f5` | Section background (light alternating) |
| `--white` | `#ffffff` | Cards, default background |

---

## 🔤 Typography

**Font Family:** Manrope (confirmed in SPD PRD — consistent with Envoll's clean sans-serif)

| Level | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| H1 | 60px / 3.75rem | 1.16 | 500 | Hero headline |
| H2 | 40px / 2.5rem | 1.25 | 500 | Section headlines |
| H3 | 30px / 1.875rem | 1.33 | 500 | Sub-section titles |
| H4 | 24px / 1.5rem | 1.41 | 500 | Card titles |
| H5 | 20px / 1.25rem | 1.5 | 500 | Small headings |
| H6 | 18px / 1.125rem | 1.44 | 500 | Minor labels |
| Body | 16px / 1rem | 1.62 | 400 | Paragraph text |
| Sub text | 14px / 0.875rem | 1.71 | 600 | Captions, labels, eyebrows |
| Button | 17px / 1.0625rem | 1.3 | 500 | CTA buttons |

### Eyebrow Labels
- Uppercase, 13px, letter-spacing: 0.12em
- Color: `#145e69` (teal)
- Preceded by a short horizontal rule (2px height, 20px width)

---

## 🔘 Buttons

### Primary Button
```
Background:  #f4d092 (gold/peach)
Text color:  #000000 (black)
Shape:       pill (border-radius: 999px)
Padding:     14px 28px
Font:        17px / weight 500
Right side:  circular white icon container with ↗ arrow
Hover:       smooth 0.3s transition, slight darkening
```

### Secondary Button
```
Background:  transparent
Border:      1.5px solid #145e69
Text color:  #145e69
Shape:       pill (border-radius: 999px)
Hover:       bg fills to #e8f6f7
```

### Dark Button (on dark backgrounds)
```
Background:  #ffffff
Text color:  #0f2f35
Shape:       pill
Hover:       bg fills to #f4d092, text stays dark
```

---

## 📐 Layout & Spacing

| Token | Value |
|-------|-------|
| Max container width | 1280px |
| Container padding | 0 40px (desktop), 0 24px (mobile) |
| Section padding (desktop) | 120px top/bottom |
| Section padding (tablet) | 80px top/bottom |
| Section padding (mobile) | 60px top/bottom |
| Base spacing unit | 8px |
| Grid columns | 12-col grid, typical 2-col and 4-col layouts |
| Card gap | 24px–32px |

---

## 🃏 Components

### Cards
```
Border-radius: 16px
Border:        1px solid #dbdbdb
Shadow:        0 2px 16px rgba(0,0,0,0.07)
Hover shadow:  0 8px 32px rgba(20,94,105,0.15)
Background:    #ffffff
Padding:       32px
```

### Pill Tags / Badges
```
Shape:       pill (border-radius: 999px)
Padding:     6px 16px
Font:        13px, weight 600, uppercase, letter-spacing 0.12em
Variants:    teal fill (#145e69 + white text), gold fill (#f4d092 + black text)
```

### Input Fields
```
Style:        bottom border only (minimalist, no box border)
Border:       1px solid #dbdbdb (bottom only)
Font:         16px, weight 400
Padding:      12px 0
Focus:        border color → #145e69
```

### Avatars
```
Shape:   circle (border-radius: 999px)
Size:    50px (3.0625rem)
Border:  3px solid #ffffff
Shadow:  small
```

---

## 🌑 Shadows

| Name | Value |
|------|-------|
| Small | `0 1px 8px rgba(0,0,0,0.06)` |
| Medium | `0 4px 20px rgba(0,0,0,0.08)` |
| Large | `0 12px 48px rgba(0,0,0,0.12)` |
| Brand | `0 8px 32px rgba(20,94,105,0.15)` |
| Brand-lg | `0 20px 80px rgba(20,94,105,0.12)` |

---

## 🖊 Icons

- Style: **outline/line** icons
- Stroke weight: **2px**
- Size standard: **20px–24px** (inline), **32px** (feature icons)
- Colors: `#145e69` (teal) or `#f4d092` (gold) on dark backgrounds

---

## 🔄 Motion & Transitions

| Element | Duration | Easing |
|---------|----------|--------|
| All hover states | 300ms | ease |
| Section scroll reveals | 600ms | cubic-bezier(0.21, 0.47, 0.32, 0.98) |
| Drawer / modal open | 500ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Button icon rotate | 300ms | ease |
| Progress bars | 2000ms | ease-out |

---

## 🔁 Section Background Alternation

Follow this pattern top-to-bottom:
1. Dark — `#0f2f35` (Hero)
2. White — `#ffffff`
3. Light Teal — `#f5f5f5` or `#e8f6f7`
4. White — `#ffffff`
5. Dark — `#0f2f35`
6. White — `#ffffff`
7. Teal — `#145e69`
8. White — `#ffffff`

---

## ✅ Implementation Checklist

- [ ] All fonts set to Manrope with correct weights (400, 500, 600, 700, 800)
- [ ] Primary teal `#145e69` consistent everywhere
- [ ] All buttons pill-shaped (border-radius: 999px)
- [ ] All cards use `border-radius: 16px` + brand shadow
- [ ] Eyebrow labels uppercase, 13px, teal, preceded by short line
- [ ] Section padding: 120px desktop / 80px tablet / 60px mobile
- [ ] Gold `#f4d092` used for primary buttons and accent stats
- [ ] Sections alternate background correctly
- [ ] Scroll reveals: 600ms cubic-bezier(0.21, 0.47, 0.32, 0.98)
- [ ] Icons: 2px stroke, outline style
- [ ] Input fields: bottom border only, no box
