# Day/Night Widget Architecture & Design System

This document details the first-principles architecture, interactive mechanics, physics-based motion, accessibility, and hero component integration of the **Widget Component** ([`widget.tsx`](file:///d:/update_portfolio/components/webcomp/widget.tsx)).

---

## 1. First-Principles & Visual Design

The `Widget` component is a vertical toggle switch (`role="switch"`) designed for floating media control overlays. It enables instant visual state switching between **Day** and **Night** themes with responsive layout support.

### Key Architectural Highlights

| Parameter | Specification | Rationale |
| :--- | :--- | :--- |
| **Container Dimensions** | `h-22 w-12` (desktop), `h-20 w-10` (mobile `max-sm`) | Ergonomic touch/click target optimized across device viewports |
| **Border & Glassmorphism** | `border-overlay-cream/20`, `bg-black/10`, `backdrop-blur-md` | Glassmorphic aesthetic blending seamlessly with background video overlays |
| **Motion Indicator Knob** | Framer Motion `<motion.span>` circle (`bg-overlay-cream`) | Physics-driven spring animation (`stiffness: 400`, `damping: 30`, `mass: 0.7`) |
| **Responsive Dual Indicators** | Separate Desktop (`h-7 w-7`) and Mobile (`h-6 w-6`) motion nodes | Eliminates layout distortion across mobile and desktop breakpoints |
| **Icon Fill & Stroke Logic** | `SunIcon` & `MoonIcon` with dynamic `strokeWidth` & `fill` | Dynamic fill toggling (`fill={isDay ? "currentColor" : "none"}`) for active visual contrast |

---

## 2. Interactive Mechanics & Motion Lifecycle

The toggle knob animates smoothly along the vertical Y-axis using Framer Motion spring physics:

```
[Day Mode (value = "day")]           [Night Mode (value = "night")]
┌──────┐                               ┌──────┐
│  ☀️  │  <-- Active Indicator         │  ☀️  │  <-- Muted Icon
│      │      Desktop: y = 0           │      │
│  🌙  │      Mobile:  y = 0           │  🌙  │  <-- Active Indicator
└──────┘                               └──────┘      Desktop: y = 36
                                                     Mobile:  y = 28
```

### Physics Parameters (`motion/react`)

```tsx
transition={{
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.7,
}}
```

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
- CSS Classes: `absolute right-5 top-1/3 z-30 -translate-y-1/2 sm:right-10 lg:right-16`

---

## 5. Accessibility (a11y) & Focus Management

- **Semantic HTML & Role**: Native `<button type="button">` augmented with `role="switch"`.
- **Dynamic Accessible Label**: `aria-label={`Switch to ${isDay ? "night" : "day"} mode`}` notifies screen readers of the state change action.
- **Keyboard Navigation**: Includes visible focus indicator rings (`focus-visible:ring-2 focus-visible:ring-overlay-cream/45`).

---

## 6. File References

- **Widget Component**: [`widget.tsx`](file:///d:/update_portfolio/components/webcomp/widget.tsx)
- **Hero Integration**: [`Hero.tsx`](file:///d:/update_portfolio/components/webcomp/Hero.tsx)
- **Widget Documentation**: [`widget.md`](file:///d:/update_portfolio/components/webcomp/widget.md)
