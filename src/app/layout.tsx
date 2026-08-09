import type { Metadata } from "next";
import { august, infini, panthoma } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umberman — Babajide Olatunji",
  description:
    "Umberman is a solo art exhibition by Babajide Olatunji at the Fitzrovia Chapel, London. October 15–18, 2026.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${infini.variable} ${august.variable} ${panthoma.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
