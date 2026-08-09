"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useMemo, useRef, type RefObject } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { MobileInViewReveal } from "@/components/animations/MobileInViewReveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollDirection, type ScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import { VARIANT_3, delayV3Exit } from "@/lib/animations/config";

type V3TransmissionTextProps = {
  text: string;
  className?: string;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

type SentenceProps = {
  sentence: string;
  index: number;
  enterProgress: MotionValue<number>;
  exitProgress: MotionValue<number>;
  stagger: number;
  duration: number;
  scrollDirection: ScrollDirection;
  peaksRef: RefObject<number[]>;
};

/**
 * V3-only: each sentence "locks in" from a noisy transmission —
 * blur + chromatic drift + wide tracking resolve to clean type.
 * Not a clip-path word wipe (that's V2).
 */
function TransmissionSentence({
  sentence,
  index,
  enterProgress,
  exitProgress,
  stagger,
  duration,
  scrollDirection,
  peaksRef,
}: SentenceProps) {
  const directionRef = useRef(scrollDirection);
  directionRef.current = scrollDirection;

  const reveal = useTransform([enterProgress, exitProgress], ([enter, exit]) => {
    const raw = clamp((Number(enter) - index * stagger) / duration);
    const prevPeak = peaksRef.current[index] ?? 0;
    if (raw > prevPeak) peaksRef.current[index] = raw;

    const locked =
      scrollDirection === "up" ? Math.max(raw, prevPeak) : raw;

    const exitValue = scrollDirection === "down" ? delayV3Exit(Number(exit)) : 0;
    const exitStagger = stagger * 0.9;
    const exitDuration = duration * 2.2;
    const sentenceExit = clamp(
      (exitValue - index * exitStagger) / exitDuration,
    );

    return locked * (1 - sentenceExit);
  });

  const opacity = useTransform(reveal, (t) => {
    if (t <= 0) return 0;
    return 0.38 + t * 0.62;
  });

  const y = useTransform(reveal, (t) => (1 - t) * 14);

  const skewX = useTransform(reveal, (t) => (1 - t) * 2.5);

  const letterSpacing = useTransform(reveal, (t) => `${(1 - t) * 0.055}em`);

  const filter = useTransform(reveal, (t) => {
    const blur = (1 - t) * (1 - t) * 6;
    return blur > 0.2 ? `blur(${blur}px)` : "blur(0px)";
  });

  const textShadow = useTransform(reveal, (t) => {
    if (t >= 0.88) return "none";
    const split = (1 - t) * 4.5;
    return `${split}px 0 rgba(215,79,36,0.55), ${-split}px 0 rgba(53,67,150,0.5)`;
  });

  const scanLeft = useTransform(reveal, (t) => `${t * 100}%`);

  const scanOpacity = useTransform(reveal, (t) => {
    if (directionRef.current !== "down") return 0;
    if (t <= 0.04 || t >= 0.96) return 0;
    return 0.85;
  });

  const noiseOpacity = useTransform(reveal, (t) => {
    if (directionRef.current !== "down") return 0;
    if (t <= 0.02 || t >= 0.98) return 0;
    return (1 - t) * 0.12;
  });

  return (
    <span className="relative mb-[0.35em] block last:mb-0">
      <motion.span
        className="relative inline-block will-change-[transform,opacity,filter]"
        style={{
          opacity,
          y,
          skewX,
          letterSpacing,
          filter,
          textShadow,
        }}
      >
        {sentence}
      </motion.span>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-px bg-orange"
        style={{ left: scanLeft, opacity: scanOpacity }}
      />

      <motion.span
        aria-hidden
        className="v3-transmission-noise pointer-events-none absolute inset-0"
        style={{ opacity: noiseOpacity }}
      />
    </span>
  );
}

export function V3TransmissionText({
  text,
  className = "",
}: V3TransmissionTextProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_3.desktopQuery);
  const scrollDirection = useScrollDirection();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const peaksRef = useRef<number[]>([]);

  const sentences = useMemo(
    () => text.split(/(?<=[.!?])\s+/).filter(Boolean),
    [text],
  );

  const { scrollYProgress: enterProgress } = useSafeScroll({
    target: wrapperRef,
    offset: [
      ...(isDesktop
        ? VARIANT_3.decodeTextEnterOffset
        : VARIANT_3.mobileDecodeTextEnterOffset),
    ],
  });

  const { scrollYProgress: exitProgress } = useSafeScroll({
    target: wrapperRef,
    offset: [
      ...(isDesktop
        ? VARIANT_3.decodeTextExitOffset
        : VARIANT_3.mobileDecodeTextExitOffset),
    ],
  });

  if (variant !== 3 || reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  if (!scrollMotion) {
    return (
      <MobileInViewReveal className={className}>
        <p className={`break-words ${className}`}>{text}</p>
      </MobileInViewReveal>
    );
  }

  const count = Math.max(sentences.length, 1);
  const stagger = VARIANT_3.transmissionSentenceSpan / count;
  const duration = VARIANT_3.transmissionSentenceDuration / count;

  return (
    <div ref={wrapperRef} className="relative w-full min-w-0 max-w-full overflow-x-clip">
      <div className={`break-words ${className}`}>
        {sentences.map((sentence, index) => (
          <TransmissionSentence
            key={`${index}-${sentence.slice(0, 12)}`}
            sentence={sentence}
            index={index}
            enterProgress={enterProgress}
            exitProgress={exitProgress}
            stagger={stagger}
            duration={duration}
            scrollDirection={scrollDirection}
            peaksRef={peaksRef}
          />
        ))}
      </div>
    </div>
  );
}
