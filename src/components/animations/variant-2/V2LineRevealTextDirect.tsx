"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { VARIANT_2, delayV2Exit } from "@/lib/animations/config";
import { framerOffsetToScrollTrigger } from "@/lib/animations/offset-to-scroll-trigger";
import { ensureGsapScrollTrigger, ScrollTrigger } from "@/lib/gsap/client";

type V2LineRevealTextDirectProps = {
  text: string;
  className?: string;
  mobile?: boolean;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

/**
 * iPhone fallback when CSS view() timelines are unavailable.
 * GSAP writes clip-path / transform / opacity directly on word spans.
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

    ensureGsapScrollTrigger();

    const wordCount = Math.max(words.length, 1);
    const stagger = VARIANT_2.lineTextStaggerSpan / wordCount;
    const duration = VARIANT_2.lineTextWordDuration / wordCount;

    const enterOffset = mobile
      ? VARIANT_2.mobileLineTextEnterOffset
      : VARIANT_2.lineTextEnterOffset;
    const exitOffset = mobile
      ? VARIANT_2.mobileLineTextExitOffset
      : VARIANT_2.lineTextExitOffset;

    const { start: enterStart, end: enterEnd } = framerOffsetToScrollTrigger(
      enterOffset[0],
      enterOffset[1],
    );
    const { start: exitStart, end: exitEnd } = framerOffsetToScrollTrigger(
      exitOffset[0],
      exitOffset[1],
    );

    let enter = 0;
    let exit = 0;
    let scrollDirection: "up" | "down" = "down";
    let lastY = window.scrollY;

    const paint = () => {
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

    const enterTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: enterStart,
      end: enterEnd,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        enter = self.progress;
        paint();
      },
    });

    const exitTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: exitStart,
      end: exitEnd,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        exit = self.progress;
        paint();
      },
    });

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) >= 6) {
        scrollDirection = y > lastY ? "down" : "up";
        lastY = y;
      }
      ScrollTrigger.update();
    };

    enter = enterTrigger.progress;
    exit = exitTrigger.progress;
    paint();
    ScrollTrigger.refresh();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.visualViewport?.addEventListener("scroll", onScroll);

    return () => {
      enterTrigger.kill();
      exitTrigger.kill();
      window.removeEventListener("scroll", onScroll);
      window.visualViewport?.removeEventListener("scroll", onScroll);
    };
  }, [mobile, text, words]);

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
