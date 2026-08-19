import { AboutExhibitionSection } from "@/components/alt/AboutExhibitionSection";
import { AltMenuProvider, AltNavbar } from "@/components/alt/AltNavbar";
import { AltSaveTheDate } from "@/components/alt/AltSaveTheDate";
import { BioSection } from "@/components/alt/BioSection";
import { AnimatedPage } from "@/components/animations/AnimatedPage";
import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <AltMenuProvider>
      <AnimatedPage>
        <AltNavbar />
        <Hero />
        <AboutExhibitionSection />
        <BioSection />
        <AltSaveTheDate />
      </AnimatedPage>
    </AltMenuProvider>
  );
}
