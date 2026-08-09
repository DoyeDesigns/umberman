"use client";

import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

export function applyImageBeat(progress: number, beat: number, beatGap: number) {
  const offset = beat * beatGap;
  if (offset >= 1) return 0;
  return Math.min(1, Math.max(0, (progress - offset) / (1 - offset)));
}

/** Latch to fully revealed when the image block finishes its runway or the page reaches the bottom. */
export function useRestSettleSignal(
  targetRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
): MotionValue<number> {
  const latchedRef = useRef(false);

  const { scrollYProgress: elementRunway } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const { scrollYProgress: pageScroll } = useScroll();

  return useTransform([elementRunway, pageScroll], ([runway, page]) => {
    if (!enabled) return 0;
    if (latchedRef.current) return 1;

    const onRunway = Number(runway) > 0.78;
    const atPageEnd = Number(page) > 0.94;
    if (onRunway || atPageEnd) {
      latchedRef.current = true;
      return 1;
    }

    return 0;
  }) as MotionValue<number>;
}

export function useSettledImageEnter(
  rawEnter: MotionValue<number>,
  settle: MotionValue<number>,
  enabled: boolean,
  beat: number,
  beatGap: number,
): MotionValue<number> {
  return useTransform([rawEnter, settle], ([enter, settled]) => {
    const beaten = applyImageBeat(Number(enter), beat, beatGap);
    if (enabled && Number(settled) > 0.5) return Math.max(beaten, 1);
    return beaten;
  });
}

export function useSettledImageExit(
  rawExit: MotionValue<number>,
  settle: MotionValue<number>,
  enabled: boolean,
): MotionValue<number> {
  return useTransform([rawExit, settle], ([exit, settled]) => {
    if (enabled && Number(settled) > 0.5) return 0;
    return Number(exit);
  });
}
