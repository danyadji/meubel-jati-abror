import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  getSiteUrl,
  stripHtmlAndTruncate,
  buildCanonicalAndAlternates,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/config/site";

interface Props {
  params: Promise<{ locale: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const siteUrl = getSiteUrl();

  const title = t("termsTitle");
  const description = stripHtmlAndTruncate(t("termsDescription"), 155);
  const alternates = buildCanonicalAndAlternates("/terms", locale);
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

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Terms" });
  const tMeta = await getTranslations({ locale, namespace: "Metadata" });

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd(
    [
      { name: tMeta("breadcrumbHome"), pathWithoutLocale: "/" },
      { name: t("title"), pathWithoutLocale: "/terms" },
    ],
    locale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <div className="max-w-[900px] mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10 sm:space-y-14 font-[family-name:var(--font-sans)]">
        {/* Header */}
        <div className="border-b border-[var(--color-line)] pb-8 text-center sm:text-left">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-muted)] block mb-2">
            {t("badge")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--color-ink)] tracking-tight font-[family-name:var(--font-sans)]">
            {t("title")}
          </h1>
          <p className="text-xs font-mono text-[var(--color-muted)] mt-2">
            {t("lastUpdated")}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm sm:text-base text-[var(--color-ink)] leading-relaxed">
          <p className="text-[var(--color-muted)] bg-[var(--color-surface)] p-4 sm:p-6 border-l-2 border-[var(--color-accent)]">
            {t("intro")}
          </p>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-medium text-[var(--color-ink)] font-[family-name:var(--font-sans)]">
              {t("sec1Title")}
            </h2>
            <p className="text-[var(--color-muted)] text-sm sm:text-base">
              {t("sec1Text")}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-medium text-[var(--color-ink)] font-[family-name:var(--font-sans)]">
              {t("sec2Title")}
            </h2>
            <p className="text-[var(--color-muted)] text-sm sm:text-base">
              {t("sec2Text")}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-medium text-[var(--color-ink)] font-[family-name:var(--font-sans)]">
              {t("sec3Title")}
            </h2>
            <p className="text-[var(--color-muted)] text-sm sm:text-base">
              {t("sec3Text")}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-medium text-[var(--color-ink)] font-[family-name:var(--font-sans)]">
              {t("sec4Title")}
            </h2>
            <p className="text-[var(--color-muted)] text-sm sm:text-base">
              {t("sec4Text")}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-medium text-[var(--color-ink)] font-[family-name:var(--font-sans)]">
              {t("sec5Title")}
            </h2>
            <p className="text-[var(--color-muted)] text-sm sm:text-base">
              {t("sec5Text")}
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-[var(--color-line)] flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:underline inline-flex items-center gap-1 font-medium"
          >
            &larr; {tMeta("breadcrumbHome")}
          </Link>
          <Link
            href="/privacy"
            className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:underline inline-flex items-center gap-1 font-medium"
          >
            Kebijakan Privasi &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
