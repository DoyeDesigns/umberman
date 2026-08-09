"use client";

import "@/lib/motion/safari-scroll-fix";

type MotionInitProps = {
  children: React.ReactNode;
};

/** Client boundary so safari-scroll-fix runs before animated page mounts. */
export function MotionInit({ children }: MotionInitProps) {
  return children;
}
