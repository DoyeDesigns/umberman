"use client";

import { AltFadeUpReveal } from "@/components/animations/AltFadeUpReveal";
import { ALT_THEMES } from "@/lib/design";

const theme = ALT_THEMES.alt;

const btnClassName =
  "flex h-12.5 w-[203px] max-w-[203px] cursor-pointer items-center justify-center rounded-full border-2 border-[#F1F1F1] bg-transparent text-center font-body text-[21px] font-normal leading-none tracking-normal text-white transition-colors hover:border-[var(--cta-fill)] hover:bg-[var(--cta-fill)] active:border-[var(--cta-fill)] active:bg-[var(--cta-fill)] md:h-auto md:w-full md:max-w-none md:py-[clamp(0.75rem,2.5vw,1.5rem)] md:text-[clamp(0.875rem,4.86vw,70px)] xl:max-w-[546px] xl:text-[clamp(0.875rem,4.86vw,48px)]";

export function AltSaveTheDate() {
  return (
    <section
      id="save-the-date"
      className="flex min-h-130 w-full max-w-full scroll-mt-[100px] flex-col justify-between px-[clamp(1.125rem,5.5vw,4.5rem)] pb-16 md:pb-10 py-[clamp(1.5rem,4vw,3rem)] md:min-h-screen"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <AltFadeUpReveal>
          <p className="text-save-date-line w-full text-center font-display font-normal uppercase text-[#F1F1F1]">
            SEPT. 21–24, 2026.
          </p>
        </AltFadeUpReveal>

        <div className="mt-[clamp(1.5rem,5vw,3rem)] flex w-full max-w-[min(100%,1400px)] items-end justify-center gap-[25px] md:gap-[86px]">
          <AltFadeUpReveal delay={0.04}>
            <span
              className="text-save-word font-display font-normal uppercase"
              style={{ color: theme.orange }}
            >
              SAVE
            </span>
          </AltFadeUpReveal>

          <AltFadeUpReveal delay={0.1} className="mb-[clamp(0.25rem,2.83vw,2.5rem)] shrink-0">
            <span
              className="text-save-the font-display font-normal uppercase"
              style={{ color: theme.orange }}
            >
              THE
            </span>
          </AltFadeUpReveal>

          <AltFadeUpReveal delay={0.04}>
            <span
              className="text-save-word font-display font-normal uppercase"
              style={{ color: theme.orange }}
            >
              DATE
            </span>
          </AltFadeUpReveal>
        </div>
      </div>

      <div className="relative z-50 mt-8 flex w-full flex-col items-center gap-4 md:flex-row md:items-stretch md:justify-center md:gap-6 lg:gap-10">
        <AltFadeUpReveal delay={0.08} className="w-auto md:w-full md:flex-1 xl:max-w-[546px]">
          <a
            href="#"
            className={btnClassName}
            style={{ ["--cta-fill" as string]: theme.ctaRegister }}
          >
            Register
          </a>
        </AltFadeUpReveal>

        <AltFadeUpReveal delay={0.12} className="w-auto md:w-full md:flex-1 xl:max-w-[546px]">
          <a
            href="https://drive.google.com/drive/folders/1PxpYGFI9Z2Pz7rhQBSmXd3JoLTkMhGr8"
            target="_blank"
            rel="noopener noreferrer"
            className={btnClassName}
            style={{ ["--cta-fill" as string]: theme.ctaPressKit }}
          >
            Press Kit
          </a>
        </AltFadeUpReveal>

        <AltFadeUpReveal delay={0.16} className="w-auto md:w-full md:flex-1 xl:max-w-[546px]">
          <a
            href="https://www.ikiform.com/f/babajide-olatunji-presents-umberman-psluab"
            target="_blank"
            rel="noopener noreferrer"
            className={btnClassName}
            style={{ ["--cta-fill" as string]: theme.ctaRsvp }}
          >
            RSVP
          </a>
        </AltFadeUpReveal>
      </div>
    </section>
  );
}
