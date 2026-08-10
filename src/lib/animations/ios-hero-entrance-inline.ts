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

/** @deprecated Prefer `ios-hero-entrance` CSS class in HeroEntranceMotion. Kept as fallback reference. */
export function getIOSHeroEntranceStyle(
  _variant: AnimationVariant,
  role: IntroEntranceRole,
): CSSProperties {
  const delay = roleDelay(role);
  const isTitle = role === "title" || role === "liveAtResponse";
  return anim(isTitle ? "ios-hero-rise-lg" : "ios-hero-rise", isTitle ? 0.95 : 0.78, delay);
}
