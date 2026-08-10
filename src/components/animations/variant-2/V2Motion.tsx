"use client";

import { useTransform } from "framer-motion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useCallback, useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { ScrollLinkedDiv } from "@/components/animations/ScrollLinkedDiv";
import { useIntroScroll, useIntroSectionRef } from "@/components/animations/IntroScrollContext";
import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";
import { MobileInViewReveal } from "@/components/animations/MobileInViewReveal";
import { V2TopExitBlur } from "@/components/animations/variant-2/V2TopExitBlur";
import { useDirectElementScroll } from "@/hooks/useDirectElementScroll";
import { useScrollEnterProgress } from "@/hooks/useScrollEnterProgress";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import { VARIANT_2, delayV2Exit } from "@/lib/animations/config";
import { applyTransformStyle } from "@/lib/animations/apply-transform-style";
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
  noBlur?: boolean;
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
  const intro = useIntroScroll();
  const sectionRef = useIntroSectionRef();
  const { useNativeScroll, useStaticFallback } = useIOSAnimationPath();
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_2.desktopQuery);
  const scrollDirection = useScrollDirection();
  const ref = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const enterProgress = useScrollEnterProgress(ref, VARIANT_2);

  const exitOffset = isDesktop
    ? VARIANT_2.exitOffset
    : VARIANT_2.mobileExitOffset;

  const { scrollYProgress: exitProgress } = useSafeScroll({
    target: ref,
    offset: [...exitOffset],
  });

  const paintDirect = useCallback(
    ({ enter, exit }: { enter: number; exit: number }) => {
      const layer = layerRef.current;
      if (!layer) return;

      const delayedEnter = Math.min(
        1,
        Math.max(0, (enter - delay) / (1 - delay || 1)),
      );
      const delayedExit = noExit ? 0 : delayV2Exit(exit);
      const transform = resolveV2Transform(
        preset,
        delayedEnter,
        exit,
        delayedExit,
      );

      if (noBlur && delayedExit <= 0.02) {
        transform.filter = resolveV2Transform(preset, delayedEnter, exit, 0).filter;
      } else if (noBlur) {
        transform.filter = "blur(0px)";
      }

      applyTransformStyle(layer, transform, { noBlur });
    },
    [delay, noBlur, noExit, preset],
  );

  useDirectElementScroll(ref, {
    enterOffset: isDesktop
      ? VARIANT_2.enterOffset
      : VARIANT_2.mobileEnterOffset,
    exitOffset,
    introSectionRef: sectionRef,
    intro,
    enabled: useNativeScroll && scrollMotion && variant === 2 && !reducedMotion,
    onUpdate: paintDirect,
  });

  const opacity = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(
      1,
      Math.max(0, (Number(enter) - delay) / (1 - delay || 1)),
    );
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).opacity;
  });

  const x = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(
      1,
      Math.max(0, (Number(enter) - delay) / (1 - delay || 1)),
    );
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).x;
  });

  const y = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(
      1,
      Math.max(0, (Number(enter) - delay) / (1 - delay || 1)),
    );
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).y;
  });

  const scale = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(
      1,
      Math.max(0, (Number(enter) - delay) / (1 - delay || 1)),
    );
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).scale;
  });

  const scaleX = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(
      1,
      Math.max(0, (Number(enter) - delay) / (1 - delay || 1)),
    );
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).scaleX;
  });

  const scaleY = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(
      1,
      Math.max(0, (Number(enter) - delay) / (1 - delay || 1)),
    );
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).scaleY;
  });

  const rotate = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(
      1,
      Math.max(0, (Number(enter) - delay) / (1 - delay || 1)),
    );
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).rotate;
  });

  const skewX = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const delayedEnter = Math.min(
      1,
      Math.max(0, (Number(enter) - delay) / (1 - delay || 1)),
    );
    const delayedExit = noExit ? 0 : delayV2Exit(Number(exit));
    return resolveV2Transform(preset, delayedEnter, Number(exit), delayedExit).skewX;
  });

  const filter = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    if (noBlur) return "blur(0px)";
    const delayedEnter = Math.min(
      1,
      Math.max(0, (Number(enter) - delay) / (1 - delay || 1)),
    );
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
        className={`relative max-w-full overflow-x-hidden ${className ?? ""}`}
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
        className={`relative max-w-full overflow-x-hidden ${className ?? ""}`}
        style={style}
      >
        <div ref={layerRef} className="will-change-[transform,opacity,filter]">
          {children}
        </div>
        {!noExit && (
          <V2TopExitBlur
            exitProgress={exitProgress}
            scrollDirection={scrollDirection}
          />
        )}
      </div>
    );
  }

  if (!scrollMotion) {
    if (intro) {
      return (
        <div className={className} style={style}>
          {children}
        </div>
      );
    }

    return (
      <MobileInViewReveal className={className} style={style} delay={delay}>
        {children}
      </MobileInViewReveal>
    );
  }

  return (
    <div
      ref={ref}
      className={`relative max-w-full overflow-x-hidden ${className ?? ""}`}
      style={style}
    >
      <ScrollLinkedDiv
        motionStyle={{
          opacity,
          x,
          y,
          scale,
          scaleX,
          scaleY,
          rotate,
          skewX,
          filter,
        }}
      >
        {children}
      </ScrollLinkedDiv>
      {!noExit && (
        <V2TopExitBlur
          exitProgress={exitProgress}
          scrollDirection={scrollDirection}
        />
      )}
    </div>
  );
}
