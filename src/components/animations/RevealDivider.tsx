"use client";

import { motion, motionValue, useTransform } from "framer-motion";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { Motion } from "@/components/animations/Motion";
import { V2Motion } from "@/components/animations/variant-2/V2Motion";
import { useScrollSectionProgress } from "@/components/animations/ScrollSectionContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { STICKY_REVEAL } from "@/lib/animations/config";

type RevealDividerProps = {
  id: string;
  className?: string;
};

export function RevealDivider({ id, className = "" }: RevealDividerProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery(STICKY_REVEAL.desktopQuery);

  const baseClassName = `hidden h-full w-px origin-top bg-ink md:col-start-2 md:row-span-2 md:row-start-1 md:block ${className}`;

  if (variant === 1 && isDesktop && !reducedMotion) {
    return <AnimatedDivider id={id} className={baseClassName} />;
  }

  if (variant === 2 && !reducedMotion) {
    return (
      <V2Motion preset="line" delay={0.06} className={baseClassName}>
        <div id={id} className="h-full w-full bg-ink" aria-hidden="true" />
      </V2Motion>
    );
  }

  if ((variant === 3 || variant === 4 || variant === 5) && !reducedMotion) {
    return (
      <Motion preset="line" beat={0} delay={0.04} className={baseClassName}>
        <div id={id} className="h-full w-full bg-ink" aria-hidden="true" />
      </Motion>
    );
  }

  return <div id={id} className={baseClassName} aria-hidden="true" />;
}

function AnimatedDivider({
  id,
  className,
}: {
  id: string;
  className: string;
}) {
  const progress = useScrollSectionProgress();
  const scaleY = useTransform(
    progress ?? motionValue(1),
    [0.35, 1],
    [0, 1],
  );

  return (
    <motion.div
      id={id}
      style={{ scaleY }}
      className={className}
      aria-hidden="true"
    />
  );
}
