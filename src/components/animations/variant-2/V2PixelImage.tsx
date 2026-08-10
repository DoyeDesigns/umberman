"use client";

import { useMotionValueEvent, useTransform } from "framer-motion";
import { ScrollLinkedDiv } from "@/components/animations/ScrollLinkedDiv";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useAnimationVariant } from "@/components/animations/AnimationVariantProvider";
import { V2TopExitBlur } from "@/components/animations/variant-2/V2TopExitBlur";
import { useClientReady } from "@/hooks/useClientReady";
import { useIOSAnimationPath } from "@/hooks/useIOSAnimationPath";
import { useManualScrollRefs } from "@/hooks/useManualScrollRefs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSafeScroll } from "@/hooks/useSafeScroll";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import {
  applyImageBeat,
  useRestSettleSignal,
  useSettledImageEnter,
  useSettledImageExit,
} from "@/hooks/useImageRestSettle";
import { computeElementScrollProgress, computePageScrollProgress } from "@/lib/animations/scroll-progress";
import { VARIANT_2 } from "@/lib/animations/config";

type CellMeta = {
  el: HTMLDivElement;
  enterRankDown: number;
  exitRankDown: number;
};

type V2PixelImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  maskColor?: string;
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

function gridSize(width: number, height: number) {
  const cell = 102;
  const cols = clamp(Math.round(width / cell), 3, 6);
  const rows = clamp(Math.round(height / cell), 4, 8);
  return { cols, rows };
}

function buildCells(
  grid: HTMLDivElement,
  cols: number,
  rows: number,
  maskColor: string,
) {
  grid.innerHTML = "";
  const cells: CellMeta[] = [];
  const enterOriginCol = (cols - 1) / 2;
  const enterOriginRowDown = rows - 1;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const el = document.createElement("div");
      el.className = "v2-pixel-cell";
      el.style.backgroundColor = maskColor;
      grid.appendChild(el);

      const distDown = Math.hypot(col - enterOriginCol, row - enterOriginRowDown);

      cells.push({
        el,
        enterRankDown: distDown + Math.random() * 0.85,
        exitRankDown: row + Math.random() * 0.75,
      });
    }
  }

  const maxEnterDown = Math.max(...cells.map((cell) => cell.enterRankDown), 1);
  cells.forEach((cell) => {
    cell.enterRankDown /= maxEnterDown;
  });

  return cells;
}

