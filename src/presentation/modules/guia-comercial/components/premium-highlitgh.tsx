"use client";
import { Phone, MessageCircle, Star, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { getPremiumBusinesses } from "../data/mock-data";

const PremiumHighlights = () => {
  const router = useRouter();
  const premiums = getPremiumBusinesses();

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 px-4">
        <Crown className="h-5 w-5 text-primary" />
        <h2 className="font-display text-lg font-bold text-foreground">Destaques Premium</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 scrollbar-hide">
        {premiums.map((biz) => (
          <div
            key={biz.id}
            className="shrink-0 w-[300px] overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-md"
          >
            <button
              onClick={() => router.push(`/guia/comercial/${biz.id}`)}
              className="block w-full text-left"
            >
              <div className="relative h-36 bg-muted">
                <img src={biz.logo} alt={biz.name} className="h-full w-full object-cover" />
                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground uppercase tracking-wide">
                  <Crown className="h-3 w-3" />
                  Premium
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-display text-base font-bold text-foreground">{biz.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{biz.shortDescription}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  <span className="text-xs font-semibold text-foreground">{biz.rating}</span>
                  <span className="text-[10px] text-muted-foreground">({biz.reviewCount})</span>
                </div>
              </div>
            </button>
            <div className="flex border-t border-primary/10">
              <a
                href={`https://wa.me/${biz.whatsapp}`}
                className="flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-semibold text-primary transition-colors hover:bg-primary/5"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <div className="w-px bg-primary/10" />
              <a
                href={`tel:${biz.phone}`}
                className="flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-semibold text-primary transition-colors hover:bg-primary/5"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="h-4 w-4" />
                Ligar
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumHighlights;
