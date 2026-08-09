"use client";

import { useTransform } from "framer-motion";
import { useRef } from "react";
import { ScrollLinkedDiv } from "@/components/animations/ScrollLinkedDiv";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { MobileInViewReveal } from "@/components/animations/MobileInViewReveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import { VARIANT_5 } from "@/lib/animations/config";

type V5FoldTextProps = {
  text: string;
  className?: string;
};

export function V5FoldText({ text, className = "" }: V5FoldTextProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_5.desktopQuery);
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useSafeScroll({
    target: ref,
    offset: [...(isDesktop ? VARIANT_5.enterOffset : VARIANT_5.mobileEnterOffset)],
  });

  const rotateX = useTransform(
    scrollYProgress,
    (t) => (1 - t) * -VARIANT_5.foldAngleX,
  );
  const crease = useTransform(scrollYProgress, (t) => (1 - t) * 0.45);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 0.8, 1]);

  if (variant !== 5 || reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  if (!scrollMotion) {
    return (
      <MobileInViewReveal className={className}>
        <p className={className}>{text}</p>
      </MobileInViewReveal>
    );
  }

  return (
    <div ref={ref} className="relative" style={{ perspective: 900 }}>
      <ScrollLinkedDiv
        as="p"
        className={className}
        staticStyle={{
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
        }}
        motionStyle={{ rotateX, opacity }}
      >
        {text}
      </ScrollLinkedDiv>
      <ScrollLinkedDiv
        aria-hidden
        className="v5-fold-crease pointer-events-none absolute inset-x-0 top-0 h-6"
        motionStyle={{ opacity: crease }}
      />
    </div>
  );
}
