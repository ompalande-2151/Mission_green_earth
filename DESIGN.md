---
name: Modern Creative Editorial
colors:
  surface: '#f8faf9'
  surface-dim: '#d8dada'
  surface-bright: '#f8faf9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f3'
  surface-container: '#eceeed'
  surface-container-high: '#e6e9e8'
  surface-container-highest: '#e1e3e2'
  on-surface: '#191c1c'
  on-surface-variant: '#404944'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#eff1f0'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#1b6b51'
  on-secondary: '#ffffff'
  secondary-container: '#a6f2d1'
  on-secondary-container: '#237157'
  tertiary: '#183326'
  on-tertiary: '#ffffff'
  tertiary-container: '#2f4a3b'
  on-tertiary-container: '#9ab9a6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#a6f2d1'
  secondary-fixed-dim: '#8bd6b6'
  on-secondary-fixed: '#002116'
  on-secondary-fixed-variant: '#00513b'
  tertiary-fixed: '#caead6'
  tertiary-fixed-dim: '#afceba'
  on-tertiary-fixed: '#042014'
  on-tertiary-fixed-variant: '#314d3e'
  background: '#f8faf9'
  on-background: '#191c1c'
  surface-variant: '#e1e3e2'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 32px
---

## Brand & Style

This design system is built for creative expression and high-end curation. It targets an audience that values aesthetic precision, drawing inspiration from contemporary art galleries and luxury editorial design. 

The visual language blends **Minimalism** with **Glassmorphism**. It utilizes expansive white space to let creative content breathe, while employing deep, lush greens to ground the interface in a sense of established luxury. The style is quiet yet confident, avoiding flashy transitions in favor of intentional, rhythmic layouts and subtle depth.

## Colors

The palette is anchored by a monochromatic spectrum of emerald greens. **#064e3b** serves as the primary structural color, used for high-impact typography and primary backgrounds in immersive sections. **#065f46** provides secondary depth for interactive states and iconography.

To maintain a high-end feel, **#dcfce7** is used as a soft surface color to differentiate content areas without losing the green narrative. The background is a crisp, cool off-white (**#f8faf9**) to ensure a gallery-like atmosphere where imagery can take center stage.

## Typography

The design system utilizes **Plus Jakarta Sans** across all levels to maintain a cohesive, modern identity. The typeface’s clean terminals and open counters provide the "premium" feel required for a creative platform.

Headlines should be set with tight tracking to create a rhythmic, impactful look. Body text requires generous line height (1.6) to ensure readability and an airy, sophisticated aesthetic. Labels use uppercase styling with increased letter spacing to provide a structural contrast to the fluid nature of the larger display type.

## Layout & Spacing

This design system follows a **Fixed Grid** philosophy for desktop views, ensuring that creative content remains centered and framed like a work of art. A 12-column grid is used with wide 32px gutters to prevent visual clutter.

Spacing is aggressive. Large "XL" gaps (80px+) should be used between major sections to emphasize the premium nature of the platform. Smaller components rely on a strict 8px base unit to maintain mathematical harmony.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Glassmorphism** rather than traditional heavy shadows. Surfaces "lift" by transitioning from the base neutral to the tertiary mint green (#dcfce7).

For floating elements like navigation bars and modal overlays, use a high-blur backdrop (20px-30px) with a semi-transparent primary green tint (alpha 0.05). If shadows are absolutely necessary, they should be "Ambient Shadows"—ultra-diffused, using a primary green tint (#064e3b) at 4% opacity to avoid a muddy grey appearance.

## Shapes

The shape language is **Rounded**, using an 8px (0.5rem) base radius. This strikes a balance between the clinical sharpness of high-modernism and the friendly softness of consumer tech.

- **Standard Buttons & Inputs:** 8px radius.
- **Content Cards & Modals:** 16px (1rem) radius.
- **Interactive Tags/Chips:** Full pill-shape for distinct visual separation from actionable buttons.

## Components

### Buttons
Primary buttons use the deep green (#064e3b) with white text. Secondary buttons should use a ghost style: a 1px border of the primary color with a subtle hover fill of the tertiary mint (#dcfce7). Avoid gradients; keep surfaces matte and solid.

### Cards
Cards are defined by a subtle 1px border in a light green tint or a slight background shift to #dcfce7. There should be no shadow on the resting state; on hover, the card should scale slightly (1.02x) and gain an ambient green tinted shadow.

### Input Fields
Inputs follow a minimalist editorial style. Use a background fill of the neutral color with a bottom-only border in primary green. On focus, the border transitions to a 2px thickness.

### Chips & Tags
Chips are pill-shaped and utilize the tertiary green (#dcfce7) background with primary green text. They should be small, using the `label-sm` typography style for a technical, curated look.

### Navigation
The navigation bar should be a "glass" element, using a heavy backdrop blur to allow content colors to bleed through as users scroll, maintaining the artistic, immersive feel of the design system.