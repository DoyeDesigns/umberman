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
      className="relative z-0 flex w-full max-w-full flex-col pt-7 md:pt-9"
      style={{ backgroundColor: theme.bg }}
    >
      <IntroScrollProvider sectionRef={heroRef}>
        <div className="flex flex-col md:gap-[50px] gap-[10px]">
          <div className="relative mx-auto flex min-w-0 w-fit max-w-full flex-col">
            <div className="flex w-full min-w-0 shrink-0 flex-row items-baseline justify-between gap-4 text-left md:mt-6 lg:mt-9">
              <AltLoadEntranceMotion role="name">
                <p
                  className="text-hero-name font-heading font-normal leading-none tracking-[-0.02em]"
                  style={{ color: theme.name }}
                >
                  Babajide Olatunji
                </p>
              </AltLoadEntranceMotion>
              <AltLoadEntranceMotion role="presents">
                <p
                  className="text-hero-presents shrink-0 font-body font-normal uppercase leading-none tracking-[-0.02em]"
                  style={{ color: theme.presents }}
                >
                  Presents
                </p>
              </AltLoadEntranceMotion>
            </div>
            <div className="relative mt-[clamp(0.75rem,2vw,2.5rem)] flex w-full min-w-0 shrink-0 justify-center pb-4 md:pb-3 lg:pb-6">
              <AltLoadEntranceMotion role="title">
                <h1
                  className="text-hero-title relative w-full text-center font-display font-normal uppercase leading-none tracking-[-0.02em]"
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
