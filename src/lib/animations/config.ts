export type AnimationVariant = 0 | 1 | 2;

/** 0 = static (default). 1 = sticky stack reveal. 2 = editorial scroll motion. */
export const ANIMATION_VARIANTS = {
  static: 0,
  stickyReveal: 1,
  editorial: 2,
} as const;

export const INTRO_SCROLL = {
  desktopQuery: "(min-width: 768px)",
  /** Hero / LiveAt — fully entered once the block reaches the viewport top. */
  enterOffset: ["start end", "start start"],
  mobileEnterOffset: ["start end", "start 0.88"],
} as const;

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const STICKY_REVEAL = {
  desktopQuery: "(min-width: 768px)",
} as const;

export const VARIANT_2 = {
  desktopQuery: "(min-width: 768px)",
  enterOffset: ["start end", "start 0.72"],
  /** Exit begins as the element's top reaches the viewport top edge. */
  exitOffset: ["start 0.12", "start -0.52"],
  mobileEnterOffset: ["start end", "start 0.85"],
  mobileExitOffset: ["start 0.14", "start -0.38"],
  /** Hold exit motion until this far into the exit scroll range. */
  exitDelay: 0.16,
  /** Word text: extra-long top exit so words dissolve gradually on scroll down. */
  lineTextExitOffset: ["start 0.18", "start -0.58"],
  mobileLineTextExitOffset: ["start 0.2", "start -0.42"],
  /** Top-edge blur on scroll down — minimal, upper portion only. */
  topExitBlurDelay: 0,
  topExitBlurAmount: 2.5,
  topExitBlurHeight: "22%",
  /**
   * Line/word text enter — tracks the text block while you scroll through it.
   * Long runway: top enters at viewport bottom → bottom reaches mid-viewport.
   */
  lineTextEnterOffset: ["start end", "end 0.55"],
  mobileLineTextEnterOffset: ["start end", "end 0.72"],
  /** Share of enter progress spread across words (higher = slower stagger). */
  lineTextStaggerSpan: 0.94,
  lineTextWordDuration: 0.46,
} as const;

export function delayV2Exit(
  progress: number,
  delay: number = VARIANT_2.exitDelay,
) {
  if (progress <= delay) return 0;
  return Math.min(1, (progress - delay) / (1 - delay));
}

export function parseAnimationVariant(param?: string): AnimationVariant {
  if (param === "1") return 1;
  if (param === "2") return 2;
  return 0;
}
