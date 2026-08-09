type FramerEdge = "start" | "end" | "center";

function framerEdgeToGsap(edge: FramerEdge): string {
  if (edge === "start") return "top";
  if (edge === "end") return "bottom";
  return "center";
}

function framerViewportToGsap(token: string): string {
  if (token === "start") return "top";
  if (token === "end") return "bottom";
  if (token === "center") return "center";

  const value = Number.parseFloat(token);
  if (Number.isNaN(value)) return token;
  return `${value * 100}%`;
}

/** Convert Framer Motion scroll offset points to GSAP ScrollTrigger start/end. */
export function framerOffsetToScrollTrigger(
  startPoint: string,
  endPoint: string,
): { start: string; end: string } {
  const [startTarget, startViewport] = startPoint.trim().split(/\s+/);
  const [endTarget, endViewport] = endPoint.trim().split(/\s+/);

  return {
    start: `${framerEdgeToGsap(startTarget as FramerEdge)} ${framerViewportToGsap(startViewport)}`,
    end: `${framerEdgeToGsap(endTarget as FramerEdge)} ${framerViewportToGsap(endViewport)}`,
  };
}
