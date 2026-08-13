"use client";

import { useLayoutEffect } from "react";
import type Lenis from "lenis";
import { ensureGsapScrollTrigger, gsap, ScrollTrigger } from "@/lib/gsap/client";

type LenisScrollRootProps = {
  enabled: boolean;
  children: React.ReactNode;
  /** When false, Lenis runs without GSAP ScrollTrigger (variant 1 sticky stack). */
  syncGsap?: boolean;
};

/**
 * Smooth wheel scrolling for variant 1 overlay panels (desktop only).
 * Syncs Lenis with GSAP ScrollTrigger when `syncGsap` is true.
 */
export function LenisScrollRoot({
  enabled,
  children,
  syncGsap = true,
}: LenisScrollRootProps) {
  useLayoutEffect(() => {
    if (!enabled) return;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    let rafId = 0;
    let cancelled = false;

    void import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;

      if (syncGsap) ensureGsapScrollTrigger();

      const instance = new LenisCtor({
        lerp: 0.1,
        smoothWheel: true,
      });
      lenis = instance;

      if (syncGsap) {
        instance.on("scroll", ScrollTrigger.update);

        tick = (time: number) => {
          instance.raf(time);
        };

        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        ScrollTrigger.refresh();
      } else {
        const loop = (time: number) => {
          if (cancelled) return;
          instance.raf(time);
          rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
      }
    });

    return () => {
      cancelled = true;
      lenis?.destroy();
      if (tick) gsap.ticker.remove(tick);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled, syncGsap]);

  return children;
}
