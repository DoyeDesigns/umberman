"use client";

import { useEffect, useRef } from "react";

type AltRevealFrom = "up" | "left" | "right";

type AltFadeUpRevealProps = {
  children: React.ReactNode;
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

/** Hidden in CSS until this element enters the viewport, then a CSS keyframe runs. */
export function AltFadeUpReveal({
  children,
  className,
  style,
  delay = 0,
  from = "up",
}: AltFadeUpRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

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

    if (isOnScreen()) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 20% 0px",
      },
    );

    observer.observe(el);

    const onLoad = () => {
      if (isOnScreen()) reveal();
    };
    window.addEventListener("load", onLoad);
    window.addEventListener("pageshow", onLoad);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", onLoad);
      window.removeEventListener("pageshow", onLoad);
    };
  }, []);

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
