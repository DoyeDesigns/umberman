"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type RefObject } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { VARIANT_2 } from "@/lib/animations/config";

type HeroNavBehindMotionProps = {
  heroRef: RefObject<HTMLElement | null>;
  children: React.ReactNode;
  lag?: number;
  className?: string;
};

export function HeroNavBehindMotion({
  heroRef,
  children,
  lag = 0,
  className,
}: HeroNavBehindMotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery(VARIANT_2.desktopQuery);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const hide = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.06) return 0;
    const start = Math.max(lag, 0.06);
    const raw = (progress - start) / (1 - start);
    const adjusted = Math.min(1, Math.max(0, raw));
    return adjusted * adjusted;
  });

  const y = useTransform(hide, (t) => t * (isDesktop ? 200 : 72));
  const zIndex = useTransform(hide, (t) => (t < 0.04 ? 30 : 1));
  const opacity = useTransform(hide, (t) => 1 - t);
  const scale = useTransform(hide, (t) => 1 - t * (isDesktop ? 0.06 : 0.03));
  const filter = useTransform(hide, (t) => `blur(${t * (isDesktop ? 5 : 3)}px)`);
  const skewX = useTransform(hide, (t) => t * (variant === 3 ? 6 : 0));
  const textShadow = useTransform(hide, (t) => {
    if (variant !== 3) return "none";
    const split = t * 14;
    return `${split}px 0 rgba(215,79,36,0.75), ${-split}px 0 rgba(53,67,150,0.7)`;
  });

  if (reducedMotion || (variant !== 2 && variant !== 3) || !isDesktop) {
    return (
      <div className={`relative z-20 ${className ?? ""}`}>{children}</div>
    );
  }

  return (
    <motion.div
      className={`relative ${className ?? ""}`}
      style={{
        y,
        opacity,
        scale,
        filter,
        zIndex,
        skewX,
        textShadow,
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </motion.div>
  );
}
