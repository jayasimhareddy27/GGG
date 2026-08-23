'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hydrateOrder, setHydrated } from '@/lib/redux/features/orders/slice';

export function CartSync() {
  const dispatch = useDispatch();
  const currentOrder = useSelector((state) => state.orders?.currentOrder);
  const isHydrated = useSelector((state) => state.orders?.isHydrated);

  // 1. Read from localStorage once on mount
  useEffect(() => {
    const savedOrder = localStorage.getItem('draftOrder');
    if (savedOrder) {
      try {
        dispatch(hydrateOrder(JSON.parse(savedOrder)));
      } catch (e) {
        console.error('Failed to parse saved order:', e);
        dispatch(setHydrated());
      }
    } else {
      dispatch(setHydrated());
    }
  }, [dispatch]);

  // 2. Save to localStorage ONLY AFTER Redux is fully hydrated
  useEffect(() => {
    if (!isHydrated) return; // Blocks overwriting on initial load

    if (currentOrder) {
      localStorage.setItem('draftOrder', JSON.stringify(currentOrder));
    }
  }, [currentOrder, isHydrated]);

  return null;
}