"use client";

import { useTransform } from "framer-motion";
import { ScrollLinkedDiv } from "@/components/animations/ScrollLinkedDiv";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { MobileInViewReveal } from "@/components/animations/MobileInViewReveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
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
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_4.desktopQuery);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useSafeScroll({
    target: ref,
    offset: [...(isDesktop ? VARIANT_4.enterOffset : VARIANT_4.mobileEnterOffset)],
  });

  const progress = useTransform(scrollYProgress, (p) => {
    if (delay >= 1) return 0;
    return Math.min(1, Math.max(0, (p - delay) / (1 - delay)));
  });

  const opacity = useTransform(progress, [0, 0.35, 1], [0.15, 0.55, 1]);
  const blur = useTransform(progress, [0, 1], [10, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  if (variant !== 4 || reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  if (!scrollMotion) {
    return (
      <MobileInViewReveal className={className} style={style} delay={delay}>
        {children}
      </MobileInViewReveal>
    );
  }

  return (
    <div ref={ref} className={className} style={style}>
      <ScrollLinkedDiv
        staticStyle={{ willChange: "opacity, filter" }}
        motionStyle={{ opacity, filter }}
      >
        {children}
      </ScrollLinkedDiv>
    </div>
  );
}
