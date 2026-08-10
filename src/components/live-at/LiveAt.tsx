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
        <div className="border-b border-ink py-7 md:py-9">
          <LiveAtLineMotion line="call" className="text-center font-body text-[clamp(1.25rem,3.97vw,57.18px)] font-normal uppercase leading-none tracking-normal text-ink">
            <p className="text-center font-body text-[clamp(1.25rem,3.97vw,57.18px)] font-normal uppercase leading-none tracking-normal text-ink">
              LIVE AT THE
            </p>
          </LiveAtLineMotion>
        </div>

        <div className="py-7 md:py-9">
          <LiveAtLineMotion line="response" className="break-words px-[clamp(1.125rem,5.5vw,4.5rem)] text-center font-heading text-[clamp(1.5rem,min(6.52vw,calc((100vw-2.25rem)/10)),93.95px)] font-normal leading-[1.06] tracking-[-0.01em] text-ink">
            <p className="break-words px-[clamp(1.125rem,5.5vw,4.5rem)] text-center font-heading text-[clamp(1.5rem,min(6.52vw,calc((100vw-2.25rem)/10)),93.95px)] font-normal leading-[1.06] tracking-[-0.01em] text-ink">
              Fitzrovia Chapel, London.
            </p>
          </LiveAtLineMotion>
        </div>
      </section>
    </IntroScrollProvider>
  );
}
