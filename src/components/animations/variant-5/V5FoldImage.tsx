"use client";

import Image from "next/image";
import { useTransform } from "framer-motion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useRef } from "react";
import { ScrollLinkedDiv } from "@/components/animations/ScrollLinkedDiv";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { MobileRevealImage } from "@/components/animations/MobileRevealImage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import {
  useRestSettleSignal,
  useSettledImageEnter,
} from "@/hooks/useImageRestSettle";
import { VARIANT_5 } from "@/lib/animations/config";

type V5FoldImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  beat?: number;
  settleAtRest?: boolean;
};

function FoldPanel({
  progress,
  side,
  children,
}: {
  progress: ReturnType<typeof useTransform<number, number>>;
  side: "left" | "right";
  children: React.ReactNode;
}) {
  const rotateY = useTransform(progress, (t) => {
    const e = 1 - t;
    return side === "left" ? e * -VARIANT_5.foldAngleY : e * VARIANT_5.foldAngleY;
  });
  const crease = useTransform(progress, (t) => (1 - t) * 0.4);

  return (
    <ScrollLinkedDiv
      className="relative h-full w-1/2 overflow-hidden"
      staticStyle={{
        transformOrigin: side === "left" ? "center right" : "center left",
        transformStyle: "preserve-3d",
      }}
      motionStyle={{ rotateY }}
    >
      {children}
      <ScrollLinkedDiv
        aria-hidden
        className="v5-fold-crease pointer-events-none absolute inset-y-0 w-4"
        staticStyle={side === "left" ? { right: 0 } : { left: 0 }}
        motionStyle={{ opacity: crease }}
      />
    </ScrollLinkedDiv>
  );
}

export function V5FoldImage({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "object-cover",
  priority = false,
  beat = 0,
  settleAtRest = false,
}: V5FoldImageProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_5.desktopQuery);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: enterProgress } = useSafeScroll({
    target: ref,
    offset: [
      ...(isDesktop
        ? VARIANT_5.imageEnterOffset
        : VARIANT_5.mobileImageEnterOffset),
    ],
  });

  const settle = useRestSettleSignal(ref, settleAtRest);
  const progress = useSettledImageEnter(
    enterProgress,
    settle,
    settleAtRest,
    beat,
    VARIANT_5.beatGap,
  );

  if (variant !== 5 || reducedMotion) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
      </div>
    );
  }

  if (!scrollMotion) {
    return (
      <MobileRevealImage
        src={src}
        alt={alt}
        sizes={sizes}
        className={className}
        imageClassName={imageClassName}
        priority={priority}
        delay={beat * VARIANT_5.beatGap}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={`relative flex overflow-hidden ${className}`}
      style={{ perspective: 1000 }}
    >
      <FoldPanel progress={progress} side="left">
        <div className="relative h-full w-[200%]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`${imageClassName} object-left`}
          />
        </div>
      </FoldPanel>
      <FoldPanel progress={progress} side="right">
        <div className="relative h-full w-[200%] -translate-x-1/2">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`${imageClassName} object-right`}
          />
        </div>
      </FoldPanel>
    </div>
  );
}
