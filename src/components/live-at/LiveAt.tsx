"use client";

import { useRef } from "react";
import { AltLoadEntranceMotion } from "@/components/animations/AltLoadEntranceMotion";
import { IntroScrollProvider } from "@/components/animations/IntroScrollContext";
import { LiveAtLineMotion } from "@/components/animations/LiveAtLineMotion";
import { getAltTheme, isAltDesign, type PageDesign } from "@/lib/design";

type LiveAtProps = {
  embedded?: boolean;
  fullBleed?: boolean;
  className?: string;
  design?: PageDesign;
};

export function LiveAt({
  embedded = false,
  fullBleed = false,
  className = "",
  design = "default",
}: LiveAtProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const altTheme = getAltTheme(design);
  const isAlt = isAltDesign(design);

  const block = (
    <section
      ref={embedded ? undefined : sectionRef}
      className={`w-full max-w-full border-y ${fullBleed ? "live-at-v1-bleed" : ""} ${className} ${
        isAlt ? "border-[#F1F1F1]" : "border-ink bg-cream"
      }`.trim()}
      style={isAlt && altTheme ? { backgroundColor: altTheme.bg } : undefined}
    >
      <div
        className={`border-b py-6 md:py-7 lg:py-9 ${
          isAlt ? "border-[#F1F1F1]" : "border-ink"
        }`}
      >
        {isAlt ? (
          <AltLoadEntranceMotion role="liveAtCall">
            <p className="text-live-at-call text-center font-body font-normal uppercase tracking-normal text-[#F1F1F1]">
              LIVE AT THE
            </p>
          </AltLoadEntranceMotion>
        ) : (
          <LiveAtLineMotion
            line="call"
            className="text-live-at-call text-center font-body font-normal uppercase tracking-normal text-ink"
          >
            <p className="text-live-at-call text-center font-body font-normal uppercase tracking-normal text-ink">
              LIVE AT THE
            </p>
          </LiveAtLineMotion>
        )}
      </div>

      <div className="py-6 md:py-7 lg:py-9">
        {isAlt ? (
          <AltLoadEntranceMotion role="liveAtResponse">
            <p className="text-live-at-response section-px wrap-break-word text-center font-heading font-normal tracking-[-0.01em] text-[#F1F1F1]">
              Fitzrovia Chapel, London.
            </p>
          </AltLoadEntranceMotion>
        ) : (
          <LiveAtLineMotion
            line="response"
            className="text-live-at-response section-px wrap-break-word text-center font-heading font-normal tracking-[-0.01em] text-ink"
          >
            <p className="text-live-at-response section-px wrap-break-word text-center font-heading font-normal tracking-[-0.01em] text-ink">
              Fitzrovia Chapel, London.
            </p>
          </LiveAtLineMotion>
        )}
      </div>
    </section>
  );

  if (embedded) {
    return block;
  }

  return (
    <IntroScrollProvider sectionRef={sectionRef}>
      {block}
    </IntroScrollProvider>
  );
}
