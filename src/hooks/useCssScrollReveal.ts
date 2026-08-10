"use client";

import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";

/** @deprecated Prefer useIOSAnimationPath */
export function useCssScrollReveal() {
  const { isIOS, useNativeScroll } = useIOSAnimationPath();

  return {
    isIOS,
    viewSupported: false,
    useCssPath: false,
    useDirectPath: useNativeScroll,
  };
}
