/**
 * Safari/WebKit exposes ScrollTimeline but scroll-linked opacity via Motion's
 * accelerated path is unreliable (motiondivision/motion#3559). Forcing the JS
 * scroll path restores opacity + clip-path scroll reveals on iPhone.
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
    ViewTimeline?: unknown;
  };

  w.ScrollTimeline = undefined;
  w.ViewTimeline = undefined;
}

// Run at module evaluation on the client bundle.
disableBrokenScrollTimelineOnIOS();
