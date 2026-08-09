"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { readIsIOS } from "@/hooks/useIsIOS";

let registered = false;

export function ensureGsapScrollTrigger() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  if (readIsIOS()) {
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
  }

  registered = true;
}

export { gsap, ScrollTrigger };
