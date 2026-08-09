"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Matches Tailwind `md` breakpoint — phones and small tablets in portrait. */
export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}
