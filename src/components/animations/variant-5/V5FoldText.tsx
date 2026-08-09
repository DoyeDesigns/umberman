"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBoostedScrollProgress } from "@/hooks/useScrollEnterProgress";
import { VARIANT_5 } from "@/lib/animations/config";

type V5FoldTextProps = {
  text: string;
  className?: string;
};

export function V5FoldText({ text, className = "" }: V5FoldTextProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery(VARIANT_5.desktopQuery);
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress: rawEnter } = useScroll({
    target: ref,
    offset: [...(isDesktop ? VARIANT_5.enterOffset : VARIANT_5.mobileEnterOffset)],
  });
  const scrollYProgress = useBoostedScrollProgress(rawEnter, ref);

  const rotateX = useTransform(
    scrollYProgress,
    (t) => (1 - t) * -VARIANT_5.foldAngleX,
  );
  const crease = useTransform(scrollYProgress, (t) => (1 - t) * 0.45);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 0.8, 1]);

  if (variant !== 5 || reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <div ref={ref} className="relative" style={{ perspective: 900 }}>
      <motion.p
        className={className}
        style={{
          rotateX,
          opacity,
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
        }}
      >
        {text}
      </motion.p>
      <motion.div
        aria-hidden
        className="v5-fold-crease pointer-events-none absolute inset-x-0 top-0 h-6"
        style={{ opacity: crease }}
      />
    </div>
  );
}
