export type V2Preset =
  | "snap"
  | "drift-left"
  | "drift-right"
  | "unfold"
  | "settle"
  | "shear"
  | "orbit"
  | "line";

export type V2ExitStyle = "mist" | "peel" | "collapse" | "flick" | "drift-up";

const EXIT_BY_PRESET: Record<V2Preset, V2ExitStyle> = {
  snap: "flick",
  "drift-left": "peel",
  "drift-right": "peel",
  unfold: "collapse",
  settle: "mist",
  shear: "drift-up",
  orbit: "mist",
  line: "collapse",
};

export type V2Transform = {
  opacity: number;
  x: number;
  y: number;
  scale: number;
  scaleX: number;
  scaleY: number;
  rotate: number;
  skewX: number;
  filter: string;
};

const REST: V2Transform = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  rotate: 0,
  skewX: 0,
  filter: "blur(0px)",
};

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function enterTransform(preset: V2Preset, enter: number): V2Transform {
  const e = 1 - enter;

  switch (preset) {
    case "snap":
      return {
        ...REST,
        opacity: enter,
        y: e * 42,
        rotate: e * -2.2,
        scale: lerp(0.94, 1, enter),
        filter: `blur(${e * 6}px)`,
      };
    case "drift-left":
      return {
        ...REST,
        opacity: enter,
        x: e * -56,
        y: e * 18,
        rotate: e * 1.2,
        filter: `blur(${e * 10}px)`,
      };
    case "drift-right":
      return {
        ...REST,
        opacity: enter,
        x: e * 56,
        y: e * 18,
        rotate: e * -1.2,
        filter: `blur(${e * 10}px)`,
      };
    case "unfold":
      return {
        ...REST,
        opacity: enter,
        scaleY: lerp(0.82, 1, enter),
        y: e * 24,
        filter: `blur(${e * 5}px)`,
      };
    case "settle":
      return {
        ...REST,
        opacity: enter,
        y: e * 64,
        scale: lerp(0.92, 1, enter),
        rotate: e * -0.8,
        filter: `blur(${e * 8}px)`,
      };
    case "shear":
      return {
        ...REST,
        opacity: enter,
        skewX: e * 7,
        y: e * 28,
        x: e * -12,
        filter: `blur(${e * 7}px)`,
      };
    case "orbit":
      return {
        ...REST,
        opacity: enter,
        y: e * 48,
        x: e * 22,
        rotate: e * 4.5,
        scale: lerp(0.9, 1, enter),
        filter: `blur(${e * 9}px)`,
      };
    case "line":
      return {
        ...REST,
        opacity: enter,
        scaleY: enter,
        scaleX: lerp(0.35, 1, enter),
        filter: `blur(${e * 4}px)`,
      };
    default:
      return REST;
  }
}

function exitTransform(style: V2ExitStyle, exit: number): V2Transform {
  switch (style) {
    case "mist":
      return {
        ...REST,
        opacity: 1 - exit * 0.85,
        y: -36 * exit,
        scale: 1 - 0.04 * exit,
        filter: "blur(0px)",
      };
    case "peel":
      return {
        ...REST,
        opacity: 1 - exit * 0.8,
        x: 48 * exit,
        rotate: 6 * exit,
        scale: 1 - 0.03 * exit,
        filter: "blur(0px)",
      };
    case "collapse":
      return {
        ...REST,
        opacity: 1 - exit * 0.85,
        scaleY: 1 - 0.4 * exit,
        y: -20 * exit,
        filter: "blur(0px)",
      };
    case "flick":
      return {
        ...REST,
        opacity: 1 - exit * exit,
        y: -72 * exit,
        scale: 1 - 0.08 * exit,
        rotate: -2 * exit,
      };
    case "drift-up":
      return {
        ...REST,
        opacity: 1 - exit * 0.85,
        y: -52 * exit,
        x: -12 * exit,
        skewX: -3 * exit,
        filter: "blur(0px)",
      };
    default:
      return REST;
  }
}

export function resolveV2Transform(
  preset: V2Preset,
  enter: number,
  exit: number,
  delayedExit?: number,
): V2Transform {
  const clampedEnter = Math.min(1, Math.max(0, enter));
  const clampedExit = Math.min(1, Math.max(0, delayedExit ?? exit));

  if (clampedExit > 0.02) {
    return exitTransform(EXIT_BY_PRESET[preset], clampedExit);
  }

  return enterTransform(preset, clampedEnter);
}
