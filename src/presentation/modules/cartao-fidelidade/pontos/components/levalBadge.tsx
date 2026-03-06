import { LEVELS, type LoyaltyLevel } from "../data/mock";
import { Shield, Crown, Award, Star } from "lucide-react";

const levelIcons: Record<LoyaltyLevel, React.ReactNode> = {
  bronze: <Shield className="h-5 w-5" />,
  silver: <Award className="h-5 w-5" />,
  gold: <Star className="h-5 w-5" />,
  vip: <Crown className="h-5 w-5" />,
};

const levelColors: Record<LoyaltyLevel, string> = {
  bronze: "bg-orange-100 text-bronze",
  silver: "bg-gray-100 text-silver",
  gold: "bg-gold-light text-gold",
  vip: "bg-purple-100 text-vip",
};

interface LevelBadgeProps {
  level: LoyaltyLevel;
  size?: "sm" | "md";
}

const LevelBadge = ({ level, size = "md" }: LevelBadgeProps) => {
  const info = LEVELS[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${levelColors[level]} ${
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"
      }`}
    >
      {levelIcons[level]}
      {info.label}
    </span>
  );
};

export default LevelBadge;
