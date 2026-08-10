"use client";

import { useTransform } from "framer-motion";
import { ScrollLinkedDiv } from "@/components/animations/ScrollLinkedDiv";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useCallback, useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useIntroScroll, useIntroSectionRef } from "@/components/animations/IntroScrollContext";
import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";
import { MobileInViewReveal } from "@/components/animations/MobileInViewReveal";
import { useDirectElementScroll } from "@/hooks/useDirectElementScroll";
import { useScrollEnterProgress } from "@/hooks/useScrollEnterProgress";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import { VARIANT_3, delayV3Exit } from "@/lib/animations/config";
import { applySimpleStyle } from "@/lib/animations/apply-transform-style";
import { brandRgba } from "@/lib/colors";
import {
  resolveV3Transform,
  type V3Preset,
} from "@/lib/animations/variant-3/presets";

type V3MotionProps = {
  children: React.ReactNode;
  preset?: V3Preset;
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
  const sectionRef = useIntroSectionRef();
  const { useNativeScroll, useStaticFallback } = useIOSAnimationPath();
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_3.desktopQuery);
  const scrollDirection = useScrollDirection();
  const ref = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const enterProgress = useScrollEnterProgress(ref, VARIANT_3);

  const exitOffset = isDesktop
    ? VARIANT_3.exitOffset
    : VARIANT_3.mobileExitOffset;

  const { scrollYProgress: exitProgress } = useSafeScroll({
    target: ref,
    offset: [...exitOffset],
  });

  const paintDirect = useCallback(
    ({ enter, exit }: { enter: number; exit: number }) => {
      const layer = layerRef.current;
      if (!layer) return;

      const adjustedEnter = applyBeat(enter, beat, delay);
      const adjustedExit =
        noExit || scrollDirection !== "down" ? 0 : delayV3Exit(exit);
      const t = resolveV3Transform(
        preset,
        adjustedEnter,
        exit,
        adjustedExit,
      );

      applySimpleStyle(layer, {
        opacity: t.opacity,
        x: t.x,
        y: t.y,
        scale: t.scale,
        skewX: t.skewX,
        rotate: t.rotate,
        clipPath: t.clipPath,
        filter: t.filter,
        textShadow:
          t.rgbSplit < 0.5
            ? "none"
            : `${t.rgbSplit}px 0 ${brandRgba("orange", 0.85)}, ${-t.rgbSplit}px 0 ${brandRgba("navy", 0.75)}`,
      });
    },
    [beat, delay, noExit, preset, scrollDirection],
  );

  useDirectElementScroll(ref, {
    enterOffset: isDesktop
      ? VARIANT_3.enterOffset
      : VARIANT_3.mobileEnterOffset,
    exitOffset,
    introSectionRef: sectionRef,
    intro,
    enabled: useNativeScroll && scrollMotion && variant === 3 && !reducedMotion,
    onUpdate: paintDirect,
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
    return `${split}px 0 ${brandRgba("orange", 0.85)}, ${-split}px 0 ${brandRgba("navy", 0.75)}`;
  });

  if (variant !== 3 || reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  if (useStaticFallback) {
    return (
      <div className={`relative max-w-full overflow-x-hidden ${className ?? ""}`} style={style}>
        {children}
      </div>
    );
  }

  if (intro && useNativeScroll) {
    return (
      <div
        ref={ref}
        className={`relative max-w-full overflow-x-hidden overflow-y-visible ${className ?? ""}`}
        style={style}
      >
        {children}
      </div>
    );
  }

  if (useNativeScroll && scrollMotion) {
    return (
      <div
        ref={ref}
        className={`relative max-w-full overflow-x-hidden overflow-y-visible ${className ?? ""}`}
        style={style}
      >
        <div
          ref={layerRef}
          className="v3-glitch-layer overflow-visible pt-[0.08em] pb-[0.04em] will-change-[transform,opacity,filter]"
        >
          {children}
        </div>
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
      className={`relative max-w-full overflow-x-hidden overflow-y-visible ${className ?? ""}`}
      style={style}
    >
      <ScrollLinkedDiv
        className="v3-glitch-layer overflow-visible pt-[0.08em] pb-[0.04em] will-change-[transform,opacity,filter]"
        motionStyle={{
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
      </ScrollLinkedDiv>
    </div>
  );
}
