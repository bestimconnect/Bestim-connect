import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { ConnectLogo } from "./ConnectLogo";
import { LangSwitch } from "./LangSwitch";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.footer;
  const columns = [
    {
      title: t.product,
      links: [
        [`/${lang}#product`, dict.nav.product],
        [`/${lang}#how`, dict.nav.how],
        [`/${lang}#workshops`, dict.nav.workshops],
        [`/${lang}#faq`, dict.nav.faq],
      ],
    },
    {
      // The legal pages live on the consumer site: one copy of the legal text.
      title: t.more,
      links: [
        [`${site.consumerUrl}/${lang}`, t.consumer],
        [`${site.consumerUrl}/${lang}/privacy`, t.privacy],
        [`${site.consumerUrl}/${lang}/terms`, t.terms],
        [`mailto:${site.email}`, t.contact],
      ],
    },
  ];
  return (
    <footer className="px-2 pb-2 md:px-4 md:pb-4">
      <div className="relative isolate overflow-hidden rounded-screen bg-night px-5 pt-16 pb-8 text-paper md:px-12">
        <span aria-hidden className="absolute -start-40 -top-40 -z-10 size-96 rounded-full bg-teal/40 blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div>
              <ConnectLogo inverse big />
              <p className="mt-4 max-w-sm leading-7 opacity-70">{t.tagline}</p>
            </div>
            <div className="flex gap-16">
              {columns.map((col) => (
                <div key={col.title}>
                  <h2 className="text-sm font-semibold text-lime">{col.title}</h2>
                  <ul className="mt-4 space-y-3 text-[15px]">
                    {col.links.map(([href, label]) => (
                      <li key={href}>
                        <Link href={href} className="opacity-70 transition-opacity hover:opacity-100">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm">
            <p className="opacity-60">© 2026 Bestim · {t.rights}</p>
            <LangSwitch className="font-medium text-lime hover:underline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
