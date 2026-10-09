# Design system

This document defines the interface design rules, component tokens, and visual system implemented for the Progress Portfolio, directly reflecting the tokens defined in `03-design-system/Colors-Colour-tokens.pdf`.

---

## 1. Colour Tokens

| Token Name | Hex Code | Purpose in UI | Contrast Ratio / WCAG |
| :--- | :--- | :--- | :--- |
| `--color-bg` | `#0B0F08` | Primary canvas & app background | Base layer |
| `--color-surface` | `#283F23` | Cards, forms, navigation headers, containers | Surface layer |
| `--color-primary` | `#397234` | Primary brand accent, active buttons, progress bars | Accent (Foliage Green) |
| `--color-text` | `#B78449` | Warm gold highlights, tags, stat metrics, badges | Accent text / Badges |
| `--color-accent` | `#3F2617` | Deep earth brown border accents, warnings | Warm accent border |
| `--fg` | `#F4EDE4` | Body typography, headings, labels | **> 12:1** (WCAG AAA against `#0B0F08`) |
| `--muted` | `#A3B59F` | Secondary descriptions, timestamps, metadata | **> 5.5:1** (WCAG AA against `#0B0F08`) |

### In Code (`client/src/styles.css`):
```css
:root {
  --color-primary: #397234;
  --color-accent: #3F2617;
  --color-bg: #0B0F08;
  --color-surface: #283F23;
  --color-text: #B78449;

  --bg: var(--color-bg);
  --card: var(--color-surface);
  --accent: var(--color-primary);
  --tag-fg: var(--color-text);
}
```

---

## 2. Typography Scale

- **Font Family:** System UI font stack (`system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`) for performance and native rendering.
- **Title (H1):** `2.1rem` (`33.6px`), weight: 750, letter-spacing: `-0.03em`.
- **Section Heading (H2):** `1.35rem` (`21.6px`), weight: 650, letter-spacing: `-0.02em`.
- **Card Subheading (H3):** `1.1rem` (`17.6px`), weight: 600.
- **Body / Paragraph:** `1rem` (`16px`), line-height: 1.6, weight: 400.
- **Small / Metadata:** `0.85rem` – `0.9rem` (`14px`), muted tone.

---

## 3. Spacing Scale

Consistent 8-point baseline grid scale:
- `0.25rem` (4px) — micro-spacing, badge margins
- `0.5rem` (8px) — form field margins, tag padding
- `0.75rem` (12px) — gap between action buttons
- `1.0rem` (16px) — base container padding
- `1.5rem` (24px) — card interior padding, grid gutters
- `2.25rem` (36px) — section division blocks

---

## 4. Components & Interactive States

### Buttons
- **Normal:** Solid background (`--color-primary`), bold text (`#ffffff`), rounded corners (`0.45rem`).
- **Hover:** Elevated brightness, soft green glow (`box-shadow: 0 0 14px rgba(57, 114, 52, 0.35)`).
- **Focus:** Visible 2px outline offset by 3px (`:focus-visible`).
- **Disabled:** 45% opacity, `cursor: not-allowed`.

### Cards & Grid
- **Project Cards:** Deep olive-green surface (`#283F23`), left accent border, hover lift (`translateY(-3px)`).
- **Featured Cards:** Warm gold secondary accent border with subtle ambient glow.
- **Tags & Pills:** Translucent background (`rgba(11, 15, 8, 0.65)`), warm gold text (`#B78449`).
