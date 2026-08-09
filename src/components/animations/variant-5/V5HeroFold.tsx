"use client";

import { useTransform } from "framer-motion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useRef } from "react";
import { ScrollLinkedDiv } from "@/components/animations/ScrollLinkedDiv";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { VARIANT_5 } from "@/lib/animations/config";

type V5HeroFoldProps = {
  children: React.ReactNode;
  className?: string;
};

export function V5HeroFold({ children, className }: V5HeroFoldProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery(VARIANT_5.desktopQuery);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useSafeScroll({
    target: ref,
    offset: [...(isDesktop ? VARIANT_5.enterOffset : VARIANT_5.mobileEnterOffset)],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotateX = useTransform(progress, (t) => (1 - t) * -VARIANT_5.foldAngleX);
  const crease = useTransform(progress, (t) => (1 - t) * 0.55);
  const opacity = useTransform(progress, [0, 0.15, 1], [0, 0.8, 1]);

  if (variant !== 5 || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ perspective: 1000 }}>
      <ScrollLinkedDiv
        staticStyle={{
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
        }}
        motionStyle={{ rotateX, opacity }}
      >
        {children}
        <ScrollLinkedDiv
          aria-hidden
          className="v5-fold-crease pointer-events-none absolute inset-x-0 top-0 h-8"
          motionStyle={{ opacity: crease }}
        />
      </ScrollLinkedDiv>
    </div>
  );
}
