import type { MetadataRoute } from "next";
import { alternates, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => {
    const { canonical, languages } = alternates(lang);
    return { url: canonical, alternates: { languages } };
  });
}
