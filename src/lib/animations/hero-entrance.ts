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

function baseTransition(delay: number, duration = 0.72): Transition {
  return { duration, delay, ease: EASE_OUT };
}

function springTransition(delay: number, stiffness = 320, damping = 22): Transition {
  return { type: "spring", stiffness, damping, delay };
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

function roleDelay(variant: AnimationVariant, role: IntroEntranceRole): number {
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

  switch (variant) {
    case 0:
      return {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: baseTransition(delay, 0.55),
      };

    case 1:
      return {
        initial: { opacity: 0.65, scale: 0.94, y: 16 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: baseTransition(delay, 0.85),
      };

    case 2:
      return {
        initial: {
          opacity: 0,
          y: mapped === "title" ? 28 : 18,
          filter: "blur(10px)",
        },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: baseTransition(delay, mapped === "title" ? 0.95 : 0.78),
      };

    case 3:
      return {
        initial: {
          opacity: 0,
          y: mapped === "title" ? 36 : 22,
          x: mapped === "title" ? 12 : 0,
          skewX: mapped === "title" ? 3 : 1.5,
          filter: "blur(8px)",
        },
        animate: {
          opacity: 1,
          y: 0,
          x: 0,
          skewX: 0,
          filter: "blur(0px)",
        },
        transition: springTransition(delay, 280, 24),
      };

    case 4:
      return {
        initial: {
          opacity: 0,
          filter: "blur(12px)",
        },
        animate: { opacity: 1, filter: "blur(0px)" },
        transition: baseTransition(delay, mapped === "title" ? 1.1 : 0.85),
      };

    case 5:
      return {
        initial: {
          opacity: 0,
          rotateX: mapped === "title" ? -22 : -16,
        },
        animate: { opacity: 1, rotateX: 0 },
        transition: baseTransition(delay, 0.78),
      };

    default:
      return {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: baseTransition(delay, 0.65),
      };
  }
}

/** Wavy pigment fill clip for variant 4 title on load. */
export function v4TitleClipKeyframes(): string[] {
  return [
    "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    "polygon(0 100%, 100% 100%, 100% 82%, 82% 80%, 64% 83%, 46% 79%, 28% 82%, 10% 78%, 0 81%)",
    "polygon(0 100%, 100% 100%, 100% 18%, 82% 16%, 64% 19%, 46% 15%, 28% 18%, 10% 14%, 0 17%)",
    "polygon(0 100%, 100% 100%, 100% 0%, 82% 2%, 64% -1%, 46% 1%, 28% -2%, 10% 1%, 0 0%)",
  ];
}

/** @deprecated Use v4TitleClipKeyframes */
export const v8TitleClipKeyframes = v4TitleClipKeyframes;
