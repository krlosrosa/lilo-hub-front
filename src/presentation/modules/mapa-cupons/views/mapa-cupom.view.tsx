'use client';
import { useState } from "react";
import { coupons } from "../data/data.cupom";
import { useCouponProgress } from "../hooks/use-cupom";
import HeaderBar from "../components/header-bar-cupom";
import MapNode from "../components/mapa-node";
import CouponModal from "../components/cupom-modal";
import WorldMap from "../components/world-map";
import type { Coupon } from "../data/data.cupom";
import { RotateCcw } from "lucide-react";

const MapaCupomView = () => {
  const progress = useCouponProgress();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderBar
        totalXp={progress.totalXp}
        couponsUsed={progress.couponsUsed}
        totalCoupons={progress.totalCoupons}
      />

      {/* World Map Area */}
      <div className="flex-1 relative overflow-auto">
        <WorldMap>
          {coupons.map((coupon) => (
            <MapNode
              key={coupon.id}
              coupon={coupon}
              used={progress.isCouponUsed(coupon.id)}
              onClick={() => setSelectedCoupon(coupon)}
            />
          ))}
        </WorldMap>
      </div>

      {/* Reset button */}
      <div className="sticky bottom-0 py-3 flex justify-center bg-background/80 backdrop-blur-sm border-t border-border">
        <button
          onClick={progress.resetProgress}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-bold hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Recomeçar
        </button>
      </div>

      {/* Modal */}
      {selectedCoupon && (
        <CouponModal
          coupon={selectedCoupon}
          used={progress.isCouponUsed(selectedCoupon.id)}
          onUse={() => progress.useCoupon(selectedCoupon.id)}
          onClose={() => setSelectedCoupon(null)}
        />
      )}
    </div>
  );
};

export default MapaCupomView;
