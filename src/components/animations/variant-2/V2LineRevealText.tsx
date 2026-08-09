"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useMemo, useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { MobileInViewReveal } from "@/components/animations/MobileInViewReveal";
import { V2TopExitBlur } from "@/components/animations/variant-2/V2TopExitBlur";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollDirection, type ScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import { VARIANT_2, delayV2Exit } from "@/lib/animations/config";

type V2LineRevealTextProps = {
  text: string;
  className?: string;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

type WordProps = {
  word: string;
  wordIndex: number;
  totalWords: number;
  enterProgress: MotionValue<number>;
  exitProgress: MotionValue<number>;
  stagger: number;
  duration: number;
  scrollDirection: ScrollDirection;
};

function RevealWord({
  word,
  wordIndex,
  totalWords,
  enterProgress,
  exitProgress,
  stagger,
  duration,
  scrollDirection,
}: WordProps) {
  const reveal = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    // Reveal first→last; when enter falls (scroll up), last words hide first.
    const wordEnter = clamp((Number(enter) - wordIndex * stagger) / duration);

    // Top-edge exit only while scrolling down — avoids fighting scroll-up hide.
    const exitValue = scrollDirection === "down" ? Number(exit) : 0;
    const delayedExit = delayV2Exit(exitValue);
    const exitStagger = stagger * 1.35;
    const exitDuration = duration * 2.6;
    const wordExit = clamp(
      (delayedExit - wordIndex * exitStagger * 0.75) / exitDuration,
    );

    return wordEnter * (1 - wordExit);
  });

  const clipPath = useTransform(
    reveal,
    (t) => `inset(0 ${(1 - t) * 100}% 0 0)`,
  );

  const x = useTransform(reveal, (t) => (1 - t) * -14);

  const opacity = useTransform(reveal, (t) => 0.3 + t * 0.7);

  return (
    <span className="inline-block max-w-full overflow-hidden align-bottom">
      <motion.span
        className="inline-block will-change-[transform,opacity]"
        style={{ clipPath, x, opacity }}
      >
        {word}
      </motion.span>
    </span>
  );
}

export function V2LineRevealText({ text, className = "" }: V2LineRevealTextProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_2.desktopQuery);
  const scrollDirection = useScrollDirection();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  const { scrollYProgress: enterProgress } = useSafeScroll({
    target: wrapperRef,
    offset: [
      ...(isDesktop
        ? VARIANT_2.lineTextEnterOffset
        : VARIANT_2.mobileLineTextEnterOffset),
    ],
  });

  const { scrollYProgress: exitProgress } = useSafeScroll({
    target: wrapperRef,
    offset: [
      ...(isDesktop
        ? VARIANT_2.lineTextExitOffset
        : VARIANT_2.mobileLineTextExitOffset),
    ],
  });

  if (variant !== 2 || reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  if (!scrollMotion) {
    return (
      <MobileInViewReveal>
        <p className={`break-words ${className}`}>{text}</p>
      </MobileInViewReveal>
    );
  }

  const wordCount = Math.max(words.length, 1);
  const stagger = VARIANT_2.lineTextStaggerSpan / wordCount;
  const duration = VARIANT_2.lineTextWordDuration / wordCount;

  return (
    <div ref={wrapperRef} className="relative w-full min-w-0 max-w-full overflow-x-clip">
      <p className={`break-words ${className}`}>
        {words.map((word, index) => (
          <span key={`${index}-${word.slice(0, 8)}`}>
            <RevealWord
              key={`${index}-${word.slice(0, 8)}`}
              word={word}
              wordIndex={index}
              totalWords={words.length}
              enterProgress={enterProgress}
              exitProgress={exitProgress}
              stagger={stagger}
              duration={duration}
              scrollDirection={scrollDirection}
            />
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </p>
      <V2TopExitBlur
        exitProgress={exitProgress}
        scrollDirection={scrollDirection}
      />
    </div>
  );
}
