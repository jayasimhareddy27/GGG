"use client";

import { useState } from "react";
import Link from "next/link";
import { getActivePromotions } from "@/public/constants/promotions";

export const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const activePromos = getActivePromotions();

  if (!isVisible || activePromos.length === 0) return null;

  // Duplicate list to make the infinite scroll loop seamless
  const duplicatedPromos = [...activePromos, ...activePromos];

  return (
    <div className="relative w-full bg-brand-primary text-brand-surface overflow-hidden py-2.5 text-xs sm:text-sm font-medium border-b border-brand-border">
      {/* Infinite Rolling Content Container */}
      <div className="flex animate-marquee items-center gap-x-12">
        {duplicatedPromos.map((promo, idx) => (
          <div key={`${promo.id}-${idx}`} className="flex items-center gap-x-3 whitespace-nowrap">
            <span
              className={`px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider ${
                promo.id.includes("signup")
                  ? "bg-brand-accent text-brand-primary"
                  : "bg-brand-surface text-brand-primary"
              }`}
            >
              {promo.tagline}
            </span>
            <span>{promo.message}</span>
            {promo.linkHref && (
              <Link
                href={promo.linkHref}
                className="underline hover:text-brand-accent transition-colors"
              >
                {promo.linkText} &rarr;
              </Link>
            )}
            <span className="text-brand-accent ml-6">•</span>
          </div>
        ))}
      </div>

      {/* Dismiss Button (Absolute position overlay on the right) */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary/95 pl-3 pr-1 py-1 backdrop-blur-sm z-10">
        <button
          onClick={() => setIsVisible(false)}
          type="button"
          className="p-1 rounded-md text-brand-surface hover:text-brand-accent focus:outline-none transition-colors"
          aria-label="Dismiss banner"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};