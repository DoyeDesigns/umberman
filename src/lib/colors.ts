/** Canonical brand palette — keep in sync with :root in globals.css */
export const BRAND = {
  cream: "#EEDCAD",
  orange: "#D74F24",
  navy: "#354396",
  ink: "#1C1C1C",
} as const;

export const BRAND_RGB = {
  cream: "238, 220, 173",
  orange: "215, 79, 36",
  navy: "53, 67, 150",
  ink: "28, 28, 28",
} as const;

export function brandRgba(
  channel: keyof typeof BRAND_RGB,
  alpha: number,
): string {
  return `rgba(${BRAND_RGB[channel]}, ${alpha})`;
}
