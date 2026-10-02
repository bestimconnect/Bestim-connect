import { CircleDollarSign, Files, TriangleAlert } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

// Same order as dict.problems.items.
const icons = [Files, TriangleAlert, CircleDollarSign];

// The three pains of running a fleet on paper.
export function Problems({ dict }: { dict: Dictionary }) {
  const t = dict.problems;
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title1={t.title1} title2={t.title2} />
        </Reveal>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {t.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={item.title}>
                <Reveal
                  delay={i * 0.08}
                  className="h-full rounded-nav border border-line/70 bg-white p-7 shadow-card"
                >
                  <span className="grid size-12 place-items-center rounded-full bg-blush text-coral">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{item.body}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
