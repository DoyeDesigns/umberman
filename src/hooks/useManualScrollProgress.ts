"use client";

import {
  useMotionValue,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { framerOffsetToScrollTrigger } from "@/lib/animations/offset-to-scroll-trigger";
import { computePageScrollProgress } from "@/lib/animations/scroll-progress";
import { ensureGsapScrollTrigger, ScrollTrigger } from "@/lib/gsap/client";

function readPageProgress(): number {
  return computePageScrollProgress();
}

/**
 * Cross-browser scroll progress via GSAP ScrollTrigger (reliable on iPhone).
 */
export function useManualScrollProgress(
  options: UseScrollOptions = {},
): { scrollYProgress: MotionValue<number> } {
  const progress = useMotionValue(0);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useLayoutEffect(() => {
    ensureGsapScrollTrigger();

    let cancelled = false;
    let trigger: ScrollTrigger | undefined;
    let rafId = 0;

    const applyPageProgress = () => {
      progress.set(readPageProgress());
    };

    const attach = () => {
      if (cancelled) return;

      const opts = optionsRef.current;
      const element =
        opts.target &&
        typeof opts.target === "object" &&
        "current" in opts.target
          ? opts.target.current
          : null;

      trigger?.kill();
      trigger = undefined;

      if (element) {
        const offset = opts.offset ?? ["start end", "end start"];
        const { start, end } = framerOffsetToScrollTrigger(
          String(offset[0]),
          String(offset[1]),
        );

        trigger = ScrollTrigger.create({
          trigger: element,
          start,
          end,
          invalidateOnRefresh: true,
          onUpdate: (self) => progress.set(self.progress),
        });

        progress.set(trigger.progress);
        ScrollTrigger.refresh();
        return;
      }

      applyPageProgress();
      const onScroll = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          applyPageProgress();
        });
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      window.visualViewport?.addEventListener("resize", onScroll);
      window.visualViewport?.addEventListener("scroll", onScroll);

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        window.visualViewport?.removeEventListener("resize", onScroll);
        window.visualViewport?.removeEventListener("scroll", onScroll);
        if (rafId) cancelAnimationFrame(rafId);
      };
    };

    let detachPage: (() => void) | undefined;
    let attempts = 0;

    const tryAttach = () => {
      if (cancelled) return;
      detachPage?.();
      detachPage = attach() ?? undefined;

      const needsElement =
        optionsRef.current.target &&
        typeof optionsRef.current.target === "object" &&
        "current" in optionsRef.current.target;

      if (
        needsElement &&
        !optionsRef.current.target?.current &&
        attempts < 120
      ) {
        attempts += 1;
        rafId = requestAnimationFrame(tryAttach);
      }
    };

    tryAttach();

    const onRefresh = () => {
      if (trigger) progress.set(trigger.progress);
      else applyPageProgress();
    };

    ScrollTrigger.addEventListener("refreshInit", onRefresh);
    window.addEventListener("load", onRefresh);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      detachPage?.();
      trigger?.kill();
      ScrollTrigger.removeEventListener("refreshInit", onRefresh);
      window.removeEventListener("load", onRefresh);
    };
  }, [progress]);

  return { scrollYProgress: progress };
}
