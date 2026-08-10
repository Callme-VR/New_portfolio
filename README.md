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

### 1. Hero Section ([`Hero.tsx`](file:///d:/update_portfolio/components/webcomp/Hero.tsx))
- **Ref-Driven Media Subsystem**: Uses `useRef` + `useState` to synchronize video buffering (`/mainAssets/hero-background-video.mp4`) with a WebP poster image (`/mainAssets/hero-day-poster.webp`). Cross-fades poster to `opacity-0` only when video frames actively decode.
- **Race-Condition Immunity**: Handles hard browser refreshes and cached video autoplay using mount-time `readyState` and programmatic `.play()` fallbacks.
- **Optical Contrast Overlay**: Features a 108° directional linear gradient (`bg-[linear-gradient(108deg,...)]`) ensuring 100% WCAG AAA text legibility regardless of background video brightness.
- **Base UI Integration**: Uses `<Button render={<Link />} />` with automatic `nativeButton={false}` resolution for clean accessibility and zero console warnings.
- 📄 **Detailed Documentation**: [`components/webcomp/hero.md`](file:///d:/update_portfolio/components/webcomp/hero.md)

---

## 📂 Project Structure

```
├── app/
│   ├── globals.css           # Global Tailwind CSS v4 styles & custom utilities
│   ├── layout.tsx            # Root layout wrapper
│   └── page.tsx              # Main portfolio home page
├── components/
│   ├── ui/
│   │   └── button.tsx        # Base UI button component wrapper with nativeButton logic
│   └── webcomp/
│       ├── Hero.tsx          # Hero section component
│       └── hero.md           # First-principles Hero component documentation
├── public/
│   └── mainAssets/           # High-resolution videos, posters, and static media
├── hero.md                   # Core hero section architecture guide
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
