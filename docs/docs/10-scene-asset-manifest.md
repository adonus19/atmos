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

| Asset                | Working source      | Delivery formats     | Target dimensions | Initial budget |
| -------------------- | ------------------- | -------------------- | ----------------: | -------------: |
| Environment plate    | PNG                 | AVIF + WebP          |         2048×1152 |    280 KB each |
| Cloud/fog layer      | alpha PNG           | AVIF/WebP with alpha |         2048×1152 |    180 KB each |
| City-light mask      | grayscale/alpha PNG | WebP with alpha      |         2048×1152 |         100 KB |
| Foreground tree line | alpha PNG or SVG    | WebP with alpha/SVG  |          2048×512 |         160 KB |
| Noise/grain          | grayscale PNG       | WebP                 |      512×512 tile |          24 KB |

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

### Calm dawn environment plate — candidate 1

- **Generated:** July 16, 2026
- **Tool:** built-in OpenAI image generation
- **Use case:** `photorealistic-natural`
- **Source:** `public/assets/scenes/home/environment/calm-dawn-source.png`
- **Delivery derivative:** `public/assets/scenes/home/environment/calm-dawn.webp`
- **Native dimensions:** 1672×941 (preserved; not upscaled)
- **Transfer size:** approximately 94 KB for the WebP derivative
- **Status:** production candidate pending in-app visual acceptance
- **Known gap:** the generated master is below the 2048×1152 target and the local toolchain does not yet provide an AVIF encoder. A 2048-wide master and AVIF derivative remain required before ATM-107 can close.

Final prompt:

> Create a photorealistic, high-definition 16:9 calm dawn environment plate for a cinematic weather app, evoking the Carolina Piedmont and Blue Ridge foothills without depicting a literal location. Keep the lower 38% as layered forested ridges, a misty valley, and detailed foreground tree silhouettes; reserve the upper 62% as open, softly illuminated sky. Use natural sunrise light, restrained blue-green terrain, warm peach-gold horizon color, realistic atmospheric depth, and crisp organic textures. No UI, text, logo, watermark, clouds, wind marks, precipitation, or lightning. The environment must work as a reusable background layer behind independently rendered weather effects.

### Calm dusk environment plate — candidate 1

- **Generated:** July 16, 2026
- **Tool:** built-in OpenAI image generation
- **Use case:** `lighting-weather`
- **Edit target:** `public/assets/scenes/home/environment/calm-dawn-source.png`
- **Source:** `public/assets/scenes/home/environment/calm-dusk-source.png`
- **Delivery derivative:** `public/assets/scenes/home/environment/calm-dusk.webp`
- **Native dimensions:** 1672×941 (preserved; not upscaled)
- **Transfer size:** approximately 54 KB for the WebP derivative
- **Status:** production candidate pending crossfade and in-app visual acceptance

Final prompt:

> Change only the time-of-day lighting from calm dawn to calm dusk. Preserve the exact camera position, crop, mountain ridgelines, valley geometry, foreground trees, forest detail, mist placement, and 16:9 composition pixel-consistently so this plate can crossfade with the source without any spatial jump. The sun has just moved below the left horizon; use restrained afterglow in peach, rose, muted violet, and deepening blue with a naturally dimmer forest and valley. Keep the upper sky open for separately rendered weather. No clouds, city lights, stars, UI, text, logo, watermark, wind marks, precipitation, lightning, buildings, new objects, stylization, blur, blockiness, painterly texture, or artificial HDR.

### Calm night environment plate — candidate 1

- **Generated:** July 16, 2026
- **Tool:** built-in OpenAI image generation
- **Use case:** `lighting-weather`
- **Edit target:** `public/assets/scenes/home/environment/calm-dusk-source.png`
- **Source:** `public/assets/scenes/home/environment/calm-night-source.png`
- **Delivery derivative:** `public/assets/scenes/home/environment/calm-night.webp`
- **Native dimensions:** 1672×941 (preserved; not upscaled)
- **Transfer size:** approximately 42 KB for the WebP derivative
- **Status:** production candidate pending crossfade and in-app visual acceptance; stars and city lights intentionally remain separate layers

Final prompt:

> Change only the time-of-day lighting from calm dusk to a clear calm night. Preserve the exact camera position, crop, mountain ridgelines, valley geometry, foreground trees, forest detail, mist placement, and 16:9 composition pixel-consistently so this plate can crossfade with the dawn and dusk plates without any spatial jump. Use natural deep navy and muted indigo ambient moonless-night illumination, readable but genuinely dark terrain layers, and subtle cool atmospheric depth. Keep the upper sky open for separately rendered stars and weather. No sun, sunset afterglow, clouds, stars, moon, city lights, artificial lights, UI, text, logo, watermark, wind marks, precipitation, lightning, buildings, new objects, stylization, blur, blockiness, painterly texture, artificial HDR, or excessive blue saturation.
