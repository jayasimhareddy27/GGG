// app/checkout/success/page.js
import { Suspense } from "react";
import { SuccessContent } from "./successcontent";

// Route Segment Configs (Allowed ONLY in Server Components)
export const dynamic = "force-dynamic";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto text-center py-12">
          <p className="text-brand-muted">Loading order confirmation...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}