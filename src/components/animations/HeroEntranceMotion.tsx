"use client";

import { useLayoutEffect, useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { V1EnterMotion } from "@/components/animations/V1EnterMotion";
import { useClientReady } from "@/hooks/useClientReady";
import { useIsIOS } from "@/hooks/useIsIOS";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getHeroEntrance,
  HERO_ENTRANCE_DELAY,
  LIVE_AT_ENTRANCE_DELAY,
  type IntroEntranceRole,
} from "@/lib/animations/hero-entrance";
import { entranceToGsapTween } from "@/lib/animations/hero-entrance-gsap";
import { roleToAnimista } from "@/lib/animations/v1-animista";
import { ensureGsapScrollTrigger, gsap } from "@/lib/gsap/client";

type HeroEntranceMotionProps = {
  children: React.ReactNode;
  role: IntroEntranceRole;
  className?: string;
  style?: React.CSSProperties;
};

function roleDelay(role: IntroEntranceRole): number {
  if (role === "liveAtCall" || role === "liveAtResponse") {
    return LIVE_AT_ENTRANCE_DELAY[role];
  }
  return HERO_ENTRANCE_DELAY[role];
}

function roleDelayMs(role: IntroEntranceRole): number {
  return roleDelay(role) * 1000;
}

function roleDurationMs(role: IntroEntranceRole): number {
  const isTitle = role === "title" || role === "liveAtResponse";
  return (isTitle ? 0.95 : 0.78) * 1000;
}

export function HeroEntranceMotion({
  children,
  role,
  className,
  style,
}: HeroEntranceMotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const ready = useClientReady();
  const isIOS = useIsIOS();
  const ref = useRef<HTMLDivElement>(null);

  const useIosCssHero = ready && isIOS && !reducedMotion && variant !== 1;

  useLayoutEffect(() => {
    if (variant === 1) return;
    const el = ref.current;
    if (!el || !ready || !isIOS || reducedMotion) return;

    const delayMs = roleDelayMs(role);
    const durationMs = roleDurationMs(role);
    const failsafeId = window.setTimeout(() => {
      if (!el.isConnected) return;
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      el.style.clipPath = "none";
    }, delayMs + durationMs + 250);

    return () => window.clearTimeout(failsafeId);
  }, [variant, role, reducedMotion, isIOS, ready]);

  useLayoutEffect(() => {
    if (variant === 1) return;
    const el = ref.current;
    if (!el || !ready || isIOS || reducedMotion) return;

    ensureGsapScrollTrigger();

    const frame = getHeroEntrance(variant, role, reducedMotion);
    let failsafeId = 0;

    const clearFailsafe = () => {
      if (failsafeId) window.clearTimeout(failsafeId);
    };

    const scheduleFailsafe = (duration: number, delay: number) => {
      clearFailsafe();
      failsafeId = window.setTimeout(() => {
        if (!el.isConnected) return;
        const opacity = Number(gsap.getProperty(el, "opacity") ?? 1);
        if (opacity < 0.05) {
          gsap.set(el, { opacity: 1, clearProps: "filter,clipPath,transform" });
        }
      }, (duration + delay) * 1000 + 400);
    };

    const ctx = gsap.context(() => {
      const { from, to } = entranceToGsapTween(frame);
      const duration = Number(to.duration ?? 0.72);
      const delay = Number(to.delay ?? 0);
      gsap.fromTo(el, from, {
        ...to,
        onComplete: clearFailsafe,
      });
      scheduleFailsafe(duration, delay);
    }, el);

    return () => {
      clearFailsafe();
      ctx.revert();
    };
  }, [variant, role, reducedMotion, isIOS, ready]);

  if (variant === 1) {
    return (
      <V1EnterMotion
        animation={roleToAnimista(role)}
        delay={roleDelay(role)}
        className={className}
        style={style}
      >
        {children}
      </V1EnterMotion>
    );
  }

  return (
    <div
      ref={ref}
      className={`${useIosCssHero ? "ios-hero-entrance" : ""} ${className ?? ""}`.trim()}
      data-variant={useIosCssHero ? variant : undefined}
      data-role={useIosCssHero ? role : undefined}
      style={style}
    >
      {children}
    </div>
  );
}
