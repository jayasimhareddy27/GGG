export const initialState = {
  currentOrder: {
    items: [], // [{ productId, quantity, price, variant }]
    shippingAddress: {
      fullName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    },
    paymentMethod: "Stripe",
    subtotal: 0,
    shippingCost: 0,
    tax: 0,
    totalAmount: 0,
  },
  orders: [],
  isHydrated: false, // <-- Add this flag
  loading: false,
  error: null,
  successMessage: null,
};