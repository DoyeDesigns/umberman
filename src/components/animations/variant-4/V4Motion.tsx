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
import { VARIANT_4, delayV4Exit } from "@/lib/animations/config";
import type { V2Preset } from "@/lib/animations/variant-2/presets";
import { V4InkBloomMotion } from "@/components/animations/variant-4/V4InkBloomMotion";
import { V4InkBleedText } from "@/components/animations/variant-4/V4InkBleedText";

type V4MotionProps = {
  children: React.ReactNode;
  preset?: V2Preset;
  beat?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  noExit?: boolean;
};

function applyBeat(progress: number, beat: number, delay: number) {
  const beatOffset = beat * VARIANT_4.beatGap;
  const combined = Math.max(beatOffset, delay);
  if (combined >= 1) return 0;
  return Math.min(1, Math.max(0, (progress - combined) / (1 - combined)));
}

function extractText(child: React.ReactNode): string | null {
  if (typeof child === "string") return child;
  if (
    typeof child === "object" &&
    child !== null &&
    "props" in child &&
    typeof (child as { props?: { children?: unknown } }).props?.children === "string"
  ) {
    return (child as { props: { children: string } }).props.children;
  }
  return null;
}

export function V4Motion({
  children,
  preset = "settle",
  beat = 0,
  delay = 0,
  className,
  style,
  noExit = false,
}: V4MotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const intro = useIntroScroll();
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_4.desktopQuery);
  const ref = useRef<HTMLDivElement>(null);
  const enterProgress = useScrollEnterProgress(ref, VARIANT_4);

  const { scrollYProgress: exitProgress } = useSafeScroll({
    target: ref,
    offset: [...(isDesktop ? VARIANT_4.exitOffset : VARIANT_4.mobileExitOffset)],
  });

  const lineProgress = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const enterT = applyBeat(Number(enter), beat, delay);
    const exitT = noExit ? 0 : delayV4Exit(Number(exit));
    const scaleX = preset === "line" ? enterT * (1 - exitT * 0.5) : 1;
    const opacity = preset === "line" ? enterT : enterT * (1 - exitT * 0.4);
    return { scaleX, opacity, enterT };
  });

  const scaleX = useTransform(lineProgress, (f) => f.scaleX);
  const opacity = useTransform(lineProgress, (f) => f.opacity);

  const inlineText = extractText(children);

  if (variant !== 4 || reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  if (!scrollMotion) {
    const mobileDelay = Math.max(beat * VARIANT_4.beatGap, delay);

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
          className="v4-bleed-line origin-left will-change-transform"
          style={{ scaleX, opacity }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  if (inlineText && (preset === "unfold" || preset === "settle" || preset === "shear")) {
    return (
      <V4InkBleedText
        text={inlineText}
        className={className}
        inline={preset === "unfold" || preset === "settle"}
      />
    );
  }

  return (
    <V4InkBloomMotion delay={Math.max(beat * VARIANT_4.beatGap, delay)} className={className} style={style}>
      {children}
    </V4InkBloomMotion>
  );
}
