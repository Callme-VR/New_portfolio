import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { motion } from "motion/react";

export type DayNightMode = "day" | "night";

interface TypeProps {
  value: DayNightMode;
  onChange: (value: DayNightMode) => void;
}

export default function Widget({ value, onChange }: TypeProps) {
  const isDay = value === "day";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDay ? "night" : "day"} mode`}
      onClick={() => onChange(isDay ? "night" : "day")}
      role="switch"
      className={cn(
        "group relative flex flex-col items-center",
        "h-22 w-12",
        "gap-2 p-2",
        "rounded-[18px]",
        "border border-overlay-cream/20",
        "bg-black/10 backdrop-blur-md",
        "transition-colors duration-300",
        "hover:border-overlay-cream/40",
        "focus:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-overlay-cream/45",
        // Mobile
        "max-sm:h-20",
        "max-sm:w-10",
        "max-sm:gap-1",
        "max-sm:p-1.5"
      )}
    >
      {/* Desktop active indicator */}
      <motion.span
        className="
          pointer-events-none
          absolute
          left-1/2
          top-2
          h-7 w-7
          -translate-x-1/2
          rounded-full
          bg-overlay-cream

          max-sm:hidden
        "
        animate={{
          y: isDay ? 0 : 36,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.7,
        }}
      />

      {/* Mobile active indicator */}
      <motion.span
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1.5
          h-6 w-6
          -translate-x-1/2
          rounded-full
          bg-overlay-cream

          hidden
          max-sm:block
        "
        animate={{
          y: isDay ? 0 : 28,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.7,
        }}
      />

      {/* Sun */}
      <span
        className={cn(
          "relative z-10 flex shrink-0 items-center justify-center",
          "h-7 w-7",
          "transition-colors duration-300",
          "max-sm:h-6 max-sm:w-6",
          isDay
            ? "text-overlay-ink"
            : "text-overlay-cream/55 group-hover:text-overlay-cream/85"
        )}
      >
        <SunIcon
          className="h-4.75 w-4.75 max-sm:h-4.25 max-sm:w-4.25"
          strokeWidth={isDay ? 2.2 : 1.8}
          fill={isDay ? "currentColor" : "none"}
        />
      </span>

      {/* Moon */}
      <span
        className={cn(
          "relative z-10 flex shrink-0 items-center justify-center",
          "h-7 w-7",
          "transition-colors duration-300",
          "max-sm:h-6 max-sm:w-6",
          !isDay
            ? "text-overlay-ink"
            : "text-overlay-cream/55 group-hover:text-overlay-cream/85"
        )}
      >
        <MoonIcon
          className="h-4.75 w-4.75 max-sm:h-4.25 max-sm:w-4.25"
          strokeWidth={!isDay ? 2.2 : 1.8}
          fill={!isDay ? "currentColor" : "none"}
        />
      </span>
    </button>
  );
}