type ScrollEdge = "start" | "end" | "center";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function parseOffsetPoint(point: string): [ScrollEdge, number | ScrollEdge] {
  const [target, viewport] = point.trim().split(/\s+/);
  const viewportEdge = viewport as ScrollEdge;
  if (viewportEdge === "start" || viewportEdge === "end" || viewportEdge === "center") {
    return [target as ScrollEdge, viewportEdge];
  }
  return [target as ScrollEdge, Number.parseFloat(viewport)];
}

function getTargetEdge(rect: DOMRect, edge: ScrollEdge): number {
  if (edge === "start") return rect.top;
  if (edge === "end") return rect.bottom;
  return (rect.top + rect.bottom) / 2;
}

function getViewportEdge(viewportHeight: number, edge: number | ScrollEdge): number {
  if (edge === "start") return 0;
  if (edge === "end") return viewportHeight;
  if (edge === "center") return viewportHeight / 2;
  return edge * viewportHeight;
}

/** Match Framer Motion useScroll offset progress for a target element. */
export function computeElementScrollProgress(
  rect: DOMRect,
  viewportHeight: number,
  startPoint: string,
  endPoint: string,
): number {
  const [startTarget, startViewport] = parseOffsetPoint(startPoint);
  const [endTarget, endViewport] = parseOffsetPoint(endPoint);

  const f0 =
    getTargetEdge(rect, startTarget) -
    getViewportEdge(viewportHeight, startViewport);
  const f1 =
    getTargetEdge(rect, endTarget) -
    getViewportEdge(viewportHeight, endViewport);

  if (f0 === f1) return f0 <= 0 ? 1 : 0;

  return clamp(f0 / (f0 - f1));
}

/** Page-level scroll progress (0 at top, 1 at bottom). */
export function computePageScrollProgress(): number {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const maxScroll =
    document.documentElement.scrollHeight -
    (window.innerHeight || document.documentElement.clientHeight);

  if (maxScroll <= 0) return 0;
  return clamp(scrollY / maxScroll);
}
