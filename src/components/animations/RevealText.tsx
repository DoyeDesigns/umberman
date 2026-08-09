"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { V2LineRevealText } from "@/components/animations/variant-2/V2LineRevealText";
import { V3TransmissionText } from "@/components/animations/variant-3/V3TransmissionText";
import { V4InkBleedText } from "@/components/animations/variant-4/V4InkBleedText";
import { V5FoldText } from "@/components/animations/variant-5/V5FoldText";

type RevealTextProps = {
  text: string;
  className?: string;
};

export function RevealText({ text, className = "" }: RevealTextProps) {
  const variant = useAnimationVariant();

  if (variant === 2) {
    return <V2LineRevealText text={text} className={className} />;
  }

  if (variant === 3) {
    return <V3TransmissionText text={text} className={className} />;
  }

  if (variant === 4) {
    return <V4InkBleedText text={text} className={className} />;
  }

  if (variant === 5) {
    return <V5FoldText text={text} className={className} />;
  }

  return <p className={className}>{text}</p>;
}
