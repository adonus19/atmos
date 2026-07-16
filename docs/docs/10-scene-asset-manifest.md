# Atmos Home Scene Asset Manifest

**Status:** Approved implementation baseline  
**Created:** July 16, 2026  
**Owner:** Product owner / project maintainer

## 1. Purpose

The Home scene uses a hybrid 2.5D renderer. High-definition raster assets provide natural terrain, foliage, cloud and atmospheric texture; CSS, SVG and Canvas remain responsible for layout, time-driven lighting, wind, precipitation, data overlays and accessibility.

The approved concept is a mood and hierarchy reference. Production assets must be reusable layers and must never embed UI text, weather values or unsupported meteorological detail.

## 2. Layer stack

Back to front:

1. sky color and solar glow — code-driven gradient
2. stars and distant city-light mask — raster texture, state-dependent
3. distant environment plate — high-resolution terrain, valleys and distant forest
4. high cloud texture — independent raster layer
5. middle cloud texture — independent raster layer
6. low cloud/fog texture — independent raster layer
7. wind field — SVG/Canvas with static reduced-motion fallback
8. precipitation — Canvas/CSS with reduced-motion fallback
9. foreground tree line — raster cutout or deterministic SVG silhouette
10. UI and accessible textual summary — Angular/HTML

## 3. Required variants

### Environment plates

- calm dawn/day
- calm dusk
- calm night with optional distant city glow
- active-development overcast

Geometry and camera position remain consistent across variants so crossfades do not jump.

### Weather textures

- high: thin cirrus
- middle: broken altocumulus
- low: scattered fair-weather cumulus
- low: overcast/developing
- valley fog/haze
- precipitation texture support for light, moderate and heavy categories

## 4. Asset specifications

Production location: `public/assets/scenes/home/`

| Asset | Working source | Delivery formats | Target dimensions | Initial budget |
|---|---|---|---:|---:|
| Environment plate | PNG | AVIF + WebP | 2048×1152 | 280 KB each |
| Cloud/fog layer | alpha PNG | AVIF/WebP with alpha | 2048×1152 | 180 KB each |
| City-light mask | grayscale/alpha PNG | WebP with alpha | 2048×1152 | 100 KB |
| Foreground tree line | alpha PNG or SVG | WebP with alpha/SVG | 2048×512 | 160 KB |
| Noise/grain | grayscale PNG | WebP | 512×512 tile | 24 KB |

Responsive derivatives may use 1024- and 1536-pixel widths. Do not upscale a smaller generated source and call it high definition.

## 5. Scientific and visual constraints

- Generated assets are synthetic environmental artwork, not live imagery of York, South Carolina.
- Terrain may evoke the Carolina Piedmont/Blue Ridge horizon but must not claim a literal viewpoint.
- Cloud textures map to broad normalized categories, not exact cloud geometry.
- City lights appear only in dusk/night states and remain subtle.
- Severe states reduce decorative detail and prioritize official warning content.
- No text, logos, watermarks, UI, lightning or precipitation may be baked into environment plates.
- No single flattened wallpaper may contain all scene states.

## 6. Quality tiers

- High: full-resolution plate, all supported cloud layers, fog texture, animated flow.
- Medium: responsive plate, combined cloud layers, capped particles.
- Low: responsive plate, one cloud layer, static wind vectors, no continuous decorative animation.
- Reduced motion: same informational state with crossfades or immediate changes only.

## 7. Acceptance and validation

- Compare coded calm, dusk and night states against the approved visual direction.
- Capture mobile baselines at a 390×844 CSS-pixel viewport.
- Verify 200% zoom, readable text contrast and meaningful non-visual summaries.
- Confirm generated layers have no unintended text, watermark or false meteorological detail.
- Measure decoded memory, transfer size and frame stability on representative mobile hardware.
- Record final generation prompts and source filenames in this document or adjacent asset metadata.

## 8. Generation record

Generation prompts, selected source files, derivatives and review status will be appended as assets are approved.
