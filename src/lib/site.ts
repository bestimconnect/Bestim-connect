// The one place for addresses and links. Change here, the whole site follows.
export const site = {
  url: "https://bestim-connect.com",
  // The consumer site: also hosts the privacy policy and terms this site links to.
  consumerUrl: "https://bestim-eg.com",
  email: "bestim.connect@gmail.com",
  // null = no business WhatsApp number yet: every WhatsApp button stays hidden.
  // Digits only, with the country code and no "+", e.g. "201001234567".
  whatsapp: null as string | null,
  // The shared Supabase project (public values, same as the mobile app).
  supabaseUrl: "https://wlepubflnjcguosicuak.supabase.co",
  supabaseKey: "sb_publishable_s_xwZlnjDKNFuIz6zdwbXQ_xnd7BYAw",
};

// A WhatsApp chat link with a ready-made first message, or null while there is no number.
export const whatsappLink = (text: string) =>
  site.whatsapp && `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
