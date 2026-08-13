/** Editorial motion constants — alt page only. */

export const ALT_SCROLL = {
  /** Trigger when element crosses lower ~12% of viewport. */
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.12,
  fallbackMs: 1200,
} as const;

/** Stagger between body paragraphs — magazine pacing. */
export const ALT_BODY_STAGGER = 0.09;

/** Stagger between save-the-date typographic beats. */
export const ALT_STD_STAGGER = 0.11;

export const ALT_LENIS_LERP = 0.088;
