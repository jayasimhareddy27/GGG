"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FIRM_DETAILS } from "@/public/constants/firmdetails";
import { AuthButton } from "../../lib/components/authbutton";
import { CartDrawer } from "@/lib/components/cart/cartdrawer";

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Redux cart state
  const currentItems = useSelector(
    (state) => state.orders?.currentOrder?.items || []
  );
  const totalCartCount = currentItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/reviews_gallery", label: "Reviews & Gallery" },
    { href: "/about", label: "About" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="w-full py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Line 1: Firm Name */}
        <div className="flex justify-center pb-3 border-b border-brand-border/40">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-brand-primary hover:opacity-90 transition-opacity"
          >
            {FIRM_DETAILS.name}
          </Link>
        </div>

        {/* Line 2: Navigation Links & Actions */}
        <div className="flex items-center justify-between pt-3">
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive ? "nav-link-active" : "nav-link-inactive"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Actions: Cart + Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full border border-brand-border bg-brand-surface hover:bg-brand-accent/30 transition"
              aria-label="Open Cart"
            >
              🛒
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalCartCount}
                </span>
              )}
            </button>
            <AuthButton />
          </div>

          {/* Mobile Actions Header */}
          <div className="md:hidden flex items-center justify-between w-full">
            <span className="text-xs text-brand-muted font-medium uppercase tracking-wider">
              Menu
            </span>
            <div className="flex items-center space-x-3">
              {/* Mobile Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full border border-brand-border bg-brand-surface hover:bg-brand-accent/30 transition"
                aria-label="Open Cart"
              >
                🛒
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
                type="button"
                className="p-2 rounded-lg text-brand-muted hover:bg-brand-accent focus:outline-none"
                aria-label="Toggle Navigation"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-bg px-4 pt-3 pb-6 mt-3 space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive ? "nav-link-active" : "nav-link-inactive"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <AuthButton isMobile={true} onMobileAction={() => setIsOpen(false)} />
        </div>
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};