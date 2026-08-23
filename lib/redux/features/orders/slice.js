import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { orderReducers } from "./reducers";
import { fetchUserOrders, createOrder } from "./handlers";

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: orderReducers,
  
  extraReducers: (builder) => {
    builder
      // Fetch User Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
        state.currentOrder = initialState.currentOrder;
        state.successMessage = "Order placed successfully!";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentOrderItems,
  setShippingAddress,
  setPaymentMethod,
  setOrderTotals,
  resetCurrentOrder,
  clearOrderError,
  hydrateCart,
  setHydrated,
} = orderSlice.actions;

export default orderSlice.reducer;