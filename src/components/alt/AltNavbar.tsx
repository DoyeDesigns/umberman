"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AltLogo } from "@/components/alt/AltLogo";
import { ALT_THEMES } from "@/lib/design";

const ENQUIRY_MAIL = "mailto:enquiry@umbermanbybabajideolatunji.com";
const theme = ALT_THEMES.alt;

type AltMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AltMenuContext = createContext<AltMenuContextValue | null>(null);

export function AltMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <AltMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </AltMenuContext.Provider>
  );
}

export function useAltMenu() {
  return useContext(AltMenuContext);
}

export function AltNavbar() {
  const menu = useAltMenu();
  const open = menu?.open ?? false;
  const setOpen = menu?.setOpen ?? (() => {});

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-60"
        style={{
          backgroundColor: theme.bg,
          paddingTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-full h-[50vh]"
          style={{ backgroundColor: theme.bg }}
        />
        <div className="relative z-10 md:h-[100px] h-[70px]">
          <button
            type="button"
            className="absolute inset-y-0 left-0 z-20 flex w-[min(42vw,11rem)] cursor-pointer items-center pl-[clamp(1.125rem,5.5vw,4.5rem)] touch-manipulation text-[#BD6942] transition-colors hover:text-[#F1F1F1] active:text-[#F1F1F1] md:w-auto md:pr-8"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <AltLogo theme={theme} />
          </button>
        </div>
      </header>
      <div
        aria-hidden
        className="shrink-0"
        style={{ height: "calc(100px + env(safe-area-inset-top, 0px))" }}
      />

      {open ? (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute inset-x-0 top-0"
            style={{ backgroundColor: "#E3E7FC" }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div
              aria-hidden
              style={{ height: "env(safe-area-inset-top, 0px)" }}
            />
            <div className="section-px flex md:h-[100px] h-[70px] items-center justify-between">
              <nav aria-label="Page">
                <a
                  href={ENQUIRY_MAIL}
                  className="w-fit cursor-pointer font-body text-[18px] font-normal capitalize leading-none tracking-[-0.02em] text-[#18225E] transition-colors hover:text-[#BD6942] active:text-[#BD6942]"
                  onClick={() => setOpen(false)}
                >
                  Enquiry
                </a>
              </nav>
              <button
                type="button"
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center text-[#18225E] transition-colors hover:text-[#BD6942] active:text-[#BD6942]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 22 22"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 1L21 21M21 1L1 21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
