"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

const DIRECTION_THRESHOLD_PX = 6;

export function useScrollDirection() {
  const [direction, setDirection] = useState<ScrollDirection>("down");
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (Math.abs(delta) >= DIRECTION_THRESHOLD_PX) {
        setDirection(delta > 0 ? "down" : "up");
        lastY.current = y;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
}
