import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";

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
      className="group relative flex w-9 flex-col items-center gap-1.5 rounded-[10px] border border-overlay-cream/20 p-1.5 backdrop-blur-md transition-colors hover:border-overlay-cream/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-overlay-cream/45"
    >
      {/* Active background */}
      <span
        className={cn(
          "absolute left-1/2 top-1.5 h-6 w-6 -translate-x-1/2 rounded-full bg-overlay-cream transition-transform duration-300",
          isDay ? "translate-y-0" : "translate-y-7"
        )}
      />

      {/* Sun */}
      <span
        className={cn(
          "relative z-10 flex h-6 w-6 items-center justify-center transition-colors",
          isDay
            ? "text-overlay-ink"
            : "text-overlay-cream/55 group-hover:text-overlay-cream/85"
        )}
      >
        <SunIcon size={17} strokeWidth={1.8} />
      </span>

      {/* Moon */}
      <span
        className={cn(
          "relative z-10 flex h-6 w-6 items-center justify-center transition-colors",
          !isDay
            ? "text-overlay-ink"
            : "text-overlay-cream/55 group-hover:text-overlay-cream/85"
        )}
      >
        <MoonIcon size={17} strokeWidth={1.8} />
      </span>
    </button>
  );
}