"use client";

import { motion, motionValue, useTransform } from "framer-motion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useEffect, useMemo, useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { ScrollSectionProvider } from "@/components/animations/ScrollSectionContext";
import { useStickyRevealProgress } from "@/components/animations/StickyRevealProgressContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { STICKY_REVEAL } from "@/lib/animations/config";

type StickyRevealSectionProps = {
  children: React.ReactNode;
  index: number;
  isLast?: boolean;
  compact?: boolean;
};

function combineEnterExit(
  enter: number,
  exit: number,
  skipEnter: boolean,
) {
  const { opacityFrom, opacityTo, scaleFrom, scaleTo } = STICKY_REVEAL;

  const enterOpacity = skipEnter
    ? 1
    : opacityFrom + enter * (opacityTo - opacityFrom);
  const enterScale = skipEnter ? 1 : scaleFrom + enter * (scaleTo - scaleFrom);
  const exitOpacity = 1 - exit;
  const exitScale = 1 - exit * (1 - scaleFrom);

  return {
    opacity: Math.min(enterOpacity, exitOpacity),
    scale: Math.min(enterScale, exitScale),
  };
}

export function StickyRevealSection({
  children,
  index,
  isLast = false,
  compact = false,
}: StickyRevealSectionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery(STICKY_REVEAL.desktopQuery);
  const containerRef = useRef<HTMLDivElement>(null);
  const { register, unregister, getProgress, version } =
    useStickyRevealProgress();

  const active = variant === 1 && isDesktop && !reducedMotion;
  const tracksScroll = index > 0;

  const { scrollYProgress } = useSafeScroll({
    target: containerRef,
    offset: [...STICKY_REVEAL.scrollOffset],
  });

  useEffect(() => {
    if (!active || !tracksScroll) return;
    register(index, scrollYProgress);
    return () => unregister(index);
  }, [active, tracksScroll, index, register, scrollYProgress, unregister]);

  const enterProgress = tracksScroll ? scrollYProgress : motionValue(1);

  const exitProgress = useMemo(
    () => getProgress(index + 1) ?? motionValue(0),
    [getProgress, index, version],
  );

  const opacity = useTransform([enterProgress, exitProgress], ([enter, exit]) =>
    combineEnterExit(Number(enter), Number(exit), index === 0).opacity,
  );

  const scale = useTransform([enterProgress, exitProgress], ([enter, exit]) =>
    combineEnterExit(Number(enter), Number(exit), index === 0).scale,
  );

  const visibility = useTransform(exitProgress, (exit) =>
    exit >= 0.99 ? "hidden" : "visible",
  );

  if (!active) {
    return <>{children}</>;
  }

  if (index === 0) {
    return (
      <motion.div
        style={{ opacity, scale, visibility }}
        className="relative md:h-screen md:overflow-hidden"
      >
        {children}
      </motion.div>
    );
  }

  if (compact) {
    return (
      <div
        ref={containerRef}
        className="relative md:h-screen"
        style={{ zIndex: index + 1 }}
      >
        <div className="md:sticky md:top-0">
          <ScrollSectionProvider progress={scrollYProgress}>
            <motion.div
              style={{ opacity, scale, visibility }}
              className="origin-top will-change-transform"
            >
              {children}
            </motion.div>
          </ScrollSectionProvider>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative md:h-[200vh]"
        style={{ zIndex: index + 1 }}
      >
        <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden">
          <ScrollSectionProvider progress={scrollYProgress}>
            <motion.div
              style={{ opacity, scale, visibility }}
              className="h-full origin-top will-change-transform"
            >
              {children}
            </motion.div>
          </ScrollSectionProvider>
        </div>
      </div>
      {isLast ? (
        <div
          className="pointer-events-none md:h-screen"
          aria-hidden="true"
          style={{ zIndex: index + 1 }}
        />
      ) : null}
    </>
  );
}
