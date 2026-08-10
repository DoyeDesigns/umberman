"use client";

import { useSyncExternalStore } from "react";

/** Detect iPhone, iPod, and iPad (incl. iPadOS desktop UA). */
export function readIsIOS(): boolean {
  if (typeof window === "undefined") return false;

  if (document.documentElement.classList.contains("ios")) {
    return true;
  }

  const ua = window.navigator.userAgent;
  const classicIOS = /iPad|iPhone|iPod/.test(ua);
  const iPadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return classicIOS || iPadOS;
}

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return false;
}

/**
 * Sync iOS detection — must match the inline script in layout that sets html.ios
 * before React hydrates, so we never mount the broken Framer path on iPhone.
 */
export function useIsIOS() {
  return useSyncExternalStore(subscribe, readIsIOS, getServerSnapshot);
}
