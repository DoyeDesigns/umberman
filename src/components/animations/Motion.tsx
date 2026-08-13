"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { V1EnterMotion } from "@/components/animations/V1EnterMotion";
import { V2Motion } from "@/components/animations/variant-2/V2Motion";
import type { V2Preset } from "@/lib/animations/variant-2/presets";

type MotionProps = {
  children: React.ReactNode;
  preset?: V2Preset;
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

  if (variant === 1) {
    return (
      <V1EnterMotion
        preset={preset}
        beat={beat}
        delay={delay}
        className={className}
        style={style}
      >
        {children}
      </V1EnterMotion>
    );
  }

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

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
