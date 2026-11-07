"use client";

import { OWithDot } from "@/components/alt/OWithDot";
import { AltLoadEntranceMotion } from "@/components/animations/AltLoadEntranceMotion";
import { LiveAt } from "@/components/live-at/LiveAt";
import { ALT_THEMES } from "@/lib/design";

const theme = ALT_THEMES.alt;

export function Hero() {
  return (
    <section
      className="relative z-0 flex w-full max-w-full flex-col pt-7 md:pt-9"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="flex flex-col gap-[10px] md:gap-[50px] md:mb-25 mb-10">
        <div className="relative mx-auto flex w-fit min-w-0 max-w-full flex-col">
          <div className="flex w-full min-w-0 shrink-0 flex-row items-baseline justify-between gap-4 text-left md:mt-6 lg:mt-9">
            <AltLoadEntranceMotion role="name">
              <p
                className="text-hero-name overflow-visible font-heading font-normal leading-none tracking-[-0.02em]"
                style={{ color: theme.name }}
              >
                Babájídé <OWithDot />látúnjí
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
    </section>
  );
}
