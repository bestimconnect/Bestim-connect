import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoBand } from "@/components/sections/DemoBand";
import { Facts } from "@/components/sections/Facts";
import { Faq } from "@/components/sections/Faq";
import { FeatureBento } from "@/components/sections/FeatureBento";
import { Hero } from "@/components/sections/Hero";
import { IndustryStrip } from "@/components/sections/IndustryStrip";
import { Problems } from "@/components/sections/Problems";
import { Steps } from "@/components/sections/Steps";
import { TwoSides } from "@/components/sections/TwoSides";
import { Workshops } from "@/components/sections/Workshops";
import { alternates, getDictionary, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { alternates: alternates(lang) } : {};
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <>
      <Hero lang={lang} dict={dict} />
      <IndustryStrip dict={dict} />
      <Problems dict={dict} />
      <TwoSides lang={lang} dict={dict} />
      <Steps dict={dict} />
      <FeatureBento dict={dict} />
      <Facts dict={dict} />
      <Workshops lang={lang} dict={dict} />
      <Faq dict={dict} />
      <DemoBand lang={lang} dict={dict} />
    </>
  );
}
