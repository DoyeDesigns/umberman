"use client";

import { useEffect, useRef } from "react";
import { ensureGsapScrollTrigger, ScrollTrigger } from "@/lib/gsap/client";

type AltAnimatedPageProps = {
  children: React.ReactNode;
};

/** Alt page shell — scroll motion only; no shared animation variant provider. */
export function AltAnimatedPage({ children }: AltAnimatedPageProps) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsapScrollTrigger();
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);
    const id = window.setTimeout(refresh, 350);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(id);
    };
  }, []);

  return (
    <main ref={mainRef} className="relative w-full max-w-full">
      {children}
    </main>
  );
}
