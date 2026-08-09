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
    /** Prefer CSS path on iOS when view timelines are available. */
    useCssPath: isIOS && viewSupported,
    /** iOS without view() — render markup with static visible fallback. */
    useFallbackVisible: isIOS && !viewSupported,
  };
}
