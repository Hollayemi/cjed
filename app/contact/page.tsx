import type { Metadata } from "next";
import HomeWrapper from "@/app/components/wrapper";
import ContactPageContent from "./ContactPageContent";

const title = "Contact Us";
const description =
  "Get in touch with CJED for legal aid, partnerships, or general enquiries.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "contact CJED",
    "get legal help Nigeria",
    "CJED Abuja office",
    "free legal aid contact",
    "partner with CJED",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title,
    description,
    url: "/contact",
  },
  twitter: {
    title,
    description,
  },
};

export default function ContactPage() {
  return (
    <HomeWrapper>
      <ContactPageContent />
    </HomeWrapper>
  );
}