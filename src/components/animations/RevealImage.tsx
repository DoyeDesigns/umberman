"use client";

import Image from "next/image";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { V2PixelImage } from "@/components/animations/variant-2/V2PixelImage";
import { V3SliceImage } from "@/components/animations/variant-3/V3SliceImage";
import { V4BrushImage } from "@/components/animations/variant-4/V4BrushImage";
import { V5FoldImage } from "@/components/animations/variant-5/V5FoldImage";

type RevealImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  beat?: number;
  /** Lock the image fully revealed once its scroll runway completes or the page reaches the bottom. */
  settleAtRest?: boolean;
};

export function RevealImage({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "object-cover",
  priority = false,
  beat = 0,
  settleAtRest = false,
}: RevealImageProps) {
  const variant = useAnimationVariant();

  if (variant === 2) {
    return (
      <V2PixelImage
        src={src}
        alt={alt}
        sizes={sizes}
        className={className}
        imageClassName={imageClassName}
        priority={priority}
        beat={beat}
        settleAtRest={settleAtRest}
      />
    );
  }

  if (variant === 3) {
    return (
      <V3SliceImage
        src={src}
        alt={alt}
        sizes={sizes}
        className={className}
        imageClassName={imageClassName}
        priority={priority}
        beat={beat}
        settleAtRest={settleAtRest}
      />
    );
  }

  if (variant === 4) {
    return (
      <V4BrushImage
        src={src}
        alt={alt}
        sizes={sizes}
        className={className}
        imageClassName={imageClassName}
        priority={priority}
        beat={beat}
        settleAtRest={settleAtRest}
      />
    );
  }

  if (variant === 5) {
    return (
      <V5FoldImage
        src={src}
        alt={alt}
        sizes={sizes}
        className={className}
        imageClassName={imageClassName}
        priority={priority}
        beat={beat}
        settleAtRest={settleAtRest}
      />
    );
  }

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
