import Image from "next/image";
import Link from "next/link";
import { FIRM_DETAILS } from "@/public/constants/firmdetails";

export default function Home() {
  return (
    <div className="overflow-x-hidden -mt-16 sm:-mt-24">
      {/* Full-Bleed Edge-to-Edge Hero Section */}
      <section className="relative w-screen left-[50%] right-[50%] -mx-[50vw] min-h-screen flex items-center justify-center text-center px-4 sm:px-8 lg:px-12">
        {/* Full-Bleed Image Background */}
        <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
          <Image
            src="/Herosection.png"
            alt="Handcrafted Skincare Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-90 [mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-surface/30 to-brand-surface" />
        </div>

        {/* Hero Content - Expanded Width */}
        <div className="max-w-7xl w-full mx-auto space-y-6 sm:space-y-8 relative z-10 pt-20 pb-12">
          <span className="inline-block px-5 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-brand-accent text-brand-primary shadow-sm">
            Handcrafted Skincare & Body Butters
          </span>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-brand-primary leading-none max-w-6xl mx-auto">
            {FIRM_DETAILS.name}
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl text-brand-muted leading-relaxed max-w-4xl mx-auto font-medium">
            {FIRM_DETAILS.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
            <Link
              href="/products"
              className="btn-brand-primary px-10 py-4 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-transform"
            >
              Shop Collection
            </Link>
            <Link
              href="/Requestpricing"
              className="px-10 py-4 rounded-full text-lg font-semibold text-brand-primary border border-brand-border bg-brand-surface/90 hover:bg-brand-accent/50 transition-colors shadow-sm"
            >
              Request Bulk Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Subsequent Page Content - Expanded Container Widths */}
      <div className="space-y-16 sm:space-y-24 mt-8 sm:mt-12 px-4 sm:px-8 lg:px-12">
        {/* Feature Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[90rem] mx-auto relative z-10">
          <div className="bg-brand-surface/80 backdrop-blur-md p-8 sm:p-10 rounded-xl border border-brand-border space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-brand-accent text-brand-primary flex items-center justify-center text-xl font-bold">
              🌿
            </div>
            <h3 className="text-xl font-semibold text-brand-primary">Pure & Natural</h3>
            <p className="text-brand-muted text-base leading-relaxed">
              Formulated with raw shea butter and rich natural oils designed to nourish dry skin and maintain a long-lasting glow.
            </p>
          </div>

          <div className="bg-brand-surface/80 backdrop-blur-md p-8 sm:p-10 rounded-xl border border-brand-border space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-brand-accent text-brand-primary flex items-center justify-center text-xl font-bold">
              ✨
            </div>
            <h3 className="text-xl font-semibold text-brand-primary">Signature Fragrances</h3>
            <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
              Custom-blended scents created to soothe your skin and relax your senses throughout the day.
            </p>
          </div>

          <div className="bg-brand-surface/80 backdrop-blur-md p-8 sm:p-10 rounded-xl border border-brand-border space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-brand-accent text-brand-primary flex items-center justify-center text-xl font-bold">
              📦
            </div>
            <h3 className="text-xl font-semibold text-brand-primary">Wholesale & Events</h3>
            <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
              Bulk orders, party favors, and corporate gift packages packaged and customized to your needs.
            </p>
          </div>
        </section>

        {/* Local Callout Section */}
        <section className="bg-brand-surface border border-brand-border rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-[90rem] mx-auto">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-brand-primary">
              Located in {FIRM_DETAILS.location.city}
            </h2>
            <p className="text-brand-muted text-base max-w-2xl">
              {FIRM_DETAILS.location.serviceArea} {FIRM_DETAILS.hours}
            </p>
          </div>
          <a
            href={`tel:${FIRM_DETAILS.phone.raw}`}
            className="btn-brand-primary px-8 py-4 rounded-full text-base font-semibold whitespace-nowrap shadow-sm"
          >
            Call {FIRM_DETAILS.phone.display}
          </a>
        </section>
      </div>
    </div>
  );
}