import { Check } from "lucide-react";
import type { Coupon } from "../data/data.cupom";

interface MapNodeProps {
  coupon: Coupon;
  used: boolean;
  onClick: () => void;
}

const MapNode = ({ coupon, used, onClick }: MapNodeProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2
        transition-transform duration-200 active:scale-90
        ${used ? "opacity-70" : ""}
      `}
      style={{
        left: `${coupon.mapX}%`,
        top: `${coupon.mapY}%`,
      }}
    >
      {/* Node circle */}
      <div
        className={`
          w-14 h-14 rounded-full flex items-center justify-center
          border-[3px] transition-all relative
          ${
            used
              ? "bg-muted border-locked shadow-(--shadow-node-used)"
              : "bg-card border-primary shadow-(--shadow-node) animate-float"
          }
        `}
      >
        {used ? (
          <Check className="w-6 h-6 text-muted-foreground" />
        ) : (
          <span className="text-2xl">{coupon.storeEmoji}</span>
        )}

        {/* Discount badge */}
        {!used && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[9px] font-extrabold shadow-sm">
            {coupon.discount}
          </span>
        )}
      </div>

      {/* Store name */}
      <span
        className={`
          text-[10px] font-bold mt-1 max-w-[70px] text-center leading-tight
          ${used ? "text-muted-foreground line-through" : "text-foreground"}
        `}
      >
        {coupon.storeName}
      </span>
    </button>
  );
};

export default MapNode;
