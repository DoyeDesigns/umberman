"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { V1EnterMotion } from "@/components/animations/V1EnterMotion";
import { V2LineRevealText } from "@/components/animations/variant-2/V2LineRevealText";

type RevealTextProps = {
  text: string;
  className?: string;
  beat?: number;
};

export function RevealText({ text, className = "", beat = 0 }: RevealTextProps) {
  const variant = useAnimationVariant();

  if (variant === 2) {
    return <V2LineRevealText text={text} className={className} />;
  }

  if (variant === 1) {
    return (
      <V1EnterMotion animation="slide-in-bottom" beat={beat}>
        <p className={className}>{text}</p>
      </V1EnterMotion>
    );
  }

  return <p className={className}>{text}</p>;
}
