export type AnimationVariant = 0 | 1 | 2 | 3 | 4 | 5;

/** 0 = static. 1 = sticky reveal. 2–5 = scroll motion variants. */
export const ANIMATION_VARIANTS = {
  static: 0,
  stickyReveal: 1,
  editorial: 2,
  kinetic: 3,
  pigment: 4,
  adire: 5,
} as const;

export const INTRO_SCROLL = {
  desktopQuery: "(min-width: 768px)",
  /** Hero / LiveAt — fully entered once the block reaches the viewport top. */
  enterOffset: ["start end", "start start"],
  mobileEnterOffset: ["start end", "start start"],
} as const;

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const STICKY_REVEAL = {
  desktopQuery: "(min-width: 768px)",
  scaleFrom: 0.94,
  scaleTo: 1,
  opacityFrom: 0.72,
  opacityTo: 1,
  scrollOffset: ["start end", "start start"],
  /** Viewport heights of scroll runway per incoming section (md+). */
  scrollRunway: "200vh",
  /** Trailing space after the final section so the last panel can scroll out. */
  tailSpacer: "100vh",
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
  if (param === "3") return 3;
  if (param === "4") return 4;
  if (param === "5") return 5;
  return 0;
}

export const VARIANT_3 = {
  desktopQuery: "(min-width: 768px)",
  enterOffset: ["start end", "start 0.68"],
  exitOffset: ["start 0.1", "start -0.48"],
  mobileEnterOffset: ["start end", "start 0.82"],
  mobileExitOffset: ["start 0.12", "start -0.36"],
  exitDelay: 0.14,
  /** Story beat spacing — each beat waits this share of enter progress. */
  beatGap: 0.11,
  decodeTextEnterOffset: ["start end", "end 0.52"],
  mobileDecodeTextEnterOffset: ["start end", "end 0.68"],
  decodeStaggerSpan: 0.96,
  decodeWordDuration: 0.48,
  /** V3 transmission body copy — sentence-by-sentence lock-in. */
  transmissionSentenceSpan: 0.88,
  transmissionSentenceDuration: 0.42,
  decodeTextExitOffset: ["start 0.16", "start -0.52"],
  mobileDecodeTextExitOffset: ["start 0.18", "start -0.38"],
  sliceCount: 10,
  rgbSplitMax: 22,
} as const;

export function delayV3Exit(
  progress: number,
  delay: number = VARIANT_3.exitDelay,
) {
  if (progress <= delay) return 0;
  return Math.min(1, (progress - delay) / (1 - delay));
}

/** Variant 4 — Pigment: wet ink bleeding into paper. */
export const VARIANT_4 = {
  desktopQuery: "(min-width: 768px)",
  enterOffset: ["start end", "start 0.72"],
  exitOffset: ["start 0.12", "start -0.48"],
  mobileEnterOffset: ["start end", "start 0.82"],
  mobileExitOffset: ["start 0.14", "start -0.36"],
  exitDelay: 0.14,
  beatGap: 0.06,
  textEnterOffset: ["start end", "start 0.68"],
  mobileTextEnterOffset: ["start end", "start 0.78"],
  /** Share of enter progress spread across words (higher = slower stagger). */
  wordStaggerSpan: 0.88,
  wordDuration: 0.4,
  wordJitterMs: 60,
  grainOpacity: 0.05,
  imageEnterOffset: ["start end", "center 0.62"],
  mobileImageEnterOffset: ["start end", "start 0.72"],
} as const;

export function delayV4Exit(
  progress: number,
  delay: number = VARIANT_4.exitDelay,
) {
  if (progress <= delay) return 0;
  return Math.min(1, (progress - delay) / (1 - delay));
}

/** Variant 5 — Adire: textile fold panels. */
export const VARIANT_5 = {
  desktopQuery: "(min-width: 768px)",
  enterOffset: ["start end", "start 0.58"],
  exitOffset: ["start 0.12", "start -0.44"],
  mobileEnterOffset: ["start end", "start 0.74"],
  mobileExitOffset: ["start 0.14", "start -0.32"],
  exitDelay: 0.13,
  beatGap: 0.07,
  foldAngleX: 22,
  foldAngleY: 85,
  imageEnterOffset: ["start end", "start 0.56"],
  mobileImageEnterOffset: ["start end", "start 0.72"],
} as const;

export function delayV5Exit(
  progress: number,
  delay: number = VARIANT_5.exitDelay,
) {
  if (progress <= delay) return 0;
  return Math.min(1, (progress - delay) / (1 - delay));
}
