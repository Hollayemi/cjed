import type { Metadata } from "next";
import HomeWrapper from "@/app/components/wrapper";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with CJED for legal aid, partnerships, or general enquiries.",
};

export default function ContactPage() {
  return (
    <HomeWrapper>
      <ContactPageContent />
    </HomeWrapper>
  );
}