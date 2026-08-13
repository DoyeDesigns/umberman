import { EASE_OUT } from "@/lib/animations/config";
import type { EntranceFrame } from "@/lib/animations/hero-entrance";

export type AltEntranceRole =
  | "logo"
  | "name"
  | "presents"
  | "title"
  | "liveAtCall"
  | "liveAtResponse";

/** Staggered load sequence — runs once on page load. */
export const ALT_ENTRANCE_DELAY: Record<AltEntranceRole, number> = {
  logo: 0.06,
  name: 0.22,
  presents: 0.34,
  title: 0.5,
  liveAtCall: 0.72,
  liveAtResponse: 0.92,
};

function baseTransition(delay: number, duration = 0.72) {
  return { duration, delay, ease: EASE_OUT };
}

function reducedAltEntrance(role: AltEntranceRole): EntranceFrame {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: baseTransition(ALT_ENTRANCE_DELAY[role] * 0.5, 0.45),
  };
}

export function getAltEntrance(role: AltEntranceRole, reduced: boolean): EntranceFrame {
  if (reduced) return reducedAltEntrance(role);

  const delay = ALT_ENTRANCE_DELAY[role];

  switch (role) {
    case "logo":
      return {
        initial: { opacity: 0, y: -48 },
        animate: { opacity: 1, y: 0 },
        transition: baseTransition(delay, 0.68),
      };
    case "name":
      return {
        initial: { opacity: 0, x: -56 },
        animate: { opacity: 1, x: 0 },
        transition: baseTransition(delay, 0.72),
      };
    case "presents":
      return {
        initial: { opacity: 0, x: 56 },
        animate: { opacity: 1, x: 0 },
        transition: baseTransition(delay, 0.72),
      };
    case "title":
      return {
        initial: { opacity: 0, y: 56 },
        animate: { opacity: 1, y: 0 },
        transition: baseTransition(delay, 0.78),
      };
    case "liveAtCall":
      return {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: baseTransition(delay, 0.72),
      };
    case "liveAtResponse":
      return {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: baseTransition(delay, 0.78),
      };
  }
}

/** CSS transform for the hidden state — applied before JS runs to prevent flash. */
export function getAltEntranceInitialTransform(role: AltEntranceRole): string {
  switch (role) {
    case "logo":
      return "translate3d(0, -48px, 0)";
    case "name":
      return "translate3d(-56px, 0, 0)";
    case "presents":
      return "translate3d(56px, 0, 0)";
    case "title":
      return "translate3d(0, 56px, 0)";
    case "liveAtCall":
    case "liveAtResponse":
      return "translate3d(0, 40px, 0)";
  }
}
