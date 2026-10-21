import type { Metadata } from "next";
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

const title = "Legal Aid, Human Rights & Access to Justice in Nigeria";
const description =
  "CJED provides free legal aid, human rights advocacy, capacity building and community development programs for indigent and marginalized persons across Nigeria.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "legal aid Nigeria",
    "free legal representation Nigeria",
    "human rights advocacy Nigeria",
    "access to justice Nigeria",
    "CJED Abuja",
    "legal aid for indigent persons",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
  },
  twitter: {
    title,
    description,
  },
};

export default function Home() {
  return (
    <HomeWrapper>
      <Hero />
      <About />
      <Programs />
      {/* <Impact /> */}
      {/* <FeaturedInitiative /> */}
      <HowWeWork />
      <LatestNews />
      <Partners />
      <CTA />
    </HomeWrapper>
  );
}
