"use client";

import { AltFadeUpReveal } from "@/components/animations/AltFadeUpReveal";
import { getAltTheme, type PageDesign } from "@/lib/design";

const btnClassName =
  "w-full rounded-full border-2 border-[#F1F1F1] bg-transparent py-[clamp(0.75rem,2.5vw,1.5rem)] text-center font-body text-[clamp(0.875rem,4.86vw,70px)] font-normal leading-none tracking-normal text-white transition-colors hover:border-[var(--cta-fill)] hover:bg-[var(--cta-fill)]";

type AltSaveTheDateProps = {
  design?: PageDesign;
};

export function AltSaveTheDate({ design = "alt" }: AltSaveTheDateProps) {
  const theme = getAltTheme(design) ?? getAltTheme("alt")!;
  const isPairCta = theme.ctaLayout === "pair";

  const mobileBtnClassName = isPairCta
    ? btnClassName
    : `${btnClassName} md:flex-1`;

  return (
    <section
      id="save-the-date"
      className="flex min-h-130 w-full max-w-full scroll-mt-[100px] flex-col justify-between px-[clamp(1.125rem,5.5vw,4.5rem)] py-[clamp(1.5rem,4vw,3rem)] md:h-screen"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <AltFadeUpReveal>
          <p className="w-full text-center font-display text-[clamp(1.5rem,12.31vw,177.29px)] font-normal uppercase leading-[1.2] tracking-normal text-[#F1F1F1]">
            OCT. 15 – 18, 2026
          </p>
        </AltFadeUpReveal>

        <div className="mt-[clamp(1.5rem,5vw,3rem)] flex w-full max-w-[min(100%,1400px)] items-end justify-between gap-[clamp(0.25rem,1vw,1rem)]">
          <AltFadeUpReveal delay={0.04}>
            <span
              className="font-display text-[clamp(2.5rem,30.29vw,436.2px)] font-normal uppercase leading-none tracking-[-0.02em]"
              style={{ color: theme.orange }}
            >
              SAVE
            </span>
          </AltFadeUpReveal>

          <AltFadeUpReveal delay={0.1} className="mb-10 shrink-0">
            <span
              className="font-display text-[clamp(1.25rem,14.875vw,214.2px)] font-normal uppercase leading-none tracking-[-0.02em]"
              style={{ color: theme.orange }}
            >
              THE
            </span>
          </AltFadeUpReveal>

          <AltFadeUpReveal delay={0.04}>
            <span
              className="font-display text-[clamp(2.5rem,30.29vw,436.2px)] font-normal uppercase leading-none tracking-[-0.02em]"
              style={{ color: theme.orange }}
            >
              DATE
            </span>
          </AltFadeUpReveal>
        </div>
      </div>

      {isPairCta ? (
        <div className="relative z-50 grid w-full grid-cols-2 gap-4 md:mt-20 md:gap-40!">
          <AltFadeUpReveal delay={0.08}>
            <button
              type="button"
              className={btnClassName}
              style={{ ["--cta-fill" as string]: theme.ctaRsvp }}
            >
              RSVP
            </button>
          </AltFadeUpReveal>

          <AltFadeUpReveal delay={0.16}>
            <a
              href="#"
              className={`${btnClassName} flex items-center justify-center`}
              style={{ ["--cta-fill" as string]: theme.ctaPressKit }}
            >
              Press Kit
            </a>
          </AltFadeUpReveal>

          <AltFadeUpReveal delay={0.2} className="col-span-2">
            <a
              href="mailto:enquiry@umbermanbybabajideolatunji.com"
              className={`${btnClassName} flex items-center justify-center`}
              style={{ ["--cta-fill" as string]: theme.ctaEnquiry }}
            >
              Enquiry
            </a>
          </AltFadeUpReveal>
        </div>
      ) : (
        <div className="relative z-50 mt-8 flex w-full flex-col items-stretch gap-4 md:mt-20 md:flex-row md:gap-6 lg:gap-10">
          <AltFadeUpReveal delay={0.08} className="w-full md:flex-1">
            <button
              type="button"
              className={mobileBtnClassName}
              style={{ ["--cta-fill" as string]: theme.ctaRegister }}
            >
              Register
            </button>
          </AltFadeUpReveal>

          <AltFadeUpReveal delay={0.12} className="w-full md:flex-1">
            <a
              href="#"
              className={`${mobileBtnClassName} flex items-center justify-center`}
              style={{ ["--cta-fill" as string]: theme.ctaPressKit }}
            >
              Press Kit
            </a>
          </AltFadeUpReveal>

          <AltFadeUpReveal delay={0.16} className="w-full md:flex-1">
            <button
              type="button"
              className={mobileBtnClassName}
              style={{ ["--cta-fill" as string]: theme.ctaRsvp }}
            >
              RSVP
            </button>
          </AltFadeUpReveal>

          <AltFadeUpReveal delay={0.2} className="w-full md:flex-1">
            <a
              href="mailto:enquiry@umbermanbybabajideolatunji.com"
              className={`${mobileBtnClassName} flex items-center justify-center`}
              style={{ ["--cta-fill" as string]: theme.ctaEnquiry }}
            >
              Enquiry
            </a>
          </AltFadeUpReveal>
        </div>
      )}
    </section>
  );
}
