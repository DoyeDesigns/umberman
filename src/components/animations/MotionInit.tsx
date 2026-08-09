"use client";

import { useLayoutEffect } from "react";
import { ensureGsapScrollTrigger, ScrollTrigger } from "@/lib/gsap/client";
import "@/lib/motion/safari-scroll-fix";

type MotionInitProps = {
  children: React.ReactNode;
};

/** Client boundary so GSAP + safari scroll fixes run before animated page mounts. */
export function MotionInit({ children }: MotionInitProps) {
  useLayoutEffect(() => {
    ensureGsapScrollTrigger();
    ScrollTrigger.refresh();

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.visualViewport?.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.visualViewport?.removeEventListener("resize", refresh);
    };
  }, []);

  return children;
}
