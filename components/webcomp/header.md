# Header Component Architecture & Design System

This document details the first-principles architecture, layout alignment, typography, and styling of the **Header Component** ([`Header.tsx`](file:///d:/update_portfolio/components/webcomp/Header.tsx)).

---

## 1. Design & Layout Alignment

To maintain strict visual rhythm across the portfolio, the Header container parameters are aligned exactly with the Hero component:

| Parameter | Header Value | Hero Value | Rationale |
| :--- | :--- | :--- | :--- |
| **Max Width** | `max-w-[1460px]` | `max-w-[1460px]` | Ensures brand logo & nav items align with hero content edges |
| **Horizontal Padding** | `px-6 md:px-10 lg:px-20` | `px-6 md:px-10 lg:px-20` | Guarantees consistent gutters across all breakpoint screens |
| **Vertical Height** | `h-16 sm:h-20` | `h-16 sm:h-20` | Matching vertical spacer height for absolute content positioning |
| **Z-Index Layer** | `z-50` | `z-20` | Header floats above Hero video, gradient overlay, and content layers |

---

## 2. Visual Tokens & Branding

- **Brand Logo Wordmark**:
  - `Vishal` rendered in crisp white (`text-white font-semibold`).
  - `.Rajput` highlighted with brand accent gradient (`text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-orange-500 font-bold`).
- **Navigation Links**:
  - Font Size & Weight: `text-xs sm:text-sm font-medium`.
  - Color: Muted silver-grey `text-zinc-300/90` transitioning to `hover:text-white`.
  - Hover Indicator: Animated 2px bottom border (`after:h-[2px] after:bg-[#FF4D00] after:scale-x-0 hover:after:scale-x-100 after:duration-300`).

---

## 3. Data Source

Navigation links are dynamically driven by the centralized content file:
- **Data Export**: `NAV_LINKS` from [`@/lib/StaticContent/content`](file:///d:/update_portfolio/lib/StaticContent/content.ts)

---

## 4. File References

- **Component**: [`Header.tsx`](file:///d:/update_portfolio/components/webcomp/Header.tsx)
- **Hero Alignment Reference**: [`Hero.tsx`](file:///d:/update_portfolio/components/webcomp/Hero.tsx)
- **Documentation**: [`header.md`](file:///d:/update_portfolio/components/webcomp/header.md)
