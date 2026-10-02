import { CircleAlert, Disc3, Droplet, FileDown, Gauge, Receipt, Wind } from "lucide-react";
import { FleetTable } from "@/components/DashboardMock";
import { Bar, CountUp, Reveal } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary } from "@/lib/i18n";

const card = "h-full overflow-hidden rounded-nav border border-line/70 bg-white shadow-card";

// Demo chart: months 05..10, the same demo fleet as the dashboard picture.
const bars = [46, 62, 54, 78, 66, 100];
// Same order as dict.features.reminders.items.
const reminderLooks = [
  { Icon: Disc3, tint: "bg-blush text-coral" },
  { Icon: Droplet, tint: "bg-amber text-ink" },
  { Icon: Wind, tint: "bg-amber text-ink" },
];
// The three small cards on the last row.
const small = [
  { key: "receipts", Icon: Receipt },
  { key: "reports", Icon: FileDown },
  { key: "units", Icon: Gauge },
] as const;

export function FeatureBento({ dict }: { dict: Dictionary }) {
  const t = dict.features;
  return (
    <section id="product" className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading {...t} />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-6">
          {/* The fleet table */}
          <Reveal className="md:col-span-4">
            <div className="relative h-full overflow-hidden rounded-nav bg-night p-7 text-paper shadow-card md:p-9">
              <span aria-hidden className="absolute -end-20 -top-24 size-64 rounded-full bg-teal/50 blur-3xl" />
              <div className="relative">
                <h3 className="text-2xl font-semibold">{t.fleet.title}</h3>
                <p className="mt-2 max-w-md leading-7 opacity-70">{t.fleet.body}</p>
                <div aria-hidden className="mt-7 rounded-metric border border-white/10 bg-panel p-3">
                  <FleetTable dict={dict} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Fleet-wide reminders */}
          <Reveal delay={0.08} className="md:col-span-2">
            <div className={`${card} p-7`}>
              <h3 className="text-2xl font-semibold">{t.reminders.title}</h3>
              <p className="mt-2 leading-7 text-muted">{t.reminders.body}</p>
              <ul className="mt-6 space-y-3">
                {t.reminders.items.map((item, i) => {
                  const { Icon, tint } = reminderLooks[i];
                  return (
                    <li key={item.name} className="flex items-center gap-3 rounded-item bg-paper p-3">
                      <span className={`grid size-10 shrink-0 place-items-center rounded-full ${tint}`}>
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{item.name}</span>
                        <span className="block text-xs text-muted">{item.sub}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {/* Records you can trust: the original, the correction, and a flagged reading */}
          <Reveal className="md:col-span-2">
            <div className={`${card} p-7`}>
              <h3 className="text-2xl font-semibold">{t.trust.title}</h3>
              <p className="mt-2 leading-7 text-muted">{t.trust.body}</p>
              <div className="mt-6 space-y-2 text-sm">
                <p className="flex justify-between gap-3 rounded-item bg-paper p-3 text-muted">
                  <span>{t.trust.original}</span>
                  <span className="line-through" dir="ltr">
                    134,550
                  </span>
                </p>
                <p className="flex justify-between gap-3 rounded-item bg-mint p-3 font-semibold">
                  <span>{t.trust.corrected}</span>
                  <span dir="ltr">134,950</span>
                </p>
                <p className="flex items-center gap-2 rounded-item bg-blush p-3 font-medium">
                  <CircleAlert className="size-4 shrink-0 text-coral" />
                  {t.trust.flag}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Cost per vehicle */}
          <Reveal delay={0.08} className="md:col-span-4">
            <div className={`${card} grid gap-8 p-7 md:grid-cols-2 md:p-9`}>
              <div>
                <h3 className="text-2xl font-semibold">{t.cost.title}</h3>
                <p className="mt-2 leading-7 text-muted">{t.cost.body}</p>
                <div className="mt-7 rounded-metric bg-ink p-5 text-paper">
                  <p className="text-sm opacity-70">{t.cost.totalLabel}</p>
                  <CountUp to={742600} className="mt-1 block text-4xl font-bold" />
                  <p className="mt-1 text-sm opacity-70">{t.cost.currency}</p>
                </div>
              </div>
              <div className="flex h-56 items-end gap-3 md:h-auto" dir="ltr" aria-hidden>
                {bars.map((h, i) => (
                  <div key={i} className="flex h-full flex-1 flex-col justify-end gap-2">
                    <Bar
                      height={`${h}%`}
                      delay={i * 0.08}
                      className={`rounded-field ${i === bars.length - 1 ? "bg-teal" : "bg-line"}`}
                    />
                    <span className="text-center text-xs text-muted">{String(i + 5).padStart(2, "0")}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {small.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={i * 0.08} className="md:col-span-2">
              <div className={`${card} p-7`}>
                <span className="grid size-12 place-items-center rounded-full bg-lime text-ink">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{t[key].title}</h3>
                <p className="mt-2 leading-7 text-muted">{t[key].body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
