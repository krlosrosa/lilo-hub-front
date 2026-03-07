import { Partner } from "../data/mock";

interface HistoryListProps {
  history: [Partner, Partner, Partner][];
}

const HistoryList = ({ history }: HistoryListProps) => {
  if (history.length === 0) return null;

  return (
    <div className="casino-card p-4">
      <h3 className="text-sm font-display text-muted-foreground mb-3">Últimos resultados</h3>
      <div className="space-y-2">
        {history.map((spin, i) => {
          const isWin = spin[0].id === spin[1].id && spin[1].id === spin[2].id;
          return (
            <div
              key={i}
              className={`flex items-center justify-center gap-3 py-2 px-3 rounded-lg text-2xl ${
                isWin ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
              }`}
            >
              <span>{spin[0].icon}</span>
              <span className="text-muted-foreground text-sm">|</span>
              <span>{spin[1].icon}</span>
              <span className="text-muted-foreground text-sm">|</span>
              <span>{spin[2].icon}</span>
              {isWin && <span className="text-sm">🎉</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryList;
