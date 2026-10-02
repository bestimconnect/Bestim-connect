import { BellRing, Check } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { DashboardMock } from "@/components/DashboardMock";
import { Parallax } from "@/components/Motion";
import { Phone } from "@/components/Phone";
import type { Dictionary, Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";
import { screen } from "@/screens";

// A small white card that floats over the dashboard picture.
function FloatCard({ icon, tint, title, sub }: { icon: ReactNode; tint: string; title: string; sub: string }) {
  return (
    <div className="flex w-max max-w-64 items-center gap-3 rounded-metric bg-white p-3 pe-5 text-start text-ink shadow-float">
      <span className={`grid size-10 shrink-0 place-items-center rounded-full ${tint}`}>{icon}</span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted">{sub}</span>
      </span>
    </div>
  );
}

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.hero;
  const whatsapp = whatsappLink(dict.demo.whatsappText);
  return (
    <section className="px-2 pt-2 md:px-4 md:pt-4">
      <div className="relative isolate overflow-hidden rounded-screen bg-night px-4 pt-32 pb-20 text-paper md:pt-40 md:pb-24">
        {/* Brand glows: teal behind the headline, lime behind the dashboard. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-48 -z-10 mx-auto h-[680px] max-w-5xl rounded-full bg-[radial-gradient(closest-side,rgb(8_115_111/0.6),transparent)] blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-80 -z-10 mx-auto h-[560px] max-w-4xl rounded-full bg-[radial-gradient(closest-side,rgb(211_245_61/0.2),transparent)] blur-3xl"
        />

        {/* The hero enters with a CSS animation (not Reveal) so it shows before any JavaScript loads. */}
        <div className="mx-auto max-w-4xl animate-rise text-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm">
            <span className="size-2 rounded-full bg-lime ring-4 ring-lime/20" />
            {t.eyebrow}
          </p>
          <h1 className="mt-5 text-balance text-[2.25rem] leading-[1.2] font-bold md:text-5xl lg:text-[3.75rem] rtl:leading-[1.45]">
            <span className="block">{t.title1}</span>
            <span className="block text-lime">{t.title2}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 opacity-70">{t.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${lang}#demo`}
              className="rounded-full bg-lime px-7 py-4 font-semibold text-ink shadow-glow transition-transform hover:-translate-y-0.5"
            >
              {t.cta}
            </Link>
            {whatsapp ? (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener"
                className="rounded-full border border-white/20 px-7 py-4 font-semibold transition-colors hover:bg-white/10"
              >
                {t.whatsapp}
              </a>
            ) : (
              <Link
                href={`/${lang}#how`}
                className="rounded-full border border-white/20 px-7 py-4 font-semibold transition-colors hover:bg-white/10"
              >
                {t.secondary}
              </Link>
            )}
          </div>
        </div>

        {/* The two halves of the product in one picture: the office dashboard, and the driver's phone on its corner. */}
        <div className="relative mx-auto mt-24 max-w-5xl animate-rise [animation-delay:200ms] md:mt-14">
          <DashboardMock dict={dict} />
          {/* Phone is `relative` itself, so the corner position lives on a wrapper. */}
          <div className="absolute -bottom-14 end-2 w-28 sm:w-40 md:-end-6 md:w-52 lg:-end-12">
            <Phone src={screen(lang, "review")} alt={t.phoneAlt} priority />
          </div>
          <Parallax distance={-30} className="absolute -top-16 start-2 md:-top-7 md:-start-8">
            <FloatCard
              tint="bg-amber"
              icon={<BellRing className="size-5" />}
              title={t.alertTitle}
              sub={t.alertSub}
            />
          </Parallax>
          <Parallax distance={-50} className="absolute -bottom-8 start-4 hidden sm:block md:-start-10">
            <FloatCard
              tint="bg-lime"
              icon={<Check className="size-5" strokeWidth={2.5} />}
              title={t.savedTitle}
              sub={t.savedSub}
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
