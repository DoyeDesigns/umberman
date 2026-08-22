import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { MotionInit } from "@/components/animations/MotionInit";
import { august, infini, panthoma } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umberman — Babajide Olatunji",
  description:
    "Umberman is a solo art exhibition by Babajide Olatunji at the Fitzrovia Chapel, London. September 21–24, 2026.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
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
