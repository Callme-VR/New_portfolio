# Hero Component Architecture & First-Principles Design System

This document provides a comprehensive first-principles breakdown of the **Hero Component** ([`Hero.tsx`](file:///d:/update_portfolio/components/webcomp/Hero.tsx)). It details the fundamental constraints, atomic layering, real-time telemetry subsystem, video state lifecycle, asset routing, and design decisions powering the hero experience.

---

## 1. First-Principles Problem Statement

When a visitor lands on a portfolio, four fundamental physical & technical constraints exist:
1. **The 3-Second Rule**: Attention is scarce; positioning, visual polish, and call-to-action must be communicated instantaneously.
2. **Network Variance**: Users load the page across varying network speeds (3G to 5G). Media (video) must never block textual content or cause Cumulative Layout Shift (CLS).
3. **Hardware Autoplay Policies**: Browsers aggressively restrict video autoplay unless strict conditions (`muted`, `playsInline`, explicit DOM interaction/programmatic invocation) are satisfied.
4. **Contextual Personalization**: Displaying dynamic real-time telemetry (location, local weather, live clock) connects visitors to the engineer's environment, but external API latency/failures must never compromise core rendering or block hydration.

---

## 2. Atomic Layering Model (Z-Index Architecture)

To resolve network, contrast, and layout constraints, the Hero component is built across four decoupled visual & interactive layers:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ LAYER 3: Hero Bottom Bar & Telemetry Subsystem (z-30)                       │
│ - Availability Badge: "Available for work" with animated ping dot           │
│ - Scroll Indicator: ArrowDown icon with tracking-out "SCROLL" prompt        │
│ - Telemetry Bar: Live City (MapPin) · Temperature (Thermometer) · Time (Clock3)│
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 2: Foreground Content Layer & Theme Toggle (z-20 / z-30)              │
│ - Tagline: UPPERCASE, tracked-out kicker ("FULL-STACK · AI ENGINEER")       │
│ - Headline (H1): 3-line rhythmic structure                                  │
│ - Value Prop (<p>): Single-sentence core positioning                        │
│ - CTAs: Primary (#FF4D00) with hover translate + Secondary Glassmorphic     │
│ - Day/Night Widget: Positioned right canvas margin with spring motion      │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 1: Optical Contrast Gradient Overlays (z-10)                           │
│ - 108deg directional linear gradient (rgba(15,15,17,0.78) to 0.37)          │
│ - Top linear gradient (rgba(15,15,17,0.55) to transparent)                  │
│ - Guarantees 100% WCAG AAA text legibility across all video light levels   │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 0: Asynchronous Media Subsystem (z-0)                                 │
│ - HTML5 <video> (MP4 stream) + Next.js <Image /> (WebP poster)              │
│ - Ref-driven video buffering with cross-fade poster transition             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Real-Time Telemetry & Geolocation Subsystem

The Hero component features an autonomous real-time telemetry system powered by [`lib/StaticContent/location.ts`](file:///d:/update_portfolio/lib/StaticContent/location.ts):

### Telemetry Pipeline & Resiliency Matrix

```
[Component Mount]
       │
       ├──► 1. getUserGeoLocation()
       │       ├── Fetch client IP geolocation via ipapi.co
       │       └── Fallback: FALLBACK_GEO_LOCATION ("Noida", "Uttar Pradesh", Asia/Kolkata)
       │
       ├──► 2. getTemperature(lat, lng)
       │       ├── Fetch ambient temperature via Open-Meteo API
       │       └── Fallback: null ("--°C")
       │
       └──► 3. Live Clock Interval (1000ms)
               └── Formats local time via Intl.DateTimeFormat for visitor's detected timezone
```

- **Zero-Block Guarantees**: Geolocation and weather requests execute asynchronously inside `useEffect`. Failure or delay in external services defaults silently to fallbacks without throwing errors or delaying page paint.
- **Cleanup & Memory Safety**: Uses a `cancelled` flag pattern inside `useEffect` to prevent React state updates if the Hero component unmounts mid-fetch.

---

## 4. Media Playback & Race-Condition Lifecycle

### The Problem
Background videos require network buffering and GPU decoding. Rendering an unbuffered video causes black frames or layout shifts. Conversely, relying solely on React JSX event handlers like `onPlaying` fails on hard page refreshes because the browser's media cache starts playing *before* React finishes mounting and attaching event listeners.

### First-Principles Solution: Ref-Driven Hydration Sync

```
[Initial Page Render / Theme Change]
       │
       ├──► 1. <Image priority /> paints WebP poster at Frame 0 (Instant Visual Feedback)
       │
       ├──► 2. <video> resets state (isVideoPlaying = false) & calls video.load()
       │
[React Component Mount / Key Change]
       │
       ├──► 3. Inspect videoRef.current DOM node directly
       │      ├─ Set video.muted = true
       │      └─ Programmatically execute video.play()
       │
       └──► 4. On 'playing' event confirmation:
              └─ Set isVideoPlaying = true
              └─ Poster image transitions: opacity-100 ──► opacity-0 duration-1000
```

#### Code Implementation (`Hero.tsx`)

```tsx
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  setIsVideoPlaying(false);

  const handlePlaying = () => setIsVideoPlaying(true);
  video.addEventListener("playing", handlePlaying);

  video.muted = true;
  video.load();

  video.play()
    .then(() => setIsVideoPlaying(true))
    .catch(() => setIsVideoPlaying(false));

  return () => {
    video.removeEventListener("playing", handlePlaying);
    video.pause();
  };
}, [videoSrc]);
```

---

## 5. Asset Routing Mapping

To prevent HTTP 404 resource errors, asset paths in the `MEDIA` schema map directly to physical files in `/public/mainAssets/`:

| Schema Key | Virtual Route | Physical Filesystem Location | Description |
| :--- | :--- | :--- | :--- |
| `day.poster` | `/mainAssets/hero-day-poster.webp` | `public/mainAssets/hero-day-poster.webp` | Instant-paint WebP poster image |
| `day.video` | `/mainAssets/hero-background-video.mp4` | `public/mainAssets/hero-background-video.mp4` | Primary high-definition MP4 video |
| `night.poster` | `/mainAssets/hero-night-poster.webp` | `public/mainAssets/hero-night-poster.webp` | Dark-mode WebP poster fallback |
| `night.video` | `/mainAssets/hero-night-video.mp4` | `public/mainAssets/hero-night-video.mp4` | Dark-mode background MP4 video |

---

## 6. Design System Tokens & Typography

| UI Element | CSS / Tailwind Utility Classes | Design Rationale |
| :--- | :--- | :--- |
| **Kicker / Tagline** | `text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300/90` | Wide letter spacing establishes high-end architectural hierarchy. |
| **Headline (`<h1>`)** | `text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.1]` | 3-line cadence creates rhythmic readability (*Modern software,* / *built to think,* / *shipped end-to-end.*). |
| **Value Paragraph** | `text-base sm:text-lg text-zinc-300/90 leading-relaxed max-w-[600px]` | Single-sentence explanation constrained to 600px width for optimal line length. |
| **Primary CTA** | `rounded-lg! bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white px-6 py-3.5 hover:-translate-y-0.5` | Rectangular button shape using electric orange accent with animated `ArrowUpRight` icon. |
| **Secondary CTA** | `rounded-lg! bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-md hover:-translate-y-0.5` | Glassmorphic square button providing clean secondary contrast. |
| **Availability Pill** | `font-mono text-[12px] tracking-[0.35em] border-overlay-cream/20 bg-overlay-ink/40` | Real-time status indicator featuring an animated green ping dot (`animate-ping`). |
| **Telemetry Bar** | `text-sm font-medium text-overlay-cream/70 sm:flex` | Displays live location, weather, and clock telemetry with Lucide icons (`MapPin`, `Thermometer`, `Clock3`). |

---

## 7. Accessibility & Base UI Button Semantics

The `<Button>` component wraps Base UI primitives (`@base-ui/react/button`). When rendering Next.js `<Link href="..." />` tags inside buttons:
- Standard Base UI components expect a `<button>` HTML tag when `nativeButton` is `true`.
- To prevent console warnings when rendering an `<a>` anchor tag via `<Link>`, `components/ui/button.tsx` automatically resolves `nativeButton={false}` whenever a custom `render` prop is supplied.
- Interactive elements include `aria-hidden="true"` on decorative icons and explicit `role="switch"` semantics on interactive widgets.

---

## 8. File Reference Matrix

- **Hero Component**: [`Hero.tsx`](file:///d:/update_portfolio/components/webcomp/Hero.tsx)
- **Day/Night Widget**: [`widget.tsx`](file:///d:/update_portfolio/components/webcomp/widget.tsx)
- **Location & Weather Utility**: [`location.ts`](file:///d:/update_portfolio/lib/StaticContent/location.ts)
- **Button System Component**: [`button.tsx`](file:///d:/update_portfolio/components/ui/button.tsx)
- **Hero Documentation**: [`hero.md`](file:///d:/update_portfolio/components/webcomp/hero.md)
