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
      className="section-screen section-px relative isolate flex min-h-130 w-full max-w-full flex-col bg-cream pt-7 md:pt-9"
    >
      <IntroScrollProvider sectionRef={heroRef}>
        <div className="mx-auto flex w-fit min-w-0 max-w-[1305px] flex-1 flex-col md:min-h-0">
          <header className="shrink-0">
            <HeroEntranceMotion role="logo">
              <Motion preset="snap" beat={0} delay={0} lightPass>
                <Image
                  src="/Vector(16).svg"
                  alt=""
                  width={69}
                  height={71}
                  priority
                  className="h-[34px] w-[33px] md:h-[38px] md:w-[37px] lg:h-[42px] lg:w-[41px]"
                  aria-hidden
                />
              </Motion>
            </HeroEntranceMotion>
          </header>
          <HeroNavBehindMotion
            heroRef={heroRef}
            lag={0}
            className="mt-20! flex w-full min-w-0 shrink-0 flex-col items-center gap-2 text-center md:mt-6 md:flex-row md:items-baseline md:justify-between md:gap-4 md:text-left lg:mt-9"
          >
            <HeroItemMotion item="name">
              <p className="text-hero-name w-full max-w-full font-heading font-normal tracking-[-0.02em] text-navy">
                Babajide Olatunji
              </p>
            </HeroItemMotion>
            <HeroItemMotion item="presents">
              <p className="text-hero-presents w-full max-w-full font-heading font-medium tracking-[-0.02em] text-ink md:w-auto md:shrink-0 md:font-normal">
                Presents
              </p>
            </HeroItemMotion>
          </HeroNavBehindMotion>
          <div className="relative z-10 mt-[clamp(0.75rem,2vw,2.5rem)] flex w-full min-w-0 shrink-0 bg-cream pb-4 md:pb-3 lg:pb-6">
            <HeroTitleMotion preset="orbit" beat={2} delay={0.1}>
              <h1 className="text-hero-title relative w-full bg-cream text-center font-display font-normal uppercase tracking-[-0.02em] text-orange">
                UMBERMAN
              </h1>
            </HeroTitleMotion>
          </div>
        </div>
      </IntroScrollProvider>
    </section>
  );
}
