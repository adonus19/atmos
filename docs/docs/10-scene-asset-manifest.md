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

Cloud layers may begin as neutral-grayscale luminance sources on black and use screen blending during compositor development. Alpha conversion and validation remain required before final ATM-107 acceptance; black-field delivery is not mislabeled as native transparency.

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

### Active-development overcast environment plate — candidate 1

- **Generated:** July 16, 2026
- **Tool:** built-in OpenAI image generation
- **Use case:** `lighting-weather`
- **Edit target:** `public/assets/scenes/home/environment/calm-dawn-source.png`
- **Source:** `public/assets/scenes/home/environment/active-overcast-source.png`
- **Delivery derivative:** `public/assets/scenes/home/environment/active-overcast.webp`
- **Native dimensions:** 1672×941 (preserved; not upscaled)
- **Transfer size:** approximately 67 KB for the WebP derivative
- **Status:** production candidate pending crossfade and in-app visual acceptance; detailed clouds intentionally remain separate layers

Final prompt:

> Change only the environmental illumination from calm dawn to a daytime pre-storm, active-development overcast state. Preserve the exact camera position, crop, mountain ridgelines, valley geometry, foreground trees, forest detail, mist placement, and 16:9 composition pixel-consistently so this plate can crossfade with the calm plates without any spatial jump. Use diffuse cool-gray daylight, muted green forest, lowered contrast in distant ridges, and slightly denser-looking atmospheric depth. Remove the visible sun and warm sunrise rays. Keep the upper sky as a clean, subdued slate-gray illumination field for separately rendered cloud layers. No clouds, city lights, stars, moon, artificial lights, UI, text, logo, watermark, wind marks, precipitation, lightning, buildings, new objects, stylization, blur, blockiness, painterly texture, artificial HDR, green cast, or dramatic storm funnel.

### City-light emission mask — candidate 1

- **Generated:** July 16, 2026
- **Tool:** built-in OpenAI image generation
- **Use case:** `precise-object-edit`
- **Geometry reference:** `public/assets/scenes/home/environment/calm-night-source.png`
- **Source:** `public/assets/scenes/home/masks/city-lights-source.png`
- **Delivery derivative:** `public/assets/scenes/home/masks/city-lights.webp`
- **Native dimensions:** 1672×941
- **Transfer size:** approximately 7 KB for the WebP derivative
- **Intended composition:** screen blend over dusk/night plates only; opacity remains code-driven
- **Status:** production candidate pending registered in-app visual acceptance

Final prompt:

> Create a registration-perfect 16:9 emission mask aligned to the night geometry reference. Output a pure solid black field everywhere except for sparse, tiny, softly glowing warm-white light points suggesting a few distant homes and a very small valley settlement. Place lights only on plausible distant valley-floor and lower-slope locations in the middle-distance terrain, following the reference perspective. Keep the mountain skyline, foreground, and entire sky completely black. Use very few lights at varied sizes with lower intensity at distance; no road lines or dense urban grid. No terrain, trees, sky color, clouds, stars, moon, buildings, UI, text, logo, watermark, precipitation, lightning, lens flare, bloom clouds, new scenery, large dots, decorative bokeh, neon colors, or excessive brightness.

### High cirrus luminance layer — candidate 1

- **Generated:** July 16, 2026
- **Tool:** built-in OpenAI image generation
- **Use case:** `photorealistic-natural`
- **Source:** `public/assets/scenes/home/clouds/high-cirrus-luminance-source.png`
- **Delivery derivative:** `public/assets/scenes/home/clouds/high-cirrus-luminance.webp`
- **Native dimensions:** 1672×941
- **Transfer size:** approximately 45 KB for the WebP derivative
- **Intended composition:** low-opacity screen blend pending final alpha conversion
- **Status:** production candidate pending drift, edge and in-app visual acceptance

Final prompt:

> Create a registration-neutral 16:9 cloud luminance mask on a pure solid black field. Show only sparse, thin, high-altitude cirrus filaments: delicate ice-crystal streaks, long feathered wisps, subtle natural variation, and broad open gaps. Render the cirrus in dim-to-medium neutral grayscale so brightness can become opacity during local alpha conversion. Cloud texture occupies mainly the upper 65% with generous empty space; edges taper smoothly to pure black; no horizon, landscape, perspective landmark, or directional sun lighting. It must drift horizontally without an obvious central subject. No blue sky, terrain, trees, fog bank, cumulus, altocumulus, storm cloud, precipitation, lightning, sun, moon, stars, city lights, UI, text, logo, watermark, frame, hard cutout edges, halos, blockiness, blur smear, painterly marks, or noise banding.

