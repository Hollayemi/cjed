"use client";
import SectionHeading from "@/app/components/SectionHeading";
import Container from "@/app/components/Container";
import GalleryCarousel from "@/app/components/GalleryCarousel";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1591522810850-58128c5fb089?w=1600&q=80",
    caption: "Free legal clinics bringing counsel directly to rural communities.",
    location: "Kaduna State",
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
    caption: "Paralegals and community leaders training on rights-based advocacy.",
    location: "Abuja, FCT",
  },
  {
    src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1600&q=80",
    caption: "Women's rights workshops equipping leaders with legal knowledge.",
    location: "Enugu State",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80",
    caption: "Mobile outreach teams resolving land and identity disputes.",
    location: "Kano State",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80",
    caption: "Case reviews and strategy sessions with our legal team.",
    location: "Lagos State",
  },
];

export default function Gallery() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        <div className="mb-14">
          <SectionHeading
            eyebrow="In The Field"
            title="Moments from our work"
            subtitle="A look at the people and communities behind every case, every workshop, and every reform we push for."
            align="center"
          />
        </div>

        <GalleryCarousel slides={slides} />
      </Container>
    </section>
  );
}
