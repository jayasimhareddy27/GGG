"use client";

import Link from "next/link";
import { FIRM_DETAILS } from "@/public/constants/firmdetails";

export const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/Products_services", label: "Products & Services" },
    { href: "/Requestpricing", label: "Bulk Pricing" },
    { href: "/Reviews", label: "Reviews & Gallery" },
    { href: "/About", label: "About" },
  ];

  const scrollToBottom = () => {
    const footerElement = document.getElementById("main-footer");
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Enlarged Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-brand-primary text-brand-surface border-t border-brand-border shadow-2xl">
        <button
          onClick={scrollToBottom}
          type="button"
          className="w-full py-4 px-6 flex items-center justify-center gap-3 text-sm sm:text-base font-bold hover:bg-brand-primary/90 transition-colors focus:outline-none tracking-wide"
        >
          <svg className="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Locations & Hours</span>
          <svg className="w-5 h-5 text-brand-accent animate-bounce ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

      {/* Main Full Footer */}
      <footer id="main-footer" className="w-full bg-brand-bg border-t border-brand-border text-brand-text pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div className="space-y-3">
              <Link 
                href="/" 
                className="text-2xl font-semibold tracking-tight text-brand-primary inline-block"
              >
                {FIRM_DETAILS.name}
              </Link>
              <p className="text-brand-muted text-sm leading-relaxed">
                {FIRM_DETAILS.tagline}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-brand-muted hover:text-brand-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services & Direct Contact */}
<div>
  <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-4">
    Direct Contact
  </h3>
  <ul className="space-y-3 text-sm text-brand-muted">
    {/* Phone */}
    <li>
      <a
        href={`tel:${FIRM_DETAILS.phone.raw}`}
        className="inline-flex items-center gap-2 text-brand-text hover:text-brand-primary transition-colors font-medium"
      >
        <svg className="w-4 h-4 text-brand-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {FIRM_DETAILS.phone.display}
      </a>
    </li>

    {/* Email */}
    <li>
      <a
        href={`mailto:${FIRM_DETAILS.email || "info@gratefulglow.com"}`}
        className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-primary transition-colors"
      >
        <svg className="w-4 h-4 text-brand-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {FIRM_DETAILS.email || "info@gratefulglow.com"}
      </a>
    </li>

    {/* Social Links Row */}
    <li className="pt-1">
      <div className="flex items-center gap-3 text-brand-muted">
        {/* Instagram */}
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-brand-primary transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>

        {/* Facebook */}
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-brand-primary transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        </a>

        {/* X / Twitter */}
        <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="hover:text-brand-primary transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-brand-primary transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>

        {/* YouTube */}
        <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-brand-primary transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
          </svg>
        </a>
      </div>
    </li>
  </ul>
</div>

            {/* Location & Availability */}
            <div>
              <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-4">
                Location & Hours
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {FIRM_DETAILS.location.addressText}
              </p>
              <p className="text-sm text-brand-muted leading-relaxed mt-2">
                {FIRM_DETAILS.weekdayhours}
              </p>
              <p className="text-sm text-brand-muted leading-relaxed mt-2">
                {FIRM_DETAILS.weekendhours}
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-brand-border flex flex-col sm:flex-row justify-between items-center text-xs text-brand-muted gap-4">
            <p>&copy; {new Date().getFullYear()} {FIRM_DETAILS.name}. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="#" className="hover:text-brand-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-brand-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};