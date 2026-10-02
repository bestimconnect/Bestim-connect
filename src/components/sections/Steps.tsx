import { LayoutDashboard, Mic, UserPlus } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

// Same order as dict.steps.items.
const icons = [UserPlus, Mic, LayoutDashboard];

// Three numbered steps from sign-up to a fleet under control.
export function Steps({ dict }: { dict: Dictionary }) {
  const t = dict.steps;
  return (
    <section id="how" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading eyebrow={t.eyebrow} title1={t.title1} title2={t.title2} />
        </Reveal>
        <div className="mt-14">
          <ol className="grid gap-5 md:grid-cols-3">
            {t.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <li key={item.title} className="relative">
                  <Reveal
                    delay={i * 0.08}
                    className="h-full rounded-nav border border-line/70 bg-white p-7 text-center shadow-card"
                  >
                    <p className="text-sm font-semibold text-teal">
                      {t.stepLabel} {i + 1}
                    </p>
                    <span className="mx-auto mt-4 grid size-16 place-items-center rounded-full bg-lime text-ink shadow-glow">
                      <Icon className="size-7" />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 leading-7 text-muted">{item.body}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
