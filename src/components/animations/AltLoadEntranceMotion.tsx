"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getAltEntrance,
  getAltEntranceInitialTransform,
  type AltEntranceRole,
} from "@/lib/animations/alt-entrance";
import { entranceToGsapTween } from "@/lib/animations/hero-entrance-gsap";
import { gsap } from "@/lib/gsap/client";

type AltLoadEntranceMotionProps = {
  children: React.ReactNode;
  role: AltEntranceRole;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Alt hero / LiveAt load entrance — directional slide-in, runs once on mount.
 */
export function AltLoadEntranceMotion({
  children,
  role,
  className,
  style,
}: AltLoadEntranceMotionProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const animate = !reducedMotion;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const frame = getAltEntrance(role, reducedMotion);
    const { from, to } = entranceToGsapTween(frame);

    gsap.set(el, from);

    const duration = Number(to.duration ?? 0.72);
    const delay = Number(to.delay ?? 0);
    let failsafeId = 0;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        ...to,
        onComplete: () => {
          if (failsafeId) window.clearTimeout(failsafeId);
        },
      });
    }, el);

    failsafeId = window.setTimeout(() => {
      if (!el.isConnected) return;
      const opacity = Number(gsap.getProperty(el, "opacity") ?? 1);
      if (opacity < 0.05) {
        gsap.set(el, { opacity: 1, clearProps: "transform" });
      }
    }, (duration + delay) * 1000 + 400);

    return () => {
      window.clearTimeout(failsafeId);
      ctx.revert();
    };
  }, [role, reducedMotion]);

  return (
    <div
      ref={ref}
      className={`alt-load-entrance ${className ?? ""}`.trim()}
      data-role={role}
      style={
        animate
          ? {
              ...style,
              opacity: 0,
              transform: getAltEntranceInitialTransform(role),
            }
          : style
      }
    >
      {children}
    </div>
  );
}
