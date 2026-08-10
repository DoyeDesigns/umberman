"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { V2LineRevealText } from "@/components/animations/variant-2/V2LineRevealText";

type RevealTextProps = {
  text: string;
  className?: string;
};

export function RevealText({ text, className = "" }: RevealTextProps) {
  const variant = useAnimationVariant();

  if (variant === 2) {
    return <V2LineRevealText text={text} className={className} />;
  }

  return <p className={className}>{text}</p>;
}
