"use client";

import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

export function useScrollDirection() {
  const [direction, setDirection] = useState<ScrollDirection>("down");
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (y !== lastY.current) {
        setDirection(y > lastY.current ? "down" : "up");
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
}
