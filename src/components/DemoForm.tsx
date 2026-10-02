"use client";

import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";

// Must match the allowed values in the connect_leads table (see the migration).
const sizes = ["1-10", "11-50", "51-200", "200+"];

// Phones are often typed with Arabic keyboard digits (٠١٢…): store Latin digits.
const latinDigits = (s: string) => s.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660));

const field =
  "mt-1.5 w-full rounded-field border border-line bg-paper px-4 py-3 text-ink outline-none transition-colors focus:border-teal";

// The demo-request form. Saves one row in the shared Supabase project (table
// connect_leads, insert-only for visitors); the database enforces lengths and values.
export function DemoForm({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.demo;
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const whatsapp = whatsappLink(t.whatsappText);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    // Honeypot: people never see this field, simple bots fill it. Pretend it worked.
    if (data.website) return setState("done");
    setState("sending");
    try {
      const res = await fetch(`${site.supabaseUrl}/rest/v1/connect_leads`, {
        method: "POST",
        headers: {
          apikey: site.supabaseKey,
          Authorization: `Bearer ${site.supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: data.name.trim(),
          company: data.company.trim(),
          phone: latinDigits(data.phone).trim(),
          fleet_size: data.fleet_size,
          kind: data.kind,
          note: data.note.trim() || null,
          lang,
        }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="grid h-full place-items-center rounded-nav bg-white p-10 text-center text-ink shadow-float" role="status">
        <div>
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-lime">
            <Check className="size-7" strokeWidth={2.5} />
          </span>
          <h3 className="mt-5 text-2xl font-bold">{t.doneTitle}</h3>
          <p className="mt-2 text-muted">{t.doneBody}</p>
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-block rounded-full bg-ink px-7 py-3.5 font-semibold text-paper"
            >
              {t.whatsapp}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative rounded-nav bg-white p-6 text-start text-ink shadow-float md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          {t.name}
          <input name="name" required minLength={2} maxLength={80} autoComplete="name" className={field} />
        </label>
        <label className="text-sm font-medium">
          {t.company}
          <input name="company" required minLength={2} maxLength={120} autoComplete="organization" className={field} />
        </label>
        <label className="text-sm font-medium">
          {t.phone}
          <input
            name="phone"
            type="tel"
            required
            minLength={7}
            maxLength={20}
            pattern="[0-9٠-٩+ \(\)\-]{7,20}"
            autoComplete="tel"
            dir="ltr"
            // The number itself reads left to right; in Arabic it still lines up with the other fields.
            className={`${field} rtl:text-right`}
          />
        </label>
        <label className="text-sm font-medium">
          {t.fleetSize}
          <select name="fleet_size" required defaultValue="11-50" className={field}>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          {t.kind}
          <select name="kind" required defaultValue="fleet" className={field}>
            <option value="fleet">{t.kindFleet}</option>
            <option value="workshop">{t.kindWorkshop}</option>
          </select>
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          {t.note}
          <textarea name="note" rows={3} maxLength={500} className={field} />
        </label>
      </div>
      {/* Honeypot: invisible, skipped by keyboards and screen readers. Kept inside the form
          (not pushed off-screen) so nothing can scroll the page sideways to reach it. */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute start-0 top-0 size-px opacity-0"
      />

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-6 w-full cursor-pointer rounded-full bg-lime px-7 py-4 font-semibold shadow-glow transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
      >
        {state === "sending" ? t.sending : t.submit}
      </button>
      {state === "error" && (
        <p role="alert" className="mt-4 rounded-item bg-blush p-3 text-sm">
          {t.error}{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline" dir="ltr">
            {site.email}
          </a>
        </p>
      )}
      <p className="mt-4 text-center text-xs text-muted">
        {t.privacy}{" "}
        <a href={`${site.consumerUrl}/${lang}/privacy`} target="_blank" rel="noopener" className="underline">
          {t.privacyLink}
        </a>
      </p>
    </form>
  );
}
