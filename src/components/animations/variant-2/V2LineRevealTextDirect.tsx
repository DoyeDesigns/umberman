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

function boostEnterIfPeeking(rect: DOMRect, vh: number, enter: number) {
  if (enter > 0.02) return enter;
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  if (visible <= 0) return enter;
  const ratio = visible / Math.max(rect.height, 1);
  return Math.max(enter, ratio * 0.85);
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

    let armed = false;

    const paint = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      let enter = computeElementScrollProgress(
        rect,
        vh,
        enterOffset[0],
        enterOffset[1],
      );
      enter = boostEnterIfPeeking(rect, vh, enter);
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

        if (!armed) continue;

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

    const onMove = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) >= 6) {
        scrollDirection = y > lastY ? "down" : "up";
        lastY = y;
      }
      schedulePaint();
    };

    paint();
    requestAnimationFrame(() => {
      armed = true;
      paint();
      schedulePaint();
    });

    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.visualViewport?.addEventListener("scroll", onMove);
    window.visualViewport?.addEventListener("resize", onMove);
    window.addEventListener("load", schedulePaint);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("touchmove", onMove);
      window.visualViewport?.removeEventListener("scroll", onMove);
      window.visualViewport?.removeEventListener("resize", onMove);
      window.removeEventListener("load", schedulePaint);
    };
  }, [mobile, words]);

  return (
    <div ref={wrapperRef} className="relative w-full min-w-0 max-w-full">
      <p className={`break-words ${className}`}>
        {words.map((word, index) => (
          <span key={`${index}-${word.slice(0, 8)}`}>
            <span className="inline-block max-w-full align-bottom">
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
