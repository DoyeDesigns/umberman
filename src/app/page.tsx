import { AboutExhibitionSection } from "@/components/alt/AboutExhibitionSection";
import { AltMenuProvider, AltNavbar } from "@/components/alt/AltNavbar";
import { BioSection } from "@/components/alt/BioSection";
import { ConnectWithUsSection } from "@/components/alt/ConnectWithUsSection";
import { OutNowSection } from "@/components/alt/OutNowSection";
import { PastExhibitionSection } from "@/components/alt/PastExhibitionSection";
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
        <PastExhibitionSection />
        <OutNowSection />
        <ConnectWithUsSection />
      </AnimatedPage>
    </AltMenuProvider>
  );
}
