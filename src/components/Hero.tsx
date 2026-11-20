import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

interface HeroProps {
  title1: string;
  title2: string;
  description: string;
  ctaCatalog: string;
  ctaWhatsApp: string;
  waNumber: string;
  inquiryHeroText: string;
}

export default function Hero({
  title1,
  title2,
  description,
  ctaCatalog,
  ctaWhatsApp,
  waNumber,
  inquiryHeroText,
}: HeroProps) {
  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center bg-[var(--color-ink)] text-white overflow-hidden">
      {/* Background Photography with Warm Teak Toned Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-hero.jpg"
          alt="Meubel Jati Abror Jepara"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1920px"
          className="object-cover object-[center_55%] sm:object-center select-none"
        />
        {/* Layered dark walnut and warm timber gradient for supreme readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/65 to-[#141210]/75" />
        <div className="absolute inset-0 bg-amber-950/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-8 text-center pt-32 sm:pt-40 pb-20 sm:pb-28 flex flex-col items-center justify-center">
        {/* Master Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight max-w-4xl mx-auto leading-[1.14] font-[family-name:var(--font-sans)] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
          {title1} <br className="hidden sm:inline" />
          <span className="font-light tracking-wide">{title2}</span>
        </h1>

        {/* Informative Subtitle */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-sans)] drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
          {description}
        </p>

        {/* Dual Actions CTA per DESIGN.md & PRD */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/produk"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-8 text-xs font-mono uppercase tracking-wider bg-[var(--color-paper)] text-[var(--color-ink)] hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-200 font-semibold shadow-sm"
          >
            {ctaCatalog} &rarr;
          </Link>

          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(inquiryHeroText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-8 text-xs font-mono uppercase tracking-wider border border-white text-white hover:bg-white hover:text-[var(--color-ink)] transition-colors duration-200 gap-2.5 font-semibold"
          >
            <svg className="w-5 h-5 text-current flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.586-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1 1.024z" />
            </svg>
            {ctaWhatsApp}
          </a>
        </div>
      </div>
    </section>
  );
}
