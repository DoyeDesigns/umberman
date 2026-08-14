"use client";

import { useLayoutEffect, useRef } from "react";
import { useClientReady } from "@/hooks/useClientReady";
import { readIsIOS, useIsIOS } from "@/hooks/useIsIOS";
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
 * Alt load entrance. iPhone path matches V2Motion: visible markup, never opacity 0.
 * Desktop keeps GSAP.
 */
export function AltLoadEntranceMotion({
  children,
  role,
  className,
  style,
}: AltLoadEntranceMotionProps) {
  const reducedMotion = useReducedMotion();
  const ready = useClientReady();
  const isIOS = useIsIOS();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !ready || reducedMotion || readIsIOS()) return;

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
  }, [role, reducedMotion, ready]);

  if (reducedMotion || !ready || isIOS) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`alt-load-entrance ${className ?? ""}`.trim()}
      data-role={role}
      style={{
        ...style,
        opacity: 0,
        transform: getAltEntranceInitialTransform(role),
      }}
    >
      {children}
    </div>
  );
}
