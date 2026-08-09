"use client";

import {
  useMotionValue,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import {
  computeElementScrollProgress,
  computePageScrollProgress,
} from "@/lib/animations/scroll-progress";

function readProgress(options: UseScrollOptions): number {
  const target = options.target;

  if (
    target &&
    typeof target === "object" &&
    "current" in target &&
    target.current
  ) {
    const rect = target.current.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const offset = options.offset ?? ["start end", "end start"];
    const start = String(offset[0]);
    const end = String(offset[1]);
    return computeElementScrollProgress(rect, viewportHeight, start, end);
  }

  return computePageScrollProgress();
}

/**
 * JS scroll progress for iOS WebKit — Framer's ScrollTimeline path leaves
 * scroll-linked opacity stuck at 0 on iPhone (motion#3559).
 */
export function useManualScrollProgress(
  options: UseScrollOptions = {},
): { scrollYProgress: MotionValue<number> } {
  const progress = useMotionValue(0);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useLayoutEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      progress.set(readProgress(optionsRef.current));
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener("resize", schedule);
    visualViewport?.addEventListener("scroll", schedule);

    let resizeObserver: ResizeObserver | undefined;
    const element = optionsRef.current.target?.current;
    if (element && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(element);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      visualViewport?.removeEventListener("resize", schedule);
      visualViewport?.removeEventListener("scroll", schedule);
      resizeObserver?.disconnect();
    };
  }, [progress]);

  return { scrollYProgress: progress };
}
