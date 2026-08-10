import type { AnimationVariant } from "@/lib/animations/config";
import { EASE_OUT } from "@/lib/animations/config";
import type { TargetAndTransition, Transition } from "framer-motion";

export type IntroEntranceRole =
  | "logo"
  | "name"
  | "presents"
  | "title"
  | "liveAtCall"
  | "liveAtResponse";

/** @deprecated Use IntroEntranceRole */
export type HeroEntranceRole = IntroEntranceRole;

/** Staggered load sequence — logo → name → presents → UMBERMAN. */
export const HERO_ENTRANCE_DELAY: Record<"logo" | "name" | "presents" | "title", number> = {
  logo: 0.08,
  name: 0.22,
  presents: 0.34,
  title: 0.58,
};

export const LIVE_AT_ENTRANCE_DELAY: Record<"liveAtCall" | "liveAtResponse", number> = {
  liveAtCall: 0.82,
  liveAtResponse: 1.05,
};

type EntranceFrame = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
};

export type { EntranceFrame };

function baseTransition(delay: number, duration = 0.72): Transition {
  return { duration, delay, ease: EASE_OUT };
}

function reducedEntrance(role: IntroEntranceRole): EntranceFrame {
  const delay =
    role === "liveAtCall" || role === "liveAtResponse"
      ? LIVE_AT_ENTRANCE_DELAY[role] * 0.4
      : HERO_ENTRANCE_DELAY[role as keyof typeof HERO_ENTRANCE_DELAY] * 0.4;
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.45, delay, ease: EASE_OUT },
  };
}

function mapEntranceRole(role: IntroEntranceRole): "logo" | "name" | "presents" | "title" {
  if (role === "liveAtCall") return "name";
  if (role === "liveAtResponse") return "title";
  return role;
}

function roleDelay(_variant: AnimationVariant, role: IntroEntranceRole): number {
  if (role === "liveAtCall" || role === "liveAtResponse") {
    return LIVE_AT_ENTRANCE_DELAY[role];
  }
  return HERO_ENTRANCE_DELAY[role];
}

export function getHeroEntrance(
  variant: AnimationVariant,
  role: IntroEntranceRole,
  reduced: boolean,
): EntranceFrame {
  if (reduced) return reducedEntrance(role);

  const delay = roleDelay(variant, role);
  const mapped = mapEntranceRole(role);

  if (variant === 0) {
    return {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: baseTransition(delay, 0.55),
    };
  }

  return {
    initial: {
      opacity: 0,
      y: mapped === "title" ? 28 : 18,
      filter: "blur(10px)",
    },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: baseTransition(delay, mapped === "title" ? 0.95 : 0.78),
  };
}
