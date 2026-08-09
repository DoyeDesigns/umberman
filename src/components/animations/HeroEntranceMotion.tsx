"use client";

import { motion } from "framer-motion";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getHeroEntrance,
  type IntroEntranceRole,
} from "@/lib/animations/hero-entrance";

type HeroEntranceMotionProps = {
  children: React.ReactNode;
  role: IntroEntranceRole;
  className?: string;
  style?: React.CSSProperties;
};

const SCROLL_DRIVEN_VARIANTS = new Set([2, 3, 4, 5]);

export function HeroEntranceMotion({
  children,
  role,
  className,
  style,
}: HeroEntranceMotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Static + scroll-driven variants: no mount animation (scroll layers own visibility).
  // iOS Safari often never completes filter/clip mount animations, leaving hero text blurred.
  if (variant === 0 || SCROLL_DRIVEN_VARIANTS.has(variant) || (variant === 1 && isMobile)) {
    return (
      <div className={`overflow-visible ${className ?? ""}`} style={style}>
        {children}
      </div>
    );
  }

  const frame = getHeroEntrance(variant, role, reducedMotion);

  return (
    <motion.div
      className={`overflow-visible ${className ?? ""}`}
      style={style}
      initial={frame.initial}
      animate={frame.animate}
      transition={frame.transition}
    >
      {children}
    </motion.div>
  );
}
