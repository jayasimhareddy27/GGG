'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrderItems } from '@/lib/redux/features/orders/slice';

import { PRODUCTS } from '@/lib/products';

const CATEGORIES = ['All', 'Body Butters', 'men', 'women'];

export default function ProductsPage() {
  const dispatch = useDispatch();
  const currentItems = useSelector((state) => state.orders?.currentOrder?.items || []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVariants, setSelectedVariants] = useState({});
  const [addedNotice, setAddedNotice] = useState(null);

  // Multi-category matching filter
  const filteredProducts = (PRODUCTS || []).filter((p) => {
    if (selectedCategory === 'All') return true;

    const prodCategories = Array.isArray(p?.categories)
      ? p.categories
      : Array.isArray(p?.category)
      ? p.category
      : [p?.category];

    return prodCategories.some(
      (cat) => String(cat).toLowerCase() === selectedCategory.toLowerCase()
    );
  });

  const handleVariantChange = (productId, variantName) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: variantName }));
  };

  const handleUpdateQuantity = (e, product, chosenVariantObj, delta) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!product || !chosenVariantObj) return;

    const variantName = chosenVariantObj.name || 'Standard';
    const variantPrice = chosenVariantObj.price ?? product.price ?? 0;

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

      setAddedNotice(`${product.name || 'Item'} (${variantName}) added!`);
      setTimeout(() => setAddedNotice(null), 3000);
    }

    if (updatedItems) {
      dispatch(setCurrentOrderItems(updatedItems));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
{/* Compact Header */}
<div className="text-center space-y-2 mb-8">
  <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-primary tracking-tight">
    Handcrafted Skincare
  </h1>
  <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto leading-relaxed">
    100% handmade personally with rich Shea & Mango butter for 10–12 hours of deep hydration.
  </p>
</div>

{/* Compact Category Tabs */}
<div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
  {CATEGORIES.map((category) => (
    <button
      key={category}
      type="button"
      onClick={() => setSelectedCategory(category)}
      className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200 ${
        selectedCategory.toLowerCase() === category.toLowerCase()
          ? 'bg-brand-primary text-white shadow-xs'
          : 'bg-brand-surface border border-brand-border text-brand-muted hover:bg-brand-accent/30'
      }`}
    >
      {category}
    </button>
  ))}
</div>



      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProducts.map((product) => {
          if (!product) return null;

          const variantsList =
            Array.isArray(product.variants) && product.variants.length > 0
              ? product.variants
              : [{ name: 'Standard', price: product.price ?? 0 }];

          const selectedVariantName = selectedVariants[product.id] || variantsList[0]?.name;

          const chosenVariantObj =
            variantsList.find((v) => v?.name === selectedVariantName) ||
            variantsList[0] ||
            { name: 'Standard', price: 0 };

          const itemPrice = chosenVariantObj?.price ?? product.price ?? 0;

          const cartItem = currentItems.find(
            (item) => item.productId === product.id && item.variant === chosenVariantObj.name
          );
          const cartQuantity = cartItem ? cartItem.quantity : 0;

          // Helper to display category labels cleanly
          const categoryDisplay = Array.isArray(product.categories)
            ? product.categories.join(' • ')
            : Array.isArray(product.category)
            ? product.category.join(' • ')
            : product.category;

          return (
            <div
              key={product.id}
              className="bg-brand-surface border border-brand-border rounded-3xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Left Column: Image */}
              <div className="sm:col-span-5 relative min-h-[220px] sm:min-h-full w-full overflow-hidden bg-stone-100">
                <Link href={`/products/${product.id}`} className="block w-full h-full relative">
                  <Image
                    src={product.image || '/images/placeholder.jpg'}
                    alt={product.name || 'Product Image'}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  {product.containerStyle && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {product.containerStyle}
                    </span>
                  )}
                </Link>
              </div>

              {/* Right Column: Details */}
              <div className="sm:col-span-7 p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted block mb-1">
                      {categoryDisplay}
                    </span>
                    <Link href={`/products/${product.id}`}>
                      <h2 className="text-xl font-bold text-brand-primary hover:text-brand-accent transition leading-snug">
                        {product.name}
                      </h2>
                    </Link>
                  </div>

                  <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">
                    {product.shortDescription || product.fullDescription}
                  </p>

                  {/* Size Selector - Dropdown */}
                  {variantsList.length > 0 && (
                    <div className="pt-1">
                      <label 
                        htmlFor={`size-select-${product.id}`} 
                        className="block text-[10px] font-bold text-brand-primary uppercase tracking-wider mb-1"
                      >
                        Select Size
                      </label>
                      <select
                        id={`size-select-${product.id}`}
                        value={selectedVariantName}
                        onChange={(e) => handleVariantChange(product.id, e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 text-stone-900 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:border-stone-600 transition cursor-pointer"
                      >
                        {variantsList.map((v) => (
                          <option key={v?.name || Math.random()} value={v?.name} className="bg-white text-stone-900 font-medium py-1">
                            {v?.name} {v?.price ? `— $${v.price.toFixed(2)}` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Bottom Price & Add Actions */}
                <div className="pt-3 border-t border-brand-border/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-brand-muted block">Price</span>
                    <span className="text-xl font-extrabold text-brand-primary">
                      ${itemPrice.toFixed(2)}
                    </span>
                  </div>

                  {cartQuantity > 0 ? (
                    <div className="flex items-center space-x-2 bg-brand-bg border border-brand-border rounded-full px-2.5 py-1 shadow-inner">
                      <button
                        type="button"
                        onClick={(e) => handleUpdateQuantity(e, product, chosenVariantObj, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-surface text-brand-primary hover:bg-brand-accent/40 font-bold text-xs transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="font-bold text-xs text-brand-primary w-4 text-center">
                        {cartQuantity}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleUpdateQuantity(e, product, chosenVariantObj, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-surface text-brand-primary hover:bg-brand-accent/40 font-bold text-xs transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleUpdateQuantity(e, product, chosenVariantObj, 1)}
                      className="btn-brand-primary px-5 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Add to Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}