### Middle altocumulus luminance layer — candidate 1

- **Generated:** July 16, 2026
- **Tool:** built-in OpenAI image generation
- **Use case:** `photorealistic-natural`
- **Source:** `public/assets/scenes/home/clouds/middle-altocumulus-luminance-source.png`
- **Delivery derivative:** `public/assets/scenes/home/clouds/middle-altocumulus-luminance.webp`
- **Native dimensions:** 1672×941
- **Transfer size:** approximately 59 KB for the WebP derivative
- **Intended composition:** screen blend pending final alpha conversion
- **Status:** production candidate pending drift, edge and in-app visual acceptance

Final prompt:

> Create a registration-neutral 16:9 cloud luminance mask on a pure solid black field. Show broken mid-level altocumulus arranged in several natural, uneven bands: moderately soft rounded cloudlets, varied clustered texture, realistic gaps, subtle depth, and no single dominant cloud. Render cloud brightness in neutral grayscale so luminance can become opacity during local alpha conversion. Concentrate the layer across the middle 55% of the frame while leaving broad irregular openings and clean black margins; edge density must taper naturally. It should drift horizontally and combine cleanly with separate cirrus and low-cloud layers. No blue sky, horizon, terrain, trees, valley fog, cirrus wisps, towering cumulus, solid overcast deck, storm shelf, precipitation, lightning, sun, moon, stars, city lights, UI, text, logo, watermark, frame, hard cutout edges, halos, repeated tile pattern, blockiness, painterly marks, or noise banding.

### Low scattered-cumulus luminance layer — candidate 1

- **Generated:** July 16, 2026
- **Tool:** built-in OpenAI image generation
- **Use case:** `photorealistic-natural`
- **Source:** `public/assets/scenes/home/clouds/low-scattered-cumulus-luminance-source.png`
- **Delivery derivative:** `public/assets/scenes/home/clouds/low-scattered-cumulus-luminance.webp`
- **Native dimensions:** 1672×941
- **Transfer size:** approximately 23 KB for the WebP derivative
- **Intended composition:** screen blend pending final alpha conversion
- **Status:** production candidate pending drift, edge and in-app visual acceptance

Final prompt:

> Create a registration-neutral 16:9 cloud luminance mask on a pure solid black field. Show a small number of low, scattered fair-weather cumulus clouds with crisp organic sunlit crowns, softly modeled interiors, flatter darker bases, varied scale, and generous clear gaps. Render the cloud forms in neutral grayscale so luminance can become opacity during local alpha conversion. Place clouds primarily across the lower-middle sky band, avoiding the bottom 18% and leaving most of the upper half empty. Use asymmetric spacing and partial edge exits so horizontal drift feels natural; no central hero cloud. No blue sky, horizon, terrain, trees, valley fog, cirrus, altocumulus field, towering convection, anvil, overcast deck, storm shelf, precipitation, lightning, sun, moon, stars, city lights, UI, text, logo, watermark, frame, hard cutout edges, halos, repeated forms, blockiness, painterly marks, or noise banding.

### Low developing-overcast luminance layer — candidate 1

- **Generated:** July 16, 2026
- **Tool:** built-in OpenAI image generation
- **Use case:** `photorealistic-natural`
- **Source:** `public/assets/scenes/home/clouds/low-developing-overcast-luminance-source.png`
- **Delivery derivative:** `public/assets/scenes/home/clouds/low-developing-overcast-luminance.webp`
- **Native dimensions:** 1672×941
- **Transfer size:** approximately 55 KB for the WebP derivative
- **Intended composition:** screen blend pending final alpha conversion; color and density remain code-driven
- **Status:** production candidate pending drift, edge and in-app visual acceptance

Final prompt:

> Create a registration-neutral 16:9 cloud luminance mask on a pure solid black field. Show a broad, low, developing overcast deck with layered turbulent texture: dense stratocumulus masses, uneven rolling bases, embedded darker cavities represented by lower luminance, subtle billowing development, and only a few narrow irregular breaks. Render the cloud structure in neutral grayscale so luminance can become opacity during local alpha conversion. Cover roughly 75% of the frame from the upper edge through the lower-middle sky, with a naturally ragged lower boundary and tapered side edges. Preserve some black gaps for transition states. No blue sky, horizon, terrain, trees, valley fog, wispy cirrus, isolated fair-weather cumulus, anvil, shelf cloud, wall cloud, funnel, precipitation, lightning, sun, moon, stars, city lights, UI, text, logo, watermark, frame, hard cutout edges, halos, repeated tile pattern, blockiness, painterly marks, or noise banding.
