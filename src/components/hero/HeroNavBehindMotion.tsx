"use client";

import { useTransform } from "framer-motion";
import { ScrollLinkedDiv } from "@/components/animations/ScrollLinkedDiv";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useCallback, useRef, type RefObject } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useDirectElementScroll } from "@/hooks/useDirectElementScroll";
import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { applySimpleStyle } from "@/lib/animations/apply-transform-style";
import { VARIANT_2 } from "@/lib/animations/config";
import { brandRgba } from "@/lib/colors";

type HeroNavBehindMotionProps = {
  heroRef: RefObject<HTMLElement | null>;
  children: React.ReactNode;
  lag?: number;
  className?: string;
};

function computeHide(progress: number, lag: number) {
  if (progress < 0.06) return 0;
  const start = Math.max(lag, 0.06);
  const raw = (progress - start) / (1 - start);
  const adjusted = Math.min(1, Math.max(0, raw));
  return adjusted * adjusted;
}

export function HeroNavBehindMotion({
  heroRef,
  children,
  lag = 0,
  className,
}: HeroNavBehindMotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const { useNativeScroll, useStaticFallback } = useIOSAnimationPath();
  const isDesktop = useMediaQuery(VARIANT_2.desktopQuery);
  const layerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useSafeScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const paintDirect = useCallback(
    ({ enter }: { enter: number; exit: number }) => {
      const layer = layerRef.current;
      if (!layer) return;

      const hide = computeHide(enter, lag);
      const split = hide * 14;

      applySimpleStyle(layer, {
        y: hide * (isDesktop ? 200 : 72),
        opacity: 1 - hide,
        scale: 1 - hide * (isDesktop ? 0.06 : 0.03),
        filter: `blur(${hide * (isDesktop ? 5 : 3)}px)`,
        zIndex: hide < 0.04 ? 30 : 1,
        skewX: variant === 3 ? hide * 6 : 0,
        textShadow:
          variant === 3
            ? `${split}px 0 ${brandRgba("orange", 0.75)}, ${-split}px 0 ${brandRgba("navy", 0.7)}`
            : "none",
      });
    },
    [isDesktop, lag, variant],
  );

  useDirectElementScroll(heroRef, {
    enterOffset: ["start start", "end start"],
    intro: false,
    enabled:
      useNativeScroll &&
      !reducedMotion &&
      (variant === 2 || variant === 3),
    onUpdate: paintDirect,
  });

  const hide = useTransform(scrollYProgress, (progress) =>
    computeHide(Number(progress), lag),
  );

  const y = useTransform(hide, (t) => t * (isDesktop ? 200 : 72));
  const zIndex = useTransform(hide, (t): number => (t < 0.04 ? 30 : 1));
  const opacity = useTransform(hide, (t) => 1 - t);
  const scale = useTransform(hide, (t) => 1 - t * (isDesktop ? 0.06 : 0.03));
  const filter = useTransform(hide, (t) => `blur(${t * (isDesktop ? 5 : 3)}px)`);
  const skewX = useTransform(hide, (t) => t * (variant === 3 ? 6 : 0));
  const textShadow = useTransform(hide, (t) => {
    if (variant !== 3) return "none";
    const split = t * 14;
    return `${split}px 0 ${brandRgba("orange", 0.75)}, ${-split}px 0 ${brandRgba("navy", 0.7)}`;
  });

  if (reducedMotion || (variant !== 2 && variant !== 3)) {
    return (
      <div className={`relative z-20 ${className ?? ""}`}>{children}</div>
    );
  }

  if (useStaticFallback) {
    return (
      <div className={`relative z-20 ${className ?? ""}`}>{children}</div>
    );
  }

  if (useNativeScroll) {
    return (
      <div
        ref={layerRef}
        className={`relative ${className ?? ""}`}
        style={{ willChange: "transform, opacity, filter" }}
      >
        {children}
      </div>
    );
  }

  return (
    <ScrollLinkedDiv
      className={`relative ${className ?? ""}`}
      staticStyle={{ willChange: "transform, opacity, filter" }}
      motionStyle={{
        y,
        opacity,
        scale,
        filter,
        zIndex,
        skewX,
        textShadow,
      }}
    >
      {children}
    </ScrollLinkedDiv>
  );
}
