"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBoostedScrollProgress } from "@/hooks/useScrollEnterProgress";
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
  const isDesktop = useMediaQuery(VARIANT_4.desktopQuery);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: rawEnter } = useScroll({
    target: ref,
    offset: [
      ...(isDesktop
        ? VARIANT_4.imageEnterOffset
        : VARIANT_4.mobileImageEnterOffset),
    ],
  });
  const enterProgress = useBoostedScrollProgress(rawEnter, ref);

  const settle = useRestSettleSignal(ref, settleAtRest);
  const progress = useSettledImageEnter(
    enterProgress,
    settle,
    settleAtRest,
    beat,
    VARIANT_4.beatGap,
  );

  const clipPath = useTransform(progress, (p) => brushClipPath(p));
  const gradientMask = useTransform(
    progress,
    [0, 0.15, 1],
    [
      "linear-gradient(90deg, transparent 0%, transparent 100%)",
      "linear-gradient(90deg, transparent 0%, black 18%, black 100%)",
      "linear-gradient(90deg, black 0%, black 100%)",
    ],
  );
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

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="relative h-full min-h-[inherit] w-full"
        style={{
          clipPath: isDesktop ? clipPath : undefined,
          WebkitMaskImage: isDesktop ? undefined : gradientMask,
          maskImage: isDesktop ? undefined : gradientMask,
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
