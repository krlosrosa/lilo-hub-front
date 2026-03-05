import { useState, useCallback, useEffect } from "react";
import { coupons } from "../data/data.cupom";

const STORAGE_KEY = "coupon-progress-v2";

interface ProgressState {
  usedCouponIds: string[];
  totalXp: number;
}

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { usedCouponIds: [], totalXp: 0 };
}

function saveProgress(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useCouponProgress() {
  const [state, setState] = useState<ProgressState>(loadProgress);

  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const useCoupon = useCallback(
    (couponId: string) => {
      const coupon = coupons.find((c) => c.id === couponId);
      if (!coupon || state.usedCouponIds.includes(couponId)) return;

      setState((prev) => ({
        usedCouponIds: [...prev.usedCouponIds, couponId],
        totalXp: prev.totalXp + coupon.xpReward,
      }));
    },
    [state.usedCouponIds]
  );

  const isCouponUsed = useCallback(
    (couponId: string) => state.usedCouponIds.includes(couponId),
    [state.usedCouponIds]
  );

  const resetProgress = useCallback(() => {
    setState({ usedCouponIds: [], totalXp: 0 });
  }, []);

  return {
    usedCouponIds: state.usedCouponIds,
    totalXp: state.totalXp,
    isCouponUsed,
    useCoupon,
    resetProgress,
    couponsUsed: state.usedCouponIds.length,
    totalCoupons: coupons.length,
  };
}
