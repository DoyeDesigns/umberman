export type PageDesign = "default" | "alt" | "alt2";

export type AltLogoStyle = "bars" | "circle-u";

export type AltCtaLayout = "triple" | "pair";

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
  logo: AltLogoStyle;
  ctaLayout: AltCtaLayout;
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
  logoCircle: {
    sizeMobile: number;
    sizeDesktop: number;
    borderWidth: number;
    letterSizeMobile: number;
    letterSizeDesktop: number;
  };
};

export const ALT_THEMES: Record<"alt" | "alt2", AltTheme> = {
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
    logo: "bars",
    ctaLayout: "triple",
    ctaRsvp: "#CC587A",
    ctaPressKit: "#BD6942",
    ctaRegister: "#253178",
    ctaEnquiry: "#AD7911",
    logoBar: {
      width: 81,
      widthMobile: 63,
      height: 7.788461208343506,
      radius: 15.58,
      gap: 10,
    },
    logoCircle: {
      sizeMobile: 56,
      sizeDesktop: 88,
      borderWidth: 2,
      letterSizeMobile: 22,
      letterSizeDesktop: 30,
    },
  },
  alt2: {
    bg: "#354395",
    name: "#FABC43",
    orange: "#EB8353",
    presents: "#F1F1F1",
    light: "#F1F1F1",
    text: "#1C1C1C",
    textMuted: "rgb(28 28 28 / 0.7)",
    portrait: { maxWidth: 1275, maxHeight: 850 },
    ctaMaxWidth: 546,
    logo: "circle-u",
    ctaLayout: "pair",
    ctaRsvp: "#CC587A",
    ctaPressKit: "#BD6942",
    ctaRegister: "#253178",
    ctaEnquiry: "#AD7911",
    logoBar: {
      width: 81,
      widthMobile: 63,
      height: 7.788461208343506,
      radius: 15.58,
      gap: 10,
    },
    logoCircle: {
      sizeMobile: 56,
      sizeDesktop: 88,
      borderWidth: 2,
      letterSizeMobile: 22,
      letterSizeDesktop: 30,
    },
  },
};

/** @deprecated Use ALT_THEMES.alt */
export const ALT_DESIGN = ALT_THEMES.alt;

export function isAltDesign(design: PageDesign): design is "alt" | "alt2" {
  return design === "alt" || design === "alt2";
}

export function getAltTheme(design: PageDesign): AltTheme | null {
  if (design === "alt" || design === "alt2") return ALT_THEMES[design];
  return null;
}
