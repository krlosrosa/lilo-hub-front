import { Star, Flame, Trophy } from "lucide-react";

interface HeaderBarProps {
  totalXp: number;
  couponsUsed: number;
  totalCoupons: number;
}

const HeaderBar = ({ totalXp, couponsUsed, totalCoupons }: HeaderBarProps) => {
  const progressPercent = totalCoupons > 0 ? (couponsUsed / totalCoupons) * 100 : 0;

  return (
    <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-foreground">Mapa de Cupons</p>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-warning fill-warning" />
              <span className="text-[11px] font-bold text-muted-foreground">{totalXp} XP</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-secondary" />
            <span className="text-xs font-bold text-foreground">
              {couponsUsed}/{totalCoupons}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-md mx-auto mt-2">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
