"use client";

import Image from "next/image";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { V1EnterMotion } from "@/components/animations/V1EnterMotion";
import { V2PixelImage } from "@/components/animations/variant-2/V2PixelImage";

type RevealImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  beat?: number;
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

  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={imageClassName}
    />
  );

  if (variant === 1) {
    return (
      <V1EnterMotion
        animation="scale-in"
        beat={beat}
        className={`relative ${className}`.trim()}
      >
        {image}
      </V1EnterMotion>
    );
  }

  return <div className={`relative ${className}`}>{image}</div>;
}
