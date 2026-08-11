# AI-First Engineering Portfolio

A modern, high-performance portfolio built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **Base UI**. Designed from first principles for instant visual impact, real-time telemetry, smooth media transitions, and zero layout shift (CLS).

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & Animation**: [React 19](https://react.dev/), [Framer Motion](https://motion.dev/), [Base UI](https://base-ui.com/), [Lucide Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Package Manager**: [Bun](https://bun.sh/)

---

## 🧩 Components & Feature Highlights

### 1. Site Header ([`Header.tsx`](file:///d:/update_portfolio/components/webcomp/Header.tsx))
- **Grid & Gutter Alignment**: Aligned with `max-w-[1460px]` and `px-6 md:px-10 lg:px-20` to mirror `Hero.tsx` precisely across all screen sizes.
- **Brand Typography**: Features stylized brand wordmark with electric orange accent gradient (`from-[#FF4D00] to-orange-500`).
- **Animated Navigation**: Smooth hover underline animation (`after:scale-x-100`) powered by dynamic dataset from `NAV_LINKS`.
- 📄 **Detailed Documentation**: [`components/webcomp/header.md`](file:///d:/update_portfolio/components/webcomp/header.md)

### 2. Hero Section ([`Hero.tsx`](file:///d:/update_portfolio/components/webcomp/Hero.tsx))
- **Ref-Driven Media Subsystem**: Uses `useRef` + `useState` to synchronize video buffering with a WebP poster image. Cross-fades poster to `opacity-0` only when video frames actively decode.
- **Real-Time Telemetry & Geolocation**: Integrates client IP geolocation (`ipapi.co`), live ambient weather (`Open-Meteo API`), and a live 1-second interval clock (`Intl.DateTimeFormat`) localized to the visitor's detected timezone.
- **Hero Bottom Bar**: Features an "Available for work" live availability badge with glowing green pulse (`animate-ping`), scroll indicator prompt, and live location/weather telemetry bar (`MapPin`, `Thermometer`, `Clock3`).
- **Interactive Day/Night Mode Switching**: Integrated with `Widget.tsx` to dynamically switch between day and night video streams (`hero-background-video.mp4` / `hero-night-video.mp4`) and poster assets.
- **Optical Contrast Overlays**: Features dual directional gradients ensuring 100% WCAG AAA text legibility regardless of background video brightness.
- **Base UI & Micro-interactions**: Uses Base UI buttons with clean `nativeButton={false}` resolution, springy hover translates (`-translate-y-0.5`), and arrow icon translations.
- 📄 **Detailed Documentation**: [`components/webcomp/hero.md`](file:///d:/update_portfolio/components/webcomp/hero.md)

### 3. Day/Night Theme Switcher Widget ([`widget.tsx`](file:///d:/update_portfolio/components/webcomp/widget.tsx))
- **Framer Motion Spring Physics**: Features physics-driven animated indicator knob using spring transitions (`stiffness: 400`, `damping: 30`, `mass: 0.7`).
- **Responsive Dual Indicators**: Dedicated desktop (`h-7 w-7`) and mobile (`h-6 w-6`) motion nodes ensuring zero layout distortion across viewports.
- **Glassmorphic Styling & Icons**: Custom border styling (`border-overlay-cream/20`), backdrop blur filter (`backdrop-blur-md`), and dynamic icon fills (`fill={isDay ? "currentColor" : "none"}`).
- **Accessible Switch Design**: Native button markup with explicit `role="switch"` semantics, dynamic `aria-label` announcements, and visible keyboard focus rings (`focus-visible:ring-2`).
- 📄 **Detailed Documentation**: [`components/webcomp/widget.md`](file:///d:/update_portfolio/components/webcomp/widget.md)

---

## 📂 Project Structure

```
├── app/
│   ├── globals.css           # Global Tailwind CSS v4 styles & custom utilities
│   ├── layout.tsx            # Root layout wrapper with Header component
│   └── page.tsx              # Main portfolio home page
├── components/
│   ├── ui/
│   │   └── button.tsx        # Base UI button component wrapper with nativeButton logic
│   └── webcomp/
│       ├── Header.tsx        # Top fixed navigation header component
│       ├── header.md         # Header design system & alignment documentation
│       ├── Hero.tsx          # Interactive Hero section component with telemetry
│       ├── hero.md           # First-principles Hero component documentation
│       ├── widget.tsx        # Framer Motion Day/Night theme toggle widget
│       └── widget.md         # Widget architecture & interactive system documentation
├── lib/
│   └── StaticContent/
│       ├── content.ts        # Centralized site copy & navigation link data
│       └── location.ts       # Geolocation, Open-Meteo weather API, and live clock utilities
├── public/
│   └── mainAssets/           # High-resolution videos, posters, and static media
└── package.json              # Project dependencies and scripts
```

---

## 🛠️ Development & Command Reference

### Start Development Server
```bash
bun dev
```

### Type Check TypeScript
```bash
bun x tsc --noEmit
```

### Build Production Bundle
```bash
bun run build
```
