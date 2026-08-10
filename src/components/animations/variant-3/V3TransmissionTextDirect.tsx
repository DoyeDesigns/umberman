"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { VARIANT_3, delayV3Exit } from "@/lib/animations/config";
import { brandRgba } from "@/lib/colors";
import { framerOffsetToScrollTrigger } from "@/lib/animations/offset-to-scroll-trigger";
import { ensureGsapScrollTrigger, ScrollTrigger } from "@/lib/gsap/client";

type V3TransmissionTextDirectProps = {
  text: string;
  className?: string;
  mobile?: boolean;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

type SentenceNode = {
  text: HTMLSpanElement | null;
  scan: HTMLSpanElement | null;
  noise: HTMLSpanElement | null;
};

/**
 * iPhone fallback: GSAP scroll → direct DOM styles per sentence.
 */
export function V3TransmissionTextDirect({
  text,
  className = "",
  mobile = true,
}: V3TransmissionTextDirectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sentenceRefs = useRef<SentenceNode[]>([]);
  const peaksRef = useRef<number[]>([]);

  const sentences = useMemo(
    () => text.split(/(?<=[.!?])\s+/).filter(Boolean),
    [text],
  );

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    ensureGsapScrollTrigger();
    peaksRef.current = [];

    const count = Math.max(sentences.length, 1);
    const stagger = VARIANT_3.transmissionSentenceSpan / count;
    const duration = VARIANT_3.transmissionSentenceDuration / count;

    const enterOffset = mobile
      ? VARIANT_3.mobileDecodeTextEnterOffset
      : VARIANT_3.decodeTextEnterOffset;
    const exitOffset = mobile
      ? VARIANT_3.mobileDecodeTextExitOffset
      : VARIANT_3.decodeTextExitOffset;

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
      for (let index = 0; index < sentences.length; index += 1) {
        const nodes = sentenceRefs.current[index];
        if (!nodes?.text) continue;

        const raw = clamp((enter - index * stagger) / duration);
        const prevPeak = peaksRef.current[index] ?? 0;
        if (raw > prevPeak) peaksRef.current[index] = raw;
        const locked = scrollDirection === "up" ? Math.max(raw, prevPeak) : raw;

        const exitValue = scrollDirection === "down" ? delayV3Exit(exit) : 0;
        const exitStagger = stagger * 0.9;
        const exitDuration = duration * 2.2;
        const sentenceExit = clamp(
          (exitValue - index * exitStagger) / exitDuration,
        );
        const t = locked * (1 - sentenceExit);

        const opacity = t <= 0 ? 0 : 0.38 + t * 0.62;
        const y = (1 - t) * 14;
        const skewX = (1 - t) * 2.5;
        const letterSpacing = `${(1 - t) * 0.055}em`;
        const blur = (1 - t) * (1 - t) * 6;
        const filter = blur > 0.2 ? `blur(${blur}px)` : "blur(0px)";
        const split = t >= 0.88 ? 0 : (1 - t) * 4.5;
        const textShadow =
          split <= 0
            ? "none"
            : `${split}px 0 ${brandRgba("orange", 0.55)}, ${-split}px 0 ${brandRgba("navy", 0.5)}`;

        nodes.text.style.opacity = String(opacity);
        nodes.text.style.transform = `translate3d(0, ${y}px, 0) skewX(${skewX}deg)`;
        nodes.text.style.letterSpacing = letterSpacing;
        nodes.text.style.filter = filter;
        nodes.text.style.textShadow = textShadow;

        if (nodes.scan) {
          const scanVisible =
            scrollDirection === "down" && t > 0.04 && t < 0.96 ? 0.85 : 0;
          nodes.scan.style.left = `${t * 100}%`;
          nodes.scan.style.opacity = String(scanVisible);
        }

        if (nodes.noise) {
          const noiseVisible =
            scrollDirection === "down" && t > 0.02 && t < 0.98
              ? (1 - t) * 0.12
              : 0;
          nodes.noise.style.opacity = String(noiseVisible);
        }
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
  }, [mobile, sentences, text]);

  return (
    <div ref={wrapperRef} className="relative w-full min-w-0 max-w-full overflow-x-hidden">
      <div className={`break-words ${className}`}>
        {sentences.map((sentence, index) => (
          <span
            key={`${index}-${sentence.slice(0, 12)}`}
            className="relative mb-[0.35em] block last:mb-0"
          >
            <span className="relative inline-block">
              <span
                ref={(node) => {
                  const slot = sentenceRefs.current[index] ?? {
                    text: null,
                    scan: null,
                    noise: null,
                  };
                  slot.text = node;
                  sentenceRefs.current[index] = slot;
                }}
                className="relative inline-block will-change-[transform,opacity,filter]"
              >
                {sentence}
              </span>
              <span
                ref={(node) => {
                  const slot = sentenceRefs.current[index] ?? {
                    text: null,
                    scan: null,
                    noise: null,
                  };
                  slot.scan = node;
                  sentenceRefs.current[index] = slot;
                }}
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-px bg-orange"
              />
              <span
                ref={(node) => {
                  const slot = sentenceRefs.current[index] ?? {
                    text: null,
                    scan: null,
                    noise: null,
                  };
                  slot.noise = node;
                  sentenceRefs.current[index] = slot;
                }}
                aria-hidden
                className="v3-transmission-noise pointer-events-none absolute inset-0"
              />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
