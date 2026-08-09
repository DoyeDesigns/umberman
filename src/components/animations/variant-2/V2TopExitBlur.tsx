"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { VARIANT_2, delayV2Exit } from "@/lib/animations/config";
import type { ScrollDirection } from "@/hooks/useScrollDirection";

type V2TopExitBlurProps = {
  exitProgress: MotionValue<number>;
  scrollDirection: ScrollDirection;
};

export function V2TopExitBlur({
  exitProgress,
  scrollDirection,
}: V2TopExitBlurProps) {
  const directionRef = useRef(scrollDirection);
  directionRef.current = scrollDirection;

  const strength = useTransform(exitProgress, (exit) => {
    if (directionRef.current !== "down") return 0;
    return delayV2Exit(exit, VARIANT_2.topExitBlurDelay);
  });

  const backdrop = useTransform(
    strength,
    (value) => `blur(${value * VARIANT_2.topExitBlurAmount}px)`,
  );

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20"
      style={{
        height: VARIANT_2.topExitBlurHeight,
        opacity: strength,
        backdropFilter: backdrop,
        WebkitBackdropFilter: backdrop,
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, transparent 100%)",
      }}
    />
  );
}
