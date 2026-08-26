"use client";

import { AltFadeUpReveal, AltStaggerGroup } from "@/components/animations/AltFadeUpReveal";
import { ALT_THEMES } from "@/lib/design";

const theme = ALT_THEMES.alt;

const btnClassName =
  "text-save-btn flex h-12.5 w-[203px] max-w-[203px] shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-[#F1F1F1] bg-transparent text-center font-body font-normal text-white transition-colors hover:border-[var(--cta-fill)] hover:bg-[var(--cta-fill)] active:border-[var(--cta-fill)] active:bg-[var(--cta-fill)] md:h-[clamp(3.125rem,6.58vw,94.77px)] md:max-h-[94.77px] md:w-[clamp(12.5rem,24.54vw,353.39px)] md:max-w-[353.39px]";

const ctaWrapClassName = "alt-fade-up w-auto shrink-0";

export function AltSaveTheDate() {
  return (
    <section
      id="save-the-date"
      className="flex min-h-130 w-full max-w-full scroll-mt-[100px] flex-col justify-between px-[clamp(1.125rem,5.5vw,4.5rem)] pb-16 md:pb-10 py-[clamp(1.5rem,4vw,3rem)] xl:min-h-screen"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <AltFadeUpReveal>
          <p className="text-save-date-line w-full text-center font-display font-normal uppercase text-[#F1F1F1]">
            SEPT. 21–24, 2026.
          </p>
        </AltFadeUpReveal>

        <div className="mt-[clamp(1.5rem,5vw,3rem)] flex w-full max-w-[min(100%,1400px)] [container-type:inline-size] items-end justify-center gap-[20px] md:gap-[40px] xl:gap-[60px]">
          <AltFadeUpReveal from="left" delay={0.04}>
            <span
              className="text-save-word font-display font-normal uppercase"
              style={{ color: theme.orange }}
            >
              SAVE
            </span>
          </AltFadeUpReveal>

          <AltFadeUpReveal from="up" delay={0.1} className="mb-[1.5rem] shrink-0 md:mb-[2.5rem]">
            <span
              className="text-save-the font-display font-normal uppercase"
              style={{ color: theme.orange }}
            >
              THE
            </span>
          </AltFadeUpReveal>

          <AltFadeUpReveal from="right" delay={0.04}>
            <span
              className="text-save-word font-display font-normal uppercase"
              style={{ color: theme.orange }}
            >
              DATE
            </span>
          </AltFadeUpReveal>
        </div>
      </div>

      <AltStaggerGroup className="relative z-50 mt-8 flex w-full flex-col items-center gap-4 md:flex-row md:items-center md:justify-center md:gap-[clamp(1.25rem,4.86vw,70px)]">
        <div className={ctaWrapClassName} style={{ ["--alt-fade-delay" as string]: "0s" }}>
          <a
            href="#"
            className={btnClassName}
            style={{ ["--cta-fill" as string]: theme.ctaRegister }}
          >
            Register
          </a>
        </div>

        <div className={ctaWrapClassName} style={{ ["--alt-fade-delay" as string]: "0.16s" }}>
          <a
            href="https://drive.google.com/drive/folders/1PxpYGFI9Z2Pz7rhQBSmXd3JoLTkMhGr8"
            target="_blank"
            rel="noopener noreferrer"
            className={btnClassName}
            style={{ ["--cta-fill" as string]: theme.ctaPressKit }}
          >
            Press Kit
          </a>
        </div>

        <div className={ctaWrapClassName} style={{ ["--alt-fade-delay" as string]: "0.32s" }}>
          <a
            href="https://www.ikiform.com/f/babajide-olatunji-presents-umberman-psluab"
            target="_blank"
            rel="noopener noreferrer"
            className={btnClassName}
            style={{ ["--cta-fill" as string]: theme.ctaRsvp }}
          >
            RSVP
          </a>
        </div>
      </AltStaggerGroup>
    </section>
  );
}
