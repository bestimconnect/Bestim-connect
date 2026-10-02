import { Check, MessageCircle } from "lucide-react";
import { DemoForm } from "@/components/DemoForm";
import { Reveal } from "@/components/Motion";
import { SectionHeading } from "@/components/SectionHeading";
import type { Dictionary, Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

// The closing band: why book a demo, and the form itself.
export function DemoBand({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.demo;
  const whatsapp = whatsappLink(t.whatsappText);
  return (
    <section id="demo" className="px-2 pb-2 md:px-4 md:pb-4">
      <div className="relative isolate overflow-clip rounded-screen bg-ink px-5 py-16 text-paper md:px-12 md:py-24">
        <span aria-hidden className="absolute -end-32 -top-32 -z-10 size-96 rounded-full bg-lime/20 blur-3xl" />
        <span aria-hidden className="absolute -start-32 -bottom-40 -z-10 size-96 rounded-full bg-teal/50 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <SectionHeading {...t} onDark className="text-start" />
            <ul className="mt-8 space-y-3">
              {t.points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-lime text-ink">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="opacity-85">{point}</span>
                </li>
              ))}
            </ul>
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener"
                className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-semibold transition-colors hover:bg-white/10"
              >
                <MessageCircle className="size-5" />
                {dict.hero.whatsapp}
              </a>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <DemoForm lang={lang} dict={dict} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
