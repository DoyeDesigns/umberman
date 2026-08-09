"use client";

import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import { HeroEntranceMotion } from "@/components/animations/HeroEntranceMotion";
import { Motion } from "@/components/animations/Motion";
import { V4InkBleedText } from "@/components/animations/variant-4/V4InkBleedText";

type LiveAtLineMotionProps = {
  children: React.ReactNode;
  line: "call" | "response";
  preset?: "unfold" | "settle";
  beat?: number;
  delay?: number;
  className?: string;
};

const LINE_TEXT = {
  call: "LIVE AT THE",
  response: "Fitzrovia Chapel, London.",
} as const;

export function LiveAtLineMotion({
  children,
  line,
  preset = line === "call" ? "unfold" : "settle",
  beat = line === "call" ? 0 : 1,
  delay = line === "response" ? 0.06 : 0,
  className,
}: LiveAtLineMotionProps) {
  const variant = useAnimationVariant();
  const scrollMotion = useScrollMotionEnabled();
  const entranceRole = line === "call" ? "liveAtCall" : "liveAtResponse";

  let scrollLayer: React.ReactNode;

  if (variant === 4 && scrollMotion) {
    scrollLayer = (
      <V4InkBleedText text={LINE_TEXT[line]} className={className} inline />
    );
  } else {
    scrollLayer = (
      <Motion preset={preset} beat={beat} delay={delay} className={className}>
        {children}
      </Motion>
    );
  }

  return (
    <HeroEntranceMotion role={entranceRole} className={className}>
      {scrollLayer}
    </HeroEntranceMotion>
  );
}
