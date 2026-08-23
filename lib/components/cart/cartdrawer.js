"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setCurrentOrderItems,
  setOrderTotals,
} from "@/lib/redux/features/orders/slice";

export const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentItems = useSelector(
    (state) => state.orders?.currentOrder?.items || []
  );

  const subtotal = currentItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal * 0.07;
  const totalAmount = subtotal + shippingCost + tax;

  const handleQuantityChange = (index, delta) => {
    const updated = currentItems
      .map((item, i) => {
        if (i === index) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);

    dispatch(setCurrentOrderItems(updated));
  };

  const handleRemove = (index) => {
    const updated = currentItems.filter((_, i) => i !== index);
    dispatch(setCurrentOrderItems(updated));
  };

  const handleCheckout = () => {
    if (currentItems.length === 0) return;

    dispatch(
      setOrderTotals({
        subtotal,
        shippingCost,
        tax,
        totalAmount,
      })
    );

    if (onClose) onClose();
    router.push("/checkout");
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Blurred Backdrop with Fade-in */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Slide-over Panel */}
        <div className="w-screen max-w-md bg-brand-surface border-l border-brand-border text-brand-primary shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-brand-border/60 flex items-center justify-between bg-brand-bg/50">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🛒</span>
              <h2 className="text-xl font-bold tracking-tight">Your Cart</h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-accent/40 text-brand-primary border border-brand-border/40">
                {currentItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-brand-muted hover:text-brand-primary hover:bg-brand-accent/30 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-brand-border/30">
            {currentItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-16 h-16 rounded-full bg-brand-accent/30 flex items-center justify-center text-2xl text-brand-muted">
                  🛍️
                </div>
                <p className="text-lg font-semibold">Your cart is empty</p>
                <p className="text-sm text-brand-muted max-w-xs">
                  Discover handcrafted items under Products & Services to start building your order.
                </p>
              </div>
            ) : (
              currentItems.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.variant}-${idx}`}
                  className="pt-4 first:pt-0 flex items-start justify-between gap-4 group"
                >
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-sm leading-tight">
                      {item.name || item.productId}
                    </h3>
                    {item.variant && (
                      <span className="inline-block text-[11px] font-medium bg-brand-accent/30 text-brand-muted px-2 py-0.5 rounded border border-brand-border/30">
                        {item.variant}
                      </span>
                    )}
                    <p className="text-sm font-bold text-brand-primary pt-1">
                      ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Actions & Delete */}
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center border border-brand-border rounded-lg bg-brand-bg p-0.5 shadow-sm">
                      <button
                        onClick={() => handleQuantityChange(idx, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md text-brand-muted hover:text-brand-primary hover:bg-brand-accent/40 transition text-sm font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(idx, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-md text-brand-muted hover:text-brand-primary hover:bg-brand-accent/40 transition text-sm font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(idx)}
                      className="text-[11px] font-medium text-red-500 hover:text-red-600 transition cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {currentItems.length > 0 && (
            <div className="p-6 border-t border-brand-border/60 bg-brand-bg/50 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span className="text-brand-primary font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Shipping</span>
                  <span className="text-brand-primary font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-semibold uppercase text-xs">Free</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Est. Tax (7%)</span>
                  <span className="text-brand-primary font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-border/40 flex justify-between items-baseline">
                <span className="text-base font-bold">Total</span>
                <span className="text-2xl font-extrabold text-brand-primary">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-brand-primary w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 mt-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};