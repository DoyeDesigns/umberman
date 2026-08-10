"use client";

import { useEffect, useState } from "react";
import { useIsIOS } from "@/hooks/useIsIOS";

export function readViewTimelineSupported(): boolean {
  if (typeof window === "undefined" || typeof CSS === "undefined") return false;
  return CSS.supports("animation-timeline", "view()");
}

/** Use native CSS scroll-driven reveals on iPhone (WebKit view timelines). */
export function useCssScrollReveal() {
  const isIOS = useIsIOS();
  const [viewSupported, setViewSupported] = useState(() => readViewTimelineSupported());

  useEffect(() => {
    setViewSupported(readViewTimelineSupported());
  }, []);

  return {
    isIOS,
    viewSupported,
    /** iOS + view() — CSS scroll-driven text (no Framer/GSAP MotionValues). */
    useCssPath: isIOS && viewSupported,
    /** iOS without view() — GSAP writes styles directly on DOM nodes. */
    useDirectPath: isIOS && !viewSupported,
  };
}
