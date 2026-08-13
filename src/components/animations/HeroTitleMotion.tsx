"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { HeroEntranceMotion } from "@/components/animations/HeroEntranceMotion";
import { Motion } from "@/components/animations/Motion";
import type { V2Preset } from "@/lib/animations/variant-2/presets";

type HeroTitleMotionProps = {
  children: React.ReactNode;
  preset?: V2Preset;
  beat?: number;
  delay?: number;
  className?: string;
};

export function HeroTitleMotion({
  children,
  preset = "orbit",
  beat = 2,
  delay = 0.1,
  className,
}: HeroTitleMotionProps) {
  const variant = useAnimationVariant();

  if (variant === 1) {
    return (
      <HeroEntranceMotion role="title" className={className}>
        {children}
      </HeroEntranceMotion>
    );
  }

  const scrollLayer =
    variant === 2 ? (
      <Motion preset={preset} beat={beat} delay={delay} className={className}>
        {children}
      </Motion>
    ) : (
      <div className={className}>{children}</div>
    );

  return (
    <HeroEntranceMotion role="title" className={className}>
      {scrollLayer}
    </HeroEntranceMotion>
  );
}
