"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { computeElementScrollProgress } from "@/lib/animations/scroll-progress";

type DirectScrollValues = {
  enter: number;
  exit: number;
};

type UseDirectElementScrollOptions = {
  enterOffset: readonly [string, string];
  exitOffset?: readonly [string, string];
  introSectionRef?: RefObject<HTMLElement | null> | null;
  intro?: boolean;
  enabled?: boolean;
  onUpdate: (values: DirectScrollValues) => void;
};

/**
 * Scroll progress via getBoundingClientRect — reliable on iPhone WebKit.
 * No Framer MotionValues, no GSAP ScrollTrigger.
 */
export function useDirectElementScroll(
  targetRef: RefObject<HTMLElement | null>,
  {
    enterOffset,
    exitOffset,
    introSectionRef,
    intro = false,
    enabled = true,
    onUpdate,
  }: UseDirectElementScrollOptions,
) {
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useLayoutEffect(() => {
    if (!enabled) return;

    let rafId = 0;
    let attempts = 0;
    let cancelled = false;

    const measure = () => {
      const target = targetRef.current;
      if (!target) return null;

      const vh = window.innerHeight || document.documentElement.clientHeight;
      const enter = computeElementScrollProgress(
        target.getBoundingClientRect(),
        vh,
        enterOffset[0],
        enterOffset[1],
      );

      let exit = 0;
      if (exitOffset) {
        exit = computeElementScrollProgress(
          target.getBoundingClientRect(),
          vh,
          exitOffset[0],
          exitOffset[1],
        );
      }

      let adjustedEnter = enter;
      if (intro && introSectionRef?.current) {
        const section = computeElementScrollProgress(
          introSectionRef.current.getBoundingClientRect(),
          vh,
          "start start",
          "end start",
        );
        if (section < 0.1) {
          adjustedEnter = Math.max(enter, 1);
        }
      }

      return { enter: adjustedEnter, exit };
    };

    const paint = () => {
      const values = measure();
      if (values) onUpdateRef.current(values);
    };

    const schedulePaint = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        paint();
      });
    };

    const tryAttach = () => {
      if (cancelled) return;
      if (!targetRef.current) {
        if (attempts < 120) {
          attempts += 1;
          rafId = requestAnimationFrame(tryAttach);
        }
        return;
      }
      paint();
    };

    const onScroll = () => schedulePaint();

    tryAttach();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.visualViewport?.addEventListener("scroll", onScroll);
    window.visualViewport?.addEventListener("resize", onScroll);
    window.addEventListener("load", schedulePaint);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("scroll", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
      window.removeEventListener("load", schedulePaint);
    };
  }, [enabled, intro, enterOffset, exitOffset, introSectionRef, targetRef]);
}
