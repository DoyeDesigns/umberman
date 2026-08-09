"use client";

import { motion } from "framer-motion";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getHeroEntrance,
  v4TitleClipKeyframes,
  type EntranceFrame,
  type IntroEntranceRole,
} from "@/lib/animations/hero-entrance";

type HeroEntranceMotionProps = {
  children: React.ReactNode;
  role: IntroEntranceRole;
  className?: string;
  style?: React.CSSProperties;
};

const SCROLL_DRIVEN_VARIANTS = new Set([2, 3, 4, 5]);

function withoutOpacity(frame: EntranceFrame): EntranceFrame {
  return {
    initial: { ...frame.initial, opacity: 1 },
    animate: { ...frame.animate, opacity: 1 },
    transition: frame.transition,
  };
}

export function HeroEntranceMotion({
  children,
  role,
  className,
  style,
}: HeroEntranceMotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();

  if (variant === 0) {
    return (
      <div className={`overflow-visible ${className ?? ""}`} style={style}>
        {children}
      </div>
    );
  }

  const frame = getHeroEntrance(variant, role, reducedMotion);
  const entrance = SCROLL_DRIVEN_VARIANTS.has(variant) && !reducedMotion
    ? withoutOpacity(frame)
    : frame;

  if (variant === 4 && role === "title" && !reducedMotion) {
    const clipFrames = v4TitleClipKeyframes();
    return (
      <motion.div
        className={`overflow-visible pt-[0.08em] ${className ?? ""}`}
        style={style}
        initial={{ opacity: 1, clipPath: clipFrames[0] }}
        animate={{ opacity: 1, clipPath: clipFrames }}
        transition={{
          clipPath: {
            duration: 1.15,
            delay: Number(frame.transition.delay ?? 0),
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.35, 0.72, 1],
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === 5 && !reducedMotion) {
    return (
      <div
        className={className}
        style={{ perspective: 1000, ...style }}
      >
        <motion.div
          className="relative overflow-visible"
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
          initial={entrance.initial}
          animate={entrance.animate}
          transition={entrance.transition}
        >
          {children}
          <motion.div
            aria-hidden
            className="v5-fold-crease pointer-events-none absolute inset-x-0 top-0 h-8"
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 0 }}
            transition={{
              duration: 0.65,
              delay: Number(frame.transition.delay ?? 0) + 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={`overflow-visible ${className ?? ""}`}
      style={style}
      initial={entrance.initial}
      animate={entrance.animate}
      transition={entrance.transition}
    >
      {children}
    </motion.div>
  );
}
