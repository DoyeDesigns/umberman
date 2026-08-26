import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { MotionInit } from "@/components/animations/MotionInit";
import { august, infini, panthoma } from "./fonts";
import "./globals.css";

const title = "Umberman — Babajide Olatunji";
const description =
  "Umberman is a solo art exhibition by Babajide Olatunji at the Fitzrovia Chapel, London. September 21–24, 2026.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Umberman",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title,
    description,
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Umberman",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/android-chrome-512x512.png"],
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#18225E",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${infini.variable} ${august.variable} ${panthoma.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Script
          id="ios-detect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var ua=navigator.userAgent;var ios=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);if(ios)document.documentElement.classList.add('ios');}catch(e){}})();`,
          }}
        />
        <MotionInit>{children}</MotionInit>
      </body>
    </html>
  );
}
