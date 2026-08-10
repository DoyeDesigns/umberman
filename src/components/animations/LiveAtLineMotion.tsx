"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { HeroEntranceMotion } from "@/components/animations/HeroEntranceMotion";
import { Motion } from "@/components/animations/Motion";

type LiveAtLineMotionProps = {
  children: React.ReactNode;
  line: "call" | "response";
  preset?: "unfold" | "settle";
  beat?: number;
  delay?: number;
  className?: string;
};

export function LiveAtLineMotion({
  children,
  line,
  preset = line === "call" ? "unfold" : "settle",
  beat = line === "call" ? 0 : 1,
  delay = line === "response" ? 0.06 : 0,
  className,
}: LiveAtLineMotionProps) {
  const variant = useAnimationVariant();
  const entranceRole = line === "call" ? "liveAtCall" : "liveAtResponse";

  const scrollLayer =
    variant === 2 ? (
      <Motion preset={preset} beat={beat} delay={delay} className={className}>
        {children}
      </Motion>
    ) : (
      <div className={className}>{children}</div>
    );

  return (
    <HeroEntranceMotion role={entranceRole} className={className}>
      {scrollLayer}
    </HeroEntranceMotion>
  );
}
