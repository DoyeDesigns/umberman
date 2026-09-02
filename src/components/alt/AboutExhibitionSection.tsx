"use client";

import { AltFadeUpReveal } from "@/components/animations/AltFadeUpReveal";

const PARAGRAPHS = [
  `In this body of work, I bring together music and painting to tell a single story—the story of The Umberman. He's unsure and unmoored, but he's in love, too. He struggles with a hero complex while somewhat paranoid. And, like most other 30 somethings, he's overworked and still can't afford a mortgage. He feels betrayed by the generation before him and is mortified to have children for fear of not measuring up either. He's sometimes full of shit and other times an eternal optimist. He believes his destiny is tied to his choices and, at the same time, knows there are neural pathways threaded before his umbilical cord was snipped and buried. Or eaten. Or whatever.`,
  `Observe! Here are our collective experiences like love, doubt, grief, displacement, and a yearning to be rooted, to belong somewhere; lingering questions that remain unanswered regardless of our origins or beliefs. Each song and painting records snapshots from different moments in life, but together they ask how we find meaning while living through uncertainty.`,
  `I believe these musings deserve our attention because they reside in everyone. We spend much of our lives in search of ourselves, acceptance, or the next sure thing, yet we rarely pause to consider the shrines that guide those pursuits or the people we become on these dusty paths. For this reason, The Umberman asks more questions than give answers. After all, the artist is on this same journey to find himself.`,
  `If you would, consider The Umberman a building with rooms. Some of these rooms are empty, lit by a single, dangling 40-watt bulb. Furnish them. Other rooms are furnished like a baroque palace on steroids, while others shapeshift like looking at a mirage through a kaleidoscope. Come inside, have a look, bring what you'll bring and take all you can take. I hope the taking is good. If it isn't, I'll just stick to painting portraits (after 77 times 7 more tries).`,
] as const;

export function AboutExhibitionSection() {
  return (
    <section
      id="about"
      className="w-full max-w-full scroll-mt-[100px] bg-[#F1F1F1]"
    >
      <div className="section-px mx-auto w-full max-w-[min(100%,80rem)] py-[clamp(3rem,8vw,5.5rem)]">
        <AltFadeUpReveal>
          <h2 className="text-alt-section-title mb-[clamp(2rem,5vw,3.5rem)] text-center font-heading font-normal text-[#1C1C1C]">
            About Exhibition
          </h2>
        </AltFadeUpReveal>

        <div className="flex flex-col gap-[clamp(1.25rem,3vw,1.75rem)] text-left font-body text-[clamp(1rem,2.5vw,1.375rem)] font-normal leading-[1.45] tracking-normal text-[#1C1C1C]">
          {PARAGRAPHS.map((paragraph, index) => (
            <AltFadeUpReveal key={index} delay={0.08 + index * 0.07}>
              <p>{paragraph}</p>
            </AltFadeUpReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
