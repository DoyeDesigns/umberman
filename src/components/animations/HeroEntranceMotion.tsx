"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getHeroEntrance,
  v4TitleClipKeyframes,
  type IntroEntranceRole,
} from "@/lib/animations/hero-entrance";

type HeroEntranceMotionProps = {
  children: React.ReactNode;
  role: IntroEntranceRole;
  className?: string;
  style?: React.CSSProperties;
};

export function HeroEntranceMotion({
  children,
  role,
  className,
  style,
}: HeroEntranceMotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const frame = getHeroEntrance(variant, role, reducedMotion);

  if (!ready) {
    return (
      <div className={`overflow-visible ${className ?? ""}`} style={style}>
        {children}
      </div>
    );
  }

  if (variant === 4 && role === "title" && !reducedMotion) {
    const clipFrames = v4TitleClipKeyframes();
    return (
      <motion.div
        className={`overflow-visible pt-[0.08em] ${className ?? ""}`}
        style={style}
        initial={{ opacity: 0, clipPath: clipFrames[0] }}
        animate={{ opacity: 1, clipPath: clipFrames }}
        transition={{
          opacity: { duration: 0.35, delay: frame.transition.delay },
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
          initial={frame.initial}
          animate={frame.animate}
          transition={frame.transition}
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
      initial={frame.initial}
      animate={frame.animate}
      transition={frame.transition}
    >
      {children}
    </motion.div>
  );
}
