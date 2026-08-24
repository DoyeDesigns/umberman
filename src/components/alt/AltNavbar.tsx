"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ALT_THEMES } from "@/lib/design";

const ENQUIRY_MAIL = "mailto:enquiry@umbermanbybabajideolatunji.com";
const ENQUIRY_LABEL = "enquiry@umbermanbybabajideolatunji.com";
const theme = ALT_THEMES.alt;

const MENU_LINKS = [
  {
    href: "https://www.ikiform.com/f/babajide-olatunji-presents-umberman-psluab",
    label: "RSVP",
    delay: "0s",
    caps: true,
    external: true,
  },
  { href: "#save-the-date", label: "Register", delay: "0.18s" },
  {
    href: "https://drive.google.com/drive/folders/1PxpYGFI9Z2Pz7rhQBSmXd3JoLTkMhGr8",
    label: "Press Kit",
    delay: "0.36s",
    external: true,
  },
  { href: ENQUIRY_MAIL, label: "Enquiry", delay: "0.54s" },
] as const;

const ADDRESS_LINES = [
  "Fitzrovia Chapel",
  "Fitzroy Place",
  "2 Pearson Square",
  "London W1T 3BF",
] as const;

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
  const [moving, setMoving] = useState(false);
  const ready = useRef(false);

  useEffect(() => {
    if (!ready.current) {
      ready.current = true;
      return;
    }
    setMoving(true);
  }, [open]);

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
        <div className="relative h-[70px] md:h-[100px]" />
      </header>

      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-[calc(35px+env(safe-area-inset-top,0px))] right-[clamp(1.125rem,5.5vw,4.5rem)] z-[110] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 text-brown sm:h-11 sm:w-11 md:top-[calc(50px+env(safe-area-inset-top,0px))] md:h-12 md:w-12"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`absolute h-[1.25px] w-3.75 bg-current transition-transform duration-700 ease-[cubic-bezier(.87,0,.13,1)] ${open ? "translate-y-0 rotate-45 scale-x-105" : "-translate-y-1"}`}
        />
        <span
          className={`absolute h-[1.25px] w-3.75 bg-current transition-transform duration-700 ease-[cubic-bezier(.87,0,.13,1)] ${open ? "translate-y-0 -rotate-45 scale-x-105" : "translate-y-1"}`}
        />
      </button>

      <div
        className={`alt-menu-overlay ${open ? "is-open" : ""} ${moving ? "is-moving" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.propertyName === "transform") setMoving(false);
        }}
      >
        <div className="flex h-full min-h-0 flex-col justify-between px-[clamp(1.125rem,5.5vw,4.5rem)] pt-[calc(70px+env(safe-area-inset-top,0px))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] md:pt-[calc(100px+env(safe-area-inset-top,0px))]">
          <nav
            className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col items-start justify-center gap-3 md:gap-2"
            aria-label="Page"
          >
            {MENU_LINKS.map((link) => (
              <div
                key={link.label}
                className="alt-menu-clip"
                style={{ ["--alt-fade-delay" as string]: link.delay }}
              >
                <a
                  href={link.href}
                  className={`alt-menu-reveal inline-block font-heading font-normal text-[clamp(3rem,4.5vw,4.5rem)] leading-tight text-white transition-colors hover:text-[#FABC43] active:text-[#FABC43] ${"caps" in link && link.caps ? "uppercase" : "capitalize"}`}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  {...("external" in link && link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </nav>

          <div className="mt-10 flex items-end justify-between gap-6">
            <div className="font-body text-[clamp(0.75rem,1.4vw,1rem)] leading-[1.35] text-white/50">
              {ADDRESS_LINES.map((line, index) => (
                <div
                  key={line}
                  className="alt-menu-clip"
                  style={{
                    ["--alt-fade-delay" as string]: `${0.66 + index * 0.12}s`,
                  }}
                >
                  <span className="alt-menu-reveal block">{line}</span>
                </div>
              ))}
            </div>
            <div
              className="alt-menu-clip max-w-[50%]"
              style={{ ["--alt-fade-delay" as string]: "0.78s" }}
            >
              <a
                href={ENQUIRY_MAIL}
                className="alt-menu-reveal block text-right font-body text-[clamp(0.75rem,1.4vw,1rem)] leading-[1.35] break-all text-white/50 hover:text-[#BD6942] active:text-[#BD6942]"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                {ENQUIRY_LABEL}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="shrink-0"
        style={{ height: "calc(100px + env(safe-area-inset-top, 0px))" }}
      />
    </>
  );
}
