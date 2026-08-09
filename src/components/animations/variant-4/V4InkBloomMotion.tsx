"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBoostedScrollProgress } from "@/hooks/useScrollEnterProgress";
import { VARIANT_4 } from "@/lib/animations/config";

type V4InkBloomMotionProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function V4InkBloomMotion({
  children,
  delay = 0,
  className,
  style,
}: V4InkBloomMotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery(VARIANT_4.desktopQuery);
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: rawEnter } = useScroll({
    target: ref,
    offset: [...(isDesktop ? VARIANT_4.enterOffset : VARIANT_4.mobileEnterOffset)],
  });
  const scrollYProgress = useBoostedScrollProgress(rawEnter, ref);

  const progress = useTransform(scrollYProgress, (p) => {
    if (delay >= 1) return 0;
    return Math.min(1, Math.max(0, (p - delay) / (1 - delay)));
  });

  const opacity = useTransform(progress, [0, 0.35, 1], [0.15, 0.55, 1]);
  const filter = useTransform(progress, (p) => {
    if (isMobile) return "blur(0px)";
    return `blur(${(1 - p) * 10}px)`;
  });

  if (variant !== 4 || reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={{ opacity, filter, willChange: "opacity, filter" }}>
        {children}
      </motion.div>
    </div>
  );
}
