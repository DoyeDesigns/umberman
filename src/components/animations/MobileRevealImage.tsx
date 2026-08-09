"use client";

import Image from "next/image";
import { MobileInViewReveal } from "@/components/animations/MobileInViewReveal";

type MobileRevealImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  delay?: number;
};

export function MobileRevealImage({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "object-cover",
  priority = false,
  delay = 0,
}: MobileRevealImageProps) {
  return (
    <MobileInViewReveal
      className={`relative overflow-hidden ${className}`}
      delay={delay}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={imageClassName}
      />
    </MobileInViewReveal>
  );
}
