"use client";
import { history, redeemedRewards } from "../data/mock";
import HistoryItemCard from "../components/historyItemCard";
import { useState } from "react";

type Tab = "history" | "redeemed";

const History = () => {
  const [tab, setTab] = useState<Tab>("history");

  return (
    <div className="pb-24">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg px-4 pb-3 pt-10">
        <div className="mx-auto max-w-lg">
          <h1 className="text-xl font-bold text-foreground">Atividade</h1>
          <div className="mt-3 flex gap-2">
            {([["history", "Histórico"], ["redeemed", "Resgatados"]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  tab === key
                    ? "gradient-gold text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-2 max-w-lg space-y-2 px-4">
        {tab === "history" ? (
          history.map((item) => <HistoryItemCard key={item.id} item={item} />)
        ) : (
          redeemedRewards.map((rr) => (
            <div
              key={rr.id}
              className={`flex items-center gap-3 rounded-xl bg-card p-4 shadow-card animate-slide-up ${
                rr.used ? "opacity-60" : ""
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-2xl">
                {rr.reward.image}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground">{rr.reward.name}</p>
                <p className="text-xs text-muted-foreground">
                  Código: <span className="font-mono font-semibold text-foreground">{rr.code}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {rr.used ? "Utilizado" : `Válido até ${new Date(rr.expiresAt).toLocaleDateString("pt-BR")}`}
                </p>
              </div>
              {!rr.used && (
                <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-accent-foreground">
                  Ativo
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
