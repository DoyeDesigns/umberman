"use client";

import { motion, useTransform } from "framer-motion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import type { RefObject } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type V3TransmissionOverlayProps = {
  targetRef: RefObject<HTMLElement | null>;
};

export function V3TransmissionOverlay({ targetRef }: V3TransmissionOverlayProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useSafeScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 0.07, 0.07, 0]);
  const y = useTransform(scrollYProgress, (p) => `${(p * 120) % 6}px`);

  if (variant !== 3 || reducedMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="v3-transmission-overlay pointer-events-none fixed inset-0 z-40 mix-blend-multiply"
      style={{ opacity, y }}
    />
  );
}
