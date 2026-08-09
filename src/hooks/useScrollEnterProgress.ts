"use client";

import { useTransform, type MotionValue, type UseScrollOptions } from "framer-motion";
import { useIntroScroll, useIntroSectionRef } from "@/components/animations/IntroScrollContext";
import { useIsIOS } from "@/hooks/useIsIOS";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSafeScroll } from "@/hooks/useSafeScroll";

type VariantScrollConfig = {
  desktopQuery: string;
  enterOffset: readonly [string, string];
  mobileEnterOffset: readonly [string, string];
};

/** Standard variant enter scroll, with a floor at section-top for hero / LiveAt intro blocks. */
export function useScrollEnterProgress(
  targetRef: React.RefObject<HTMLElement | null>,
  variantConfig: VariantScrollConfig,
): MotionValue<number> {
  const intro = useIntroScroll();
  const sectionRef = useIntroSectionRef();
  const isIOS = useIsIOS();
  const isDesktop = useMediaQuery(variantConfig.desktopQuery);

  const offset = (isDesktop
    ? [...variantConfig.enterOffset]
    : [...variantConfig.mobileEnterOffset]) as NonNullable<UseScrollOptions["offset"]>;

  const { scrollYProgress: rawEnter } = useSafeScroll({
    target: targetRef,
    offset,
  });

  const { scrollYProgress: sectionProgress } = useSafeScroll({
    target: sectionRef ?? targetRef,
    offset: ["start start", "end start"],
  });

  return useTransform([rawEnter, sectionProgress], ([enter, section]) => {
    const enterValue = Number(enter);

    // Hero / LiveAt on iOS: scroll progress often stays at 0 in WebKit.
    if (intro && isIOS) return 1;

    if (!intro) return enterValue;

    // When the intro section is back at the top of the viewport, fully restore enter state.
    // Fixes desktop hero text sitting mid-viewport (progress ~0.5 with old intro offsets).
    if (Number(section) < 0.1) {
      return Math.max(enterValue, 1);
    }

    return enterValue;
  });
}
