"use client";

import Image from "next/image";
import { AltFadeUpReveal } from "@/components/animations/AltFadeUpReveal";
import { ALT_THEMES } from "@/lib/design";

const theme = ALT_THEMES.alt;

const PRESS_KIT_HREF =
  "https://drive.google.com/drive/folders/1PxpYGFI9Z2Pz7rhQBSmXd3JoLTkMhGr8";

const btnClassName =
  "text-past-btn flex h-[37.32px] w-[138px] shrink-0 cursor-pointer items-center justify-center rounded-[23.74px] border-[0.63px] border-[#F1F1F1] bg-transparent text-center font-normal text-[#F1F1F1] transition-colors hover:border-[var(--cta-fill)] hover:bg-[var(--cta-fill)] active:border-[var(--cta-fill)] active:bg-[var(--cta-fill)] md:h-[clamp(2.33rem,5.83vw,84px)] md:w-[clamp(8.625rem,26.6vw,383px)] md:rounded-[54.03px] md:border-[1.43px]";

function ExhibitionImage({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/past-exp-img.png"
      alt="The Umberman — painting of a figure with an exposed heart on a silver tray"
      width={447}
      height={403}
      sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, (max-width: 1024px) 340px, (max-width: 1280px) 400px, 447px"
      quality={85}
      className={`block h-[216px] w-[240px] object-contain sm:h-[252px] sm:w-[280px] md:h-[306px] md:w-[340px] lg:h-[361px] lg:w-[400px] xl:h-[403px] xl:w-[447px] ${className}`.trim()}
    />
  );
}

export function PastExhibitionSection() {
  return (
    <section
      id="past-exhibition"
      className="w-full max-w-full scroll-mt-[100px]"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="section-px mx-auto flex w-full max-w-[min(100%,80rem)] flex-col items-center py-[clamp(3rem,8vw,5.5rem)] md:items-start">
        {/* Label sits outside the image/content container on desktop */}
        <AltFadeUpReveal className="mb-[33px] md:mb-[65px]">
          <h2 className="text-past-label text-center font-normal uppercase text-[#F1F1F1] md:text-left">
            Past Exhibition
          </h2>
        </AltFadeUpReveal>

        <div className="flex w-full flex-col items-center md:flex-row md:justify-between md:items-start md:gap-[65px]">
          <AltFadeUpReveal className="md:hidden" delay={0.08}>
            <ExhibitionImage />
          </AltFadeUpReveal>

          <div className="flex h-full flex-col items-center md:items-start md:gap-[65px]">
            <div className="mt-[clamp(1.25rem,4vw,1.75rem)] flex w-full min-w-0 flex-col items-center md:mt-0 md:w-auto md:shrink-0 md:items-start md:gap-[clamp(0.75rem,2vw,1.25rem)]">
              <AltFadeUpReveal delay={0.1}>
                <p
                  className="text-past-title text-center font-display font-normal uppercase md:text-left"
                  style={{ color: theme.orange }}
                >
                  The Umberman
                </p>
              </AltFadeUpReveal>

              <AltFadeUpReveal delay={0.16} className="mt-[clamp(0.875rem,2.5vw,1.25rem)] md:mt-0">
                <p className="text-past-meta text-center font-normal text-[#F1F1F1] md:text-left">
                  21 – 24 September 2026
                </p>
              </AltFadeUpReveal>

              <AltFadeUpReveal delay={0.2} className="mt-[clamp(0.5rem,1.5vw,0.75rem)] md:mt-0">
                <p className="text-past-meta text-center font-normal text-[#F1F1F1] md:text-left">
                  Fitzrovia Chapel, London
                </p>
              </AltFadeUpReveal>
            </div>

            <AltFadeUpReveal delay={0.26} className="mt-[clamp(1.5rem,4vw,2.5rem)] md:mt-[clamp(0.25rem,1vw,0.75rem)]">
                <a
                  href={PRESS_KIT_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnClassName}
                  style={{ ["--cta-fill" as string]: theme.ctaPressKit }}
                >
                  Press Kit
                </a>
              </AltFadeUpReveal>
            </div>

          <div className="hidden shrink-0 md:block">
            <AltFadeUpReveal delay={0.08}>
              <ExhibitionImage />
            </AltFadeUpReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
