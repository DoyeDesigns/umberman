"use client";

import { Children, isValidElement, useEffect, useRef, type CSSProperties, type ReactElement } from "react";
import { AnimationVariantProvider } from "@/components/animations/AnimationVariantProvider";
import { LenisScrollRoot } from "@/components/animations/LenisScrollRoot";
import { StickyRevealSection } from "@/components/animations/StickyRevealSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ensureGsapScrollTrigger, ScrollTrigger } from "@/lib/gsap/client";
import { STICKY_REVEAL, type AnimationVariant } from "@/lib/animations/config";

/**
 * Variant 1 — sections that scroll normally (no sticky stack reveal).
 * 0 Hero, 3 SaveTheDate. Reveal only between Event (1) and Artist (2).
 */
const V1_PASS_THROUGH_SECTIONS = new Set([0, 3]);

type AnimatedPageProps = {
  variant: AnimationVariant;
  children: React.ReactNode;
};

export function AnimatedPage({ variant, children }: AnimatedPageProps) {
  const mainRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery(STICKY_REVEAL.desktopQuery);
  const sections = Children.toArray(children).filter(isValidElement);

  const stickyRevealActive =
    variant === 1 && isDesktop && !reducedMotion;

  useEffect(() => {
    if (variant !== 2) return;
    ensureGsapScrollTrigger();
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);
    const id = window.setTimeout(refresh, 350);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(id);
    };
  }, [variant]);

  if (variant === 1) {
    return (
      <AnimationVariantProvider variant={variant}>
        <LenisScrollRoot enabled={stickyRevealActive} syncGsap={false}>
          <main className="relative w-full max-w-full overflow-x-clip">
            {renderV1Sections(sections, stickyRevealActive)}
          </main>
        </LenisScrollRoot>
      </AnimationVariantProvider>
    );
  }

  return (
    <AnimationVariantProvider variant={variant}>
      <main ref={mainRef} className="relative w-full max-w-full">
        {children}
      </main>
    </AnimationVariantProvider>
  );
}

function renderV1Sections(sections: ReactElement[], stickyRevealActive: boolean) {
  const nodes: ReactElement[] = [];
  let index = 0;
  let stackIndex = 0;

  while (index < sections.length) {
    const section = sections[index];

    if (V1_PASS_THROUGH_SECTIONS.has(index)) {
      const followsStickyStack =
        stickyRevealActive &&
        index > 0 &&
        !V1_PASS_THROUGH_SECTIONS.has(index - 1);

      nodes.push(
        <StickyRevealSection
          key={(section.key as string | number | undefined) ?? index}
          stackIndex={-1}
          passThrough
          elevated={followsStickyStack}
        >
          {section}
        </StickyRevealSection>,
      );
      index += 1;
      continue;
    }

    const stickyRun: { section: ReactElement; pageIndex: number; stackIndex: number }[] =
      [];

    while (index < sections.length && !V1_PASS_THROUGH_SECTIONS.has(index)) {
      stickyRun.push({
        section: sections[index],
        pageIndex: index,
        stackIndex,
      });
      stackIndex += 1;
      index += 1;
    }

    const panelCount = stickyRun.length;

    nodes.push(
      <div
        key={`v1-track-${stickyRun[0]?.pageIndex ?? index}`}
        className={
          stickyRevealActive && panelCount > 0
            ? "v1-reveal-track relative w-full"
            : "relative w-full"
        }
        style={
          stickyRevealActive && panelCount > 0
            ? ({ "--v1-panel-count": panelCount } as CSSProperties)
            : undefined
        }
      >
        {stickyRun.map(({ section: stickySection, pageIndex, stackIndex: si }) => (
          <StickyRevealSection
            key={(stickySection.key as string | number | undefined) ?? pageIndex}
            stackIndex={si}
            passThrough={false}
          >
            {stickySection}
          </StickyRevealSection>
        ))}
      </div>,
    );
  }

  return nodes;
}
