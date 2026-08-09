"use client";

import {
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { useEffect, useLayoutEffect } from "react";
import { useIntroScroll, useIntroSectionRef } from "@/components/animations/IntroScrollContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { INTRO_SCROLL } from "@/lib/animations/config";

type BoostOptions = {
  intro?: boolean;
  sectionRef?: React.RefObject<HTMLElement | null> | null;
};

function kickScrollMeasurement() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("scroll"));
  requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
}

function sectionPinnedToTop(el: HTMLElement | null) {
  if (!el) return false;
  const top = el.getBoundingClientRect().top;
  return top <= 12;
}

/** Prevent iOS Safari from leaving scroll progress at 0 while content is on screen. */
export function useBoostedScrollProgress(
  rawProgress: MotionValue<number>,
  targetRef: React.RefObject<HTMLElement | null>,
  options?: BoostOptions,
): MotionValue<number> {
  const introFromContext = useIntroScroll();
  const sectionFromContext = useIntroSectionRef();
  const intro = options?.intro ?? introFromContext;
  const sectionRef = options?.sectionRef ?? sectionFromContext;
  const isMobile = useIsMobile();
  const introBoost = useMotionValue(0);
  const visibilityBoost = useMotionValue(0);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef ?? targetRef,
    offset: ["start start", "end start"],
  });

  useLayoutEffect(() => {
    kickScrollMeasurement();
  }, []);

  useEffect(() => {
    kickScrollMeasurement();
    const timer = window.setTimeout(kickScrollMeasurement, 160);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionEl = sectionRef?.current ?? null;
    const targetEl = targetRef.current;

    const syncIntro = () => {
      introBoost.set(intro && sectionPinnedToTop(sectionEl) ? 1 : 0);
    };

    const syncVisibility = () => {
      if (!targetEl) {
        visibilityBoost.set(0);
        return;
      }
      const rect = targetEl.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const visible =
        rect.bottom > 0 &&
        rect.top < vh &&
        rect.height > 0 &&
        (Math.min(rect.bottom, vh) - Math.max(rect.top, 0)) / Math.min(rect.height, vh) >
          0.12;
      visibilityBoost.set(visible ? 1 : 0);
    };

    const sync = () => {
      syncIntro();
      syncVisibility();
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    const timer = window.setTimeout(sync, 180);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.clearTimeout(timer);
    };
  }, [intro, introBoost, sectionRef, targetRef, visibilityBoost]);

  return useTransform(
    [rawProgress, sectionProgress, introBoost, visibilityBoost],
    ([enter, section, introPinned, visible]) => {
      let value = Number(enter);
      if (!Number.isFinite(value)) value = 0;

      if (intro && Number(introPinned) > 0.5) {
        value = Math.max(value, 1);
      } else if (
        isMobile &&
        Number(visible) > 0.5 &&
        Number(section) < 0.2 &&
        value < 0.12
      ) {
        value = Math.max(value, 0.88);
      }

      return value;
    },
  );
}

type VariantScrollConfig = {
  desktopQuery: string;
  enterOffset: readonly [string, string];
  mobileEnterOffset: readonly [string, string];
};

/** Standard variant enter scroll, with intro + iOS visibility fallbacks. */
export function useScrollEnterProgress(
  targetRef: React.RefObject<HTMLElement | null>,
  variantConfig: VariantScrollConfig,
): MotionValue<number> {
  const isDesktop = useMediaQuery(variantConfig.desktopQuery);
  const intro = useIntroScroll();

  const offset = (intro
    ? isDesktop
      ? [...INTRO_SCROLL.enterOffset]
      : [...INTRO_SCROLL.mobileEnterOffset]
    : isDesktop
      ? [...variantConfig.enterOffset]
      : [...variantConfig.mobileEnterOffset]) as NonNullable<UseScrollOptions["offset"]>;

  const { scrollYProgress: rawEnter } = useScroll({
    target: targetRef,
    offset,
  });

  return useBoostedScrollProgress(rawEnter, targetRef);
}
