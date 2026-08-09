"use client";

import { Children, isValidElement } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import { GlitchText } from "@/components/animations/GlitchText";
import { HeroEntranceMotion } from "@/components/animations/HeroEntranceMotion";
import { Motion } from "@/components/animations/Motion";
import { V4PigmentFillText } from "@/components/animations/variant-4/V4PigmentFillText";
import { V5FoldMotion } from "@/components/animations/variant-5/V5FoldMotion";
import type { V2Preset } from "@/lib/animations/variant-2/presets";

type HeroTitleMotionProps = {
  children: React.ReactNode;
  preset?: V2Preset;
  beat?: number;
  delay?: number;
  className?: string;
};

function extractTitle(child: React.ReactNode): { text: string; textClassName: string } {
  const node = Children.toArray(child)[0];
  if (
    isValidElement(node) &&
    typeof (node.props as { children?: unknown }).children === "string"
  ) {
    const props = node.props as { children: string; className?: string };
    return {
      text: props.children,
      textClassName: props.className ?? "",
    };
  }
  return { text: "UMBERMAN", textClassName: "" };
}

export function HeroTitleMotion({
  children,
  preset = "orbit",
  beat = 2,
  delay = 0.1,
  className,
}: HeroTitleMotionProps) {
  const variant = useAnimationVariant();
  const scrollMotion = useScrollMotionEnabled();
  const { text, textClassName } = extractTitle(children);

  let scrollLayer: React.ReactNode;

  if (variant === 3) {
    scrollLayer = (
      <Motion preset={preset} beat={beat} delay={delay} className={className}>
        <GlitchText
          text={text}
          textClassName={textClassName}
          color="#D74F24"
          colors={{ a: "#354396", b: "#D74F24", c: "#1C1C1C" }}
          trigger="loop"
          intensity={5}
          slices={12}
          gapMinMs={5000}
          gapMaxMs={12000}
          initialDelayMs={6000}
        />
      </Motion>
    );
  } else if (variant === 4 && scrollMotion) {
    scrollLayer = (
      <V4PigmentFillText direction="bottom" delay={delay} className={className}>
        {children}
      </V4PigmentFillText>
    );
  } else if (variant === 5 && scrollMotion) {
    scrollLayer = (
      <V5FoldMotion preset="orbit" beat={beat} delay={delay} className={className} foldMode="top">
        {children}
      </V5FoldMotion>
    );
  } else if (variant === 5) {
    scrollLayer = <div className={className}>{children}</div>;
  } else if (variant === 4) {
    scrollLayer = <div className={className}>{children}</div>;
  } else {
    scrollLayer = (
      <Motion preset={preset} beat={beat} delay={delay} className={className}>
        {children}
      </Motion>
    );
  }

  return (
    <HeroEntranceMotion role="title" className={className}>
      {scrollLayer}
    </HeroEntranceMotion>
  );
}
