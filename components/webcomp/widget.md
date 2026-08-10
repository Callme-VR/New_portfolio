# Day/Night Widget Architecture & Design System

This document details the first-principles architecture, interactive mechanics, accessibility, and hero component integration of the **Widget Component** ([`widget.tsx`](file:///d:/update_portfolio/components/webcomp/widget.tsx)).

---

## 1. First-Principles & Visual Design

The `Widget` component is a vertical pill toggle designed for floating media control overlays. It enables instant visual state switching between **Day** and **Night** themes.

### Key Architectural Highlights

| Parameter | Specification | Rationale |
| :--- | :--- | :--- |
| **Container Dimensions** | `w-9` flex-column with `p-1.5` padding | Compact footprint designed to overlay media without obscuring hero text |
| **Border & Backdrop** | `border-overlay-cream/20` with `backdrop-blur-md` | Glassmorphic aesthetic blending seamlessly with background video overlays |
| **Sliding Indicator** | Absolute `h-6 w-6` circle with `duration-300` transition | Smooth physical indicator feedback sliding between Day and Night positions |
| **Icon Layering** | `SunIcon` & `MoonIcon` (`size={17}`) positioned at `z-10` | Layered directly over the sliding active pill for high-contrast visibility |

---

## 2. Interactive Mechanics & State Transitions

The toggle knob moves vertically along the Y-axis based on the `value` prop:

```
[Day Mode (value = "day")]           [Night Mode (value = "night")]
┌──────┐                               ┌──────┐
│  ☀️  │  <-- Indicator knob           │  ☀️  │  <-- Muted icon
│  🌙  │      translate-y-0            │  🌙  │  <-- Indicator knob
└──────┘                               └──────┘      translate-y-7
```

### Motion & Color Logic

- **Indicator Position**:
  - `isDay`: `translate-y-0` (Top - Sun)
  - `!isDay`: `translate-y-7` (Bottom - Moon)
- **Active Icon Color**: `text-overlay-ink` (dark contrast against the light white knob indicator)
- **Inactive Icon Color**: `text-overlay-cream/55` with `group-hover:text-overlay-cream/85`

---

## 3. Component Interface (TypeScript API)

```typescript
export type DayNightMode = "day" | "night";

interface TypeProps {
  value: DayNightMode;
  onChange: (value: DayNightMode) => void;
}
```

---

## 4. Integration with Hero Subsystem ([`Hero.tsx`](file:///d:/update_portfolio/components/webcomp/Hero.tsx))

The widget controls the active video and poster asset state in the Hero section:

```tsx
// Asset Routing Schema
const MEDIA: Record<DayNightMode, { poster: string; video: string }> = {
  day: {
    poster: "/mainAssets/hero-day-poster.webp",
    video: "/mainAssets/hero-background-video.mp4",
  },
  night: {
    poster: "/mainAssets/hero-night-poster.webp",
    video: "/mainAssets/hero-night-video.mp4",
  },
};
```

### Hero Layout Placement

Positioned absolutely on the right margin of the hero canvas to remain accessible on all viewports:
- CSS Classes: `absolute top-1/4 right-7 z-20 -translate-1/2 sm:right-10 lg:right-16`

---

## 5. Accessibility (a11y) & Focus Management

- **Semantic HTML**: Built using native `<button type="button">`.
- **Dynamic Accessible Label**: `aria-label={`Switch to ${isDay ? "night" : "day"} mode`}` notifies screen readers of the action.
- **Keyboard Navigation**: Includes visible focus indicator rings (`focus-visible:ring-2 focus-visible:ring-overlay-cream/45`).

---

## 6. File References

- **Widget Component**: [`widget.tsx`](file:///d:/update_portfolio/components/webcomp/widget.tsx)
- **Hero Integration**: [`Hero.tsx`](file:///d:/update_portfolio/components/webcomp/Hero.tsx)
- **Documentation**: [`widget.md`](file:///d:/update_portfolio/components/webcomp/widget.md)
