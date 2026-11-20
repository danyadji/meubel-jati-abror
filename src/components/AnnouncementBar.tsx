"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function AnnouncementBar() {
  const t = useTranslations("Nav");
  const message = t("announcement");

  return (
    <aside
      className="h-9 bg-[var(--color-ink)] text-white text-[12px] sm:text-[13px] overflow-hidden flex items-center border-b border-black/20 select-none relative z-50"
      aria-label="Pengumuman Toko"
    >
      <div className="animate-marquee whitespace-nowrap flex items-center font-mono">
        <span className="mx-6 tracking-wider font-light text-stone-200">{message}</span>
        <span className="mx-4 text-[var(--color-accent)]">✦</span>
        <span className="mx-6 tracking-wider font-light text-stone-200">{message}</span>
        <span className="mx-4 text-[var(--color-accent)]">✦</span>
      </div>
    </aside>
  );
}
