import React from "react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getProducts, getCategories } from "@/lib/products";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import CategorySlider from "@/components/CategorySlider";

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Home" });
  const tWa = await getTranslations({ locale, namespace: "WhatsApp" });

  const [products, categories] = await Promise.all([
    getProducts(locale),
    getCategories(locale),
  ]);

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || siteConfig.whatsappNumber;

  // Terlaris: 4 products per DESIGN.md
  const bestSellers = products.slice(0, 4);

  // Kategori aktif & terurut sesuai mockup pilihan
  const FEATURED_CATEGORY_ORDER = [
    "kursi-sofa-jati",
    "lemari-bufet-tv",
    "meja-kerja-belajar",
    "meja-kopi-tamu",
    "meja-makan-jati",
    "dipan-tempat-tidur",
    "jendela-kusen-bulat",
    "kusen-pintu-jendela",
  ];

  const validCategories = categories
    .filter(
      (c) => c.slug !== "tanpa-kategori" && c.slug !== "uncategorized" && (c.count === undefined || c.count > 0)
    )
    .sort((a, b) => {
      const idxA = FEATURED_CATEGORY_ORDER.indexOf(a.slug);
      const idxB = FEATURED_CATEGORY_ORDER.indexOf(b.slug);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.name.localeCompare(b.name);
    });

  // Produk Baru: hanya tampil jika ada produk lebih dari 4 (DESIGN.md Butir 8)
  const newProducts = products.length > 4 ? products.slice(4, 8) : [];

  const orgJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebSiteJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <div className="space-y-16 lg:space-y-28">
        {/* HERO SECTION */}
        <Hero
          title1={t("heroTitle1")}
          title2={t("heroTitle2")}
          description={t("heroDescription")}
          ctaCatalog={t("heroCtaCatalog")}
          ctaWhatsApp={t("heroCtaWhatsApp")}
          waNumber={waNumber}
          inquiryHeroText={tWa("inquiryHero")}
        />

        {/* KATEGORI PILIHAN (Langsung setelah Hero) */}
        {validCategories.length > 0 && (
          <CategorySlider
            categories={validCategories}
            badgeText={t("categoriesBadge")}
            titleText={t("categoriesTitle")}
            viewAllText={t("viewAll")}
            exploreText={t("categoryExplore")}
          />
        )}

        {/* 6. SECTION "TERLARIS" (DESIGN.md Butir 6) */}
        <section
          aria-label="Produk Terlaris"
          className="max-w-[1280px] mx-auto px-4 sm:px-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 border-b border-[var(--color-line)] pb-4 gap-4">
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-muted)] block">
                {t("bestSellersBadge")}
              </span>
              <h2 className="text-2xl sm:text-4xl font-normal text-[var(--color-ink)] tracking-tight mt-1 font-[family-name:var(--font-sans)]">
                {t("bestSellersTitle")}
              </h2>
            </div>
            <Link
              href="/produk"
              className="text-xs font-mono text-[var(--color-ink)] hover:text-[var(--color-accent)] uppercase tracking-wider hover:underline shrink-0 font-medium"
            >
              {t("viewAll")} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 7. BANNER PROYEK ATAU GROSIR (DESIGN.md Butir 7) */}
        <section
          aria-label="Layanan Proyek dan Grosir"
          className="bg-[var(--color-ink)] text-white py-16 sm:py-24 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-950/20 to-transparent pointer-events-none" />
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-300 font-medium">
                  {t("wholesaleBadge")}
                </span>
                <h2 className="text-2xl sm:text-4xl font-normal tracking-tight leading-snug font-[family-name:var(--font-sans)] text-white">
                  {t("wholesaleTitle")}
                </h2>
                <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed font-[family-name:var(--font-sans)]">
                  {t("wholesaleDescription")}
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(tWa("inquiryWholesale"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-8 text-xs font-mono uppercase tracking-wider border border-white text-white hover:bg-white hover:text-[var(--color-ink)] transition-colors gap-2.5 font-medium cursor-pointer"
                >
                  <svg className="w-5 h-5 flex-shrink-0 text-current" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1 1.024z" />
                  </svg>
                  {t("wholesaleCta")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SECTION "PRODUK BARU" (DESIGN.md Butir 8) */}
        {newProducts.length > 0 && (
          <section
            aria-label="Produk Baru"
            className="max-w-[1280px] mx-auto px-4 sm:px-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 border-b border-[var(--color-line)] pb-4 gap-4">
              <div className="max-w-2xl">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-muted)] block">
                  {t("newProductsBadge")}
                </span>
                <h2 className="text-2xl sm:text-4xl font-normal text-[var(--color-ink)] tracking-tight mt-1 font-[family-name:var(--font-sans)]">
                  {t("newProductsTitle")}
                </h2>
              </div>
              <Link
                href="/produk"
                className="text-xs font-mono text-[var(--color-ink)] hover:text-[var(--color-accent)] uppercase tracking-wider hover:underline shrink-0 font-medium"
              >
                {t("viewAll")} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* 9. BANNER EDITORIAL (DESIGN.md Butir 9) */}
        <section
          aria-label="Cerita Workshop Pengrajin"
          className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-10"
        >
          <div className="border border-[var(--color-line)] bg-[var(--color-surface)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* Visual workshop column */}
            <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[360px] bg-stone-900">
              <Image
                src="/images/bg-hero.jpg"
                alt="Pengrajin Meubel Jati Abror di Workshop Jepara"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#141210]/40" />
            </div>

            {/* Narrative column */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-muted)] block font-medium">
                {t("editorialBadge")}
              </span>
              <h2 className="text-2xl sm:text-4xl font-normal text-[var(--color-ink)] tracking-tight leading-snug font-[family-name:var(--font-sans)]">
                {t("editorialTitle")}
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-[family-name:var(--font-sans)]">
                {t("editorialDescription")}
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:underline inline-flex items-center gap-1.5 font-medium"
                >
                  {t("editorialCta")} &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
