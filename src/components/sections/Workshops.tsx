import { ArrowUpLeft, ArrowUpRight, BadgeCheck, History, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary, Locale } from "@/lib/i18n";

// Same order as dict.workshops.points.
const icons = [BadgeCheck, History, ShieldCheck];

// The workshop block: workshops verify their work in the customer's car history.
export function Workshops({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.workshops;
  const Arrow = lang === "ar" ? ArrowUpLeft : ArrowUpRight;
  return (
    <section id="workshops" className="px-2 md:px-4">
      <div className="relative overflow-hidden rounded-screen bg-teal px-5 py-16 text-white md:px-12 md:py-24">
        <span aria-hidden className="absolute -end-32 -top-32 size-96 rounded-full bg-lime/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow={t.eyebrow}
              title1={t.title1}
              title2={t.title2}
              body={t.body}
              onDark
              className="text-start"
            />
            <Link
              href={`/${lang}#demo`}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 font-semibold text-ink shadow-glow transition-transform hover:-translate-y-0.5"
            >
              {t.cta}
              <Arrow className="size-5" />
            </Link>
          </Reveal>

          <ul className="space-y-4">
            {t.points.map((point, i) => {
              const Icon = icons[i];
              return (
                <li key={point}>
                  <Reveal
                    delay={i * 0.08}
                    className="flex items-center gap-4 rounded-metric border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-lime text-ink">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-lg font-semibold">{point}</span>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
