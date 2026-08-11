"use client";

import { useRef } from "react";
import { IntroScrollProvider } from "@/components/animations/IntroScrollContext";
import { LiveAtLineMotion } from "@/components/animations/LiveAtLineMotion";

export function LiveAt() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <IntroScrollProvider sectionRef={sectionRef}>
      <section
        ref={sectionRef}
        className="w-full max-w-full border-y border-ink bg-cream"
      >
        <div className="border-b border-ink py-6 md:py-7 lg:py-9">
          <LiveAtLineMotion
            line="call"
            className="text-live-at-call text-center font-body font-normal uppercase tracking-normal text-ink"
          >
            <p className="text-live-at-call text-center font-body font-normal uppercase tracking-normal text-ink">
              LIVE AT THE
            </p>
          </LiveAtLineMotion>
        </div>

        <div className="py-6 md:py-7 lg:py-9">
          <LiveAtLineMotion
            line="response"
            className="text-live-at-response section-px break-words text-center font-heading font-normal tracking-[-0.01em] text-ink"
          >
            <p className="text-live-at-response section-px break-words text-center font-heading font-normal tracking-[-0.01em] text-ink">
              Fitzrovia Chapel, London.
            </p>
          </LiveAtLineMotion>
        </div>
      </section>
    </IntroScrollProvider>
  );
}
