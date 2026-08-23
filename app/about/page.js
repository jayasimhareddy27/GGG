'use client';

import React from 'react';
import Image from 'next/image';
import { FIRM_DETAILS } from '@/public/constants/firmdetails';

const VALUES = [
  {
    title: '100% Natural Ingredients',
    description: 'We source raw, unrefined shea butter, cold-pressed botanical oils, and natural essential oils without synthetic fillers or harsh preservatives.',
    icon: '🌿',
  },
  {
    title: 'Handcrafted in Small Batches',
    description: 'Every jar of body butter, scrub, and oil is whipped and poured in small batches to ensure maximum fresh quality and rich texture.',
    icon: '✨',
  },
  {
    title: 'Deeply Nourishing & Clean',
    description: 'Formulated specifically for long-lasting skin hydration, soothing dry patches, and leaving a healthy, natural radiant glow.',
    icon: '💧',
  },
  {
    title: 'Community First',
    description: 'Proudly handcrafting wellness products for our local community and crafting custom gift packages for special events.',
    icon: '🤝',
  },
];

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Hero / Intro Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-900 shadow-xs">
          Our Story & Passion
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Handcrafted Skincare Made with Pure Intentions
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          Welcome to our workshop. We specialize in rich, whipped body butters, herbal body scrubs, and botanical oils designed to nourish and revitalize dry skin naturally.
        </p>
      </section>

      {/* Main Story Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-80 sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1608248597263-000787db0031?auto=format&fit=crop&q=80&w=1200"
            alt="Handcrafted skincare making process"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Handmade Locally
            </p>
            <p className="text-lg font-bold">
              Serving {FIRM_DETAILS?.location?.city || 'Our Local Community'} & Beyond
            </p>
          </div>
        </div>

        <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How Our Journey Started
          </h2>
          <p>
            Our brand was born out of a simple need: finding skincare that actually hydrates without chemicals, synthetic fragrances, or greasy residues. Standard commercial lotions often use water and fillers that dry out your skin faster.
          </p>
          <p>
            We set out to create wholesome formulas using raw plant butters, cold-pressed botanical oils, and natural scents. What started as small weekend kitchen experiments quickly turned into a passion for sharing handcrafted skincare sets, party favors, and daily body essentials with our community.
          </p>
          <div className="pt-2 border-l-4 border-emerald-600 pl-4 italic text-slate-800 font-medium bg-slate-50 py-3 rounded-r-xl">
            "We believe that taking care of your skin shouldn't be complicated—just pure, simple ingredients that work."
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Why Choose Our Handcrafted Skincare?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Every product is made with love, care, and a commitment to quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((val, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl">{val.icon}</div>
              <h3 className="text-base font-bold text-slate-900">{val.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Orders / Bulk Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-4xl font-bold">
            Need Custom Party Favors or Event Sets?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We make custom mini body butter jars, scrub sets, and gift packages for weddings, baby showers, bridal events, and corporate gifts.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="inline-block px-8 py-3.5 rounded-full bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact Us for Custom Orders
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;