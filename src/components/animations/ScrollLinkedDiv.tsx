"use client";

import { type MotionValue } from "framer-motion";
import { useCallback, useLayoutEffect, useState, type CSSProperties } from "react";
import { readIsIOS } from "@/hooks/useIsIOS";
import { ensureGsapScrollTrigger, ScrollTrigger } from "@/lib/gsap/client";

export type ScrollLinkedMotionStyle = {
  opacity?: MotionValue<number>;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
  scale?: MotionValue<number>;
  scaleX?: MotionValue<number>;
  scaleY?: MotionValue<number>;
  rotate?: MotionValue<number>;
  rotateX?: MotionValue<number>;
  rotateY?: MotionValue<number>;
  skewX?: MotionValue<number>;
  filter?: MotionValue<string>;
  clipPath?: MotionValue<string>;
  textShadow?: MotionValue<string>;
  letterSpacing?: MotionValue<string>;
  left?: MotionValue<string>;
  color?: MotionValue<string>;
  zIndex?: MotionValue<number>;
  backdropFilter?: MotionValue<string>;
};

type ScrollLinkedDivProps = {
  children?: React.ReactNode;
  className?: string;
  motionStyle?: ScrollLinkedMotionStyle;
  staticStyle?: CSSProperties;
  as?: "div" | "span" | "p";
} & Omit<React.HTMLAttributes<HTMLElement>, "style" | "children" | "className">;

function readMotionStyle(input: ScrollLinkedMotionStyle): CSSProperties {
  const x = input.x?.get() ?? 0;
  const y = input.y?.get() ?? 0;
  const scale = input.scale?.get() ?? 1;
  const scaleX = input.scaleX?.get() ?? 1;
  const scaleY = input.scaleY?.get() ?? 1;
  const rotate = input.rotate?.get() ?? 0;
  const rotateX = input.rotateX?.get() ?? 0;
  const rotateY = input.rotateY?.get() ?? 0;
  const skewX = input.skewX?.get() ?? 0;

  const transforms = [
    x || y ? `translate3d(${x}px, ${y}px, 0)` : "",
    rotateX ? `rotateX(${rotateX}deg)` : "",
    rotateY ? `rotateY(${rotateY}deg)` : "",
    scale !== 1 ? `scale(${scale})` : "",
    scaleX !== 1 ? `scaleX(${scaleX})` : "",
    scaleY !== 1 ? `scaleY(${scaleY})` : "",
    rotate ? `rotate(${rotate}deg)` : "",
    skewX ? `skewX(${skewX}deg)` : "",
  ].filter(Boolean);

  const backdrop = input.backdropFilter?.get();
  const opacity = input.opacity?.get();

  return {
    opacity: opacity ?? undefined,
    zIndex: input.zIndex?.get(),
    transform: transforms.length ? transforms.join(" ") : undefined,
    filter: input.filter?.get(),
    clipPath: input.clipPath?.get(),
    textShadow: input.textShadow?.get(),
    letterSpacing: input.letterSpacing?.get(),
    left: input.left?.get(),
    color: input.color?.get(),
    backdropFilter: backdrop,
    WebkitBackdropFilter: backdrop,
    willChange: "transform, opacity, filter",
  };
}

function useScrollLinkedStyle(
  motionStyle?: ScrollLinkedMotionStyle,
  staticStyle?: CSSProperties,
): CSSProperties {
  const [resolved, setResolved] = useState<CSSProperties>(() => ({
    ...staticStyle,
    ...(motionStyle ? readMotionStyle(motionStyle) : {}),
  }));

  const sync = useCallback(() => {
    setResolved({
      ...staticStyle,
      ...(motionStyle ? readMotionStyle(motionStyle) : {}),
    });
  }, [motionStyle, staticStyle]);

  useLayoutEffect(() => {
    sync();

    if (!motionStyle) return;

    const values = Object.values(motionStyle).filter(
      (value): value is MotionValue<number> | MotionValue<string> =>
        value != null,
    );

    const unsubs = values.map((value) => value.on("change", sync));

    ensureGsapScrollTrigger();
    const onScrollTrigger = () => sync();
    ScrollTrigger.addEventListener("refresh", onScrollTrigger);

    const raf1 = requestAnimationFrame(() => {
      sync();
      requestAnimationFrame(sync);
    });

    const onScroll = () => sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.visualViewport?.addEventListener("scroll", onScroll);
    window.visualViewport?.addEventListener("resize", onScroll);

    let rafLoop = 0;
    let frames = 0;
    const iosLoop = () => {
      sync();
      frames += 1;
      if (frames < 90) {
        rafLoop = requestAnimationFrame(iosLoop);
      }
    };

    if (readIsIOS()) {
      rafLoop = requestAnimationFrame(iosLoop);
    }

    return () => {
      for (const unsub of unsubs) unsub();
      ScrollTrigger.removeEventListener("refresh", onScrollTrigger);
      cancelAnimationFrame(raf1);
      if (rafLoop) cancelAnimationFrame(rafLoop);
      window.removeEventListener("scroll", onScroll);
      window.visualViewport?.removeEventListener("scroll", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
    };
  }, [motionStyle, sync]);

  return resolved;
}

/**
 * Plain DOM surface for scroll-linked MotionValues. Avoids motion.div opacity
 * bugs on iPhone WebKit while keeping existing transform math.
 */
export function ScrollLinkedDiv({
  children,
  className,
  motionStyle,
  staticStyle,
  as = "div",
  ...rest
}: ScrollLinkedDivProps) {
  const resolved = useScrollLinkedStyle(motionStyle, staticStyle);
  const Tag = as;

  return (
    <Tag className={className} style={resolved} {...rest}>
      {children}
    </Tag>
  );
}
