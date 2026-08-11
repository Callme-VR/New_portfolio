
import { Gauge } from "lucide-react";

import { Button } from "../ui/button";

export default function TokenUsage() {
  return (
    <aside
      className="
        w-70
        overflow-hidden
        rounded-xl
        border border-overlay-cream/20
        bg-overlay-ink/60
        p-6
        text-overlay-cream
        shadow-sm
        backdrop-blur-[10px]
      "
    >
      {/* Token usage header */}
      <div className="flex min-w-0 items-center justify-between gap-4">
        <Button
          variant="ghost"
          className="
            inline-flex
            min-w-0
            items-center
            gap-3
            rounded-full
            px-3
            py-2
            text-overlay-cream/90
            transition-colors
            hover:bg-overlay-cream/10
            hover:text-overlay-cream
            focus-visible:ring-4
            focus-visible:ring-overlay-cream/20
          "
        >
          {/* Usage icon */}
          <Gauge
            aria-hidden="true"
            className="size-4 shrink-0 text-overlay-cream/70"
            strokeWidth={1.8}
          />

          {/* Label */}
          <span className="truncate text-xs font-semibold uppercase tracking-[0.15em]">
            Token Usage
          </span>

          {/* Usage period */}
          <span className="shrink-0 text-xs text-overlay-cream/60">
            &middot;
            <span className="ml-1">14 days</span>
          </span>
        </Button>
      </div>
    </aside>
  );
}

