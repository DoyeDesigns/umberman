"use client";

import { motion, useTransform } from "framer-motion";
import { useId, useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useScrollEnterProgress } from "@/hooks/useScrollEnterProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { VARIANT_4 } from "@/lib/animations/config";

export type V4FillDirection = "bottom" | "left" | "right" | "center";

type V4PigmentFillTextProps = {
  children: React.ReactNode;
  direction?: V4FillDirection;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

function wavyClipPath(progress: number, direction: V4FillDirection): string {
  const p = Math.min(1, Math.max(0, progress));
  const wave = (pct: number, amp: number) => pct + amp;

  if (direction === "left") {
    const edge = p * 100;
    return `polygon(0 0, ${edge}% 0, ${wave(edge, -1.5)}% 20%, ${wave(edge, 2)}% 40%, ${wave(edge, -2.5)}% 60%, ${wave(edge, 1.5)}% 80%, ${wave(edge, -1)}% 100%, 0 100%)`;
  }

  if (direction === "right") {
    const edge = (1 - p) * 100;
    return `polygon(${edge}% 0, 100% 0, 100% 100%, ${edge}% 100%, ${wave(edge, 1)}% 80%, ${wave(edge, -2)}% 60%, ${wave(edge, 2.5)}% 40%, ${wave(edge, -1.5)}% 20%)`;
  }

  if (direction === "center") {
    const half = p * 50;
    return `polygon(${50 - half}% 0, ${50 + half}% 0, ${50 + half + 1}% 25%, ${50 + half - 0.5}% 50%, ${50 + half + 1.5}% 75%, ${50 + half}% 100%, ${50 - half}% 100%, ${50 - half - 1.5}% 75%, ${50 - half + 0.5}% 50%, ${50 - half - 1}% 25%)`;
  }

  const top = (1 - p) * 100;
  return `polygon(0 100%, 100% 100%, 100% ${wave(top, -2)}%, 82% ${wave(top, 1.5)}%, 64% ${wave(top, -2.5)}%, 46% ${wave(top, 2)}%, 28% ${wave(top, -1.5)}%, 10% ${wave(top, 1)}%, 0 ${wave(top, -1)}%)`;
}

export function V4PigmentFillText({
  children,
  direction = "bottom",
  delay = 0,
  className,
  style,
}: V4PigmentFillTextProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const maskId = useId();
  const scrollYProgress = useScrollEnterProgress(ref, VARIANT_4);

  const progress = useTransform(scrollYProgress, (p) => {
    if (delay >= 1) return 0;
    return Math.min(1, Math.max(0, (p - delay) / (1 - delay)));
  });

  const clipPath = useTransform(progress, (p) => wavyClipPath(p, direction));
  const opacity = useTransform(progress, [0, 0.08, 1], [0, 0.85, 1]);

  if (variant !== 4 || reducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={style}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
      >
        {children}
      </motion.div>
    );
  }

  void maskId;

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={{ clipPath, opacity, willChange: "clip-path, opacity" }}>
        {children}
      </motion.div>
    </div>
  );
}
