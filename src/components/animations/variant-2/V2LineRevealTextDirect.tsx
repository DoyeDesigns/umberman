"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { VARIANT_2, delayV2Exit } from "@/lib/animations/config";
import { computeElementScrollProgress } from "@/lib/animations/scroll-progress";

type V2LineRevealTextDirectProps = {
  text: string;
  className?: string;
  mobile?: boolean;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

/**
 * iPhone scroll word-wipe — pure scroll listener + getBoundingClientRect.
 * No Framer, no GSAP, no CSS view() timelines.
 */
export function V2LineRevealTextDirect({
  text,
  className = "",
  mobile = true,
}: V2LineRevealTextDirectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const wordCount = Math.max(words.length, 1);
    const stagger = VARIANT_2.lineTextStaggerSpan / wordCount;
    const duration = VARIANT_2.lineTextWordDuration / wordCount;

    const enterOffset = mobile
      ? VARIANT_2.mobileLineTextEnterOffset
      : VARIANT_2.lineTextEnterOffset;
    const exitOffset = mobile
      ? VARIANT_2.mobileLineTextExitOffset
      : VARIANT_2.lineTextExitOffset;

    let scrollDirection: "up" | "down" = "down";
    let lastY = window.scrollY;
    let rafId = 0;

    const paint = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const enter = computeElementScrollProgress(
        rect,
        vh,
        enterOffset[0],
        enterOffset[1],
      );
      const exit = computeElementScrollProgress(
        rect,
        vh,
        exitOffset[0],
        exitOffset[1],
      );

      for (let i = 0; i < words.length; i += 1) {
        const span = wordRefs.current[i];
        if (!span) continue;

        const wordEnter = clamp((enter - i * stagger) / duration);
        const exitValue = scrollDirection === "down" ? exit : 0;
        const delayedExit = delayV2Exit(exitValue);
        const exitStagger = stagger * 1.35;
        const exitDuration = duration * 2.6;
        const wordExit = clamp(
          (delayedExit - i * exitStagger * 0.75) / exitDuration,
        );
        const t = wordEnter * (1 - wordExit);

        span.style.clipPath = `inset(0 ${(1 - t) * 100}% 0 0)`;
        span.style.transform = `translate3d(${(1 - t) * -14}px, 0, 0)`;
        span.style.opacity = String(0.3 + t * 0.7);
      }
    };

    const schedulePaint = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        paint();
      });
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) >= 6) {
        scrollDirection = y > lastY ? "down" : "up";
        lastY = y;
      }
      schedulePaint();
    };

    paint();
    schedulePaint();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.visualViewport?.addEventListener("scroll", onScroll);
    window.visualViewport?.addEventListener("resize", onScroll);
    window.addEventListener("load", schedulePaint);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("scroll", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
      window.removeEventListener("load", schedulePaint);
    };
  }, [mobile, words]);

  return (
    <div ref={wrapperRef} className="relative w-full min-w-0 max-w-full overflow-x-hidden">
      <p className={`break-words ${className}`}>
        {words.map((word, index) => (
          <span key={`${index}-${word.slice(0, 8)}`}>
            <span className="inline-block max-w-full overflow-hidden align-bottom">
              <span
                ref={(node) => {
                  wordRefs.current[index] = node;
                }}
                className="inline-block will-change-[transform,opacity,clip-path]"
              >
                {word}
              </span>
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </p>
    </div>
  );
}
