"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { MotionValue } from "framer-motion";

type StickyRevealProgressContextValue = {
  register: (index: number, progress: MotionValue<number>) => void;
  unregister: (index: number) => void;
  getProgress: (index: number) => MotionValue<number> | undefined;
  version: number;
};

const StickyRevealProgressContext =
  createContext<StickyRevealProgressContextValue | null>(null);

export function StickyRevealProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progressMap, setProgressMap] = useState<
    Map<number, MotionValue<number>>
  >(() => new Map());
  const [version, setVersion] = useState(0);

  const register = useCallback((index: number, progress: MotionValue<number>) => {
    setProgressMap((prev) => {
      if (prev.get(index) === progress) return prev;
      const next = new Map(prev);
      next.set(index, progress);
      return next;
    });
    setVersion((current) => current + 1);
  }, []);

  const unregister = useCallback((index: number) => {
    setProgressMap((prev) => {
      if (!prev.has(index)) return prev;
      const next = new Map(prev);
      next.delete(index);
      return next;
    });
    setVersion((current) => current + 1);
  }, []);

  const getProgress = useCallback(
    (index: number) => progressMap.get(index),
    [progressMap],
  );

  const value = useMemo(
    () => ({ register, unregister, getProgress, version }),
    [register, unregister, getProgress, version],
  );

  return (
    <StickyRevealProgressContext.Provider value={value}>
      {children}
    </StickyRevealProgressContext.Provider>
  );
}

export function useStickyRevealProgress() {
  const context = useContext(StickyRevealProgressContext);
  if (!context) {
    throw new Error(
      "useStickyRevealProgress must be used within StickyRevealProgressProvider",
    );
  }
  return context;
}
