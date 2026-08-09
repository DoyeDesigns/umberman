"use client";

import { useMotionValueEvent, useTransform } from "framer-motion";
import { ScrollLinkedDiv } from "@/components/animations/ScrollLinkedDiv";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { MobileRevealImage } from "@/components/animations/MobileRevealImage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollMotionEnabled } from "@/hooks/useScrollMotionEnabled";
import {
  useRestSettleSignal,
  useSettledImageEnter,
  useSettledImageExit,
} from "@/hooks/useImageRestSettle";
import { VARIANT_3 } from "@/lib/animations/config";

type SliceMeta = {
  el: HTMLDivElement;
  enterRank: number;
};

type V3SliceImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  /** Story beat — image assembles after preceding beats. */
  beat?: number;
  settleAtRest?: boolean;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smooth(value: number) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function applyBeat(progress: number, beat: number) {
  const offset = beat * VARIANT_3.beatGap;
  if (offset >= 1) return 0;
  return Math.min(1, Math.max(0, (progress - offset) / (1 - offset)));
}

export function V3SliceImage({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "object-cover",
  priority = false,
  beat = 0,
  settleAtRest = false,
}: V3SliceImageProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const scrollMotion = useScrollMotionEnabled();
  const isDesktop = useMediaQuery(VARIANT_3.desktopQuery);
  const scrollDirection = useScrollDirection();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const slicesRef = useRef<SliceMeta[]>([]);
  const enterRef = useRef(0);
  const exitRef = useRef(0);
  const settledRef = useRef(false);
  const directionRef = useRef(scrollDirection);

  const { scrollYProgress: enterProgress } = useSafeScroll({
    target: containerRef,
    offset: [...(isDesktop ? VARIANT_3.enterOffset : VARIANT_3.mobileEnterOffset)],
  });

  const { scrollYProgress: exitProgress } = useSafeScroll({
    target: containerRef,
    offset: [...(isDesktop ? VARIANT_3.exitOffset : VARIANT_3.mobileExitOffset)],
  });

  const settle = useRestSettleSignal(containerRef, settleAtRest);
  const settledEnter = useSettledImageEnter(
    enterProgress,
    settle,
    settleAtRest,
    beat,
    VARIANT_3.beatGap,
  );
  const settledExit = useSettledImageExit(exitProgress, settle, settleAtRest);

  const imageOpacity = useTransform(settledEnter, (enter) => smooth(Number(enter)));

  const paintSlices = useCallback(() => {
    const slices = slicesRef.current;
    if (!slices.length) return;

    const scrollingDown = directionRef.current === "down";
    const enter = enterRef.current;
    const exit = exitRef.current;

    if (settledRef.current) {
      for (const slice of slices) {
        slice.el.style.opacity = "1";
        slice.el.style.transform = "translateX(0)";
      }
      return;
    }

    if (!scrollingDown && enter < 0.02) {
      for (const slice of slices) {
        slice.el.style.opacity = "0";
        slice.el.style.transform = "translateX(0)";
      }
      return;
    }

    for (const slice of slices) {
      const assemble = smooth((enter - slice.enterRank * 0.55) / 0.38);
      const tear = scrollingDown
        ? smooth((exit - slice.enterRank * 0.4) / 0.35)
        : 0;
      const offset = (1 - assemble) * (slice.enterRank % 2 === 0 ? -48 : 48);
      slice.el.style.opacity = String(clamp(assemble * (1 - tear * 0.85)));
      slice.el.style.transform = `translateX(${offset + tear * 32}px)`;
    }
  }, []);

  useEffect(() => {
    directionRef.current = scrollDirection;
    paintSlices();
  }, [scrollDirection, paintSlices]);

  useMotionValueEvent(settledEnter, "change", (value) => {
    enterRef.current = value;
    paintSlices();
  });

  useMotionValueEvent(settledExit, "change", (value) => {
    exitRef.current = value;
    paintSlices();
  });

  useMotionValueEvent(settle, "change", (value) => {
    settledRef.current = Number(value) > 0.5;
    paintSlices();
  });

  useEffect(() => {
    if (variant !== 3 || reducedMotion) return;

    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    const mountGrid = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width < 8 || height < 8) return;

      const rows = VARIANT_3.sliceCount;
      grid.innerHTML = "";
      grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      const slices: SliceMeta[] = [];

      for (let row = 0; row < rows; row += 1) {
        const el = document.createElement("div");
        el.className = "v3-slice-cell";
        el.style.backgroundImage = `url(${src})`;
        el.style.backgroundSize = `100% ${rows * 100}%`;
        el.style.backgroundPosition = `center ${(row / (rows - 1)) * 100}%`;
        grid.appendChild(el);
        slices.push({ el, enterRank: row / Math.max(rows - 1, 1) });
      }

      slicesRef.current = slices;
      paintSlices();
    };

    mountGrid();
    const observer = new ResizeObserver(mountGrid);
    observer.observe(container);
    return () => observer.disconnect();
  }, [variant, reducedMotion, src, paintSlices]);

  if (variant !== 3 || reducedMotion) {
    return (
      <div className={className}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
      </div>
    );
  }

  if (!scrollMotion) {
    return (
      <MobileRevealImage
        src={src}
        alt={alt}
        sizes={sizes}
        className={className}
        imageClassName={imageClassName}
        priority={priority}
        delay={beat * VARIANT_3.beatGap}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <ScrollLinkedDiv
        className="absolute inset-0"
        motionStyle={{ opacity: imageOpacity }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imageClassName}
        />
      </ScrollLinkedDiv>
      <div ref={gridRef} className="v3-slice-grid" aria-hidden="true" />
    </div>
  );
}
