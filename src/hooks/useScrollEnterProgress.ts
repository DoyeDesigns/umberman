"use client";

import {
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useIntroScroll, useIntroSectionRef } from "@/components/animations/IntroScrollContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type BoostOptions = {
  intro?: boolean;
  sectionRef?: React.RefObject<HTMLElement | null> | null;
};

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
  const hasMoved = useRef(false);

  const inView = useInView(targetRef, {
    amount: 0.12,
    margin: "0px 0px -8% 0px",
  });

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef ?? targetRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const unsubscribe = rawProgress.on("change", (value) => {
      if (value > 0.04) hasMoved.current = true;
    });
    return unsubscribe;
  }, [rawProgress]);

  return useTransform([rawProgress, sectionProgress], ([enter, section]) => {
    let value = Number(enter);
    if (!Number.isFinite(value)) value = 0;

    if (intro && Number(section) < 0.12) {
      value = Math.max(value, 1);
    }

    if (inView && !hasMoved.current && value < 0.04) {
      value = intro && Number(section) < 0.2 ? 1 : Math.max(value, 0.65);
    }

    return value;
  });
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

  const offset = (isDesktop
    ? [...variantConfig.enterOffset]
    : [...variantConfig.mobileEnterOffset]) as NonNullable<UseScrollOptions["offset"]>;

  const { scrollYProgress: rawEnter } = useScroll({
    target: targetRef,
    offset,
  });

  return useBoostedScrollProgress(rawEnter, targetRef);
}
