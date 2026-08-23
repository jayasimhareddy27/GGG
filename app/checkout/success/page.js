// app/checkout/success/page.js (or .jsx)
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// 1. Inner component that reads query params or session info
function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="max-w-md mx-auto text-center py-12 px-4">
      <div className="text-4xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-brand-muted mb-6">
        Thank you for your purchase. We have received your order and are processing it.
      </p>
      {sessionId && (
        <p className="text-xs text-brand-muted bg-brand-surface p-2 rounded border border-brand-border">
          Session ID: {sessionId}
        </p>
      )}
    </div>
  );
}

// 2. Outer page export wrapped in Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto text-center py-12">
        <p className="text-brand-muted">Loading order confirmation...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}