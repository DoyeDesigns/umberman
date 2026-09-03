import { Fragment, type ReactNode } from "react";

/** Panthoma/Infini have no Ọ glyph. Draw O plus a matching underdot. */
export function OWithDot({ className }: { className?: string }) {
  return (
    <span className={`o-with-dot ${className ?? ""}`.trim()} aria-label="Ọ">
      <span aria-hidden="true">O</span>
    </span>
  );
}

export function withODot(text: string): ReactNode {
  const parts = text.split("Ọ");
  if (parts.length === 1) return text;
  return parts.map((part, index) => (
    <Fragment key={index}>
      {index > 0 ? <OWithDot /> : null}
      {part}
    </Fragment>
  ));
}
