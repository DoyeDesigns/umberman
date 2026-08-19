export type AltTheme = {
  bg: string;
  name: string;
  orange: string;
  presents: string;
  light: string;
  text: string;
  textMuted: string;
  portrait: { maxWidth: number; maxHeight: number };
  ctaMaxWidth: number;
  ctaRsvp: string;
  ctaPressKit: string;
  ctaRegister: string;
  ctaEnquiry: string;
  logoBar: {
    width: number;
    widthMobile: number;
    height: number;
    radius: number;
    gap: number;
  };
};

export const ALT_THEMES = {
  alt: {
    bg: "#18225E",
    name: "#FABC43",
    orange: "#BD6942",
    presents: "#F1F1F1",
    light: "#F1F1F1",
    text: "#1C1C1C",
    textMuted: "rgb(28 28 28 / 0.7)",
    portrait: { maxWidth: 1275, maxHeight: 850 },
    ctaMaxWidth: 546,
    ctaRsvp: "#CC587A",
    ctaPressKit: "#BD6942",
    ctaRegister: "#253178",
    ctaEnquiry: "#AD7911",
    logoBar: {
      width: 48,
      widthMobile: 38,
      height: 4.7,
      radius: 9.4,
      gap: 6,
    },
  },
} as const satisfies Record<string, AltTheme>;
