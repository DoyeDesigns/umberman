"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { animate } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type GlitchColors = {
  a: string;
  b: string;
  c: string;
};

type GlitchTextProps = {
  text: string;
  className?: string;
  textClassName?: string;
  color?: string;
  colors?: GlitchColors;
  trigger?: "loop" | "hover" | "once";
  intensity?: number;
  slices?: number;
  /** Higher = shorter gaps between bursts. */
  speed?: number;
  /** Minimum pause between loop bursts (ms). */
  gapMinMs?: number;
  /** Maximum pause between loop bursts (ms). */
  gapMaxMs?: number;
  /** Wait before the first burst on mount (ms). */
  initialDelayMs?: number;
};

const DEFAULT_COLORS: GlitchColors = {
  a: "#D74F24",
  b: "#354396",
  c: "#1C1C1C",
};

const BASE_TEXT_STYLE = {
  position: "relative" as const,
  display: "inline-block" as const,
  lineHeight: 0.9,
  letterSpacing: "-0.03em",
  whiteSpace: "pre-wrap" as const,
};

export function GlitchText({
  text,
  className = "",
  textClassName = "",
  color = "#1C1C1C",
  colors = DEFAULT_COLORS,
  trigger = "loop",
  intensity = 6,
  slices = 10,
  speed = 1,
  gapMinMs = 3200,
  gapMaxMs = 9000,
  initialDelayMs = 2800,
}: GlitchTextProps) {
  const reducedMotion = useReducedMotion();
  const titleRef = useRef<HTMLSpanElement>(null);
  const shadowRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sliceRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const shadowData = useMemo(
    () => [
      { clip: "inset(0% 0 54% 0)", color: colors.a },
      { clip: "inset(35% 0 28% 0)", color: colors.b },
      { clip: "inset(47% 0 0% 0)", color: colors.c },
    ],
    [colors],
  );

  const sliceData = useMemo(() => {
    const rowHeight = 100 / slices;
    return Array.from({ length: slices }, (_, i) => {
      const jitter = pseudoRandom(i) * rowHeight * 0.4;
      const top = clamp(i * rowHeight + jitter, 0, 96);
      const height = clamp(rowHeight * (0.6 + pseudoRandom(i + 50) * 0.8), 2, 14);
      const bottom = clamp(100 - top - height, 0, 100);
      const dir = i % 2 === 0 ? -1 : 1;
      return {
        top,
        bottom,
        dir,
        color: [colors.a, colors.b, colors.c][i % 3],
      };
    });
  }, [slices, colors]);

  const burst = useCallback(() => {
    const power = (0.5 + Math.random() * 0.8) * intensity;
    const dir = Math.random() > 0.5 ? 1 : -1;

    if (titleRef.current) {
      animate(
        titleRef.current,
        { x: [0, dir * power * 1.8, 0], skewX: [0, dir * power * 1.2, 0] },
        { duration: 0.14, ease: "easeInOut" },
      );
    }

    shadowRefs.current.forEach((el, i) => {
      if (!el) return;
      const bandDir = i % 2 === 0 ? 1 : -1;
      animate(
        el,
        {
          opacity: [0.15, 0.85, 0.15],
          x: [0, bandDir * -dir * power * 2.4, 0],
        },
        { duration: 0.15, ease: "easeOut" },
      );
    });

    sliceRefs.current.forEach((el, i) => {
      if (!el) return;
      if (Math.random() > 0.45) return;
      const data = sliceData[i];
      animate(
        el,
        {
          opacity: [0, 0.9, 0],
          x: [0, data.dir * power * 5.5, 0],
          skewX: [0, data.dir * power * 1.1, 0],
        },
        { duration: 0.16, ease: "easeOut" },
      );
    });
  }, [intensity, sliceData]);

  useEffect(() => {
    if (reducedMotion || trigger === "hover") return;

    if (trigger === "once") {
      burst();
      return;
    }

    let cancelled = false;
    let timeoutId: number;

    const loop = () => {
      burst();
      const gap = (gapMinMs + Math.random() * (gapMaxMs - gapMinMs)) / speed;
      timeoutId = window.setTimeout(() => {
        if (!cancelled) loop();
      }, gap);
    };

    timeoutId = window.setTimeout(() => {
      if (!cancelled) loop();
    }, initialDelayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [trigger, speed, burst, reducedMotion, gapMinMs, gapMaxMs, initialDelayMs]);

  const handleHoverBurst = useCallback(() => {
    if (trigger !== "hover" || reducedMotion) return;
    burst();
    window.setTimeout(burst, 90);
  }, [trigger, burst, reducedMotion]);

  return (
    <div
      className={className}
      onMouseEnter={handleHoverBurst}
      style={{ position: "relative", display: "inline-block", isolation: "isolate" }}
    >
      <span
        ref={titleRef}
        className={textClassName}
        style={{ ...BASE_TEXT_STYLE, zIndex: 5, color }}
      >
        {text}
      </span>

      {shadowData.map((s, i) => (
        <span
          key={`shadow-${i}`}
          ref={(el) => {
            shadowRefs.current[i] = el;
          }}
          aria-hidden
          className={textClassName}
          style={{
            ...BASE_TEXT_STYLE,
            position: "absolute",
            inset: 0,
            zIndex: 2,
            color: s.color,
            clipPath: s.clip,
            opacity: reducedMotion ? 0 : 0.15,
            pointerEvents: "none",
          }}
        >
          {text}
        </span>
      ))}

      {!reducedMotion &&
        sliceData.map((s, i) => (
          <span
            key={`slice-${i}`}
            ref={(el) => {
              sliceRefs.current[i] = el;
            }}
            aria-hidden
            className={textClassName}
            style={{
              ...BASE_TEXT_STYLE,
              position: "absolute",
              inset: 0,
              zIndex: 6,
              color: s.color,
              clipPath: `inset(${s.top}% 0 ${s.bottom}% 0)`,
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            {text}
          </span>
        ))}
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 127.1) * 43758.5453123;
  return value - Math.floor(value);
}
