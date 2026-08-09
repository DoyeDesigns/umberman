import localFont from "next/font/local";

export const infini = localFont({
  src: [
    {
      path: "./fonts/infini-romain.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/infini-gras.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/infini-italique.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-infini",
  display: "swap",
});

export const infiniPicto = localFont({
  src: "./fonts/infini-picto.otf",
  variable: "--font-infini-picto",
  display: "swap",
});

export const august = localFont({
  src: "./fonts/august-bold.ttf",
  weight: "400",
  variable: "--font-august",
  display: "swap",
});

export const panthoma = localFont({
  src: "./fonts/panthoma-trial.otf",
  weight: "400",
  variable: "--font-panthoma",
  display: "swap",
});
