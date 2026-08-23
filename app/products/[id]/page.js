'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrderItems } from '@/lib/redux/features/orders/slice';
import { PRODUCTS } from '@/lib/products';
import SimilarProducts from '@/lib/components/similarproducts';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const productId = params?.id;
  const product = (PRODUCTS || []).find(
    (p) => String(p.id) === String(productId) || String(p.slug) === String(productId)
  );

  const currentItems = useSelector((state) => state.orders?.currentOrder?.items || []);

  const variantsList = React.useMemo(() => {
    if (!product) return [];
    return Array.isArray(product.variants) && product.variants.length > 0
      ? product.variants
      : [{ name: 'Standard', price: product.price ?? 0 }];
  }, [product]);

  const [selectedVariantName, setSelectedVariantName] = useState(
    variantsList[0]?.name || 'Standard'
  );
  const [addedNotice, setAddedNotice] = useState(null);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-brand-primary">Product Not Found</h1>
        <p className="text-sm text-brand-muted">
          The product you are looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/products"
          className="inline-block bg-brand-primary text-white text-xs font-semibold px-6 py-2.5 rounded-full transition hover:opacity-90"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const chosenVariantObj =
    variantsList.find((v) => v.name === selectedVariantName) ||
    variantsList[0] ||
    { name: 'Standard', price: product.price ?? 0 };

  const currentPrice = chosenVariantObj?.price ?? product.price ?? 0;

  const cartItem = currentItems.find(
    (item) => item.productId === product.id && item.variant === chosenVariantObj.name
  );
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const handleUpdateQuantity = (delta) => {
    const variantName = chosenVariantObj.name || 'Standard';
    const variantPrice = currentPrice;

    const existingIndex = currentItems.findIndex(
      (item) => item.productId === product.id && item.variant === variantName
    );

    let updatedItems;

    if (existingIndex > -1) {
      const existingItem = currentItems[existingIndex];
      const newQty = existingItem.quantity + delta;

      if (newQty > 0) {
        updatedItems = currentItems.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: newQty } : item
        );
      } else {
        updatedItems = currentItems.filter((_, idx) => idx !== existingIndex);
      }
    } else if (delta > 0) {
      const newItem = {
        productId: product.id,
        name: product.name,
        quantity: 1,
        price: variantPrice,
        variant: variantName,
      };
      updatedItems = [...currentItems, newItem];

      setAddedNotice(`${product.name} (${variantName}) added to order!`);
      setTimeout(() => setAddedNotice(null), 3000);
    }

    if (updatedItems) {
      dispatch(setCurrentOrderItems(updatedItems));
    }
  };

  const categoryDisplay = Array.isArray(product.categories)
    ? product.categories.join(' • ')
    : Array.isArray(product.category)
    ? product.category.join(' • ')
    : product.category;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center text-xs font-semibold text-brand-muted hover:text-brand-primary transition cursor-pointer"
        >
          ← Back to Products
        </button>
      </div>

      {addedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-primary text-white px-5 py-3 rounded-2xl shadow-2xl transition border border-white/20 text-xs font-semibold">
          ✨ {addedNotice}
        </div>
      )}

      <div className="bg-brand-surface border border-brand-border rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-sm mb-16">
        <div className="md:col-span-6 relative min-h-[350px] md:min-h-[480px] w-full bg-stone-100">
          <Image
            src={product.image || '/images/placeholder.jpg'}
            alt={product.name || 'Product Detail'}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {product.containerStyle && (
            <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              {product.containerStyle}
            </span>
          )}
        </div>

        <div className="md:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                {categoryDisplay}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-primary mt-1 leading-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-brand-muted text-sm leading-relaxed">
              {product.fullDescription || product.shortDescription}
            </p>

            {product.ingredients && product.ingredients.length > 0 && (
              <div className="pt-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-2">
                  Key Ingredients
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="text-[11px] font-medium text-brand-muted bg-brand-bg border border-brand-border px-2.5 py-1 rounded-lg"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {variantsList.length > 0 && (
              <div className="pt-3">
                <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">
                  Select Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {variantsList.map((variant) => {
                    const isSelected = selectedVariantName === variant.name;
                    return (
                      <button
                        key={variant.name}
                        type="button"
                        onClick={() => setSelectedVariantName(variant.name)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                          isSelected
                            ? 'border-brand-primary bg-brand-primary text-white shadow-xs'
                            : 'border-brand-border bg-stone-50 text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <span>{variant.name}</span>
                        <span>${variant.price?.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-brand-border/40 flex items-center justify-between">
            <div>
              <span className="text-xs text-brand-muted block">Total Price</span>
              <span className="text-2xl font-extrabold text-brand-primary">
                ${currentPrice.toFixed(2)}
              </span>
            </div>

            {cartQuantity > 0 ? (
              <div className="flex items-center space-x-3 bg-brand-bg border border-brand-border rounded-full px-3 py-1.5 shadow-inner">
                <button
                  type="button"
                  onClick={() => handleUpdateQuantity(-1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-surface text-brand-primary hover:bg-brand-accent/40 font-bold text-sm transition cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="font-bold text-sm text-brand-primary w-5 text-center">
                  {cartQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQuantity(1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-surface text-brand-primary hover:bg-brand-accent/40 font-bold text-sm transition cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleUpdateQuantity(1)}
                className="btn-brand-primary px-8 py-3 rounded-full text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Add to Order
              </button>
            )}
          </div>
        </div>
      </div>

      <SimilarProducts currentProduct={product} allProducts={PRODUCTS} />
    </div>
  );
}