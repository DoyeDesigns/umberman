import { EASE_OUT } from "@/lib/animations/config";

export const MOBILE_IN_VIEWPORT = {
  once: true,
  amount: 0.22,
  margin: "0px 0px -8% 0px",
} as const;

export function mobileInViewTransition(delay = 0, duration = 0.55) {
  return { duration, delay, ease: EASE_OUT };
}
