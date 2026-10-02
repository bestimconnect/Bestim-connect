import { Check } from "lucide-react";
import { FleetTable } from "@/components/DashboardMock";
import { Reveal } from "@/components/Motion";
import { Phone } from "@/components/Phone";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary, Locale } from "@/lib/i18n";
import { screen } from "@/screens";

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((point) => (
        <li key={point} className="flex items-start gap-3 leading-7">
          <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
            <Check className="size-3" strokeWidth={3} />
          </span>
          <span className="opacity-85">{point}</span>
        </li>
      ))}
    </ul>
  );
}

const tag = "inline-block rounded-full bg-lime px-3.5 py-1 text-sm font-semibold text-ink";

// The product in two halves: the driver's app (teal) and the office dashboard (ink).
export function TwoSides({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.sides;
  return (
    <section className="px-2 md:px-4">
      <Reveal>
        <SectionHeading {...t} className="px-2 text-center" />
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-7xl gap-2 md:grid-cols-2 md:gap-4">
        {/* The driver */}
        <Reveal className="h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-screen bg-teal p-7 pb-0 text-white md:p-12 md:pb-0">
            <span aria-hidden className="absolute -end-24 -top-24 size-72 rounded-full bg-lime/25 blur-3xl" />
            <div className="relative">
              <span className={tag}>{t.driver.tag}</span>
              <h3 className="mt-5 text-2xl font-bold md:text-3xl">{t.driver.title}</h3>
              <Points items={t.driver.points} />
            </div>
            {/* The phone sits on the block's bottom edge and is cut off by its rounded corners. */}
            <div className="relative mt-auto h-80 pt-10">
              {/* Arabic has no "listening" capture (no Arabic recognition in the simulator), so it shows the review step. */}
              <Phone src={screen(lang, lang === "ar" ? "review" : "voice")} alt={t.driver.alt} className="mx-auto w-64" />
            </div>
          </div>
        </Reveal>

        {/* The office */}
        <Reveal delay={0.08} className="h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-screen bg-night p-7 text-paper md:p-12">
            <span aria-hidden className="absolute -start-24 -bottom-24 size-72 rounded-full bg-teal/50 blur-3xl" />
            <div className="relative">
              <span className={tag}>{t.manager.tag}</span>
              <h3 className="mt-5 text-2xl font-bold md:text-3xl">{t.manager.title}</h3>
              <Points items={t.manager.points} />
            </div>
            <div aria-hidden className="relative mt-10 rounded-nav border border-white/10 bg-panel p-3 md:mt-auto">
              <FleetTable dict={dict} compact />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
