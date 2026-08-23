'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();

  // 1. Redux Selectors
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);

  // 2. Local State
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'details'
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.shippingAddress?.street || '',
    city: user?.shippingAddress?.city || '',
    state: user?.shippingAddress?.state || '',
    zipCode: user?.shippingAddress?.zipCode || user?.shippingAddress?.zip || '',
  });

  // Guard: If not logged in
  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-4 shadow-xs">
          <div className="text-4xl">🔒</div>
          <h1 className="text-2xl font-extrabold text-slate-900">Account Access Required</h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Please log in to view your profile, manage shipping addresses, and track past order history.
          </p>
          <div className="pt-2">
            <a
              href="/login"
              className="inline-block px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow-md hover:bg-slate-800 transition cursor-pointer"
            >
              Log In / Register
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleProfileSave = (e) => {
    e.preventDefault();
    // Dispatch update profile action here if needed
    // dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Profile Header (Banner without Edit Button) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xl">
            {user.avatar ? (
              <img src={user.avatar} alt={user.fullName || user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{(user.fullName || user.name || user.email || 'U').charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">{user.fullName || user.name || 'Valued Customer'}</h1>
            <p className="text-xs text-slate-500 font-medium">{user.email}</p>
            {user.createdAt && (
              <span className="inline-block mt-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-full border border-emerald-200">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-8">
        {[
          { id: 'orders', label: 'Order History' },
          { id: 'details', label: 'Account & Shipping Details' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-b-2 border-slate-900 text-slate-900'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Order History */}
      {activeTab === 'orders' && (
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Your Past Orders</h2>
          {!orders || orders.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <p className="text-sm font-semibold text-slate-600">No orders placed yet.</p>
              <a href="/products" className="inline-block text-xs font-bold text-emerald-600 hover:underline">
                Explore our products →
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div
                  key={order._id || order.id || index}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Order #{order._id || order.id || index + 1}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date || 'Recent'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-extrabold text-slate-900">
                        ${order.totalAmount || order.total || 0}
                      </span>
                      <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                        {order.status || 'Processing'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs text-slate-600">
                        <span>{item.name || item.productId} × {item.quantity}</span>
                        <span className="font-semibold text-slate-800">${item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <a
                      href={`/reviews?order=${order._id || order.id}`}
                      className="text-xs font-bold text-slate-900 hover:text-emerald-600 transition"
                    >
                      Write a Review for this Order →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab 2: Account & Shipping Details */}
      {activeTab === 'details' && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs max-w-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Personal & Shipping Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
            >
              {isEditing ? 'Cancel' : 'Edit Information'}
            </button>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-6">
            {/* Personal Details Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 disabled:opacity-60 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 disabled:opacity-60 text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 disabled:opacity-60 text-slate-900 font-medium"
                />
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Default Shipping Address</h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="123 Main St"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 disabled:opacity-60 text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 disabled:opacity-60 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 disabled:opacity-60 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 disabled:opacity-60 text-slate-900 font-medium"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs shadow-md hover:bg-slate-800 transition cursor-pointer"
              >
                Save All Changes
              </button>
            )}
          </form>
        </section>
      )}

    </div>
  );
};

export default Profile;