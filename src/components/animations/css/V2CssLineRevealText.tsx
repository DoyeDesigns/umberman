"use client";

import { useMemo, type CSSProperties } from "react";
import { v2WordAnimationRanges } from "@/lib/animations/ios-css-ranges";

type V2CssLineRevealTextProps = {
  text: string;
  className?: string;
  fallbackVisible?: boolean;
};

export function V2CssLineRevealText({
  text,
  className = "",
  fallbackVisible = false,
}: V2CssLineRevealTextProps) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const wordCount = Math.max(words.length, 1);

  return (
    <div
      className={`v2-css-block relative w-full min-w-0 max-w-full overflow-x-hidden${
        fallbackVisible ? " ios-css-fallback-visible" : ""
      }`}
    >
      <p className={`break-words ${className}`}>
        {words.map((word, index) => {
          const { enterRange, exitRange } = v2WordAnimationRanges(index, wordCount);

          const style: CSSProperties = fallbackVisible
            ? {}
            : {
                animationRange: `${enterRange}, ${exitRange}`,
              };

          return (
            <span key={`${index}-${word.slice(0, 8)}`}>
              <span className="inline-block max-w-full overflow-hidden align-bottom">
                <span className="v2-css-word" style={style}>
                  {word}
                </span>
              </span>
              {index < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </p>
    </div>
  );
}
