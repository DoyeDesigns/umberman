"use client";

import { Motion } from "@/components/animations/Motion";

type SectionHeaderMotionProps = {
  children: React.ReactNode;
  beat?: number;
  className?: string;
};

export function SectionHeaderMotion({
  children,
  beat = 0,
  className,
}: SectionHeaderMotionProps) {
  return (
    <Motion preset="shear" beat={beat} delay={0} className={className}>
      {children}
    </Motion>
  );
}
