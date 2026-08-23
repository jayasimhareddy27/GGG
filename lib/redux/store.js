import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/slice';
import orderReducer from './features/orders/slice';

// 1. Logger Middleware
const logger = (store) => (next) => (action) => {
  console.group(`Action: ${action.type}`);
  const result = next(action);
  console.log('Next State:', store.getState());
  console.groupEnd();
  return result;
};

// 2. Persistence Middleware (Saves currentOrder to localStorage on state changes)
const localStorageMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  if (typeof window !== 'undefined') {
    // Only save when an order action fires, skipping hydration to prevent loops
    if (
      action.type.startsWith('orders/') &&
      action.type !== 'orders/hydrateCart'
    ) {
      const state = storeAPI.getState();
      if (state.orders?.currentOrder) {
        localStorage.setItem(
          'draftOrder',
          JSON.stringify(state.orders.currentOrder)
        );
      }
    }
  }

  return result;
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      orders: orderReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger, localStorageMiddleware),
  });
};