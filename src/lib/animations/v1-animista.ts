import type { IntroEntranceRole } from "@/lib/animations/hero-entrance";
import type { V2Preset } from "@/lib/animations/variant-2/presets";

export type AnimistaEnter =
  | "scale-up-center"
  | "scale-in"
  | "scale-up"
  | "scale-down"
  | "slide-in-top"
  | "slide-in-bottom"
  | "slide-in-left"
  | "slide-in-right";

/** Maps editorial presets → Animista enter for variant 1. */
export function presetToAnimista(preset: V2Preset): AnimistaEnter {
  switch (preset) {
    case "snap":
      return "scale-up-center";
    case "drift-left":
      return "slide-in-left";
    case "drift-right":
      return "slide-in-right";
    case "unfold":
      return "scale-in";
    case "settle":
      return "slide-in-bottom";
    case "shear":
      return "slide-in-top";
    case "orbit":
      return "scale-up";
    case "line":
      return "scale-up";
    default:
      return "slide-in-bottom";
  }
}

/** Hero / LiveAt role → Animista enter. */
export function roleToAnimista(role: IntroEntranceRole): AnimistaEnter {
  switch (role) {
    case "logo":
      return "scale-up-center";
    case "name":
      return "slide-in-left";
    case "presents":
      return "slide-in-right";
    case "title":
      return "slide-in-bottom";
    case "liveAtCall":
      return "slide-in-bottom";
    case "liveAtResponse":
      return "slide-in-bottom";
  }
}

export const V1_BEAT_STAGGER = 0.1;

export type IosV1Offset = {
  x: number;
  y: number;
  scale: number;
};

/** CSS transform offsets for iPhone in-view reveals (no Animista). */
export function animistaToIosOffset(anim: AnimistaEnter): IosV1Offset {
  switch (anim) {
    case "slide-in-bottom":
      return { x: 0, y: 14, scale: 1 };
    case "slide-in-top":
      return { x: 0, y: -14, scale: 1 };
    case "slide-in-left":
      return { x: -14, y: 0, scale: 1 };
    case "slide-in-right":
      return { x: 14, y: 0, scale: 1 };
    case "scale-up-center":
      return { x: 0, y: 0, scale: 0.92 };
    case "scale-in":
      return { x: 0, y: 0, scale: 0.88 };
    case "scale-up":
      return { x: 0, y: 8, scale: 0.94 };
    case "scale-down":
      return { x: 0, y: 0, scale: 1.06 };
  }
}
