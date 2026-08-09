"use client";

import { createContext, useContext, type RefObject } from "react";

type IntroScrollContextValue = {
  active: boolean;
  sectionRef: RefObject<HTMLElement | null> | null;
};

const IntroScrollContext = createContext<IntroScrollContextValue>({
  active: false,
  sectionRef: null,
});

export function IntroScrollProvider({
  sectionRef,
  children,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  children: React.ReactNode;
}) {
  return (
    <IntroScrollContext.Provider value={{ active: true, sectionRef }}>
      {children}
    </IntroScrollContext.Provider>
  );
}

export function useIntroScroll() {
  return useContext(IntroScrollContext).active;
}

export function useIntroSectionRef() {
  return useContext(IntroScrollContext).sectionRef;
}
