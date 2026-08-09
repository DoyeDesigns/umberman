/**
 * Safari/WebKit exposes ScrollTimeline but scroll-linked opacity via Motion's
 * accelerated path is unreliable (motiondivision/motion#3559). Clearing only
 * ScrollTimeline forces Framer's JS scroll path while leaving native CSS
 * view() timelines intact for iOS scroll-driven text reveals.
 *
 * Must run before Framer Motion first reads supportsScrollTimeline().
 */
export function disableBrokenScrollTimelineOnIOS(): void {
  if (typeof window === "undefined") return;

  const ua = window.navigator.userAgent;
  const classicIOS = /iPad|iPhone|iPod/.test(ua);
  const iPadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  if (!classicIOS && !iPadOS) return;

  const w = window as unknown as {
    ScrollTimeline?: unknown;
  };

  w.ScrollTimeline = undefined;
}

// Run at module evaluation on the client bundle.
disableBrokenScrollTimelineOnIOS();
