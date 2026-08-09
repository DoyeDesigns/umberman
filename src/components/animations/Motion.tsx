"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { V2Motion } from "@/components/animations/variant-2/V2Motion";
import { V3Motion } from "@/components/animations/variant-3/V3Motion";
import { V4Motion } from "@/components/animations/variant-4/V4Motion";
import { V5FoldMotion } from "@/components/animations/variant-5/V5FoldMotion";
import { V3_PRESET_FROM_V2 } from "@/lib/animations/variant-3/presets";
import type { V2Preset } from "@/lib/animations/variant-2/presets";

type MotionProps = {
  children: React.ReactNode;
  preset?: V2Preset;
  /** Variant 3 story beat — delays reveal for top-to-bottom narrative. */
  beat?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  noBlur?: boolean;
  noExit?: boolean;
  /** @deprecated No longer used — kept for call-site compatibility. */
  lightPass?: boolean;
};

export function Motion({
  children,
  preset = "settle",
  beat = 0,
  delay = 0,
  className,
  style,
  noBlur = false,
  noExit = false,
}: MotionProps) {
  const variant = useAnimationVariant();

  if (variant === 2) {
    return (
      <V2Motion
        preset={preset}
        delay={delay}
        className={className}
        style={style}
        noBlur={noBlur}
        noExit={noExit}
      >
        {children}
      </V2Motion>
    );
  }

  if (variant === 3) {
    return (
      <V3Motion
        preset={V3_PRESET_FROM_V2[preset]}
        beat={beat}
        delay={delay}
        className={className}
        style={style}
        noExit={noExit}
      >
        {children}
      </V3Motion>
    );
  }

  if (variant === 4) {
    return (
      <V4Motion
        preset={preset}
        beat={beat}
        delay={delay}
        className={className}
        style={style}
        noExit={noExit}
      >
        {children}
      </V4Motion>
    );
  }

  if (variant === 5) {
    return (
      <V5FoldMotion
        preset={preset}
        beat={beat}
        delay={delay}
        className={className}
        style={style}
        noExit={noExit}
      >
        {children}
      </V5FoldMotion>
    );
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
