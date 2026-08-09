"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useIntroScroll } from "@/components/animations/IntroScrollContext";
import { MobileInViewReveal } from "@/components/animations/MobileInViewReveal";
import { useScrollEnterProgress } from "@/hooks/useScrollEnterProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import { VARIANT_4 } from "@/lib/animations/config";

type V4InkBleedTextProps = {
  text: string;
  className?: string;
  /** Short inline line (Live At) vs paragraph block. */
  inline?: boolean;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function jitterForIndex(index: number, span: number): number {
  const seed = ((index * 9301 + 49297) % 233280) / 233280;
  return (seed - 0.5) * 2 * span;
}

type InkWordProps = {
  word: string;
  wordIndex: number;
  enterProgress: MotionValue<number>;
  stagger: number;
  duration: number;
  jitter: number;
};

function InkWord({
  word,
  wordIndex,
  enterProgress,
  stagger,
  duration,
  jitter,
}: InkWordProps) {
  const reveal = useTransform(enterProgress, (enter) => {
    const offset = wordIndex * stagger + jitter;
    return clamp((Number(enter) - offset) / duration);
  });

  const opacity = useTransform(reveal, (t) => 0.25 + t * 0.75);
  const colorMix = useTransform(reveal, (t) => {
    const light = 1 - t;
    return `color-mix(in srgb, var(--ink) ${Math.round(t * 100)}%, #8a7a6a ${Math.round(light * 100)}%)`;
  });

  return (
    <motion.span
      className="inline-block will-change-[opacity,color]"
      style={{ opacity, color: colorMix }}
    >
      {word}
    </motion.span>
  );
}

export function V4InkBleedText({
  text,
  className = "",
  inline = false,
}: V4InkBleedTextProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const intro = useIntroScroll();
  const scrollMotion = useScrollMotionEnabled();
  const ref = useRef<HTMLParagraphElement>(null);

  const words = useMemo(
    () => text.split(/\s+/).filter(Boolean),
    [text],
  );

  const jitters = useMemo(
    () =>
      words.map((_, i) =>
        jitterForIndex(i, VARIANT_4.wordJitterMs / 1000 / VARIANT_4.wordDuration),
      ),
    [words],
  );

  const scrollYProgress = useScrollEnterProgress(ref, {
    desktopQuery: VARIANT_4.desktopQuery,
    enterOffset: VARIANT_4.textEnterOffset,
    mobileEnterOffset: VARIANT_4.mobileTextEnterOffset,
  });

  const wordCount = Math.max(words.length, 1);
  const stagger = VARIANT_4.wordStaggerSpan / wordCount;
  const duration = VARIANT_4.wordDuration / wordCount;

  if (variant !== 4 || reducedMotion) {
    return inline ? (
      <span className={className}>{text}</span>
    ) : (
      <p className={className}>{text}</p>
    );
  }

  if (!scrollMotion) {
    const Tag = inline ? "span" : "p";

    if (intro) {
      return <Tag className={className}>{text}</Tag>;
    }

    return (
      <MobileInViewReveal className={className}>
        <Tag className={className}>{text}</Tag>
      </MobileInViewReveal>
    );
  }

  const Tag = inline ? "span" : "p";

  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <InkWord
            word={word}
            wordIndex={index}
            enterProgress={scrollYProgress}
            stagger={stagger}
            duration={duration}
            jitter={jitters[index]}
          />
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
}
