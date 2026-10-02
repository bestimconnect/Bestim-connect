import { BellRing, Car, FileText, LayoutGrid, Users, Wallet } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

// Same order as dict.dash.rows.
const statuses = ["soon", "ok", "overdue", "ok"] as const;
const pill = {
  ok: "bg-lime/15 text-lime",
  soon: "bg-amber/15 text-amber",
  overdue: "bg-coral/20 text-coral",
};
const sidebar = [LayoutGrid, Car, Users, BellRing, Wallet, FileText];
// Demo chart: fleet cost over the last six months.
const bars = [46, 62, 54, 78, 66, 100];

// The fleet table on its own: dark, so it sits on bg-ink / bg-panel surfaces.
// Phones show three columns (vehicle, next service, status); wider screens all five.
// `compact` keeps the three columns at every width, for narrow places.
export function FleetTable({ dict, compact }: { dict: Dictionary; compact?: boolean }) {
  const t = dict.dash;
  const cols = `grid grid-cols-[1fr_1.7fr_4.75rem] items-center gap-3 ${
    compact ? "" : "sm:grid-cols-[1fr_0.8fr_1.1fr_1.8fr_4.75rem]"
  }`;
  const wide = compact ? "hidden" : "hidden sm:block";
  return (
    <div className="text-start text-sm text-paper">
      <div className={`${cols} px-3 pb-2 text-xs opacity-50`}>
        <span>{t.columns.vehicle}</span>
        <span className={wide}>{t.columns.driver}</span>
        <span className={wide}>{t.columns.odometer}</span>
        <span>{t.columns.next}</span>
        <span>{t.columns.status}</span>
      </div>
      <ul className="space-y-1.5">
        {t.rows.map((row, i) => (
          <li key={row.vehicle} className={`${cols} rounded-field bg-white/5 px-3 py-2.5`}>
            <span className="font-semibold">{row.vehicle}</span>
            <span className={`${wide} opacity-70`}>{row.driver}</span>
            <span className={`${wide} opacity-70`}>{row.odometer}</span>
            <span className="opacity-70">{row.next}</span>
            <span className={`rounded-full px-2 py-1 text-center text-xs font-medium ${pill[statuses[i]]}`}>
              {t.status[statuses[i]]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// A picture of the manager's dashboard, drawn in HTML so it stays sharp, translates,
// and mirrors in Arabic. Demo data only (dict.dash).
export function DashboardMock({ dict, className = "" }: { dict: Dictionary; className?: string }) {
  const t = dict.dash;
  return (
    <div
      role="img"
      aria-label={t.alt}
      className={`overflow-hidden rounded-nav border border-white/10 bg-panel text-paper shadow-float ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3.5">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-white/15" />
          ))}
        </span>
        <span className="text-sm font-semibold">{t.title}</span>
        <span className="ms-auto rounded-full bg-white/5 px-3 py-1 text-xs opacity-70">{t.period}</span>
      </div>
      <div className="flex">
        <div className="hidden w-14 shrink-0 flex-col items-center gap-2 border-e border-white/10 py-4 md:flex">
          {sidebar.map((Icon, i) => (
            <span
              key={i}
              className={`grid size-9 place-items-center rounded-field ${i === 0 ? "bg-lime text-ink" : "opacity-45"}`}
            >
              <Icon className="size-4" />
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1 space-y-3 p-3 md:space-y-4 md:p-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {t.stats.map((stat, i) => (
              <div key={stat.label} className="rounded-item bg-ink p-4 text-start">
                {/* The third tile is the overdue count. */}
                <p className={`text-2xl font-bold ${i === 2 ? "text-coral" : ""}`}>{stat.value}</p>
                <p className="mt-0.5 text-xs opacity-60">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 md:gap-4 lg:grid-cols-[2.2fr_1fr]">
            <div className="rounded-item bg-ink p-3">
              <FleetTable dict={dict} />
            </div>
            <div className="hidden flex-col rounded-item bg-ink p-4 text-start lg:flex">
              <p className="text-xs opacity-60">{t.costTitle}</p>
              <div className="mt-4 flex flex-1 items-end gap-2" dir="ltr">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-md ${i === bars.length - 1 ? "bg-lime" : "bg-white/15"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
