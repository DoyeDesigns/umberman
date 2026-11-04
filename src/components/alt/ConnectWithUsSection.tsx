"use client";

import { SocialConnectButtons } from "@/components/alt/SocialConnectButtons";
import { AltFadeUpReveal } from "@/components/animations/AltFadeUpReveal";
import { ALT_THEMES } from "@/lib/design";

const theme = ALT_THEMES.alt;

export function ConnectWithUsSection() {
  return (
    <section
      id="connect"
      className="w-full max-w-full scroll-mt-[100px] py-[57px] md:py-[100px]"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="section-px mx-auto flex w-full max-w-[min(100%,80rem)] flex-col items-center">
        <AltFadeUpReveal>
          <h2 className="text-connect-title text-center font-prose uppercase text-[#F1F1F1]">
            Connect with us
          </h2>
        </AltFadeUpReveal>

        <AltFadeUpReveal delay={0.1} className="mt-[30px] w-full md:mt-[clamp(2rem,5vw,3.5rem)]">
          <SocialConnectButtons />
        </AltFadeUpReveal>
      </div>
    </section>
  );
}
