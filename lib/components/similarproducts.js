'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SimilarProducts({ currentProduct, allProducts = [] }) {
  const similarProducts = React.useMemo(() => {
    if (!currentProduct) return [];

    const getNormalizedCategories = (item) => {
      const raw = item?.categories ?? item?.category ?? [];
      const list = Array.isArray(raw) ? raw : [raw];
      return list.map((c) => String(c).trim().toLowerCase()).filter(Boolean);
    };

    const currentCats = getNormalizedCategories(currentProduct);
    const currentIdStr = String(currentProduct.id);
    const currentSlugStr = String(currentProduct.slug || '');

    // Match products that share AT LEAST ONE category with the current product
    const matches = allProducts.filter((p) => {
      const isSameProduct =
        String(p.id) === currentIdStr ||
        (p.slug && String(p.slug) === currentSlugStr);

      if (isSameProduct) return false;

      const targetCats = getNormalizedCategories(p);
      return targetCats.some((cat) => currentCats.includes(cat));
    });

    return matches;
  }, [currentProduct, allProducts]);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-brand-border/40 pb-4">
        <h2 className="text-xl font-bold text-brand-primary tracking-tight">
          You Might Also Like
        </h2>
        <Link
          href="/products"
          className="text-xs font-semibold text-brand-accent hover:underline"
        >
          View All
        </Link>
      </div>

      {similarProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts.map((simProduct) => {
            const simPrice =
              simProduct.variants?.[0]?.price ?? simProduct.price ?? 0;

            return (
              <Link
                key={simProduct.id}
                href={`/products/${simProduct.id}`}
                className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-300"
              >
                <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={simProduct.image || '/images/placeholder.jpg'}
                    alt={simProduct.name || 'Similar Product'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-brand-primary group-hover:text-brand-accent transition leading-snug">
                      {simProduct.name}
                    </h3>
                    <p className="text-xs text-brand-muted mt-1 line-clamp-2">
                      {simProduct.shortDescription || simProduct.fullDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-brand-border/30">
                    <span className="text-xs font-extrabold text-brand-primary">
                      From ${simPrice.toFixed(2)}
                    </span>
                    <span className="text-[11px] font-bold text-brand-accent group-hover:translate-x-1 transition-transform">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 px-4 bg-brand-surface border border-brand-border/40 rounded-2xl space-y-3">
          <p className="text-sm font-semibold text-brand-primary">
            No similar products available right now.
          </p>
          <p className="text-xs text-brand-muted">
            Check back later or browse our full collection.
          </p>
          <Link
            href="/products"
            className="inline-block mt-2 text-xs font-bold text-white bg-brand-primary px-5 py-2 rounded-full hover:opacity-90 transition"
          >
            Browse All Products
          </Link>
        </div>
      )}
    </section>
  );
}