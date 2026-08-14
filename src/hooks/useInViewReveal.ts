"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewRevealOptions = {
  enabled?: boolean;
  /** If an in-view element is missed by IntersectionObserver, reveal it after this delay. Off-screen elements stay hidden. */
  fallbackMs?: number;
};

export function useInViewReveal({
  enabled = true,
  fallbackMs = 900,
}: UseInViewRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setRevealed(true);
      return;
    }

    setRevealed(false);

    const el = ref.current;
    if (!el) return;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setRevealed(true);
    };

    const isInViewport = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < vh * 0.92 && rect.bottom > 0;
    };

    const check = () => {
      if (isInViewport()) reveal();
    };

    const fallback = window.setTimeout(() => {
      if (isInViewport()) reveal();
    }, fallbackMs);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      },
      {
        threshold: 0,
        root: null,
        rootMargin: "40px 0px 40px 0px",
      },
    );

    observer.observe(el);
    check();
    requestAnimationFrame(check);

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener("touchmove", check, { passive: true });
    window.visualViewport?.addEventListener("scroll", check);
    window.visualViewport?.addEventListener("resize", check);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.removeEventListener("touchmove", check);
      window.visualViewport?.removeEventListener("scroll", check);
      window.visualViewport?.removeEventListener("resize", check);
    };
  }, [enabled, fallbackMs]);

  return { ref, revealed };
}
