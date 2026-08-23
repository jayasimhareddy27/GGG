'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FIRM_DETAILS } from '@/public/constants/firmdetails';
import { CATEGORIES, INITIAL_REVIEWS, INITIAL_GALLERY_ITEMS } from '@/public/constants/reviewsgallerydata';

const Reviews_Gallery = ({
  reviews = INITIAL_REVIEWS,
  galleryItems = INITIAL_GALLERY_ITEMS,
  isLoggedIn = false,
  userOrders = [],
  onReviewSubmit,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    orderId: '',
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const filteredGallery = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;

    if (onReviewSubmit) {
      await onReviewSubmit(reviewForm);
    }

    setSubmitted(true);
    setTimeout(() => {
      setReviewForm({ name: '', rating: 5, orderId: '', comment: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-900 shadow-xs">
          Community & Craftsmanship
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Reviews & Photo Gallery
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-medium">
          See our handcrafted skincare products up close and hear feedback from our community in {FIRM_DETAILS?.location?.city || 'our local area'}.
        </p>
      </div>

      {/* Section 1: Photo Gallery */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-900">Product Showcase</h2>
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredGallery.length === 0 ? (
          <p className="text-center text-slate-500 text-sm py-8">No gallery images available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative h-72 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold mt-2">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 2: Customer Reviews */}
      <section className="space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-900">What Our Customers Say</h2>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-slate-500 text-sm py-8">No reviews yet. Be the first to leave one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < rev.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{rev.name}</span>
                    {rev.verifiedOrder && (
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        ✓ Verified Purchase ({rev.verifiedOrder})
                      </span>
                    )}
                  </div>
                  {rev.tag && (
                    <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                      {rev.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Leave a Review Form */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">Share Your Experience</h3>
          <p className="text-xs text-slate-500">Loved your body butter or skincare set? Leave a review!</p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-semibold text-emerald-700">
            ✓ Thank you! Your review has been submitted for approval.
          </div>
        ) : (
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Rating
                </label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                >
                  <option value={5}>★★★★★ (5/5)</option>
                  <option value={4}>★★★★☆ (4/5)</option>
                  <option value={3}>★★★☆☆ (3/5)</option>
                  <option value={2}>★★☆☆☆ (2/5)</option>
                  <option value={1}>★☆☆☆☆ (1/5)</option>
                </select>
              </div>
            </div>

            {/* Order Select Option (Shown when user is logged in) */}
            {isLoggedIn ? (
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Select Order
                </label>
                <select
                  value={reviewForm.orderId}
                  onChange={(e) => setReviewForm({ ...reviewForm, orderId: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900"
                >
                  <option value="">General Review (No Order Selected)</option>
                  {userOrders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.id} - {order.items} ({order.date})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 italic">
                💡 Tip: Log in to select a past order and receive a "Verified Purchase" badge on your review.
              </p>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Your Review
              </label>
              <textarea
                rows={4}
                required
                placeholder="How did the products feel on your skin?"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow-md transition hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm font-bold hover:bg-black transition cursor-pointer"
            >
              ✕
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-80 sm:h-96 object-cover"
            />
            <div className="p-6 space-y-1 bg-white">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                {selectedImage.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews_Gallery;