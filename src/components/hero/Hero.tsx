"use client";

import Image from "next/image";
import { useRef } from "react";
import { AltLogo } from "@/components/alt/AltLogo";
import { AltLoadEntranceMotion } from "@/components/animations/AltLoadEntranceMotion";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { HeroEntranceMotion } from "@/components/animations/HeroEntranceMotion";
import { HeroItemMotion } from "@/components/animations/HeroItemMotion";
import { HeroTitleMotion } from "@/components/animations/HeroTitleMotion";
import { IntroScrollProvider } from "@/components/animations/IntroScrollContext";
import { Motion } from "@/components/animations/Motion";
import { HeroNavBehindMotion } from "@/components/hero/HeroNavBehindMotion";
import { LiveAt } from "@/components/live-at/LiveAt";
import { getAltTheme, isAltDesign, type PageDesign } from "@/lib/design";

type HeroProps = {
  design?: PageDesign;
};

export function Hero({ design = "default" }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const variant = useAnimationVariant();
  const liveAtInHero = variant === 1;
  const altTheme = getAltTheme(design);
  const isAlt = isAltDesign(design);

  return (
    <section
      ref={heroRef}
      className={`section-screen section-px relative isolate flex min-h-130 w-full max-w-full flex-col pt-7 md:pt-9 ${
        isAlt ? "" : "bg-cream"
      }`}
      style={isAlt && altTheme ? { backgroundColor: altTheme.bg } : undefined}
    >
      <IntroScrollProvider sectionRef={heroRef}>
        <div className="relative mx-auto flex w-fit min-w-0 max-w-[1305px] flex-1 flex-col md:min-h-0">
          <header className="shrink-0">
            {isAlt && altTheme ? (
              <AltLoadEntranceMotion role="logo">
                <AltLogo theme={altTheme} />
              </AltLoadEntranceMotion>
            ) : (
              <HeroEntranceMotion role="logo">
                {variant === 1 ? (
                  <Image
                    src="/Vector(16).svg"
                    alt=""
                    width={69}
                    height={71}
                    priority
                    className="h-[34px] w-[33px] md:h-[38px] md:w-[37px] lg:h-[42px] lg:w-[41px]"
                    aria-hidden
                  />
                ) : (
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
                )}
              </HeroEntranceMotion>
            )}
          </header>
          <HeroNavBehindMotion
            heroRef={heroRef}
            lag={0}
            className="mt-20! flex w-full min-w-0 shrink-0 flex-col items-center gap-2 text-center md:mt-6 md:flex-row md:items-baseline md:justify-between md:gap-4 md:text-left lg:mt-9"
          >
            {isAlt && altTheme ? (
              <AltLoadEntranceMotion role="name">
                <p
                  className="text-hero-name w-full max-w-full font-heading font-normal tracking-[-0.02em]"
                  style={{ color: altTheme.name }}
                >
                  Babajide Olatunji
                </p>
              </AltLoadEntranceMotion>
            ) : (
              <HeroItemMotion item="name">
                <p className="text-hero-name w-full max-w-full font-heading font-normal tracking-[-0.02em] text-navy">
                  Babajide Olatunji
                </p>
              </HeroItemMotion>
            )}
            {isAlt && altTheme ? (
              <AltLoadEntranceMotion role="presents">
                <p
                  className="text-hero-presents w-full max-w-full font-heading font-medium tracking-[-0.02em] md:w-auto md:shrink-0 md:font-normal"
                  style={{ color: altTheme.presents }}
                >
                  Presents
                </p>
              </AltLoadEntranceMotion>
            ) : (
              <HeroItemMotion item="presents">
                <p className="text-hero-presents w-full max-w-full font-heading font-medium tracking-[-0.02em] text-ink md:w-auto md:shrink-0 md:font-normal">
                  Presents
                </p>
              </HeroItemMotion>
            )}
          </HeroNavBehindMotion>
          <div className="relative z-10 mt-[clamp(0.75rem,2vw,2.5rem)] flex w-full min-w-0 shrink-0 pb-4 md:pb-3 lg:pb-6">
            {isAlt && altTheme ? (
              <AltLoadEntranceMotion role="title" className="w-full">
                <h1
                  className="text-hero-title relative w-full text-center font-display font-normal uppercase tracking-[-0.02em]"
                  style={{ color: altTheme.orange }}
                >
                  UMBERMAN
                </h1>
              </AltLoadEntranceMotion>
            ) : (
              <HeroTitleMotion preset="orbit" beat={2} delay={0.1}>
                <h1 className="text-hero-title relative w-full text-center font-display font-normal uppercase tracking-[-0.02em] text-orange">
                  UMBERMAN
                </h1>
              </HeroTitleMotion>
            )}
          </div>
          {liveAtInHero ? (
            <LiveAt embedded fullBleed design={design} className="mt-auto shrink-0" />
          ) : null}
        </div>
      </IntroScrollProvider>
    </section>
  );
}
