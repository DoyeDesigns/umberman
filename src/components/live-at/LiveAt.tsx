"use client";

import { AltLoadEntranceMotion } from "@/components/animations/AltLoadEntranceMotion";
import { ALT_THEMES } from "@/lib/design";

const theme = ALT_THEMES.alt;

type LiveAtProps = {
  embedded?: boolean;
  className?: string;
};

export function LiveAt({ className = "" }: LiveAtProps) {
  return (
    <section
      className={`w-full max-w-full border-y border-[#F1F1F1] ${className}`.trim()}
      style={{ backgroundColor: theme.bg }}
    >
      <div className="border-b border-[#F1F1F1] py-6 md:py-7 lg:py-9">
        <AltLoadEntranceMotion role="liveAtCall">
          <p className="text-live-at-call text-center font-body font-normal uppercase tracking-normal text-[#F1F1F1]">
            LIVE AT THE
          </p>
        </AltLoadEntranceMotion>
      </div>

      <div className="py-6 md:py-7 lg:py-9">
        <AltLoadEntranceMotion role="liveAtResponse">
          <p className="text-live-at-response section-px wrap-break-word text-center font-heading font-normal tracking-[-0.01em] text-[#F1F1F1]">
            Fitzrovia Chapel, London.
          </p>
        </AltLoadEntranceMotion>
      </div>
    </section>
  );
}
