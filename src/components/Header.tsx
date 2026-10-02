import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { ConnectLogo } from "./ConnectLogo";
import { LangSwitch } from "./LangSwitch";

// A dark glass bar: it belongs to the dark hero, and stays readable over the light sections.
export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    ["product", dict.nav.product],
    ["how", dict.nav.how],
    ["workshops", dict.nav.workshops],
    ["faq", dict.nav.faq],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-night/75 ps-5 pe-2.5 text-paper shadow-float backdrop-blur-md md:ps-6">
        <Link href={`/${lang}`} aria-label={dict.nav.home} className="shrink-0">
          <ConnectLogo inverse />
        </Link>
        {/* ponytail: section links are hidden on phones (no hamburger); the page is one scroll. Add a menu if pages grow. */}
        <ul className="hidden items-center gap-8 text-[15px] md:flex">
          {links.map(([id, label]) => (
            <li key={id}>
              <Link href={`/${lang}#${id}`} className="opacity-70 transition-opacity hover:opacity-100">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1 whitespace-nowrap">
          {/* Phones: the language link lives in the footer, the logo and the button need the room. */}
          <LangSwitch className="hidden rounded-full px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 sm:block" />
          <Link
            href={`/${lang}#demo`}
            className="rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink shadow-glow transition-transform hover:-translate-y-0.5"
          >
            {dict.nav.demo}
          </Link>
        </div>
      </nav>
    </header>
  );
}
