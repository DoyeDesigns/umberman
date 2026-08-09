"use client";

import { Children, isValidElement, useEffect, useRef, type ReactElement } from "react";
import { AnimationVariantProvider } from "@/components/animations/AnimationVariantProvider";
import { StickyRevealProgressProvider } from "@/components/animations/StickyRevealProgressContext";
import { StickyRevealSection } from "@/components/animations/StickyRevealSection";
import { V3TransmissionOverlay } from "@/components/animations/variant-3/V3TransmissionOverlay";
import { V4PaperGrain } from "@/components/animations/variant-4/V4PaperGrain";
import { ensureGsapScrollTrigger, ScrollTrigger } from "@/lib/gsap/client";
import type { AnimationVariant } from "@/lib/animations/config";

/** Sections that sit flush against the next panel (natural height, no h-screen gap). */
const COMPACT_SECTIONS = new Set([1]);

type AnimatedPageProps = {
  variant: AnimationVariant;
  children: React.ReactNode;
};

export function AnimatedPage({ variant, children }: AnimatedPageProps) {
  const sections = Children.toArray(children).filter(isValidElement);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (variant < 2) return;
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
        <StickyRevealProgressProvider>
          <main className="w-full max-w-full overflow-x-clip">
            {sections.map((section, index) => (
              <StickyRevealSection
                key={(section as ReactElement).key ?? index}
                index={index}
                isLast={index === sections.length - 1}
                compact={COMPACT_SECTIONS.has(index)}
              >
                {section}
              </StickyRevealSection>
            ))}
          </main>
        </StickyRevealProgressProvider>
      </AnimationVariantProvider>
    );
  }

  return (
    <AnimationVariantProvider variant={variant}>
      <main
        ref={mainRef}
        className="relative w-full max-w-full overflow-x-clip"
      >
        {variant === 3 && <V3TransmissionOverlay targetRef={mainRef} />}
        {variant === 4 && <V4PaperGrain targetRef={mainRef} />}
        {children}
      </main>
    </AnimationVariantProvider>
  );
}
