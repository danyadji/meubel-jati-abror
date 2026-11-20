"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Category } from "@/lib/products";

interface CategorySliderProps {
  categories: Category[];
  badgeText?: string;
  titleText?: string;
  viewAllText?: string;
  exploreText?: string;
}

export default function CategorySlider({
  categories,
  badgeText,
  titleText,
  viewAllText,
  exploreText = "Jelajahi",
}: CategorySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
      {/* Header with Title and "LIHAT SEMUA" link (matching design) */}
      {titleText && (
        <div className="flex items-end justify-between mb-6 sm:mb-8 border-b border-[var(--color-line)] pb-4">
          <div>
            {badgeText && (
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--color-muted)] block mb-1">
                {badgeText}
              </span>
            )}
            <h2 className="text-2xl sm:text-4xl font-normal text-[var(--color-ink)] tracking-tight font-[family-name:var(--font-serif)]">
              {titleText}
            </h2>
          </div>

          {viewAllText && (
            <Link
              href="/produk"
              className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--color-ink)] hover:text-[var(--color-accent)] inline-flex items-center gap-1.5 transition-colors pb-1 font-medium"
            >
              {viewAllText} &rarr;
            </Link>
          )}
        </div>
      )}

      {/* Cards Container: 5 items side-by-side on desktop, horizontal scroll on mobile */}
      <div className="relative group/slider">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll("left")}
            className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white text-stone-800 shadow-md border border-stone-200 items-center justify-center hover:bg-stone-50 transition-transform hover:scale-105 cursor-pointer"
            aria-label="Kategori sebelumnya"
          >
            &larr;
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id || cat.slug}
              href={`/kategori/${cat.slug}`}
              className="group relative flex flex-col shrink-0 w-[68vw] xs:w-[220px] sm:w-[240px] md:w-[260px] lg:w-[calc((100%-4*1rem)/5)] snap-start bg-[var(--color-paper)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ink)]"
              aria-label={cat.name}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                <Image
                  src={cat.image || "/images/placeholder-product.svg"}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 30vw, 240px"
                  className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity group-hover:opacity-90" />
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white">
                  <h3 className="text-sm sm:text-base font-medium tracking-tight font-[family-name:var(--font-sans)] leading-snug">
                    {cat.name}
                  </h3>
                  <span className="mt-1 text-[11px] font-mono uppercase tracking-widest text-stone-300 inline-flex items-center gap-1 group-hover:text-white transition-colors">
                    {exploreText} &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll("right")}
            className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white text-stone-800 shadow-md border border-stone-200 items-center justify-center hover:bg-stone-50 transition-transform hover:scale-105 cursor-pointer"
            aria-label="Kategori berikutnya"
          >
            &rarr;
          </button>
        )}
      </div>
    </section>
  );
}
