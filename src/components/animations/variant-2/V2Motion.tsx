"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { V2TopExitBlur } from "@/components/animations/variant-2/V2TopExitBlur";
import { useScrollEnterProgress } from "@/hooks/useScrollEnterProgress";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { VARIANT_2, delayV2Exit } from "@/lib/animations/config";
import {
  resolveV2Transform,
  type V2Preset,
} from "@/lib/animations/variant-2/presets";

type V2MotionProps = {
  children: React.ReactNode;
  preset?: V2Preset;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Skip enter blur — keeps CTAs sharp when revealed. */
  noBlur?: boolean;
  /** Skip top-edge exit fade/blur — for bottom CTAs still in view. */
  noExit?: boolean;
};

export function V2Motion({
  children,
  preset = "settle",
  delay = 0,
  className,
  style,
  noBlur = false,
  noExit = false,
}: V2MotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery(VARIANT_2.desktopQuery);
  const scrollDirection = useScrollDirection();
  const ref = useRef<HTMLDivElement>(null);
  const enterProgress = useScrollEnterProgress(ref, VARIANT_2);

  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: [...(isDesktop ? VARIANT_2.exitOffset : VARIANT_2.mobileExitOffset)],
  });

  const opacity = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(1, Math.max(0, (Number(enter) - delay) / (1 - delay || 1)));
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).opacity;
  });

  const x = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(1, Math.max(0, (Number(enter) - delay) / (1 - delay || 1)));
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).x;
  });

  const y = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(1, Math.max(0, (Number(enter) - delay) / (1 - delay || 1)));
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).y;
  });

  const scale = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(1, Math.max(0, (Number(enter) - delay) / (1 - delay || 1)));
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).scale;
  });

  const scaleX = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(1, Math.max(0, (Number(enter) - delay) / (1 - delay || 1)));
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).scaleX;
  });

  const scaleY = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(1, Math.max(0, (Number(enter) - delay) / (1 - delay || 1)));
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).scaleY;
  });

  const rotate = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(1, Math.max(0, (Number(enter) - delay) / (1 - delay || 1)));
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).rotate;
  });

  const skewX = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(1, Math.max(0, (Number(enter) - delay) / (1 - delay || 1)));
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).skewX;
  });

  const filter = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    if (noBlur) return "blur(0px)";
    const delayedEnter = Math.min(1, Math.max(0, (Number(enter) - delay) / (1 - delay || 1)));
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    if (delayedExit > 0.02) return "blur(0px)";
    return resolveV2Transform(preset, delayedEnter, Number(exit), 0).filter;
  });

  if (variant !== 2 || reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative max-w-full overflow-x-clip ${className ?? ""}`} style={style}>
      <motion.div
        style={{
          opacity,
          x,
          y,
          scale,
          scaleX,
          scaleY,
          rotate,
          skewX,
          filter,
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </motion.div>
      {!noExit && (
        <V2TopExitBlur
          exitProgress={exitProgress}
          scrollDirection={scrollDirection}
        />
      )}
    </div>
  );
}
