"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { V1EnterMotion } from "@/components/animations/V1EnterMotion";
import { V2Motion } from "@/components/animations/variant-2/V2Motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealDividerProps = {
  id: string;
  className?: string;
};

export function RevealDivider({ id, className = "" }: RevealDividerProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();

  const baseClassName = `hidden h-full w-px origin-top bg-ink md:col-start-2 md:row-span-2 md:row-start-1 md:block ${className}`;

  if (variant === 2 && !reducedMotion) {
    return (
      <V2Motion preset="line" delay={0.06} className={baseClassName}>
        <div id={id} className="h-full w-full bg-ink" aria-hidden="true" />
      </V2Motion>
    );
  }

  if (variant === 1 && !reducedMotion) {
    return (
      <V1EnterMotion animation="scale-up" delay={0.06} className={baseClassName}>
        <div id={id} className="h-full w-full bg-ink" aria-hidden="true" />
      </V1EnterMotion>
    );
  }

  return <div id={id} className={baseClassName} aria-hidden="true" />;
}
