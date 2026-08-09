"use client";

import { createContext, useContext } from "react";
import type { AnimationVariant } from "@/lib/animations/config";

const AnimationVariantContext = createContext<AnimationVariant>(0);

export function AnimationVariantProvider({
  variant,
  children,
}: {
  variant: AnimationVariant;
  children: React.ReactNode;
}) {
  return (
    <AnimationVariantContext.Provider value={variant}>
      {children}
    </AnimationVariantContext.Provider>
  );
}

export function useAnimationVariant() {
  return useContext(AnimationVariantContext);
}
