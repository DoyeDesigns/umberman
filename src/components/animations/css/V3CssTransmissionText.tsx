"use client";

import { useMemo, type CSSProperties } from "react";
import { v3SentenceAnimationRanges } from "@/lib/animations/ios-css-ranges";

type V3CssTransmissionTextProps = {
  text: string;
  className?: string;
  fallbackVisible?: boolean;
};

export function V3CssTransmissionText({
  text,
  className = "",
  fallbackVisible = false,
}: V3CssTransmissionTextProps) {
  const sentences = useMemo(
    () => text.split(/(?<=[.!?])\s+/).filter(Boolean),
    [text],
  );
  const count = Math.max(sentences.length, 1);

  return (
    <div
      className={`v3-css-block relative w-full min-w-0 max-w-full overflow-x-clip${
        fallbackVisible ? " ios-css-fallback-visible" : ""
      }`}
    >
      <div className={`break-words ${className}`}>
        {sentences.map((sentence, index) => {
          const { enterRange, exitRange, scanRange } = v3SentenceAnimationRanges(
            index,
            count,
          );

          const textStyle: CSSProperties = fallbackVisible
            ? {}
            : {
                animationRange: `${enterRange}, ${exitRange}`,
              };

          const overlayStyle: CSSProperties = fallbackVisible
            ? {}
            : {
                animationRange: scanRange,
              };

          return (
            <span
              key={`${index}-${sentence.slice(0, 12)}`}
              className="relative mb-[0.35em] block last:mb-0"
            >
              <span className="relative inline-block">
                <span className="v3-css-sentence-text" style={textStyle}>
                  {sentence}
                </span>
                <span
                  aria-hidden
                  className="v3-css-scan pointer-events-none absolute inset-y-0 w-px bg-orange"
                  style={overlayStyle}
                />
                <span
                  aria-hidden
                  className="v3-css-noise v3-transmission-noise pointer-events-none absolute inset-0"
                  style={overlayStyle}
                />
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
