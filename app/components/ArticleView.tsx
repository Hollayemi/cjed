import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react";
import type { Article } from "@/lib/public-content";
import Container from "@/app/components/Container";
import CTA from "@/app/sections/CTA";

type Props = { article: Article; backHref: string; backLabel: string; fallbackImage: string };

/** Shared page for one news post, program or story, so all three read the same way. */
export default function ArticleView({ article: a, backHref, backLabel, fallbackImage }: Props) {
  const meta = [
    a.date && { icon: Calendar, text: a.date },
    a.readTime && a.paragraphs.length > 0 && { icon: Clock, text: a.readTime },
    a.author && { icon: User, text: a.author },
    a.location && { icon: MapPin, text: a.location },
  ].filter(Boolean) as { icon: typeof Calendar; text: string }[];

  return (
    <>
      <article className="pt-32 pb-20 lg:pt-40">
        <Container size="md">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0068C1] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>

          <span className="mt-8 inline-block rounded-full bg-[#f7cb06] px-3 py-1 text-xs font-bold text-[#0A1F2E]">
            {a.kicker}
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl leading-tight text-[#0068C1]">{a.title}</h1>

          {meta.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              {meta.map(({ icon: Icon, text }) => (
                <li key={text} className="inline-flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-[#0068C1]" /> {text}
                </li>
              ))}
            </ul>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a.image || fallbackImage}
            alt={a.title}
            className="mt-10 aspect-[16/9] w-full rounded-3xl bg-[#F5F7F8] object-cover"
          />

          {a.summary && <p className="mt-10 text-xl leading-relaxed text-gray-700">{a.summary}</p>}

          {a.highlights.length > 0 && (
            <ul className="mt-8 flex flex-col gap-3 rounded-2xl bg-[#F5F7F8] p-6">
              {a.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#0068C1]" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-col gap-5 text-lg leading-8 text-gray-700">
            {a.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {a.partners.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-6">
              {a.partners.map((p) => (
                <span key={p} className="rounded-full bg-[#F5F7F8] px-3 py-1 text-xs font-medium text-[#0068C1]">
                  {p}
                </span>
              ))}
            </div>
          )}
        </Container>
      </article>
      <CTA />
    </>
  );
}
