import { AboutExhibitionSection } from "@/components/alt/AboutExhibitionSection";
import { AltSaveTheDate } from "@/components/alt/AltSaveTheDate";
import { BioSection } from "@/components/alt/BioSection";
import { AnimatedPage } from "@/components/animations/AnimatedPage";
import { Hero } from "@/components/hero/Hero";
import { LiveAt } from "@/components/live-at/LiveAt";

export default function Alt2HomePage() {
  return (
    <AnimatedPage variant={0}>
      <Hero design="alt2" />
      <LiveAt design="alt2" />
      <AboutExhibitionSection design="alt2" />
      <BioSection />
      <AltSaveTheDate design="alt2" />
    </AnimatedPage>
  );
}
