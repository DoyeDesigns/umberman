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
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import { VARIANT_5, delayV5Exit } from "@/lib/animations/config";
import type { V2Preset } from "@/lib/animations/variant-2/presets";

type V5FoldMode = "top" | "left" | "right" | "hero";

type V5FoldMotionProps = {
  children: React.ReactNode;
  preset?: V2Preset;
  beat?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  noExit?: boolean;
  foldMode?: V5FoldMode;
};

function applyBeat(progress: number, beat: number, delay: number) {
  const beatOffset = beat * VARIANT_5.beatGap;
  const combined = Math.max(beatOffset, delay);
  if (combined >= 1) return 0;
  return Math.min(1, Math.max(0, (progress - combined) / (1 - combined)));
}

export function V5FoldMotion({
  children,
  preset = "settle",
  beat = 0,
  delay = 0,
  className,
  style,
  noExit = false,
  foldMode = "top",
}: V5FoldMotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const intro = useIntroScroll();
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_5.desktopQuery);
  const ref = useRef<HTMLDivElement>(null);
  const enterProgress = useScrollEnterProgress(ref, VARIANT_5);

  const { scrollYProgress: exitProgress } = useSafeScroll({
    target: ref,
    offset: [...(isDesktop ? VARIANT_5.exitOffset : VARIANT_5.mobileExitOffset)],
  });

  const resolvedFold: V5FoldMode =
    foldMode !== "top"
      ? foldMode
      : preset === "drift-left"
        ? "left"
        : preset === "drift-right"
          ? "right"
          : "top";

  const frame = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const enterT = applyBeat(Number(enter), beat, delay);
    const exitT = noExit ? 0 : delayV5Exit(Number(exit));
    const t = enterT * (1 - exitT * 0.35);
    const e = 1 - t;

    if (preset === "line") {
      return {
        rotateX: 0,
        rotateY: 0,
        opacity: t > 0.72 ? 1 : t * 0.4,
        crease: t > 0.72 ? 0 : 0.35 * (1 - t),
        seam: t > 0.68 ? 1 : 0,
      };
    }

    if (resolvedFold === "left") {
      return {
        rotateX: 0,
        rotateY: e * -VARIANT_5.foldAngleY,
        opacity: t,
        crease: e * 0.45,
        seam: 0,
      };
    }

    if (resolvedFold === "right") {
      return {
        rotateX: 0,
        rotateY: e * VARIANT_5.foldAngleY,
        opacity: t,
        crease: e * 0.45,
        seam: 0,
      };
    }

    return {
      rotateX: e * -VARIANT_5.foldAngleX,
      rotateY: 0,
      opacity: t,
      crease: e * 0.5,
      seam: 0,
    };
  });

  const rotateX = useTransform(frame, (f) => f.rotateX);
  const rotateY = useTransform(frame, (f) => f.rotateY);
  const opacity = useTransform(frame, (f) => f.opacity);
  const creaseOpacity = useTransform(frame, (f) => f.crease);
  const seamOpacity = useTransform(frame, (f) => f.seam);

  if (variant !== 5 || reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  if (!scrollMotion) {
    const mobileDelay = Math.max(beat * VARIANT_5.beatGap, delay);

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

  if (preset === "line") {
    return (
      <div ref={ref} className={className} style={style}>
        <motion.div
          className="v5-seam-divider relative h-full w-full"
          style={{ opacity: seamOpacity }}
          aria-hidden
        >
          <div className="absolute inset-y-0 left-0 w-px bg-ink" />
          <div className="absolute inset-y-0 left-[3px] w-px bg-ink/40" />
        </motion.div>
      </div>
    );
  }

  const origin =
    resolvedFold === "left"
      ? "center left"
      : resolvedFold === "right"
        ? "center right"
        : "top center";

  return (
    <div
      ref={ref}
      className={`relative ${className ?? ""}`}
      style={{ perspective: 900, ...style }}
    >
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          opacity,
          transformOrigin: origin,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        {children}
        <motion.div
          aria-hidden
          className="v5-fold-crease pointer-events-none absolute inset-x-0 top-0 h-6"
          style={{ opacity: creaseOpacity }}
        />
      </motion.div>
    </div>
  );
}
