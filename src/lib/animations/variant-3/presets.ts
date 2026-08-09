export type V3Preset =
  | "signal"
  | "decode"
  | "scan"
  | "transmit"
  | "lock"
  | "split"
  | "pulse"
  | "sync";

export type V3ExitStyle = "static" | "tear" | "fade" | "drift";

const EXIT_BY_PRESET: Record<V3Preset, V3ExitStyle> = {
  signal: "static",
  decode: "fade",
  scan: "tear",
  transmit: "drift",
  lock: "static",
  split: "tear",
  pulse: "fade",
  sync: "fade",
};

export type V3Transform = {
  opacity: number;
  x: number;
  y: number;
  scale: number;
  skewX: number;
  rotate: number;
  rgbSplit: number;
  clipPath: string;
  filter: string;
};

const REST: V3Transform = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  skewX: 0,
  rotate: 0,
  rgbSplit: 0,
  clipPath: "inset(0 0 0 0)",
  filter: "blur(0px)",
};

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function glitchIntensity(enter: number) {
  const e = 1 - enter;
  return e * e;
}

/** Finish clip-path reveals before scroll progress hits 1 — avoids clipped ascenders. */
function clipProgress(enter: number) {
  return Math.min(1, enter / 0.78);
}

function enterTransform(preset: V3Preset, enter: number): V3Transform {
  const g = glitchIntensity(enter);
  const e = 1 - enter;
  const clip = clipProgress(enter);

  switch (preset) {
    case "signal":
      return {
        ...REST,
        opacity: enter < 0.15 ? (enter % 0.05 > 0.025 ? 0.35 : 1) * enter * 4 : enter,
        y: e * 28,
        rgbSplit: g * 8,
        clipPath: `inset(0 ${(1 - clip) * 100}% 0 0)`,
        filter: `blur(${g * 4}px)`,
      };
    case "decode":
      return {
        ...REST,
        opacity: lerp(0.2, 1, enter),
        y: e * 36,
        x: g * 18 * Math.sin(enter * 24),
        rgbSplit: g * 14,
        skewX: g * 4,
        clipPath: `inset(0 ${(1 - clip) * 100}% 0 0)`,
        filter: `blur(${g * 6}px)`,
      };
    case "scan":
      return {
        ...REST,
        opacity: enter,
        scale: lerp(0.82, 1, enter),
        y: e * 20,
        rgbSplit: g * 6,
        clipPath: `inset(0 ${(1 - clip) * 100}% 0 0)`,
        filter: `blur(${g * 3}px)`,
      };
    case "transmit":
      return {
        ...REST,
        opacity: enter,
        y: e * 52,
        x: g * 26,
        rotate: g * 2.5,
        scale: lerp(0.88, 1, enter),
        rgbSplit: g * 22,
        clipPath: `inset(0 ${(1 - clip) * 55}% 0 ${(1 - clip) * 45}%)`,
        filter: `blur(${g * 8}px)`,
      };
    case "lock":
      return {
        ...REST,
        opacity: enter * enter,
        y: e * 48,
        rgbSplit: g * 10,
        scale: lerp(0.9, 1, enter),
        filter: `blur(${g * 5}px)`,
      };
    case "split":
      return {
        ...REST,
        opacity: enter,
        x: g * -32,
        skewX: g * 8,
        y: e * 24,
        rgbSplit: g * 16,
        clipPath: `inset(0 ${(1 - clip) * 100}% 0 0)`,
        filter: `blur(${g * 5}px)`,
      };
    case "pulse":
      return {
        ...REST,
        opacity: enter,
        x: g * 32,
        skewX: g * -8,
        y: e * 24,
        rgbSplit: g * 16,
        clipPath: `inset(0 0 0 ${(1 - clip) * 100}%)`,
        filter: `blur(${g * 5}px)`,
      };
    case "sync":
      return {
        ...REST,
        opacity: enter,
        scale: lerp(0.55, 1, enter),
        rgbSplit: g * 4,
        filter: `blur(${g * 2}px)`,
      };
    default:
      return REST;
  }
}

function exitTransform(style: V3ExitStyle, exit: number): V3Transform {
  switch (style) {
    case "static":
      return {
        ...REST,
        opacity: 1 - exit * 0.9,
        y: -40 * exit,
        rgbSplit: exit * 10,
        skewX: -4 * exit,
      };
    case "tear":
      return {
        ...REST,
        opacity: 1 - exit * 0.85,
        x: 36 * exit,
        skewX: 8 * exit,
        rgbSplit: exit * 18,
        clipPath: `inset(0 0 ${exit * 35}% 0)`,
      };
    case "drift":
      return {
        ...REST,
        opacity: 1 - exit * 0.88,
        y: -56 * exit,
        x: -16 * exit,
        rgbSplit: exit * 14,
        rotate: -2 * exit,
      };
    case "fade":
    default:
      return {
        ...REST,
        opacity: 1 - exit * 0.82,
        y: -28 * exit,
        rgbSplit: exit * 8,
      };
  }
}

export function resolveV3Transform(
  preset: V3Preset,
  enter: number,
  exit: number,
  delayedExit?: number,
): V3Transform {
  const clampedEnter = Math.min(1, Math.max(0, enter));
  const clampedExit = Math.min(1, Math.max(0, delayedExit ?? exit));

  if (clampedExit > 0.02) {
    return exitTransform(EXIT_BY_PRESET[preset], clampedExit);
  }

  return enterTransform(preset, clampedEnter);
}

export const V3_PRESET_FROM_V2 = {
  snap: "lock",
  "drift-left": "split",
  "drift-right": "pulse",
  unfold: "scan",
  settle: "decode",
  shear: "split",
  orbit: "transmit",
  line: "sync",
} as const;
