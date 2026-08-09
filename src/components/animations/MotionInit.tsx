"use client";

import "@/lib/gsap/client";
import "@/lib/motion/safari-scroll-fix";

type MotionInitProps = {
  children: React.ReactNode;
};

/** Client boundary so GSAP + safari scroll fixes run before animated page mounts. */
export function MotionInit({ children }: MotionInitProps) {
  return children;
}
