import { AboutExhibitionSection } from "@/components/alt/AboutExhibitionSection";
import { AltMenuProvider, AltNavbar } from "@/components/alt/AltNavbar";
import { AltSaveTheDate } from "@/components/alt/AltSaveTheDate";
import { BioSection } from "@/components/alt/BioSection";
import { AnimatedPage } from "@/components/animations/AnimatedPage";
import { Hero } from "@/components/hero/Hero";
import { LiveAt } from "@/components/live-at/LiveAt";

export default function AltHomePage() {
  return (
    <AltMenuProvider>
      <AnimatedPage variant={0}>
        <AltNavbar design="alt" />
        <Hero design="alt" />
        <LiveAt design="alt" />
        <AboutExhibitionSection />
        <BioSection />
        <AltSaveTheDate />
      </AnimatedPage>
    </AltMenuProvider>
  );
}
