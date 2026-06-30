import HomeWrapper from "@/app/components/wrapper";
import Hero from "@/app/sections/Hero";
import About from "@/app/sections/About";
import Programs from "@/app/sections/Programs";
import Impact from "@/app/sections/Impact";
import HowWeWork from "@/app/sections/HowWeWork";
import FeaturedInitiative from "@/app/sections/FeaturedInitiative";
import LatestNews from "@/app/sections/LatestNews";
import Partners from "@/app/sections/Partners";
import CTA from "@/app/sections/CTA";

export default function Home() {
  return (
    <HomeWrapper>
      <Hero />
      <About />
      <Programs />
      <Impact />
      <FeaturedInitiative />
      <HowWeWork />
      <LatestNews />
      <Partners />
      <CTA />
    </HomeWrapper>
  );
}
