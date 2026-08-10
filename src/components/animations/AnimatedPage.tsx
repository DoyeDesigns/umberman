"use client";

import { useEffect, useRef } from "react";
import { AnimationVariantProvider } from "@/components/animations/AnimationVariantProvider";
import { ensureGsapScrollTrigger, ScrollTrigger } from "@/lib/gsap/client";
import type { AnimationVariant } from "@/lib/animations/config";

type AnimatedPageProps = {
  variant: AnimationVariant;
  children: React.ReactNode;
};

export function AnimatedPage({ variant, children }: AnimatedPageProps) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (variant !== 2) return;
    ensureGsapScrollTrigger();
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);
    const id = window.setTimeout(refresh, 350);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(id);
    };
  }, [variant]);

  return (
    <AnimationVariantProvider variant={variant}>
      <main ref={mainRef} className="relative w-full max-w-full">
        {children}
      </main>
    </AnimationVariantProvider>
  );
}
