import { useState } from "react";
import { X, Sparkles, MapPin } from "lucide-react";
import type { Coupon } from "../data/data.cupom";

interface CouponModalProps {
  coupon: Coupon;
  used: boolean;
  onUse: () => void;
  onClose: () => void;
}

const CouponModal = ({ coupon, used: alreadyUsed, onUse, onClose }: CouponModalProps) => {
  const [confirming, setConfirming] = useState(false);
  const [justUsed, setJustUsed] = useState(false);

  const handleUse = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setJustUsed(true);
    onUse();
    setTimeout(onClose, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-foreground/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card w-full max-w-md rounded-t-3xl p-6 pb-10 animate-[slideUp_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
            {coupon.storeEmoji}
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-muted">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <h2 className="text-xl font-extrabold text-foreground">{coupon.storeName}</h2>
        <div className="flex items-center gap-1 mt-1 text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-sm">{coupon.category}</span>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-muted/50 border-2 border-dashed border-primary/30">
          <p className="text-2xl font-black text-primary text-center">{coupon.discount}</p>
          <p className="text-sm text-muted-foreground text-center mt-1">{coupon.description}</p>
        </div>

        <div className="flex items-center justify-center gap-1 mt-3">
          <Sparkles className="w-4 h-4 text-xp" />
          <span className="text-sm font-bold text-xp">+{coupon.xpReward} XP ao usar</span>
        </div>

        {alreadyUsed || justUsed ? (
          <div className="mt-6 w-full py-4 rounded-2xl bg-muted text-center">
            <span className="text-2xl">{justUsed ? "🎉" : "✅"}</span>
            <p className="font-extrabold text-muted-foreground mt-1">
              {justUsed ? "Cupom Usado!" : "Já utilizado"}
            </p>
          </div>
        ) : (
          <button
            onClick={handleUse}
            className={`
              mt-6 w-full py-4 rounded-2xl font-extrabold text-lg
              transition-all duration-200 active:scale-[0.97]
              ${
                confirming
                  ? "bg-secondary text-secondary-foreground shadow-(--shadow-node-secondary)"
                  : "bg-primary text-primary-foreground shadow-(--shadow-node)"
              }
            `}
          >
            {confirming ? "Confirmar uso? Toque de novo!" : "Usar Cupom"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CouponModal;
