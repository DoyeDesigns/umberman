import localFont from "next/font/local";

export const infini = localFont({
  src: [
    {
      path: "./fonts/infini-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/infini-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/infini-italic.otf",
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
  src: "./fonts/August-Bold.otf",
  weight: "400",
  variable: "--font-august",
  display: "swap",
});

export const panthoma = localFont({
  src: "./fonts/TC-Panthoma-Regular.otf",
  weight: "400",
  variable: "--font-panthoma",
  display: "swap",
});
