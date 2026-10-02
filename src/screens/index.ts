// The app screenshots (copies of bestim-landing/src/screens). Imported (not read
// from /public) so every file gets a content-based address: replace a PNG and
// the new one shows at once, no stale cache.
import type { StaticImageData } from "next/image";

import arVoice from "./ar/voice.png";
import arReview from "./ar/review.png";
import arReminders from "./ar/reminders.png";
import arExpenses from "./ar/expenses.png";
import enVoice from "./en/voice.png";
import enReview from "./en/review.png";
import enReminders from "./en/reminders.png";
import enExpenses from "./en/expenses.png";

const screens = {
  ar: { voice: arVoice, review: arReview, reminders: arReminders, expenses: arExpenses },
  en: { voice: enVoice, review: enReview, reminders: enReminders, expenses: enExpenses },
};

export type ScreenName = keyof (typeof screens)["ar"];
export const screen = (lang: "ar" | "en", name: ScreenName): StaticImageData => screens[lang][name];
