import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  getSiteUrl,
  stripHtmlAndTruncate,
  buildCanonicalAndAlternates,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/config/site";
import FaqSection from "@/components/FaqSection";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const siteUrl = getSiteUrl();

  const title = t("aboutTitle");
  const description = stripHtmlAndTruncate(t("aboutDescription"), 155);
  const alternates = buildCanonicalAndAlternates("/about", locale);
  const ogImage = `${siteUrl}/images/og-default.jpg`;

  return {
    title: { absolute: title },
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: siteConfig.name,
      locale: locale === "en" ? "en_US" : "id_ID",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "About" });
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  const tWa = await getTranslations({ locale, namespace: "WhatsApp" });
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || siteConfig.whatsappNumber;

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd(
    [
      { name: tMeta("breadcrumbHome"), pathWithoutLocale: "/" },
      { name: t("title"), pathWithoutLocale: "/about" },
    ],
    locale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {/* Header: Hanya Judul "Tentang Kami" di Tengah Halaman */}
        <div className="text-center max-w-2xl mx-auto border-b border-[var(--color-line)] pb-8 sm:pb-12">
          <h1 className="text-3xl sm:text-5xl font-semibold text-[var(--color-ink)] tracking-tight font-[family-name:var(--font-sans)]">
            {t("title")}
          </h1>
        </div>

        {/* 3 Story Sections with Real Workshop Documentation */}
        <div className="space-y-16 sm:space-y-24">
          {/* SECTION 1: Image Left, Text Right */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <div className="relative aspect-square w-full overflow-hidden bg-stone-100 border border-[var(--color-line)] shadow-sm group">
                <Image
                  src="/images/about/about-1.webp"
                  alt={t("section1Title")}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-muted)] block">
                {t("section1Badge")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-ink)] tracking-tight font-[family-name:var(--font-sans)]">
                {t("section1Title")}
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-[family-name:var(--font-sans)]">
                <p>{t("section1P1")}</p>
                <p>{t("section1P2")}</p>
              </div>
            </div>
          </section>

          {/* SECTION 2: Text Left, Image Right (on desktop) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-6 lg:order-1 order-2 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-muted)] block">
                {t("section2Badge")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-ink)] tracking-tight font-[family-name:var(--font-sans)]">
                {t("section2Title")}
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-[family-name:var(--font-sans)]">
                <p>{t("section2P1")}</p>
                <p>{t("section2P2")}</p>
              </div>
            </div>
            <div className="lg:col-span-6 lg:order-2 order-1">
              <div className="relative aspect-square w-full overflow-hidden bg-stone-100 border border-[var(--color-line)] shadow-sm group">
                <Image
                  src="/images/about/about-2.webp"
                  alt={t("section2Title")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Google Maps & Workshop Details (Side-by-side) */}
        <section aria-label={t("infoTitle")} className="border border-[var(--color-line)] bg-[var(--color-surface)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left: Google Maps Interactive Embed */}
            <div className="lg:col-span-6 relative min-h-[360px] sm:min-h-[420px] w-full bg-stone-200 border-b lg:border-b-0 lg:border-r border-[var(--color-line)]">
              <iframe
                title="Google Maps Workshop Meubel Jati Abror Jepara"
                src={siteConfig.address.mapsEmbedUrl}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Peta Google Maps Lokasi Workshop Meubel Jati Abror"
              />
            </div>

            {/* Right: Informasi Produksi & Workshop */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-muted)] block mb-1">
                  {t("infoBadge")}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-ink)] font-[family-name:var(--font-sans)]">
                  {t("infoTitle")}
                </h3>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="border-b border-[var(--color-line)] pb-3">
                  <span className="block text-[var(--color-muted)] uppercase tracking-wider">{t("infoAddressLabel")}</span>
                  <span className="text-[var(--color-ink)] mt-1 block leading-relaxed font-sans text-sm font-medium">{t("infoAddress")}</span>
                  <a
                    href={siteConfig.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-mono uppercase tracking-wider text-[var(--color-ink)] hover:text-[var(--color-accent)] underline underline-offset-4 transition-colors font-medium"
                  >
                    {t("openGoogleMaps")} &rarr;
                  </a>
                </div>

                <div className="border-b border-[var(--color-line)] pb-3">
                  <span className="block text-[var(--color-muted)] uppercase tracking-wider">{t("infoCategoryLabel")}</span>
                  <span className="text-[var(--color-ink)] mt-1 block leading-relaxed font-sans text-sm">{t("infoCategory")}</span>
                </div>

                <div className="border-b border-[var(--color-line)] pb-3">
                  <span className="block text-[var(--color-muted)] uppercase tracking-wider">{t("infoShippingLabel")}</span>
                  <span className="text-[var(--color-ink)] mt-1 block leading-relaxed font-sans text-sm">{t("infoShipping")}</span>
                </div>

                <div>
                  <span className="block text-[var(--color-muted)] uppercase tracking-wider">{t("infoConsultLabel")}</span>
                  <span className="text-[var(--color-ink)] mt-1 block leading-relaxed font-sans text-sm">{t("infoConsult")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section FAQ & Panduan Transparansi Workshop */}
        <FaqSection />

        {/* Action CTA */}
        <div className="pt-8 border-t border-[var(--color-line)] flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-ink)] font-[family-name:var(--font-sans)]">
              {t("ctaTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] font-[family-name:var(--font-sans)] mt-1">
              {t("ctaDescription")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(tWa("inquiryAbout"))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-6 text-xs font-mono uppercase tracking-wider bg-[var(--color-ink)] text-white hover:bg-stone-800 transition-colors gap-2"
            >
              <svg className="w-4 h-4 text-[var(--color-whatsapp)] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1 1.024z" />
              </svg>
              {t("ctaWhatsApp")}
            </a>
            <Link
              href="/produk"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-6 text-xs font-mono uppercase tracking-wider border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors"
            >
              {t("ctaProducts")} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
