import type { TargetAndTransition, Transition } from "framer-motion";

export type EntranceFrame = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
};
