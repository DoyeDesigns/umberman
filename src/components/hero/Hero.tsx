"use client";

import { useRef } from "react";
import { AltLoadEntranceMotion } from "@/components/animations/AltLoadEntranceMotion";
import { IntroScrollProvider } from "@/components/animations/IntroScrollContext";
import { LiveAt } from "@/components/live-at/LiveAt";
import { ALT_THEMES } from "@/lib/design";

const theme = ALT_THEMES.alt;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative isolate flex w-full max-w-full flex-col pt-7 md:pt-9"
      style={{ backgroundColor: theme.bg }}
    >
      <IntroScrollProvider sectionRef={heroRef}>
        <div className="flex flex-col gap-[50px]">
          <div className="relative mx-auto flex min-w-0 w-full max-w-[1305px] flex-col section-px md:w-fit md:max-w-full">
            <div className="mt-8 flex w-full min-w-0 shrink-0 flex-col items-center gap-2 text-center md:mt-6 md:flex-row md:items-baseline md:justify-between md:gap-4 md:text-left lg:mt-9">
              <AltLoadEntranceMotion role="name">
                <p
                  className="text-hero-name w-full max-w-full font-heading font-normal tracking-[-0.02em] md:w-auto"
                  style={{ color: theme.name }}
                >
                  Babajide Olatunji
                </p>
              </AltLoadEntranceMotion>
              <AltLoadEntranceMotion role="presents">
                <p
                  className="text-hero-presents w-full max-w-full font-body font-normal uppercase tracking-[-0.02em] md:w-auto md:shrink-0"
                  style={{ color: theme.presents }}
                >
                  Presents
                </p>
              </AltLoadEntranceMotion>
            </div>
            <div className="relative mt-[clamp(0.75rem,2vw,2.5rem)] flex w-full min-w-0 shrink-0 justify-center pb-4 md:pb-3 lg:pb-6">
              <AltLoadEntranceMotion role="title">
                <h1
                  className="text-hero-title relative w-full text-center font-display font-normal uppercase tracking-[-0.02em] md:w-auto"
                  style={{ color: theme.orange }}
                >
                  UMBERMAN
                </h1>
              </AltLoadEntranceMotion>
            </div>
          </div>
          <LiveAt embedded className="w-full shrink-0" />
        </div>
      </IntroScrollProvider>
    </section>
  );
}