export function V2PixelImage({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "object-cover",
  priority = false,
  maskColor = "var(--paper)",
  beat = 0,
  settleAtRest = false,
}: V2PixelImageProps) {
  const variant = useAnimationVariant();
  const reducedMotion = useReducedMotion();
  const ready = useClientReady();
  const { useNativeScroll } = useIOSAnimationPath();
  const isDesktop = useMediaQuery(VARIANT_2.desktopQuery);
  const scrollDirection = useScrollDirection();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<CellMeta[]>([]);
  const enterRef = useRef(0);
  const exitRef = useRef(0);
  const settledRef = useRef(false);
  const directionRef = useRef(scrollDirection);

  const enterOffset = isDesktop
    ? VARIANT_2.enterOffset
    : VARIANT_2.mobileEnterOffset;
  const exitOffset = isDesktop
    ? VARIANT_2.exitOffset
    : VARIANT_2.mobileExitOffset;

  const iosPath = useNativeScroll && ready && variant === 2 && !reducedMotion;

  const paintCells = useCallback(() => {
    const cells = cellsRef.current;
    if (!cells.length) return;

    const scrollingDown = directionRef.current === "down";
    const enter = enterRef.current;
    const exit = exitRef.current;

    if (imageLayerRef.current) {
      imageLayerRef.current.style.opacity = String(smooth(enter));
    }

    if (settledRef.current || enter >= 0.98) {
      for (const cell of cells) {
        cell.el.style.opacity = "0";
      }
      if (gridRef.current) gridRef.current.style.visibility = "hidden";
      return;
    }

    if (!scrollingDown && enter >= 0.75) {
      for (const cell of cells) {
        cell.el.style.opacity = "0";
      }
      if (gridRef.current) gridRef.current.style.visibility = "hidden";
      return;
    }

    if (gridRef.current) gridRef.current.style.visibility = "visible";

    const maxExitRank = Math.max(...cells.map((cell) => cell.exitRankDown), 1);

    for (const cell of cells) {
      const enterReveal = smooth((enter - cell.enterRankDown * 0.52) / 0.34);
      const exitCover = scrollingDown
        ? smooth((exit - (cell.exitRankDown / maxExitRank) * 0.48) / 0.34)
        : 0;
      const cover = clamp(1 - enterReveal + exitCover);
      cell.el.style.opacity = String(cover);
    }
  }, []);

  useManualScrollRefs(containerRef, {
    enterOffset,
    exitOffset,
    enabled: iosPath,
    onUpdate: ({ enter, exit }) => {
      directionRef.current = scrollDirection;
      let beaten = applyImageBeat(enter, beat, 0.11);

      if (settleAtRest) {
        const rect = containerRef.current?.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect) {
          const runway = computeElementScrollProgress(
            rect,
            vh,
            "start end",
            "end end",
          );
          if (runway > 0.78 || computePageScrollProgress() > 0.94) {
            settledRef.current = true;
          }
        }
      }

      if (settledRef.current) {
        beaten = Math.max(beaten, 1);
        exitRef.current = 0;
      } else {
        exitRef.current = exit;
      }

      enterRef.current = beaten;
      paintCells();
    },
  });

  const { scrollYProgress: enterProgress } = useSafeScroll({
    target: containerRef,
    offset: [...enterOffset],
  });

  const { scrollYProgress: exitProgress } = useSafeScroll({
    target: containerRef,
    offset: [...exitOffset],
  });

  const settle = useRestSettleSignal(containerRef, settleAtRest);
  const settledEnter = useSettledImageEnter(
    enterProgress,
    settle,
    settleAtRest,
    beat,
    0.11,
  );
  const settledExit = useSettledImageExit(exitProgress, settle, settleAtRest);

  const imageOpacity = useTransform(settledEnter, (enter) =>
    smooth(Number(enter)),
  );

  useEffect(() => {
    directionRef.current = scrollDirection;
    paintCells();
  }, [scrollDirection, paintCells]);

  useEffect(() => {
    if (!ready || variant !== 2 || reducedMotion) return;

    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    const mountGrid = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width < 8 || height < 8) return;

      const { cols, rows } = gridSize(width, height);
      grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      cellsRef.current = buildCells(grid, cols, rows, maskColor);
      paintCells();
    };

    mountGrid();
    const observer = new ResizeObserver(mountGrid);
    observer.observe(container);
    return () => observer.disconnect();
  }, [ready, variant, reducedMotion, maskColor, paintCells]);

  useLayoutEffect(() => {
    if (!ready || iosPath || variant !== 2 || reducedMotion) return;
    enterRef.current = settledEnter.get();
    exitRef.current = settledExit.get();
    settledRef.current = settle.get() > 0.5;
    paintCells();
  }, [
    ready,
    iosPath,
    variant,
    reducedMotion,
    paintCells,
    settledEnter,
    settledExit,
    settle,
  ]);

  useMotionValueEvent(settledEnter, "change", (value) => {
    if (iosPath) return;
    enterRef.current = value;
    paintCells();
  });

  useMotionValueEvent(settledExit, "change", (value) => {
    if (iosPath) return;
    exitRef.current = value;
    paintCells();
  });

  useMotionValueEvent(settle, "change", (value) => {
    if (iosPath) return;
    settledRef.current = Number(value) > 0.5;
    paintCells();
  });

  if (variant !== 2 || reducedMotion) {
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

  if (!ready) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
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

  if (iosPath) {
    return (
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        <div ref={imageLayerRef} className="absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={imageClassName}
          />
        </div>
        <div ref={gridRef} className="v2-pixel-grid" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
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
      <div ref={gridRef} className="v2-pixel-grid" aria-hidden="true" />
      <V2TopExitBlur
        exitProgress={settledExit}
        scrollDirection={scrollDirection}
      />
    </div>
  );
}
