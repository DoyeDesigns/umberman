import { AboutExhibitionSection } from "@/components/alt/AboutExhibitionSection";
import { AltSaveTheDate } from "@/components/alt/AltSaveTheDate";
import { BioSection } from "@/components/alt/BioSection";
import { AnimatedPage } from "@/components/animations/AnimatedPage";
import { Hero } from "@/components/hero/Hero";
import { LiveAt } from "@/components/live-at/LiveAt";

export default function AltHomePage() {
  return (
    <AnimatedPage variant={0}>
      <Hero design="alt" />
      <LiveAt design="alt" />
      <AboutExhibitionSection />
      <BioSection />
      <AltSaveTheDate />
    </AnimatedPage>
  );
}
