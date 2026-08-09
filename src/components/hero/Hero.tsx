"use client";

import Image from "next/image";
import { useRef } from "react";
import { HeroEntranceMotion } from "@/components/animations/HeroEntranceMotion";
import { HeroItemMotion } from "@/components/animations/HeroItemMotion";
import { HeroTitleMotion } from "@/components/animations/HeroTitleMotion";
import { IntroScrollProvider } from "@/components/animations/IntroScrollContext";
import { Motion } from "@/components/animations/Motion";
import { HeroNavBehindMotion } from "@/components/hero/HeroNavBehindMotion";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="flex min-h-130 w-full max-w-full flex-col overflow-x-hidden overflow-y-visible bg-cream px-[clamp(1.125rem,5.5vw,4.5rem)] pt-7 md:h-screen md:pt-9"
    >
      <IntroScrollProvider sectionRef={heroRef}>
        <div className="mx-auto flex w-fit min-w-0 max-w-[1305px] flex-1 flex-col">
          <header>
            <HeroEntranceMotion role="logo">
              <Motion preset="snap" beat={0} delay={0} lightPass>
                <Image
                  src="/Vector(16).svg"
                  alt=""
                  width={69}
                  height={71}
                  priority
                  className="h-[34px] w-[33px] md:h-[42px] md:w-[41px]"
                  aria-hidden
                />
              </Motion>
            </HeroEntranceMotion>
          </header>
          <HeroNavBehindMotion
            heroRef={heroRef}
            lag={0}
            className="mt-40! flex w-full min-w-0 flex-col items-center gap-3 overflow-visible text-center md:mt-9 md:flex-row md:items-baseline md:justify-between md:gap-4 md:text-left"
          >
            <HeroItemMotion item="name">
              <p className="w-full max-w-full overflow-visible font-heading text-[clamp(1.5rem,7.86vw,113.1px)] font-normal leading-[1.06] tracking-[-0.02em] text-navy">
                Babajide Olatunji
              </p>
            </HeroItemMotion>
            <HeroItemMotion item="presents">
              <p className="w-full max-w-full font-heading text-[clamp(1.25rem,5vw,48px)] font-medium leading-none tracking-[-0.02em] text-ink md:w-auto md:shrink-0 md:font-normal md:text-[clamp(0.875rem,3vw,48px)]">
                Presents
              </p>
            </HeroItemMotion>
          </HeroNavBehindMotion>
          <div className="relative z-10 mt-2 flex w-full min-w-0 flex-1 items-start justify-center overflow-x-hidden overflow-y-visible bg-cream pb-6 md:pb-10">
            <HeroTitleMotion preset="orbit" beat={2} delay={0.1}>
              <h1 className="relative w-full overflow-visible bg-cream text-center font-display text-[clamp(5rem,34.6vw,497.89px)] font-normal uppercase leading-none tracking-[-0.02em] text-orange">
                UMBERMAN
              </h1>
            </HeroTitleMotion>
          </div>
        </div>
      </IntroScrollProvider>
    </section>
  );
}
