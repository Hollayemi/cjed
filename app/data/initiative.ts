export interface Initiative {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  date: string;
  summary: string;
  highlights: string[];
  image: string;
  partners: string[];
}

export const initiatives: Initiative[] = [
  {
    id: "unidel-law-clinic",
    slug: "unidel-law-clinic-training",
    title: "Clinical Legal Education Training & UNIDEL Law Clinic Commissioning",
    category: "Capacity Building",
    location: "University of Delta (UNIDEL), Owa-Oyibu Campus, Delta State",
    date: "2026",
    summary:
      "A 2-day clinical legal education training that culminated in the official commissioning of the University of Delta's pioneer Law Clinic — moving the faculty's curriculum from theory into hands-on, community-facing legal practice.",
    highlights: [
      "Organized by CJED and fully sponsored by the Hilary Ibegbulem Foundation",
      "Established the university's first Law Clinic facility, including a donated Lady Justitia statue",
      "Inaugurated with Vice-Chancellor Prof. Stella Chiemeke and Dean Prof. Okubor Cecil Nwachukwu",
      "Covered ethics & client care, clinical interviewing skills, mock simulations, and reflective legal pedagogy",
    ],
    image: "/images/rur2.jpg",
    partners: ["Hilary Ibegbulem Foundation", "University of Delta (UNIDEL)"],
  },
  {
    id: "baze-knosk-street-law",
    slug: "baze-knosk-street-law-programme",
    title: "Street Law Programme at KNOSK Charity School",
    category: "Community Outreach",
    location: "KNOSK N100-a-Day Charity Secondary School, Kuje, Abuja",
    date: "Ongoing · 10-week term programme",
    summary:
      "An immersive, interactive Street Law programme run by the Baze University Human Rights Law Clinic, teaching secondary school students their rights under the Nigerian Child Rights Act 2003 through role-play, storytelling, and peer mentoring rather than traditional lectures.",
    highlights: [
      "10-week curriculum built entirely around the Nigerian Child Rights Act 2003",
      "Delivered through drama, role-play, storytelling and small peer groups every Friday",
      "Led by Baze University Human Rights Law Clinic students, with CJED providing structural and framework support",
      "Includes field trips to the Baze Law Faculty and Law Library to inspire higher education ambitions",
    ],
    image: "/images/rur1.jpg",
    partners: [
      "Baze University Human Rights Law Clinic",
      "CJED",
      "KNOSK Charity Secondary School",
    ],
  },
];