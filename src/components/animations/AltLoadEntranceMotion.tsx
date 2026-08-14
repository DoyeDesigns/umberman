"use client";

import { useLayoutEffect, useRef } from "react";
import { useClientReady } from "@/hooks/useClientReady";
import { useIsIOS } from "@/hooks/useIsIOS";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  ALT_ENTRANCE_DELAY,
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

function roleDurationMs(role: AltEntranceRole): number {
  switch (role) {
    case "logo":
      return 680;
    case "name":
    case "presents":
    case "liveAtCall":
      return 720;
    case "title":
    case "liveAtResponse":
      return 780;
  }
}

function roleDelayMs(role: AltEntranceRole): number {
  return ALT_ENTRANCE_DELAY[role] * 1000;
}

/**
 * Alt hero / LiveAt load entrance — directional slide-in, runs once on mount.
 * On iPhone uses pure CSS keyframes (GSAP unreliable in WebKit).
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

  const useIosCss = ready && isIOS && !reducedMotion;
  const useGsap = ready && !isIOS && !reducedMotion;

  useLayoutEffect(() => {
    if (!useIosCss) return;
    const el = ref.current;
    if (!el) return;

    const delayMs = roleDelayMs(role);
    const durationMs = roleDurationMs(role);
    const failsafeId = window.setTimeout(() => {
      if (!el.isConnected) return;
      el.style.opacity = "1";
      el.style.transform = "none";
    }, delayMs + durationMs + 250);

    return () => window.clearTimeout(failsafeId);
  }, [role, useIosCss]);

  useLayoutEffect(() => {
    if (!useGsap) return;
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
  }, [role, reducedMotion, useGsap]);

  if (reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  if (!ready) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  if (useIosCss) {
    return (
      <div
        ref={ref}
        className={`ios-alt-entrance ${className ?? ""}`.trim()}
        data-role={role}
        style={style}
      >
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
