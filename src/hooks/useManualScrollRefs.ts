"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { computeElementScrollProgress } from "@/lib/animations/scroll-progress";

type ScrollProgressRefs = {
  enter: number;
  exit: number;
};

type UseManualScrollRefsOptions = {
  enterOffset: readonly [string, string];
  exitOffset: readonly [string, string];
  enabled?: boolean;
  onUpdate?: (values: ScrollProgressRefs) => void;
};

/**
 * iPhone-safe scroll progress into plain refs — no Framer MotionValues.
 */
export function useManualScrollRefs(
  targetRef: RefObject<HTMLElement | null>,
  {
    enterOffset,
    exitOffset,
    enabled = true,
    onUpdate,
  }: UseManualScrollRefsOptions,
) {
  const enterRef = useRef(0);
  const exitRef = useRef(0);
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useLayoutEffect(() => {
    if (!enabled) return;

    let rafId = 0;
    let attempts = 0;
    let cancelled = false;

    const measure = (): ScrollProgressRefs | null => {
      const target = targetRef.current;
      if (!target) return null;

      const vh = window.innerHeight || document.documentElement.clientHeight;
      const rect = target.getBoundingClientRect();

      return {
        enter: computeElementScrollProgress(
          rect,
          vh,
          enterOffset[0],
          enterOffset[1],
        ),
        exit: computeElementScrollProgress(
          rect,
          vh,
          exitOffset[0],
          exitOffset[1],
        ),
      };
    };

    const paint = () => {
      const values = measure();
      if (!values) return;
      enterRef.current = values.enter;
      exitRef.current = values.exit;
      onUpdateRef.current?.(values);
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

    const onMove = () => schedulePaint();

    tryAttach();
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.visualViewport?.addEventListener("scroll", onMove);
    window.visualViewport?.addEventListener("resize", onMove);
    window.addEventListener("load", schedulePaint);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("touchmove", onMove);
      window.visualViewport?.removeEventListener("scroll", onMove);
      window.visualViewport?.removeEventListener("resize", onMove);
      window.removeEventListener("load", schedulePaint);
    };
  }, [enabled, enterOffset, exitOffset, targetRef]);

  return { enterRef, exitRef };
}
