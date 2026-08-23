"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";

type AltRevealFrom = "up" | "left" | "right";

type AltFadeUpRevealProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  from?: AltRevealFrom;
};

const FROM_CLASS: Record<AltRevealFrom, string> = {
  up: "alt-fade-up",
  left: "alt-slide-left",
  right: "alt-slide-right",
};

function useInViewReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      el.classList.add("is-inview");
    };

    const isOnScreen = () => {
      const rect = el.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 30% 0px",
      },
    );

    observer.observe(el);

    const check = () => {
      if (isOnScreen()) reveal();
    };
    check();
    const raf = requestAnimationFrame(check);
    window.addEventListener("load", check);
    window.addEventListener("pageshow", check);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("load", check);
      window.removeEventListener("pageshow", check);
    };
  }, [ref]);
}

/** Hidden in CSS until this element enters the viewport, then a CSS keyframe runs. */
export function AltFadeUpReveal({
  children,
  className,
  style,
  delay = 0,
  from = "up",
}: AltFadeUpRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useInViewReveal(ref);

  return (
    <div
      ref={ref}
      className={`${FROM_CLASS[from]} ${className ?? ""}`.trim()}
      style={{
        ...style,
        ["--alt-fade-delay" as string]: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/** Reveals every child fade-up together so none stay hidden. */
export function AltStaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useInViewReveal(ref);

  return (
    <div ref={ref} className={`alt-stagger-group ${className ?? ""}`.trim()}>
      {children}
    </div>
  );
}
