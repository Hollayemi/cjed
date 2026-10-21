// Client-safe. Turns admin records into the exact shapes the public pages render,
// and holds the built-in content shown until the first item is published.
import { newsArticles, moreNewsArticles } from "@/app/data/news";
import { initiatives } from "@/app/data/initiative";

type Doc = Record<string, unknown>;

export type NewsCard = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  /** Cloudinary URL. Empty means "use the page's default photo". */
  image: string;
  author: string;
};

export type ProgramCard = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  date: string;
  summary: string;
  highlights: string[];
  partners: string[];
  image: string;
  hasPage: boolean;
};

export type StoryCard = {
  id: string;
  slug: string;
  title: string;
  author: string;
  location: string;
  summary: string;
  date: string;
  readTime: string;
  image: string;
};

const str = (v: unknown) => (typeof v === "string" ? v : "");
const list = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const id = (d: Doc) => String(d._id ?? d.slug ?? "");

const toDate = (v: unknown) => {
  const d = v instanceof Date ? v : typeof v === "string" ? new Date(v) : null;
  return d && !Number.isNaN(d.getTime()) ? d : null;
};

export const formatDate = (v: unknown) =>
  toDate(v)?.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }) ?? "";

const monthYear = (d: Date) => d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export function readTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

// Programs show one date line. Ongoing programs have a start date but no end date.
export function programDate(start: unknown, end: unknown) {
  const s = toDate(start);
  const e = toDate(end);
  if (s && e) return monthYear(s) === monthYear(e) ? monthYear(s) : `${monthYear(s)} – ${monthYear(e)}`;
  if (s) return `Ongoing · since ${monthYear(s)}`;
  if (e) return `Until ${monthYear(e)}`;
  return "";
}

export function toNewsCard(d: Doc): NewsCard {
  const body = str(d.body);
  return {
    id: id(d),
    slug: str(d.slug),
    category: str(d.category) || "News",
    title: str(d.title),
    excerpt: str(d.summary) || body.slice(0, 180),
    date: formatDate(d.publishedAt ?? d.createdAt),
    readTime: readTime(body || str(d.summary)),
    image: str(d.coverImage),
    author: str(d.author),
  };
}

export function toProgramCard(d: Doc): ProgramCard {
  return {
    id: id(d),
    slug: str(d.slug),
    title: str(d.title),
    category: str(d.category) || "Program",
    location: str(d.location),
    date: programDate(d.startDate, d.endDate),
    summary: str(d.summary) || str(d.body).slice(0, 220),
    highlights: list(d.highlights),
    partners: list(d.partners),
    image: str(d.coverImage),
    hasPage: true,
  };
}

export function toStoryCard(d: Doc): StoryCard {
  const body = str(d.body);
  return {
    id: id(d),
    slug: str(d.slug),
    title: str(d.title),
    author: str(d.author),
    location: str(d.location),
    summary: str(d.summary) || body.slice(0, 180),
    date: formatDate(d.publishedAt ?? d.createdAt),
    readTime: readTime(body || str(d.summary)),
    image: str(d.coverImage),
  };
}

/* ---------- Built-in content, used until something is published from the admin ---------- */
export const fallbackNews: NewsCard[] = [...newsArticles, ...moreNewsArticles].map((a) => ({
  id: a.id,
  slug: a.slug,
  category: a.category,
  title: a.title,
  excerpt: a.excerpt,
  date: a.date,
  readTime: a.readTime,
  image: "", // the original image paths were never added to /public; pages use their default photos
  author: "",
}));

export const fallbackPrograms: ProgramCard[] = initiatives.map((i) => ({
  id: i.id,
  slug: i.slug,
  title: i.title,
  category: i.category,
  location: i.location,
  date: i.date,
  summary: i.summary,
  highlights: i.highlights,
  partners: i.partners,
  image: i.image,
  hasPage: false,
}));


/* ---------- One shape for every detail page (/news/x, /programs/x, /stories/x) ---------- */
export type Article = {
  title: string;
  kicker: string;
  summary: string;
  paragraphs: string[];
  image: string;
  date: string;
  readTime: string;
  author: string;
  location: string;
  highlights: string[];
  partners: string[];
};

const paragraphs = (text: string) =>
  text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export function toArticle(resource: "news" | "programs" | "stories", d: Doc): Article {
  const body = str(d.body);
  const kicker = resource === "stories" ? "Story" : str(d.category) || (resource === "news" ? "News" : "Program");
  return {
    title: str(d.title),
    kicker,
    summary: str(d.summary),
    paragraphs: paragraphs(body),
    image: str(d.coverImage),
    date:
      resource === "programs"
        ? programDate(d.startDate, d.endDate)
        : formatDate(d.publishedAt ?? d.createdAt),
    readTime: readTime(body || str(d.summary)),
    author: str(d.author),
    location: str(d.location),
    highlights: list(d.highlights),
    partners: list(d.partners),
  };
}

/** The built-in news items have no full text, so their page shows the excerpt. */
export function fallbackNewsArticle(slug: string): Article | null {
  const a = fallbackNews.find((n) => n.slug === slug);
  if (!a) return null;
  return {
    title: a.title,
    kicker: a.category,
    summary: "",
    paragraphs: [a.excerpt],
    image: a.image,
    date: a.date,
    readTime: a.readTime,
    author: "",
    location: "",
    highlights: [],
    partners: [],
  };
}
