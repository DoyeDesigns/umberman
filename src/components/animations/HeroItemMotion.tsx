"use client";

import { HeroEntranceMotion } from "@/components/animations/HeroEntranceMotion";
import { Motion } from "@/components/animations/Motion";

type HeroItemMotionProps = {
  children: React.ReactNode;
  item: "name" | "presents";
  className?: string;
};

const BEATS = {
  name: 1,
  presents: 0,
} as const;

export function HeroItemMotion({ children, item, className }: HeroItemMotionProps) {
  const beat = BEATS[item];
  const preset = item === "presents" ? "snap" : "orbit";

  return (
    <HeroEntranceMotion role={item} className={className}>
      <Motion
        preset={preset}
        beat={beat}
        delay={item === "name" ? 0.04 : 0}
      >
        {children}
      </Motion>
    </HeroEntranceMotion>
  );
}
