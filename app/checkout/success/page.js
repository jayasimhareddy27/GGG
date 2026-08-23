'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Payment Successful!
      </h1>
      
      <p className="text-slate-600 mb-6 max-w-md">
        Thank you for your order. We have received your payment and sent a confirmation email with details.
      </p>

      {sessionId && (
        <p className="text-xs text-slate-400 mb-6 font-mono">
          Order ID: {sessionId}
        </p>
      )}

      <Link
        href="/"
        className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}