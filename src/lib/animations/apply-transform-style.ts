import type { V2Transform } from "@/lib/animations/variant-2/presets";

export function applyTransformStyle(
  el: HTMLElement,
  transform: V2Transform,
  options?: { noBlur?: boolean },
) {
  const parts: string[] = [];

  if (transform.x || transform.y) {
    parts.push(`translate3d(${transform.x}px, ${transform.y}px, 0)`);
  }
  if (transform.scale !== 1) parts.push(`scale(${transform.scale})`);
  if (transform.scaleX !== 1) parts.push(`scaleX(${transform.scaleX})`);
  if (transform.scaleY !== 1) parts.push(`scaleY(${transform.scaleY})`);
  if (transform.rotate) parts.push(`rotate(${transform.rotate}deg)`);
  if (transform.skewX) parts.push(`skewX(${transform.skewX}deg)`);

  el.style.opacity = String(transform.opacity);
  el.style.transform = parts.length ? parts.join(" ") : "";
  el.style.filter = options?.noBlur ? "blur(0px)" : transform.filter;
}

export function applySimpleStyle(
  el: HTMLElement,
  values: {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
    rotate?: number;
    rotateX?: number;
    rotateY?: number;
    skewX?: number;
    filter?: string;
    clipPath?: string;
    textShadow?: string;
    letterSpacing?: string;
    left?: string;
    zIndex?: number;
    backdropFilter?: string;
  },
) {
  const parts: string[] = [];

  if (values.x || values.y) {
    parts.push(`translate3d(${values.x ?? 0}px, ${values.y ?? 0}px, 0)`);
  }
  if (values.rotateX) parts.push(`rotateX(${values.rotateX}deg)`);
  if (values.rotateY) parts.push(`rotateY(${values.rotateY}deg)`);
  if (values.scale !== undefined && values.scale !== 1) {
    parts.push(`scale(${values.scale})`);
  }
  if (values.scaleX !== undefined && values.scaleX !== 1) {
    parts.push(`scaleX(${values.scaleX})`);
  }
  if (values.scaleY !== undefined && values.scaleY !== 1) {
    parts.push(`scaleY(${values.scaleY})`);
  }
  if (values.rotate) parts.push(`rotate(${values.rotate}deg)`);
  if (values.skewX) parts.push(`skewX(${values.skewX}deg)`);

  if (values.opacity !== undefined) el.style.opacity = String(values.opacity);
  if (values.zIndex !== undefined) el.style.zIndex = String(values.zIndex);
  el.style.transform = parts.length ? parts.join(" ") : "";
  if (values.filter !== undefined) el.style.filter = values.filter;
  if (values.clipPath !== undefined) el.style.clipPath = values.clipPath;
  if (values.textShadow !== undefined) el.style.textShadow = values.textShadow;
  if (values.letterSpacing !== undefined) {
    el.style.letterSpacing = values.letterSpacing;
  }
  if (values.left !== undefined) el.style.left = values.left;
  if (values.backdropFilter !== undefined) {
    el.style.backdropFilter = values.backdropFilter;
    (el.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter =
      values.backdropFilter;
  }
}
