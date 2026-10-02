import { CountUp, Reveal } from "@/components/Motion";
import type { Dictionary } from "@/lib/i18n";

// Dividers per cell (logical borders, so they flip in RTL): 2 columns on phones, 4 from md.
const dividers = ["border-b border-e md:border-b-0", "border-b md:border-b-0 md:border-e", "border-e", ""];

// Four count-up numbers in one card.
export function Facts({ dict }: { dict: Dictionary }) {
  return (
    <section className="px-4 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="grid grid-cols-2 rounded-nav border border-line/70 bg-white shadow-card md:grid-cols-4">
          {dict.facts.map((fact, i) => (
            <div key={fact.label} className={`border-line p-7 text-center md:p-9 ${dividers[i]}`}>
              <CountUp to={fact.value} className="block text-4xl font-bold md:text-5xl" />
              <p className="mt-2 text-muted">{fact.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
