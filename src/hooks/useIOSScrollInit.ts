"use client";

import { useEffect } from "react";

/** Kick Safari/iOS scroll measurements so Framer useScroll gets an initial value. */
export function useIOSScrollInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const kick = () => {
      window.dispatchEvent(new Event("scroll"));
    };

    kick();
    requestAnimationFrame(kick);
    const timer = window.setTimeout(kick, 120);
    return () => window.clearTimeout(timer);
  }, []);
}
