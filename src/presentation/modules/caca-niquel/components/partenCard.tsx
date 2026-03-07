import { Partner } from "../data/mock";

interface PartnerCardProps {
  partner: Partner;
  highlight?: boolean;
}

const PartnerCard = ({ partner, highlight }: PartnerCardProps) => {
  return (
    <div className={`partner-card-slot select-none ${highlight ? "win-glow" : ""}`}>
      <span className="text-5xl">{partner.icon}</span>
      <span className="text-xs font-medium text-foreground/80 text-center leading-tight mt-1">
        {partner.name}
      </span>
    </div>
  );
};

export default PartnerCard;
