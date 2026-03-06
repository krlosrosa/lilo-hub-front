interface PointsProgressProps {
  current: number;
  target: number;
  label?: string;
}

const PointsProgress = ({ current, target, label }: PointsProgressProps) => {
  const pct = Math.min((current / target) * 100, 100);

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-semibold text-foreground">
            {current} / {target}
          </span>
        </div>
      )}
      <div className="h-3 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full gradient-gold transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default PointsProgress;
