"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { framerOffsetToScrollTrigger } from "@/lib/animations/offset-to-scroll-trigger";
import { ensureGsapScrollTrigger, ScrollTrigger } from "@/lib/gsap/client";

type DirectScrollValues = {
  enter: number;
  exit: number;
};

type UseDirectElementScrollOptions = {
  enterOffset: readonly [string, string];
  exitOffset?: readonly [string, string];
  introSectionRef?: RefObject<HTMLElement | null> | null;
  intro?: boolean;
  enabled?: boolean;
  onUpdate: (values: DirectScrollValues) => void;
};

/**
 * GSAP ScrollTrigger → callback. Writes styles in the callback — never touches
 * Framer MotionValues (broken update path on iPhone WebKit).
 */
export function useDirectElementScroll(
  targetRef: RefObject<HTMLElement | null>,
  {
    enterOffset,
    exitOffset,
    introSectionRef,
    intro = false,
    enabled = true,
    onUpdate,
  }: UseDirectElementScrollOptions,
) {
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useLayoutEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let enterTrigger: ScrollTrigger | undefined;
    let exitTrigger: ScrollTrigger | undefined;
    let sectionTrigger: ScrollTrigger | undefined;
    let rafId = 0;
    let attempts = 0;

    let enter = 0;
    let exit = 0;
    let section = 0;

    const sync = () => {
      let adjustedEnter = enter;
      if (intro && section < 0.1) {
        adjustedEnter = Math.max(enter, 1);
      }
      onUpdateRef.current({ enter: adjustedEnter, exit });
    };

    const attach = () => {
      if (cancelled) return;

      const target = targetRef.current;
      if (!target) {
        if (attempts < 120) {
          attempts += 1;
          rafId = requestAnimationFrame(attach);
        }
        return;
      }

      enterTrigger?.kill();
      exitTrigger?.kill();
      sectionTrigger?.kill();

      const { start: enterStart, end: enterEnd } = framerOffsetToScrollTrigger(
        enterOffset[0],
        enterOffset[1],
      );

      enterTrigger = ScrollTrigger.create({
        trigger: target,
        start: enterStart,
        end: enterEnd,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          enter = self.progress;
          sync();
        },
      });

      if (exitOffset) {
        const { start: exitStart, end: exitEnd } = framerOffsetToScrollTrigger(
          exitOffset[0],
          exitOffset[1],
        );

        exitTrigger = ScrollTrigger.create({
          trigger: target,
          start: exitStart,
          end: exitEnd,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            exit = self.progress;
            sync();
          },
        });
      }

      const sectionEl = introSectionRef?.current;
      if (intro && sectionEl) {
        sectionTrigger = ScrollTrigger.create({
          trigger: sectionEl,
          start: "top top",
          end: "bottom top",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            section = self.progress;
            sync();
          },
        });
      }

      enter = enterTrigger.progress;
      exit = exitTrigger?.progress ?? 0;
      section = sectionTrigger?.progress ?? 0;
      sync();
      ScrollTrigger.refresh();
    };

    ensureGsapScrollTrigger();
    attach();

    const onScroll = () => ScrollTrigger.update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.visualViewport?.addEventListener("scroll", onScroll);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      enterTrigger?.kill();
      exitTrigger?.kill();
      sectionTrigger?.kill();
      window.removeEventListener("scroll", onScroll);
      window.visualViewport?.removeEventListener("scroll", onScroll);
    };
  }, [
    enabled,
    intro,
    enterOffset,
    exitOffset,
    introSectionRef,
    targetRef,
  ]);
}
