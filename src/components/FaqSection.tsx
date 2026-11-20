"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqSection() {
  const t = useTranslations("Faq");
  const [openId, setOpenId] = useState<string | null>("q1");

  const faqs: FaqItem[] = [
    { id: "q1", question: t("q1"), answer: t("a1") },
    { id: "q2", question: t("q2"), answer: t("a2") },
    { id: "q3", question: t("q3"), answer: t("a3") },
    { id: "q4", question: t("q4"), answer: t("a4") },
    { id: "q5", question: t("q5"), answer: t("a5") },
  ];

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section aria-labelledby="faq-heading" className="space-y-8 font-[family-name:var(--font-sans)]">
      <div className="max-w-2xl">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-muted)] block mb-1">
          {t("badge")}
        </span>
        <h2
          id="faq-heading"
          className="text-2xl sm:text-3xl font-semibold text-[var(--color-ink)] tracking-tight font-[family-name:var(--font-sans)]"
        >
          {t("title")}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-2">
          {t("description")}
        </p>
      </div>

      <div className="border-t border-[var(--color-line)] divide-y divide-[var(--color-line)]">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="py-4 sm:py-5">
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-ink)] py-1"
              >
                <span className="text-sm sm:text-base font-normal text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                  {faq.question}
                </span>
                <span className="font-mono text-base text-[var(--color-muted)] shrink-0 transition-transform duration-200">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="pt-3 pr-6 text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed animate-fadeIn">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
