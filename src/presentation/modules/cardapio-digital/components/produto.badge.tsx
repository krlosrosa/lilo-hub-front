import { cn } from "@/lib/utils";
import { Flame, Tag, Sparkles, ThumbsUp } from "lucide-react";

type BadgeType = 'popular' | 'promo' | 'new' | 'recommended';

const badgeConfig: Record<BadgeType, { label: string; icon: React.ElementType; className: string }> = {
  popular: {
    label: "Mais Pedido",
    icon: Flame,
    className: "bg-badge-popular/15 text-badge-popular border-badge-popular/30",
  },
  promo: {
    label: "Promoção",
    icon: Tag,
    className: "bg-badge-promo/15 text-badge-promo border-badge-promo/30",
  },
  new: {
    label: "Novo",
    icon: Sparkles,
    className: "bg-badge-new/15 text-badge-new border-badge-new/30",
  },
  recommended: {
    label: "Recomendado",
    icon: ThumbsUp,
    className: "bg-badge-recommended/15 text-badge-recommended border-badge-recommended/30",
  },
};

export default function ProductBadge({ type }: { type: BadgeType }) {
  const config = badgeConfig[type];
  const Icon = config.icon;
  
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border", config.className)}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
