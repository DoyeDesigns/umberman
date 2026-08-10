import type { CSSProperties } from "react";
import type { AnimationVariant } from "@/lib/animations/config";
import {
  HERO_ENTRANCE_DELAY,
  LIVE_AT_ENTRANCE_DELAY,
  type IntroEntranceRole,
} from "@/lib/animations/hero-entrance";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function roleDelay(role: IntroEntranceRole): number {
  if (role === "liveAtCall" || role === "liveAtResponse") {
    return LIVE_AT_ENTRANCE_DELAY[role];
  }
  return HERO_ENTRANCE_DELAY[role as keyof typeof HERO_ENTRANCE_DELAY];
}

function anim(
  name: string,
  duration: number,
  delay: number,
): CSSProperties {
  return {
    animationName: name,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    animationTimingFunction: EASE,
    animationFillMode: "both",
    willChange: "transform, opacity, filter",
  };
}

/** Inline hero animation — does not depend on html.ios class timing. */
export function getIOSHeroEntranceStyle(
  variant: AnimationVariant,
  role: IntroEntranceRole,
): CSSProperties {
  const delay = roleDelay(role);
  const isTitle = role === "title" || role === "liveAtResponse";

  if (variant === 3) {
    return anim(
      isTitle ? "ios-hero-decode" : "ios-hero-decode-sm",
      isTitle ? 0.95 : 0.78,
      delay,
    );
  }

  if (variant === 4) {
    if (isTitle) {
      return anim("ios-hero-pigment-clip", 1.15, delay);
    }
    return anim("ios-hero-pigment", 0.85, delay);
  }

  if (variant === 5) {
    return anim(isTitle ? "ios-hero-fold" : "ios-hero-fold-sm", 0.78, delay);
  }

  return anim(isTitle ? "ios-hero-rise-lg" : "ios-hero-rise", isTitle ? 0.95 : 0.78, delay);
}
