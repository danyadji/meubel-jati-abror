import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");

  return (
    <footer className="bg-[var(--color-ink)] text-stone-300 mt-20 border-t border-[var(--color-ink)] font-[family-name:var(--font-sans)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Identity */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block py-1" aria-label={`${siteConfig.name} Home`}>
              <Image
                src={siteConfig.logo.light}
                alt={siteConfig.name}
                width={220}
                height={50}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              {t("description")}
            </p>
            <div className="text-xs text-stone-400 pt-2 space-y-1">
              <p className="text-white font-mono text-[11px] uppercase tracking-wider font-medium">{t("locationTitle")}</p>
              <p className="font-mono text-xs text-stone-300">{t("locationValue")}</p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-medium">
              {t("navTitle")}
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/" className="hover:text-amber-200 transition-colors">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-amber-200 transition-colors">
                  {tNav("products")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-200 transition-colors">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-200 transition-colors">
                  {tNav("contact")}
                </Link>
              </li>
              <li>
                <Link href="/keranjang" className="hover:text-amber-200 transition-colors">
                  {tNav("cart")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Consultation */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-medium">
              {t("socialTitle")}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t("socialDescription")}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-stone-300 font-mono">
              {siteConfig.socials.facebook && (
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline underline-offset-4"
                >
                  Facebook
                </a>
              )}
              {siteConfig.socials.instagram && (
                <>
                  <span className="text-stone-600">·</span>
                  <a
                    href={siteConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors underline underline-offset-4"
                  >
                    Instagram
                  </a>
                </>
              )}
              {siteConfig.socials.tiktok && (
                <>
                  <span className="text-stone-600">·</span>
                  <a
                    href={siteConfig.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors underline underline-offset-4"
                  >
                    TikTok
                  </a>
                </>
              )}
              {siteConfig.socials.youtube && (
                <>
                  <span className="text-stone-600">·</span>
                  <a
                    href={siteConfig.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors underline underline-offset-4"
                  >
                    YouTube
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-stone-400 gap-4">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. {t("rights")}</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
