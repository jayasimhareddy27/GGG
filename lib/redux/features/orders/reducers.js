import { initialState } from "./state";

export const orderReducers = {
  setCurrentOrderItems: (state, action) => {
    state.currentOrder.items = action.payload;
  },
  setShippingAddress: (state, action) => {
    state.currentOrder.shippingAddress = {
      ...state.currentOrder.shippingAddress,
      ...action.payload,
    };
  },
  setPaymentMethod: (state, action) => {
    state.currentOrder.paymentMethod = action.payload;
  },
  setOrderTotals: (state, action) => {
    const { subtotal, shippingCost, tax, totalAmount } = action.payload;
    state.currentOrder.subtotal = subtotal;
    state.currentOrder.shippingCost = shippingCost ?? state.currentOrder.shippingCost;
    state.currentOrder.tax = tax ?? state.currentOrder.tax;
    state.currentOrder.totalAmount = totalAmount;
  },
  resetCurrentOrder: (state) => {
    state.currentOrder = initialState.currentOrder;
    state.error = null;
    state.successMessage = null;
  },
  clearOrderError: (state) => {
    state.error = null;
    state.successMessage = null;
  },
  hydrateCart: (state, action) => {
    if (action.payload) {
      state.currentOrder = action.payload;
    }
    state.isHydrated = true; // Redux is now safely loaded
  },
  setHydrated: (state) => {
    state.isHydrated = true; // Mark ready even if localStorage was empty
  },
};