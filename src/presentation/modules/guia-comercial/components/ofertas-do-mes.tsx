import { Tag, Gift } from "lucide-react";
import { coupons } from "../data/mock-data";

const MonthlyOffers = () => {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 px-4">
        <Gift className="h-5 w-5 text-accent" />
        <h2 className="font-display text-lg font-bold text-foreground">Ofertas do Mês</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="shrink-0 w-[240px] overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 shadow-sm"
          >
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
                  <Tag className="h-4 w-4 text-accent" />
                </div>
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                  {coupon.discount}
                </span>
              </div>
              <h3 className="font-display text-sm font-bold text-foreground">{coupon.title}</h3>
              <p className="text-[11px] text-muted-foreground">{coupon.businessName}</p>
              <p className="text-[11px] text-muted-foreground line-clamp-2">{coupon.description}</p>
              <div className="flex items-center justify-between pt-1">
                <code className="rounded bg-foreground/5 px-2 py-0.5 text-[10px] font-bold text-foreground">
                  {coupon.code}
                </code>
                <span className="text-[10px] text-muted-foreground">
                  Até {new Date(coupon.validUntil).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MonthlyOffers;
