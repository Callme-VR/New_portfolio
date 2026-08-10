# AI-First Engineering Portfolio

A modern, high-performance portfolio built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Base UI**. Designed from first principles for instant visual impact, smooth media transitions, and zero layout shift (CLS).

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & Components**: [React 19](https://react.dev/), [Base UI](https://base-ui.com/), [Lucide Icons](https://lucide.dev/)
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
- **Race-Condition Immunity**: Handles hard browser refreshes and cached video autoplay using mount-time `readyState` and programmatic `.play()` fallbacks.
- **Interactive Day/Night Mode Switching**: Integrated with `Widget.tsx` to dynamically switch between day and night video streams (`hero-background-video.mp4` / `hero-night-video.mp4`) and poster assets.
- **Optical Contrast Overlay**: Features a 108° directional linear gradient (`bg-[linear-gradient(108deg,...)]`) ensuring 100% WCAG AAA text legibility regardless of background video brightness.
- **Base UI Integration**: Uses `<Button render={<Link />} />` with automatic `nativeButton={false}` resolution for clean accessibility and zero console warnings.
- 📄 **Detailed Documentation**: [`components/webcomp/hero.md`](file:///d:/update_portfolio/components/webcomp/hero.md)

### 3. Day/Night Theme Switcher Widget ([`widget.tsx`](file:///d:/update_portfolio/components/webcomp/widget.tsx))
- **Vertical Sliding Motion**: Compact vertical pill toggle featuring an animated white indicator knob (`translate-y-0` to `translate-y-7` in `300ms`) layered behind Lucide `SunIcon` and `MoonIcon`.
- **Glassmorphic Styling**: Custom border styling (`border-overlay-cream/20`), backdrop blur filter (`backdrop-blur-md`), and interactive hover glow feedback.
- **Accessible Design**: Native button markup with dynamic `aria-label` announcements and visible keyboard focus rings (`focus-visible:ring-2`).
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
│       ├── Hero.tsx          # Interactive Hero section component
│       ├── hero.md           # First-principles Hero component documentation
│       ├── widget.tsx        # Interactive Day/Night mode theme toggle widget
│       └── widget.md         # Widget architecture & interactive system documentation
├── lib/
│   └── StaticContent/
│       └── content.ts        # Centralized site copy & navigation link data
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
bun run typecheck
```

### Build Production Bundle
```bash
bun run build
```
