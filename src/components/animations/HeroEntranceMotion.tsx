"use client";

import { useLayoutEffect, useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useIsIOS } from "@/hooks/useIsIOS";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getHeroEntrance,
  v4TitleClipKeyframes,
  type IntroEntranceRole,
} from "@/lib/animations/hero-entrance";
import { entranceToGsapTween } from "@/lib/animations/hero-entrance-gsap";
import { ensureGsapScrollTrigger, gsap } from "@/lib/gsap/client";

type HeroEntranceMotionProps = {
  children: React.ReactNode;
  role: IntroEntranceRole;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Hero / LiveAt load sequence.
 * iPhone: pure CSS @keyframes (WebKit-native, no JS animation libs).
 * Desktop: GSAP fromTo.
 */
export function HeroEntranceMotion({
  children,
  role,
  className,
  style,
}: HeroEntranceMotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const isIOS = useIsIOS();

  if (isIOS && !reducedMotion) {
    return (
      <div
        className={`ios-hero-entrance overflow-visible ${className ?? ""}`}
        data-variant={variant}
        data-role={role}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <HeroEntranceMotionDesktop role={role} className={className} style={style}>
      {children}
    </HeroEntranceMotionDesktop>
  );
}

function HeroEntranceMotionDesktop({
  children,
  role,
  className,
  style,
}: HeroEntranceMotionProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

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
      if (reducedMotion) {
        gsap.set(el, { clearProps: "all", opacity: 1 });
        return;
      }

      if (variant === 4 && role === "title") {
        const clipFrames = v4TitleClipKeyframes();
        const delay = Number(frame.transition.delay ?? 0);
        const duration = 1.15;
        gsap.set(el, { opacity: 0, clipPath: clipFrames[0] });
        gsap.to(el, {
          opacity: 1,
          clipPath: clipFrames[clipFrames.length - 1],
          duration,
          delay,
          ease: "power2.out",
        });
        scheduleFailsafe(duration, delay);
        return;
      }

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
  }, [variant, role, reducedMotion]);

  return (
    <div
      ref={ref}
      className={`overflow-visible ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
