import type { Reward } from "../data/mock";  
import { Check, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  layout?: "grid" | "list";
}

const RewardCard = ({ reward, userPoints, layout = "grid" }: RewardCardProps) => {
  const canRedeem = userPoints >= reward.pointsCost;
  const router = useRouter();

  if (layout === "list") {
    return (
      <div
        role="button"
        tabIndex={canRedeem ? 0 : -1}
        onClick={() => canRedeem && router.push(`cartao-fidelidade-pontos/reward/${reward.id}`)}
        className={`relative flex items-center gap-3 overflow-hidden rounded-xl border bg-card p-3 shadow-card transition-all ${
          canRedeem
            ? "border-primary/20 cursor-pointer hover:shadow-elevated active:scale-[0.99]"
            : "border-border opacity-60 cursor-not-allowed"
        }`}
      >
        {reward.popular && (
          <span className="absolute right-2 top-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
            Popular
          </span>
        )}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-3xl">
          {reward.image}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-foreground">{reward.name}</h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{reward.description}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-sm font-bold text-gold">{reward.pointsCost} pts</span>
            {canRedeem ? (
              <span className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                <Check className="h-3 w-3" /> Disponível
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Lock className="h-3 w-3" /> Faltam {reward.pointsCost - userPoints} pts
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={canRedeem ? 0 : -1}
      onClick={() => canRedeem && router.push(`/rewards/${reward.id}`)}
      className={`group relative flex w-full flex-col overflow-hidden rounded-xl border bg-card text-left shadow-card transition-all ${
        canRedeem
          ? "border-primary/20 cursor-pointer hover:shadow-elevated active:scale-[0.98]"
          : "border-border opacity-60 cursor-not-allowed"
      }`}
    >
      {reward.popular && (
        <span className="absolute right-2 top-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
          Popular
        </span>
      )}
      <div className="flex items-center justify-center bg-secondary py-5 text-4xl">
        {reward.image}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-sm font-bold text-foreground">{reward.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
          {reward.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-sm font-bold text-gold">
            {reward.pointsCost} pts
          </span>
          {canRedeem ? (
            <span className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
              <Check className="h-3 w-3" /> Disponível
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Lock className="h-3 w-3" /> {reward.pointsCost - userPoints} pts
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
