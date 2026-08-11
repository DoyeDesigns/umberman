"use client";

import { useLayoutEffect } from "react";
import type Lenis from "lenis";
import { ensureGsapScrollTrigger, gsap, ScrollTrigger } from "@/lib/gsap/client";

type LenisScrollRootProps = {
  enabled: boolean;
  children: React.ReactNode;
};

/**
 * Smooth wheel scrolling for variant 1 overlay panels (desktop only).
 * Syncs Lenis with GSAP ScrollTrigger for consistent scroll measurement.
 */
export function LenisScrollRoot({ enabled, children }: LenisScrollRootProps) {
  useLayoutEffect(() => {
    if (!enabled) return;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    let cancelled = false;

    void import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;

      ensureGsapScrollTrigger();

      const instance = new LenisCtor({
        lerp: 0.1,
        smoothWheel: true,
      });
      lenis = instance;

      instance.on("scroll", ScrollTrigger.update);

      tick = (time: number) => {
        instance.raf(time);
      };

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      lenis?.destroy();
      if (tick) gsap.ticker.remove(tick);
    };
  }, [enabled]);

  return children;
}
