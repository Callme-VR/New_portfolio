import { NAV_LINKS } from "@/lib/StaticContent/content";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-colors duration-300">
      <div className="mx-auto flex h-16 w-full max-w-[1480px] items-center justify-between px-6 sm:h-20 sm:px-10 lg:px-14">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-base font-medium tracking-[-0.01em] text-overlay-cream"
        >
          <div className="flex items-center">
            <span>Vishal</span>
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text pl-1 text-transparent">
              .Rajput
            </span>
          </div>
        </Link>

        <nav className="flex items-center justify-center gap-8 text-[14px] text-overlay-cream/95">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative transition-colors after:absolute after:-bottom-1 after:left-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-overlay-cream/55 bg-overlay-ink px-4 text-[14px] font-medium text-overlay-cream backdrop-blur-[6px] transition-colors hover:bg-overlay-ink/70"
          >
            <span className="size-2 rounded-full bg-success" />
            Let's Talk
          </Link>
        </div>
      </div>
    </header>
  );
}