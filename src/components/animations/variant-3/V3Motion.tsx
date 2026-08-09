"use client";

import { motion, useTransform } from "framer-motion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useIntroScroll } from "@/components/animations/IntroScrollContext";
import { MobileInViewReveal } from "@/components/animations/MobileInViewReveal";
import { useScrollEnterProgress } from "@/hooks/useScrollEnterProgress";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import { VARIANT_3, delayV3Exit } from "@/lib/animations/config";
import {
  resolveV3Transform,
  type V3Preset,
} from "@/lib/animations/variant-3/presets";

type V3MotionProps = {
  children: React.ReactNode;
  preset?: V3Preset;
  /** Story beat index — delays reveal so elements read top-to-bottom. */
  beat?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  noExit?: boolean;
};

function applyBeat(progress: number, beat: number, delay: number) {
  const beatOffset = beat * VARIANT_3.beatGap;
  const combined = Math.max(beatOffset, delay);
  if (combined >= 1) return 0;
  return Math.min(1, Math.max(0, (progress - combined) / (1 - combined)));
}

export function V3Motion({
  children,
  preset = "decode",
  beat = 0,
  delay = 0,
  className,
  style,
  noExit = false,
}: V3MotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const intro = useIntroScroll();
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_3.desktopQuery);
  const scrollDirection = useScrollDirection();
  const ref = useRef<HTMLDivElement>(null);
  const enterProgress = useScrollEnterProgress(ref, VARIANT_3);

  const { scrollYProgress: exitProgress } = useSafeScroll({
    target: ref,
    offset: [...(isDesktop ? VARIANT_3.exitOffset : VARIANT_3.mobileExitOffset)],
  });

  const transform = useTransform(
    [enterProgress, exitProgress],
    ([enter, exit]) => {
      const adjustedEnter = applyBeat(Number(enter), beat, delay);
      const adjustedExit =
        noExit || scrollDirection !== "down" ? 0 : delayV3Exit(Number(exit));
      return resolveV3Transform(preset, adjustedEnter, Number(exit), adjustedExit);
    },
  );

  const opacity = useTransform(transform, (t) => t.opacity);
  const x = useTransform(transform, (t) => t.x);
  const y = useTransform(transform, (t) => t.y);
  const scale = useTransform(transform, (t) => t.scale);
  const skewX = useTransform(transform, (t) => t.skewX);
  const rotate = useTransform(transform, (t) => t.rotate);
  const clipPath = useTransform(transform, (t) => t.clipPath);
  const filter = useTransform(transform, (t) => t.filter);
  const textShadow = useTransform(transform, (t) => {
    const split = t.rgbSplit;
    if (split < 0.5) return "none";
    return `${split}px 0 rgba(215,79,36,0.85), ${-split}px 0 rgba(53,67,150,0.75)`;
  });

  if (variant !== 3 || reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  if (!scrollMotion) {
    const mobileDelay = Math.max(beat * VARIANT_3.beatGap, delay);

    if (intro) {
      return (
        <div className={className} style={style}>
          {children}
        </div>
      );
    }

    return (
      <MobileInViewReveal className={className} style={style} delay={mobileDelay}>
        {children}
      </MobileInViewReveal>
    );
  }

  return (
    <div
      ref={ref}
      className={`relative max-w-full overflow-x-clip overflow-y-visible ${className ?? ""}`}
      style={style}
    >
      <motion.div
        className="v3-glitch-layer overflow-visible pt-[0.08em] pb-[0.04em] will-change-[transform,opacity,filter]"
        style={{
          opacity,
          x,
          y,
          scale,
          skewX,
          rotate,
          clipPath,
          filter,
          textShadow,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
