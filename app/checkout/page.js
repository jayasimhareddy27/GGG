'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentOrder = useSelector((state) => state.orders?.currentOrder || {});
  const items = currentOrder?.items || [];
  const { user } = useSelector((state) => state.auth);

  // Re-calculate totals
  const subtotal = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 0.99;
  const tax = subtotal * 0.07;
  const totalAmount = subtotal + shippingCost + tax;

  const handleDirectStripeCheckout = async () => {
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          userEmail: user?.email || '',
          userId: user?._id || user?.id || '', // Pass the user ID here
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect directly to Stripe Hosted Checkout
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to initiate checkout.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Stripe redirect error:', error);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl mx-auto">
          🛍️
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h1>
        <p className="text-xs text-slate-500">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="inline-block bg-slate-900 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition hover:bg-slate-800"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Link
          href="/products"
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          ← Back to Shopping
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          Order Review
        </h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Items in your Order
        </h2>

        {/* Item List */}
        <div className="space-y-4 divide-y divide-slate-100">
          {items.map((item, idx) => (
            <div
              key={`${item.productId}-${item.variant}-${idx}`}
              className="pt-3 first:pt-0 flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-bold text-slate-900">{item.name || item.productId}</p>
                {item.variant && (
                  <span className="text-[10px] text-slate-400">{item.variant}</span>
                )}
                <p className="text-slate-500 mt-0.5">Qty: {item.quantity}</p>
              </div>
              <span className="font-bold text-slate-900">
                ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal</span>
            <span className="text-slate-900 font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Shipping</span>
            <span className="text-slate-900 font-semibold">
              {shippingCost === 0 ? (
                <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
              ) : (
                `$${shippingCost.toFixed(2)}`
              )}
            </span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Est. Tax (7%)</span>
            <span className="text-slate-900 font-semibold">${tax.toFixed(2)}</span>
          </div>

          <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline text-sm">
            <span className="font-bold text-slate-900">Total</span>
            <span className="text-2xl font-extrabold text-slate-900">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Direct Stripe Button */}
        <button
          onClick={handleDirectStripeCheckout}
          disabled={isSubmitting}
          className="w-full py-4 rounded-full bg-slate-900 text-white font-bold text-sm shadow-md hover:bg-slate-800 transition cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <span>Redirecting to Stripe...</span>
          ) : (
            <span>Pay with Google Pay or Card • ${totalAmount.toFixed(2)}</span>
          )}
        </button>
      </div>
    </div>
  );
}