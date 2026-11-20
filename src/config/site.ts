export const siteConfig = {
  // Brand identity
  name: "Meubel Jati Abror",
  shortName: "Jati Abror",
  tagline: "Spesialis Furnitur Kayu Jati Solid Jepara",
  description:
    "Pengrajin dan produsen aneka mebel kayu jati solid kualitas ekspor langsung dari workshop Jepara. Melayani meja makan, kursi, dipan tempat tidur, lemari, hingga pesanan kustom arsitektur tanpa perantara.",

  // Primary Domain (Used across SEO, Sitemap, Canonical URLs, and Robots)
  domain: "https://meubeljatiabror.com",

  // Contact & Order transactions
  whatsappNumber: process.env.NEXT_PUBLIC_WA_NUMBER || "62882006407279",
  email: "meubeljatiabror@gmail.com",

  // Physical Workshop / Store Address (Used in Schema.org JSON-LD & Contact page)
  address: {
    street: "Jl. Raya Tahunan - Batealit",
    city: "Jepara",
    province: "Jawa Tengah",
    postalCode: "59427",
    country: "ID",
    display: "Tahunan, Jepara, Jawa Tengah 59427, Indonesia",
    mapsUrl: "https://maps.app.goo.gl/1fdUaWfRKZocJ4LZ6",
    mapsEmbedUrl: "https://maps.google.com/maps?q=-6.6223592,110.696167&hl=id&z=16&output=embed",
  },

  // Social Media Links
  socials: {
    facebook: "https://www.facebook.com/meubeljatiabror",
    instagram: "https://www.instagram.com/meubeljatiabror",
    tiktok: "https://www.tiktok.com/@meubeljatiabror",
    youtube: "https://www.youtube.com/@meubeljatiabror",
  },

  // Brand Media Assets
  logo: {
    light: "/images/logo/logo.png",
    dark: "/images/logo/logo-2.png",
    ogDefault: "/images/og-default.jpg",
  },
};

export type SiteConfig = typeof siteConfig;
