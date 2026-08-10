"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { Motion } from "@/components/animations/Motion";
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

  if (variant !== 2) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Motion preset={preset} beat={resolvedBeat} delay={delay} className={className}>
      {children}
    </Motion>
  );
}
