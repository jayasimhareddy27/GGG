"use client";

import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import { hydrateCart } from "@/lib/redux/features/orders/slice";
import AuthPersistence from "./features/auth/persistence";

export default function ReduxProvider({ children }) {
  const storeRef = useRef(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // Rehydrate saved cart from localStorage on client mount
    const savedOrder = localStorage.getItem("draftOrder");
    if (savedOrder) {
      try {
        storeRef.current.dispatch(hydrateCart(JSON.parse(savedOrder)));
      } catch (error) {
        console.error("Failed to rehydrate order state:", error);
      }
    }
  }, []);

  return <Provider store={storeRef.current}>
    <AuthPersistence />
    {children}
  </Provider>;
}