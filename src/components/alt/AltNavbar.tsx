"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AltLogo } from "@/components/alt/AltLogo";
import { getAltTheme, type PageDesign } from "@/lib/design";

const ENQUIRY_MAIL = "mailto:enquiry@umbermanbybabajideolatunji.com";

const LINKS = [
  { href: "#bio", id: "bio", label: "Bio" },
  { href: "#save-the-date", id: "save-the-date", label: "Register" },
  { href: ENQUIRY_MAIL, id: null, label: "Enquiry" },
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

type AltNavbarProps = {
  design: PageDesign;
};

export function AltNavbar({ design }: AltNavbarProps) {
  const theme = getAltTheme(design);
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

  const goToSection = (id: string) => {
    document.body.style.overflow = "";
    setOpen(false);

    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }, 50);
  };

  if (!theme) return null;

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{ backgroundColor: theme.bg }}
      >
        <div className="section-px flex h-[100px] items-center">
          <button
            type="button"
            className="flex items-center"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <AltLogo theme={theme} />
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            className="relative flex max-h-[428px] min-h-0 flex-col"
            style={{ height: 428, backgroundColor: "#E3E7FC" }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="section-px flex h-[100px] shrink-0 items-center justify-end">
              <button
                type="button"
                className="flex size-10 items-center justify-center"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 1L21 21M21 1L1 21"
                    stroke="#18225E"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>

            <nav
              className="section-px flex flex-col gap-10 pt-2 pb-10"
              aria-label="Page"
            >
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-[34.21px] font-normal capitalize leading-none tracking-[-0.02em] text-[#18225E]"
                  onClick={(event) => {
                    if (!link.id) {
                      setOpen(false);
                      return;
                    }
                    event.preventDefault();
                    goToSection(link.id);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
