"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Product } from "@/lib/products";
import { formatRupiah } from "@/lib/format";

export { formatRupiah };

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const t = useTranslations("ProductCard");
  const firstImage = product.images[0] || {
    src: "/images/placeholder-product.svg",
    alt: product.name,
  };

  const sizeAttr = product.attributes.find((a) => {
    const n = a.name.toLowerCase();
    return n.includes("ukuran") || n.includes("size");
  });
  const sizeOption = sizeAttr ? sizeAttr.options[0] : null;

  const specSummary = sizeOption
    ? `${sizeOption} · ${t("specDefault")}`
    : t("specDefault");

  let lowestPriceNum = parseFloat(String(product.price).replace(/[^0-9.-]+/g, "")) || 0;
  if (product.variations && product.variations.length > 0) {
    const varPrices = product.variations
      .map((v) => parseFloat(String(v.price).replace(/[^0-9.-]+/g, "")))
      .filter((p) => !isNaN(p) && p > 0);
    if (varPrices.length > 0) {
      lowestPriceNum = Math.min(...varPrices);
    }
  }

  const regularPriceNum = parseFloat(String(product.regular_price || "").replace(/[^0-9.-]+/g, "")) || 0;
  const isOnSale = Boolean(
    (product.on_sale && regularPriceNum > lowestPriceNum) ||
      (regularPriceNum > lowestPriceNum && regularPriceNum > 0)
  );

  const priceLabel = formatRupiah(lowestPriceNum || product.price);

  return (
    <article className="group flex flex-col bg-[var(--color-paper)] h-full">
      <Link
        href={`/produk/${product.slug}`}
        className="flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ink)]"
        aria-label={product.name}
      >
        {/* Product Image: 4:5 aspect ratio with warm surface bg per DESIGN.md */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-surface)]">
          {isOnSale && (
            <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-stone-900 text-white font-medium shadow-sm">
              {t("saleBadge")}
            </span>
          )}
          <Image
            src={firstImage.src}
            alt={firstImage.alt || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Product Info */}
        <div className="pt-3.5 pb-2 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-medium text-[var(--color-ink)] leading-snug font-[family-name:var(--font-sans)]">
              {product.name}
            </h3>

            <p className="mt-1 text-[11px] font-mono text-[var(--color-muted)] truncate">
              {specSummary}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[var(--color-line)] flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-xs sm:text-[13px] font-mono font-semibold text-[var(--color-ink)]">
                {product.variations && product.variations.length > 1
                  ? t("priceStarting", { price: priceLabel })
                  : priceLabel}
              </span>
              {isOnSale && (
                <span className="text-[11px] font-mono text-[var(--color-muted)] line-through decoration-stone-400">
                  {formatRupiah(regularPriceNum)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-mono text-[var(--color-accent)] uppercase tracking-wider group-hover:underline flex items-center gap-1 shrink-0 font-medium">
              {t("detail")} &rarr;
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
