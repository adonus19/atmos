# Atmos Design System and Style Guide

## 1. Design character

Atmos is cinematic, scientific and calm. It uses atmospheric depth, controlled luminance and precise typography. It must avoid arcade-style neon, generic glassmorphism overload and crowded “mission control” interfaces.

Keywords: **observatory, atmospheric, dimensional, lucid, restrained, responsive, trustworthy**.

## 2. Color system

Colors below are design tokens. Components should reference semantic tokens rather than hard-coded hex values.

### Foundation

| Token               |       Hex | Use                         |
| ------------------- | --------: | --------------------------- |
| `--atmos-ink-950`   | `#020914` | deepest app/background edge |
| `--atmos-ink-900`   | `#061525` | primary dark background     |
| `--atmos-ink-850`   | `#0A1D31` | raised background           |
| `--atmos-ink-800`   | `#0D263D` | panel base                  |
| `--atmos-ink-700`   | `#163A55` | borders and muted surfaces  |
| `--atmos-paper-50`  | `#F5FBFF` | primary text                |
| `--atmos-paper-100` | `#E5F3FA` | secondary bright text       |
| `--atmos-slate-300` | `#A8C0CF` | secondary text              |
| `--atmos-slate-500` | `#698599` | subdued labels              |

### Atmospheric accents

| Token                |       Hex | Meaning                                  |
| -------------------- | --------: | ---------------------------------------- |
| `--atmos-cyan-400`   | `#45D9F2` | primary interactive/accent               |
| `--atmos-cyan-300`   | `#7AEAFF` | highlighted data and focus               |
| `--atmos-blue-500`   | `#3188E8` | pressure, cool flow, information         |
| `--atmos-teal-400`   | `#45E0B8` | moisture, healthy sensor, positive state |
| `--atmos-violet-400` | `#A56CF5` | upper-air flow and wind profiles         |
| `--atmos-amber-400`  | `#FFB547` | instability, transition, caution         |
| `--atmos-orange-500` | `#F78335` | heat, sunrise/sunset, elevated risk      |
| `--atmos-red-500`    | `#F0525F` | official hazard emphasis only            |
| `--atmos-green-400`  | `#66E39A` | stable/healthy/connected state           |

### Semantic state tokens

- Info: `#45D9F2`
- Stable/positive: `#66E39A`
- Transition/watchful: `#FFB547`
- Elevated: `#F78335`
- Hazard: `#F0525F`
- Unknown/stale: `#8A9CAA`

Official alert products may require additional hazard-specific colors, but the warning text and icon must carry meaning without color.

### Surface recipes

- Primary glass: `rgba(6, 21, 37, 0.78)`
- Secondary glass: `rgba(10, 29, 49, 0.68)`
- Hairline border: `rgba(122, 234, 255, 0.18)`
- Focus ring: `0 0 0 3px rgba(69, 217, 242, 0.38)`
- Ambient cyan glow: `0 0 28px rgba(69, 217, 242, 0.16)`

Blur is optional progressive enhancement. Content must remain legible when `backdrop-filter` is unavailable.

## 3. Typography

### Font families

- **Primary UI:** `Inter Variable`, fallback `Inter, system-ui, -apple-system, "Segoe UI", sans-serif`
- **Data/tabular numerals:** Inter with `font-variant-numeric: tabular-nums`
- **Optional display accent:** `Space Grotesk Variable` for the Atmos wordmark and rare large headings; never for dense data

Fonts should be self-hosted only when licensing and bundle impact are approved. Otherwise use system fallback during early development.

### Type scale

| Role          | Size / line-height        | Weight               |
| ------------- | ------------------------- | -------------------- |
| Display state | 36/42 mobile, 48/54 large | 500                  |
| Page title    | 28/34                     | 600                  |
| Section title | 20/26                     | 600                  |
| Card title    | 16/22                     | 600                  |
| Body          | 16/24                     | 400                  |
| Compact body  | 14/20                     | 400                  |
| Label         | 12/16                     | 600, slight tracking |
| Hero metric   | 64/64                     | 300–400              |
| Data metric   | 28/32                     | 500                  |

Avoid all-caps body text. Use uppercase only for short data labels and categories.

## 4. Spacing and layout

Base spacing unit: 4 px.

Token scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

- mobile page gutter: 16 px
- large mobile/tablet gutter: 24 px
- desktop max content width: 1440 px
- card radius: 16–24 px
- compact control radius: 12 px
- pill radius: 999 px
- touch target minimum: 44 px
- bottom-navigation safe area uses `env(safe-area-inset-bottom)`

## 5. Grid

- phone: 4 columns
- tablet: 8 columns
- desktop: 12 columns
- Home hero may break the content grid as a full-bleed environmental canvas
- analytical cards align to the grid and avoid arbitrary widths

## 6. Iconography

Use a consistent outlined icon family or custom SVG set with:

- 1.75–2 px optical stroke at 24 px
- rounded joins/caps
- simplified meteorological symbols
- no mixed filled/outlined styles within one control group
- icons inherit semantic color
- every icon-only control has an accessible label

Weather artwork icons should remain secondary to actual atmospheric visualization.

## 7. Charts and scientific graphics

- use SVG for low-to-moderate point counts and accessible annotations
- use Canvas for dense particle/field rendering
- include labeled axes when precision matters
- provide simplified summary first and detailed values on demand
- use line pattern, marker shape or label in addition to color
- show units on first visible value and in chart legend
- avoid false precision and smoothing that changes apparent timing

Recommended variable colors:

- pressure: cyan/blue
- dew point/moisture: teal/green
- wind: violet
- instability: amber
- storm/event risk: orange to red depending on official classification

## 8. Environmental scene rules

- separate base terrain, sky, cloud, haze, flow and precipitation layers
- environmental assets are reusable layers, not one flattened wallpaper
- lighting responds to selected time
- clouds respond to category/band rather than pretending to render exact cloud geometry
- particle density is capped by performance tier
- local landmarks are subtle and never required for comprehension
- generated raster art is used primarily for textures and distant environmental layers
- data visuals are SVG/Canvas/CSS whenever practical

## 9. Motion tokens

- `--motion-fast: 160ms`
- `--motion-standard: 280ms`
- `--motion-slow: 480ms`
- `--motion-environment: 900ms`
- easing UI: `cubic-bezier(0.2, 0.8, 0.2, 1)`
- environmental interpolation: linear or gently eased; never springy

Reduced motion removes parallax, automatic playback, lightning flashes and continuous decorative movement. It may retain immediate opacity/state changes.

## 10. Component style rules

### Cards

Use cards only to group a distinct interaction or explanation. Avoid placing every metric in its own card. Prefer subtle borders over heavy shadows.

### Buttons

- primary: cyan-accented, high contrast
- secondary: transparent/outlined
- destructive/hazard: reserved red treatment
- icon buttons: circular or 44 px square, with clear focus state

### Navigation

Bottom navigation is stable, quiet and lower contrast than active content. Active tab uses icon, text and restrained luminance—not an oversized neon glow.

### Alerts

Official alerts override the ambient palette. They must include issuer, product type, validity, affected area and action. Decorative imagery is reduced.

## 11. Logo direction

The Atmos mark may use a circular orbital/atmospheric ring symbol and spaced wordmark. It should remain legible at 24 px and work in one color. Final logo work is a separate asset task and is not required for Sprint 0.
