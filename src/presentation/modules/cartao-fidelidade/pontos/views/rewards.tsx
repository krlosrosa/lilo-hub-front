"use client";
import { rewards, userProfile } from "../data/mock";
import RewardCard from "../components/rewardCard";
import { useState } from "react";
import { LayoutGrid, List, QrCode } from "lucide-react";
import MyQrCodeModal from "../components/myQrCode";

const categories = ["Todos", ...Array.from(new Set(rewards.map((r) => r.category)))];

const Rewards = () => {
  const [active, setActive] = useState("Todos");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [qrOpen, setQrOpen] = useState(false);
  const filtered = active === "Todos" ? rewards : rewards.filter((r) => r.category === active);

  return (
    <div className="pb-24">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg px-4 pb-3 pt-10">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Recompensas</h1>
              <p className="text-sm text-muted-foreground">
                Você tem <span className="font-bold text-gold">{userProfile.points}</span> pontos
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* QR Code button */}
              <button
                onClick={() => setQrOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card transition-all hover:opacity-90 active:scale-95"
                title="Meu QR Code"
              >
                <QrCode className="h-5 w-5" />
              </button>
              {/* Layout toggle */}
              <div className="flex rounded-lg bg-secondary p-0.5">
                <button
                  onClick={() => setLayout("grid")}
                  className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                    layout === "grid" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
                    layout === "list" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === c
                    ? "gradient-gold text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-2 max-w-lg px-4">
        {layout === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((r) => (
              <RewardCard key={r.id} reward={r} userPoints={userProfile.points} layout="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((r) => (
              <RewardCard key={r.id} reward={r} userPoints={userProfile.points} layout="list" />
            ))}
          </div>
        )}
      </div>

      <MyQrCodeModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  );
};

export default Rewards;
