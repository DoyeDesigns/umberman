"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [phase, setPhase] = useState<"closed" | "opening" | "open" | "closing">(
    "closed",
  );
  const [mounted, setMounted] = useState(false);
  const [textReady, setTextReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    if (open) {
      setMoving(true);
      setTextReady(false);
      setPhase("opening");
      return;
    }

    if (phaseRef.current === "closed") return;

    setMoving(true);
    setTextReady(false);
    setPhase("closing");
  }, [open]);

  useEffect(() => {
    if (phase !== "opening") return;
    const id = window.setTimeout(() => setTextReady(true), 480);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "opening" && phase !== "closing") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) return;
    setPhase(phase === "opening" ? "open" : "closed");
    setMoving(false);
    if (phase === "opening") setTextReady(true);
  }, [phase]);

  useEffect(() => {
    document.documentElement.dataset.menuPhase = phase;
    const locked = phase !== "closed";
    document.documentElement.style.overflow = locked ? "hidden" : "";
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      delete document.documentElement.dataset.menuPhase;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "closed") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, setOpen]);

  const chrome = (
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
        className="fixed top-[calc(35px+env(safe-area-inset-top,0px))] right-[clamp(1.125rem,5.5vw,4.5rem)] z-[110] flex h-4 w-[38px] -translate-y-1/2 cursor-pointer items-center justify-center text-[#BD6942] md:top-[calc(50px+env(safe-area-inset-top,0px))] md:w-12"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`absolute h-[4.7px] w-[38px] rounded-[9.4px] bg-current transition-transform duration-700 ease-[cubic-bezier(.87,0,.13,1)] md:w-12 ${open ? "translate-y-0 rotate-45" : "-translate-y-[5.35px]"}`}
        />
        <span
          className={`absolute h-[4.7px] w-[38px] rounded-[9.4px] bg-current transition-transform duration-700 ease-[cubic-bezier(.87,0,.13,1)] md:w-12 ${open ? "translate-y-0 -rotate-45" : "translate-y-[5.35px]"}`}
        />
      </button>

      <div
        className={`alt-menu-overlay ${phase !== "closed" ? "is-open" : ""} ${phase === "opening" ? "is-opening" : ""} ${textReady ? "is-settled" : ""} ${phase === "closing" ? "is-closing" : ""} ${moving ? "is-moving" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={phase === "closed"}
        onAnimationEnd={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.animationName === "alt-menu-down") {
            setPhase("open");
            setMoving(false);
          }
          if (event.animationName === "alt-menu-up") {
            setPhase("closed");
            setMoving(false);
          }
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

          <div className="mt-10 flex flex-col items-start gap-1 text-left md:flex-row md:items-end md:justify-between">
            <div className="font-body text-[clamp(0.75rem,1.4vw,1rem)] leading-[1.35] text-white/50">
              {ADDRESS_LINES.map((line, index) => (
                <div
                  key={line}
                  className="alt-menu-clip"
                  style={{
                    ["--alt-fade-delay" as string]: `${0.66 + index * 0.12}s`,
                  }}
                >
                  <span className="alt-menu-reveal block text-left">{line}</span>
                </div>
              ))}
            </div>
            <div
              className="alt-menu-clip w-full max-w-full md:max-w-[50%]"
              style={{ ["--alt-fade-delay" as string]: "0.78s" }}
            >
              <a
                href={ENQUIRY_MAIL}
                className="alt-menu-reveal block text-left font-body text-[clamp(0.75rem,1.4vw,1rem)] leading-[1.35] break-all text-white/50 hover:text-[#FABC43] active:text-[#FABC43] md:text-right"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                {ENQUIRY_LABEL}
              </a>
            </div>
          </div>
        </div>
      </div>
      </>
  );

  return (
    <>
      {mounted ? createPortal(chrome, document.body) : chrome}
      <div
        aria-hidden
        className="h-[calc(70px+env(safe-area-inset-top,0px))] shrink-0 md:h-[calc(100px+env(safe-area-inset-top,0px))]"
      />
    </>
  );
}
