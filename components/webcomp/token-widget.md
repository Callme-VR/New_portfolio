# Token Usage Widget Architecture & Design System

This document details the first-principles architecture, visual styling, accessibility, and hero component integration of the **Token Usage Widget** ([`Token-widget.tsx`](file:///d:/update_portfolio/components/webcomp/Token-widget.tsx)).

---

## 1. First-Principles & Visual Design

The `TokenUsage` component is a glassmorphic telemetry widget designed for displaying AI inference and token consumption metrics directly within media control overlays.

### Key Architectural Highlights

| Parameter | Specification | Rationale |
| :--- | :--- | :--- |
| **Semantic Element** | `<aside>` | Denotes complementary sidebar/overlay metadata content without interrupting main page flow. |
| **Container Dimensions** | `w-70` with `p-6` padding & `rounded-xl` | Fixed 280px width maintaining structured alignment across hero breakpoints. |
| **Glassmorphic Surface** | `border-overlay-cream/20`, `bg-overlay-ink/60`, `backdrop-blur-[10px]` | Translucent dark backdrop ensuring crisp legibility over dynamic video frames. |
| **Interactive Pill** | Base UI Ghost Button (`rounded-full`, `px-3 py-2`) | Clean interactive target with hover highlight (`hover:bg-overlay-cream/10`). |
| **Iconography** | Lucide `Gauge` icon (`size-4`, `strokeWidth={1.8}`) | Visual gauge symbol denoting telemetry, token throughput, and rate metrics. |

---

## 2. Component Structure & Typography

```
┌────────────────────────────────────────────────────────────────────────┐
│ <aside> Container (w-70, rounded-xl, backdrop-blur-[10px])              │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ <Button variant="ghost"> Pill Wrapper                              │ │
│ │  [Gauge Icon]  "TOKEN USAGE" (tracking-[0.15em])  "· 14 days"       │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Design Tokens & Typography Rationale

- **Metric Kicker**: `text-xs font-semibold uppercase tracking-[0.15em]` for crisp architectural typography.
- **Metric Period**: `text-xs text-overlay-cream/60` with a subtle middle dot separator (`&middot;`) establishing time frame context ("14 days").
- **Hover & Focus Feedback**: Smooth color transitions with `focus-visible:ring-4 focus-visible:ring-overlay-cream/20`.

---

## 3. Integration with Hero Subsystem ([`Hero.tsx`](file:///d:/update_portfolio/components/webcomp/Hero.tsx))

The token widget is rendered inside the main content canvas of the Hero section:

```tsx
{/* Token widget */}
<div className="absolute right-6 lg:right-12 bottom-24 z-10 flex justify-end items-end">
  <TokenUsage />
</div>
```

### Canvas Position
- **Positioning**: `absolute bottom-24 z-10 flex justify-end items-end`
- **Right Margin**: Responsive positioning (`right-6` on mobile/tablet, `lg:right-12` on desktop) positioned below the day/night mode switcher.

---

## 4. Accessibility (a11y) & Focus Management

- **Semantic Landmark**: Wrapped in an `<aside>` HTML element to indicate auxiliary content.
- **Decorative Media**: Decorative `Gauge` icon includes `aria-hidden="true"`.
- **Keyboard Navigation**: Uses Base UI button keyboard handling with custom focus rings (`focus-visible:ring-4`).

---

## 5. File Reference Matrix

- **Token Widget Component**: [`Token-widget.tsx`](file:///d:/update_portfolio/components/webcomp/Token-widget.tsx)
- **Hero Integration**: [`Hero.tsx`](file:///d:/update_portfolio/components/webcomp/Hero.tsx)
- **Token Widget Documentation**: [`token-widget.md`](file:///d:/update_portfolio/components/webcomp/token-widget.md)
