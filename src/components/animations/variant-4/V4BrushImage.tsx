"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { MobileRevealImage } from "@/components/animations/MobileRevealImage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import {
  useRestSettleSignal,
  useSettledImageEnter,
} from "@/hooks/useImageRestSettle";
import { VARIANT_4 } from "@/lib/animations/config";

type V4BrushImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  beat?: number;
  settleAtRest?: boolean;
};

function brushClipPath(progress: number): string {
  const p = Math.min(1, Math.max(0, progress));
  const edge = p * 108 - 8;
  return `polygon(-2% 0%, ${edge - 4}% 0%, ${edge + 2}% 18%, ${edge - 1}% 36%, ${edge + 3}% 54%, ${edge - 2}% 72%, ${edge + 1}% 90%, ${edge - 3}% 100%, -2% 100%)`;
}

export function V4BrushImage({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "object-cover",
  priority = false,
  beat = 0,
  settleAtRest = false,
}: V4BrushImageProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_4.desktopQuery);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: enterProgress } = useSafeScroll({
    target: ref,
    offset: [
      ...(isDesktop
        ? VARIANT_4.imageEnterOffset
        : VARIANT_4.mobileImageEnterOffset),
    ],
  });

  const settle = useRestSettleSignal(ref, settleAtRest);
  const progress = useSettledImageEnter(
    enterProgress,
    settle,
    settleAtRest,
    beat,
    VARIANT_4.beatGap,
  );

  const clipPath = useTransform(progress, (p) => brushClipPath(p));
  const opacity = useTransform(progress, [0, 0.06, 0.55, 1], [0, 0.85, 1, 1]);

  if (variant !== 4 || reducedMotion) {
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
        delay={beat * VARIANT_4.beatGap}
      />
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="relative h-full min-h-[inherit] w-full"
        style={{
          clipPath,
          opacity,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
      </motion.div>
    </div>
  );
}
