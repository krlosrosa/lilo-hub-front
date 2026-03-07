interface AttemptsCounterProps {
  used: number;
  max: number;
}

const AttemptsCounter = ({ used, max }: AttemptsCounterProps) => {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
      <span>Tentativas hoje:</span>
      <span className="font-bold text-primary">
        {used} / {max}
      </span>
      <div className="flex gap-1 ml-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < used ? "bg-muted-foreground/40" : "bg-primary"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AttemptsCounter;
