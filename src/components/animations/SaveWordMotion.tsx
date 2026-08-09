"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { Motion } from "@/components/animations/Motion";
import { V4PigmentFillText } from "@/components/animations/variant-4/V4PigmentFillText";
import { V5FoldMotion } from "@/components/animations/variant-5/V5FoldMotion";
import type { V2Preset } from "@/lib/animations/variant-2/presets";

export type SaveWordRole = "dateLine" | "save" | "the" | "date" | "buttons";

type SaveWordMotionProps = {
  children: React.ReactNode;
  role: SaveWordRole;
  preset?: V2Preset;
  beat?: number;
  delay?: number;
  className?: string;
};

const ROLE_BEATS: Record<SaveWordRole, number> = {
  dateLine: 0,
  save: 1,
  the: 2,
  date: 3,
  buttons: 4,
};

export function SaveWordMotion({
  children,
  role,
  preset = "settle",
  beat,
  delay = 0,
  className,
}: SaveWordMotionProps) {
  const variant = useAnimationVariant();
  const resolvedBeat = beat ?? ROLE_BEATS[role];

  if (variant === 4) {
    const direction =
      role === "save" ? "left" : role === "date" ? "right" : role === "the" ? "center" : "bottom";
    if (role === "buttons") {
      return <div className={className}>{children}</div>;
    }
    return (
      <V4PigmentFillText direction={direction} delay={resolvedBeat * 0.06} className={className}>
        {children}
      </V4PigmentFillText>
    );
  }

  if (variant === 5) {
    const foldMode =
      role === "save" ? "left" : role === "date" ? "right" : "top";
    return (
      <V5FoldMotion
        preset={preset}
        beat={resolvedBeat}
        delay={delay}
        className={className}
        foldMode={foldMode}
      >
        {children}
      </V5FoldMotion>
    );
  }

  return (
    <Motion preset={preset} beat={resolvedBeat} delay={delay} className={className}>
      {children}
    </Motion>
  );
}
