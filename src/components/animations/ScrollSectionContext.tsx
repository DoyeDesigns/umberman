"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "framer-motion";

const ScrollSectionContext = createContext<MotionValue<number> | null>(null);

export function ScrollSectionProvider({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <ScrollSectionContext.Provider value={progress}>
      {children}
    </ScrollSectionContext.Provider>
  );
}

export function useScrollSectionProgress() {
  return useContext(ScrollSectionContext);
}
