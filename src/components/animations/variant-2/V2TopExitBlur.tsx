"use client";

import { useTransform, type MotionValue } from "framer-motion";
import { ScrollLinkedDiv } from "@/components/animations/ScrollLinkedDiv";
import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";
import { VARIANT_2, delayV2Exit } from "@/lib/animations/config";
import type { ScrollDirection } from "@/hooks/useScrollDirection";

type V2TopExitBlurProps = {
  exitProgress: MotionValue<number>;
  scrollDirection: ScrollDirection;
};

/**
 * Top-edge scroll blur — desktop only. Uses Framer MotionValues (broken on iPhone).
 */
export function V2TopExitBlur({
  exitProgress,
  scrollDirection,
}: V2TopExitBlurProps) {
  const { useNativeScroll } = useIOSAnimationPath();

  const strength = useTransform(exitProgress, (exit) => {
    if (scrollDirection !== "down") return 0;
    return delayV2Exit(exit, VARIANT_2.topExitBlurDelay);
  });

  const backdrop = useTransform(
    strength,
    (value) => `blur(${value * VARIANT_2.topExitBlurAmount}px)`,
  );

  if (useNativeScroll) {
    return null;
  }

  return (
    <ScrollLinkedDiv
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20"
      staticStyle={{
        height: VARIANT_2.topExitBlurHeight,
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, transparent 100%)",
      }}
      motionStyle={{
        opacity: strength,
        backdropFilter: backdrop,
      }}
    />
  );
}
