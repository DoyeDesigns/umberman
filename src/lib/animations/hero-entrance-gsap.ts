import type { Transition } from "framer-motion";
import type { EntranceFrame } from "@/lib/animations/hero-entrance";

function toGsapEase(transition: Transition): string {
  if (transition.type === "spring") return "back.out(1.4)";
  if (Array.isArray(transition.ease)) {
    const [x1, y1, x2, y2] = transition.ease;
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  }
  return "power2.out";
}

function mapFramerProps(
  props: Record<string, unknown>,
): Record<string, unknown> {
  const mapped: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (key === "rotateX") mapped.rotationX = value;
    else if (key === "rotateY") mapped.rotationY = value;
    else if (key === "rotate") mapped.rotation = value;
    else mapped[key] = value;
  }

  if ("rotationX" in mapped || "rotationY" in mapped) {
    mapped.transformPerspective = 900;
    mapped.transformOrigin = "50% 100%";
  }

  return mapped;
}

export function entranceToGsapTween(
  frame: EntranceFrame,
): {
  from: Record<string, unknown>;
  to: Record<string, unknown>;
} {
  const duration =
    typeof frame.transition.duration === "number" ? frame.transition.duration : 0.72;
  const delay =
    typeof frame.transition.delay === "number" ? frame.transition.delay : 0;

  return {
    from: { ...mapFramerProps(frame.initial as Record<string, unknown>), force3D: true },
    to: {
      ...mapFramerProps(frame.animate as Record<string, unknown>),
      duration,
      delay,
      ease: toGsapEase(frame.transition),
      force3D: true,
      overwrite: "auto",
    },
  };
}
