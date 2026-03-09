import { Crown, Award, Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlanType } from "../data/mock.data";

interface PlanBadgeProps {
  plan: PlanType;
  size?: "sm" | "md";
}

const config: Record<Exclude<PlanType, "free">, { label: string; icon: any; className: string }> = {
  premium: {
    label: "Premium",
    icon: Crown,
    className: "bg-primary text-primary-foreground",
  },
  gold: {
    label: "Recomendado",
    icon: Award,
    className: "bg-gold text-gold-foreground",
  },
  silver: {
    label: "Destaque",
    icon: Pin,
    className: "bg-silver text-silver-foreground",
  },
};

const PlanBadge = ({ plan, size = "md" }: PlanBadgeProps) => {
  if (plan === "free") return null;
  const c = config[plan];
  const Icon = c.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wide",
        c.className,
        size === "sm" ? "px-1.5 py-0.5 text-[8px]" : "px-2.5 py-1 text-[10px]"
      )}
    >
      <Icon className={cn(size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3")} />
      {c.label}
    </span>
  );
};

export default PlanBadge;
