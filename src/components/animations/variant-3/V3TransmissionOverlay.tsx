"use client";

import { useTransform } from "framer-motion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import type { RefObject } from "react";
import { useRef } from "react";
import { ScrollLinkedDiv } from "@/components/animations/ScrollLinkedDiv";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { useDirectElementScroll } from "@/hooks/useDirectElementScroll";
import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type V3TransmissionOverlayProps = {
  targetRef: RefObject<HTMLElement | null>;
};

function overlayOpacity(progress: number) {
  if (progress <= 0) return 0;
  if (progress < 0.12) return (progress / 0.12) * 0.07;
  if (progress > 0.88) return ((1 - progress) / 0.12) * 0.07;
  return 0.07;
}

export function V3TransmissionOverlay({ targetRef }: V3TransmissionOverlayProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const { useNativeScroll, useStaticFallback } = useIOSAnimationPath();
  const overlayRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useSafeScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 0.07, 0.07, 0]);
  const y = useTransform(scrollYProgress, (p) => (p * 120) % 6);

  useDirectElementScroll(targetRef, {
    enterOffset: ["start start", "end end"],
    enabled: useNativeScroll && variant === 3 && !reducedMotion,
    onUpdate: ({ enter }) => {
      const el = overlayRef.current;
      if (!el) return;
      el.style.opacity = String(overlayOpacity(enter));
      el.style.transform = `translate3d(0, ${(enter * 120) % 6}px, 0)`;
    },
  });

  if (variant !== 3 || reducedMotion) {
    return null;
  }

  if (useStaticFallback) {
    return null;
  }

  if (useNativeScroll) {
    return (
      <div
        ref={overlayRef}
        aria-hidden
        className="v3-transmission-overlay pointer-events-none fixed inset-0 z-40 mix-blend-multiply"
      />
    );
  }

  return (
    <ScrollLinkedDiv
      aria-hidden
      className="v3-transmission-overlay pointer-events-none fixed inset-0 z-40 mix-blend-multiply"
      motionStyle={{ opacity, y }}
    />
  );
}
