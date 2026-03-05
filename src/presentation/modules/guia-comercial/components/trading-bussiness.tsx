import { TrendingUp, Star, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { getTrendingBusinesses } from "../data/mock-data";
import { cn } from "@/lib/utils";
import PlanBadge from "./plan-bagde";

const TrendingBusinesses = () => {
  const router = useRouter();
  const trending = getTrendingBusinesses();

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 px-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="font-display text-lg font-bold text-foreground">Empresas em Alta</h2>
      </div>
      <div className="space-y-2 px-4">
        {trending.map((biz) => (
          <button
            key={biz.id}
            onClick={() => router.push(`/guia/comercial/${biz.id}`)}
            className="flex w-full items-center gap-3 rounded-xl bg-card p-3 shadow-sm text-left transition-transform active:scale-[0.98]"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
              <img src={biz.logo} alt={biz.name} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-sm font-semibold text-foreground">{biz.name}</h3>
                {biz.plan !== "free" && <PlanBadge plan={biz.plan} size="sm" />}
              </div>
              <p className="truncate text-xs text-muted-foreground">{biz.category}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <span className="text-[11px] font-semibold">{biz.rating}</span>
                </div>
                <span className={cn("h-1.5 w-1.5 rounded-full", biz.isOpen ? "bg-primary" : "bg-destructive")} />
                <span className="text-[10px] text-muted-foreground">
                  {biz.isOpen ? "Aberto" : "Fechado"}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TrendingBusinesses;
