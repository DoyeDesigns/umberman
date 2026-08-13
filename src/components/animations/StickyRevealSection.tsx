"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { STICKY_REVEAL } from "@/lib/animations/config";

type StickyRevealSectionProps = {
  children: React.ReactNode;
  stackIndex: number;
  passThrough?: boolean;
  /** After the sticky stack — scroll over panels (SaveTheDate). */
  elevated?: boolean;
};

/**
 * Variant 1 — stacked sticky panels (md+).
 * Reveal track is only Event → Artist; Hero and SaveTheDate scroll normally.
 */
export function StickyRevealSection({
  children,
  stackIndex,
  passThrough = false,
  elevated = false,
}: StickyRevealSectionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery(STICKY_REVEAL.desktopQuery);

  const active = variant === 1 && isDesktop && !reducedMotion && !passThrough;

  if (!active) {
    if (elevated) {
      return (
        <div className="relative isolate z-10 w-full max-w-full">{children}</div>
      );
    }

    return <>{children}</>;
  }

  return (
    <div
      className="v1-stack-panel relative md:sticky md:top-0 md:h-screen md:w-full md:overflow-hidden md:isolate"
      style={{ zIndex: stackIndex + 1 }}
    >
      {children}
    </div>
  );
}
