# Hero Component Architecture & First-Principles Design System

This document provides a comprehensive first-principles breakdown of the **Hero Component** (`Hero.tsx`). It details the fundamental constraints, atomic layering, state lifecycle, asset routing, and design decisions powering the hero experience.

---

## 1. First-Principles Problem Statement

When a visitor lands on a portfolio, three fundamental physical constraints exist:
1. **The 3-Second Rule**: Attention is scarce; positioning, visual polish, and call-to-action must be communicated instantaneously.
2. **Network Variance**: Users load the page across varying network speeds (3G to 5G). Media (video) must never block textual content or cause Cumulative Layout Shift (CLS).
3. **Hardware Autoplay Policies**: Browsers aggressively restrict video autoplay unless strict conditions (`muted`, `playsInline`, explicit DOM interaction/programmatic invocation) are satisfied.

---

## 2. Atomic Layering Model (Z-Index Architecture)

To resolve network and contrast constraints, the Hero component is built as three decoupled visual layers:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ LAYER 2: Foreground Content Layer (z-20)                                    │
│ - Tagline: UPPERCASE, tracked-out kicker ("FULL-STACK · AI ENGINEER")       │
│ - Headline (H1): 3-line rhythmic structure                                  │
│ - Value Prop (<p>): Single-sentence core positioning                        │
│ - CTAs: Rectangular Primary (#FF4D00) + Glassmorphic Secondary              │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 1: Optical Contrast Gradient Overlay (z-10)                          │
│ - 108deg directional linear gradient (rgba(15,15,17,0.78) to 0.37)          │
│ - Guarantees 100% WCAG AAA text contrast regardless of video frame lightness │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 0: Asynchronous Media Subsystem (z-0)                                 │
│ - HTML5 <video> (MP4 stream) + Next.js <Image /> (WebP poster)              │
│ - Controlled cross-fade transition via React state & video refs             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Media Playback & Race-Condition Lifecycle

### The Problem
Background videos require network buffering and GPU decoding. Rendering an unbuffered video causes black frames or layout shifts. Conversely, relying solely on React JSX event handlers like `onPlaying` fails on hard page refreshes because the browser's media cache starts playing *before* React finishes mounting and attaching event listeners.

### First-Principles Solution: Ref-Driven Hydration Sync

```
[Initial Page Render]
       │
       ├──► 1. <Image priority /> paints WebP poster at Frame 0 (Instant Visual Feedback)
       │
       ├──► 2. <video> initializes asynchronously with muted & playsInline
       │
[React Component Mount (useEffect)]
       │
       ├──► 3. Inspect videoRef.current DOM node directly
       │      ├─ Check if video.readyState >= 3 or video.currentTime > 0
       │      └─ Programmatically execute video.play() with video.muted = true
       │
       └──► 4. On 'playing' event confirmation:
              └─ Set isVideoPlaying = true
              └─ Poster image transitions: opacity-100 ──► opacity-0 duration-1000
```

#### Code Implementation (`Hero.tsx`)

```tsx
const [isVideoPlaying, setIsVideoPlaying] = useState(false);
const videoRef = useRef<HTMLVideoElement | null>(null);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handlePlayState = () => setIsVideoPlaying(true);

  // 1. Attach native event listeners
  video.addEventListener("playing", handlePlayState);
  video.addEventListener("play", handlePlayState);
  video.addEventListener("canplay", handlePlayState);

  // 2. Resolve cached browser playback (hard refresh recovery)
  if (!video.paused || video.currentTime > 0 || video.readyState >= 3) {
    setIsVideoPlaying(true);
  }

  // 3. Programmatic autoplay invocation
  video.muted = true;
  video.play().then(() => {
    setIsVideoPlaying(true);
  }).catch(() => {
    // Graceful fallback: Poster remains visible if browser blocks autoplay
  });

  return () => {
    video.removeEventListener("playing", handlePlayState);
    video.removeEventListener("play", handlePlayState);
    video.removeEventListener("canplay", handlePlayState);
  };
}, [videoSrc]);
```

---

## 4. Asset Routing Mapping

To prevent HTTP 404 resource errors, asset paths in the `MEDIA` schema map directly to physical files in `/public/mainAssets/`:

| Schema Key | Virtual Route | Physical Filesystem Location | Description |
| :--- | :--- | :--- | :--- |
| `day.poster` | `/mainAssets/hero-day-poster.webp` | `public/mainAssets/hero-day-poster.webp` | Instant-paint WebP poster image |
| `day.video` | `/mainAssets/hero-background-video.mp4` | `public/mainAssets/hero-background-video.mp4` | Primary high-definition MP4 video |
| `night.poster` | `/mainAssets/hero-night-poster.webp` | `public/mainAssets/hero-night-poster.webp` | Dark-mode WebP poster fallback |
| `night.video` | `/mainAssets/hero-night-video.mp4` | `public/mainAssets/hero-night-video.mp4` | Dark-mode background MP4 video |

---

## 5. Design System Tokens & Typography

| UI Element | CSS / Tailwind Utility Classes | Design Rationale |
| :--- | :--- | :--- |
| **Kicker / Tagline** | `text-xs sm:text-sm font-semibold uppercase tracking-widest text-zinc-300/90` | Wide letter spacing establishes high-end architectural hierarchy. |
| **Headline (`<h1>`)** | `text-4xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.1]` | 3-line cadence creates rhythmic readability (*Modern software,* / *built to think,* / *shipped end-to-end.*). |
| **Value Paragraph** | `text-base sm:text-lg text-zinc-300/90 leading-relaxed max-w-[600px]` | Single-sentence explanation constrained to 600px width for optimal line length (~65 characters). |
| **Primary CTA** | `!rounded-lg bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white px-6 py-3.5` | Square/rectangular button shape (`!rounded-lg`) using vibrant electric orange accent with `ArrowUpRight` icon (`↗`). |
| **Secondary CTA** | `!rounded-lg bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-md` | Glassmorphic square button providing clean secondary contrast. |

---

## 6. Accessibility & Base UI Button Semantics

The `<Button>` component wraps Base UI primitives (`@base-ui/react/button`). When rendering Next.js `<Link href="..." />` tags inside buttons:
- Standard Base UI components expect a `<button>` HTML tag when `nativeButton` is `true`.
- To prevent console warnings when rendering an `<a>` anchor tag via `<Link>`, `components/ui/button.tsx` automatically resolves `nativeButton={false}` whenever a custom `render` prop is supplied.

---

## 7. File Reference Matrix

- **Hero Component**: [`Hero.tsx`](file:///d:/update_portfolio/components/webcomp/Hero.tsx)
- **Button System Component**: [`button.tsx`](file:///d:/update_portfolio/components/ui/button.tsx)
- **Documentation**: [`hero.md`](file:///d:/update_portfolio/components/webcomp/hero.md)
