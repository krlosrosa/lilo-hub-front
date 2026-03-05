"use client";
import { MapPin } from "lucide-react";
import PromotionsStories from "../components/promotions-stories";
import SearchBar from "../components/search-bar";
import CategoryGrid from "../components/categoria-grid";
import PremiumHighlights from "../components/premium-highlitgh";
import AdBanner from "../components/ad-banner";
import MonthlyOffers from "../components/ofertas-do-mes";
import TrendingBusinesses from "../components/trading-bussiness";
import BottomNav from "../layout/bottom-nav";

export default function GuiarComercialView() {
  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg">
        <div className="mx-auto max-w-lg px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl font-extrabold text-foreground tracking-tight">
                Guia Comercial
              </h1>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="text-[11px]">São Paulo, SP</span>
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold text-sm">
              GC
            </div>
          </div>
          <SearchBar />
        </div>
      </header>
      <div className="mx-auto max-w-lg space-y-6">
      <PromotionsStories />
      <CategoryGrid />
      <PremiumHighlights/>
      <AdBanner/>
      <MonthlyOffers/>
      <TrendingBusinesses/>
      <BottomNav />
      </div>
    </div>
  )
}