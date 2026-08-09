"use client";

import { useEffect, useState } from "react";

/** Detect iPhone, iPod, and iPad (incl. iPadOS desktop UA). */
export function readIsIOS(): boolean {
  if (typeof window === "undefined") return false;

  const ua = window.navigator.userAgent;
  const classicIOS = /iPad|iPhone|iPod/.test(ua);
  const iPadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return classicIOS || iPadOS;
}

export function useIsIOS() {
  const [isIOS, setIsIOS] = useState(() => readIsIOS());

  useEffect(() => {
    setIsIOS(readIsIOS());
  }, []);

  return isIOS;
}
