"use client";

import { SaveWordMotion } from "@/components/animations/SaveWordMotion";
import { getAltTheme, type PageDesign } from "@/lib/design";

const btnClassName =
  "w-full rounded-full py-[clamp(0.75rem,2.5vw,1.5rem)] text-center font-body text-[clamp(0.875rem,4.86vw,70px)] font-normal leading-none tracking-normal text-white";

type AltSaveTheDateProps = {
  design?: PageDesign;
};

export function AltSaveTheDate({ design = "alt" }: AltSaveTheDateProps) {
  const theme = getAltTheme(design) ?? getAltTheme("alt")!;
  const isPairCta = theme.ctaLayout === "pair";

  const mobileBtnClassName = isPairCta
    ? btnClassName
    : `${btnClassName} max-md:mx-auto max-md:max-w-[546px] md:max-w-none md:flex-1`;

  return (
    <section
      className="flex min-h-130 w-full max-w-full flex-col justify-between px-[clamp(1.125rem,5.5vw,4.5rem)] py-[clamp(1.5rem,4vw,3rem)] md:h-screen"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <SaveWordMotion role="dateLine" preset="settle" beat={0} delay={0}>
          <p className="w-full text-center font-display text-[clamp(1.5rem,12.31vw,177.29px)] font-normal uppercase leading-[1.2] tracking-normal text-[#F1F1F1]">
            OCT. 15 – 18, 2026
          </p>
        </SaveWordMotion>

        <div className="mt-[clamp(1.5rem,5vw,3rem)] flex w-full max-w-[min(100%,1400px)] items-end justify-between gap-[clamp(0.25rem,1vw,1rem)]">
          <SaveWordMotion role="save" preset="drift-left" beat={1} delay={0.04}>
            <span
              className="font-display text-[clamp(2.5rem,30.29vw,436.2px)] font-normal uppercase leading-none tracking-[-0.02em]"
              style={{ color: theme.orange }}
            >
              SAVE
            </span>
          </SaveWordMotion>

          <SaveWordMotion role="the" preset="snap" beat={2} delay={0.1}>
            <span
              className="mb-10 shrink-0 font-display text-[clamp(1.25rem,14.875vw,214.2px)] font-normal uppercase leading-none tracking-[-0.02em]"
              style={{ color: theme.orange }}
            >
              THE
            </span>
          </SaveWordMotion>

          <SaveWordMotion role="date" preset="drift-right" beat={3} delay={0.04}>
            <span
              className="font-display text-[clamp(2.5rem,30.29vw,436.2px)] font-normal uppercase leading-none tracking-[-0.02em]"
              style={{ color: theme.orange }}
            >
              DATE
            </span>
          </SaveWordMotion>
        </div>
      </div>

      {isPairCta ? (
        <div className="relative z-50 grid w-full grid-cols-2 gap-4 md:mt-20 md:gap-40!">
          <button
            type="button"
            className={btnClassName}
            style={{ backgroundColor: theme.ctaRsvp }}
          >
            RSVP
          </button>

          <a
            href="#"
            className={`${btnClassName} flex items-center justify-center`}
            style={{ backgroundColor: theme.ctaPressKit }}
          >
            Press Kit
          </a>
        </div>
      ) : (
        <div className="relative z-50 mt-8 flex w-full flex-col items-center gap-4 md:mt-20 md:flex-row md:gap-6 lg:gap-10">
          <button
            type="button"
            className={mobileBtnClassName}
            style={{ backgroundColor: theme.ctaRegister }}
          >
            Register
          </button>

          <a
            href="#"
            className={`${mobileBtnClassName} flex items-center justify-center`}
            style={{ backgroundColor: theme.ctaPressKit }}
          >
            Press Kit
          </a>

          <button
            type="button"
            className={mobileBtnClassName}
            style={{ backgroundColor: theme.ctaRsvp }}
          >
            RSVP
          </button>
        </div>
      )}
    </section>
  );
}
