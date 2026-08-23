export const PROMOTIONS = [
  {
    id: "signup-discount",
    tagline: "WELCOME GLOW",
    message: "🎁 Get 15% OFF your first body butter order when you sign up!",
    linkText: "Claim Discount",
    linkHref: "/signup", // Or link directly to an anchor/modal
    startDate: "2026-08-01",
    endDate: "2026-12-31",
  },
  {
    id: "bulk-shipping",
    tagline: "GRATEFUL GLOW",
    message: "✨ Free shipping on body butter bulk orders over $50!",
    linkText: "Learn More",
    linkHref: "/Requestpricing",
    startDate: "2026-08-01",
    endDate: "2026-08-31",
  },
  {
    id: "summer-glow",
    tagline: "SUMMER SALE",
    message: "🌿 Buy 2 body butters, get 1 free with code SUMMERGLOW",
    linkText: "Shop Products",
    linkHref: "/Products_services",
    startDate: "2026-08-10",
    endDate: "2026-09-01",
  },
];

// Helper function to pull active promotions based on current time
export const getActivePromotions = () => {
  const now = new Date();

  return PROMOTIONS.filter((promo) => {
    if (promo.startDate && new Date(promo.startDate) > now) return false;
    if (promo.endDate && new Date(promo.endDate) < now) return false;
    return true;
  });
};