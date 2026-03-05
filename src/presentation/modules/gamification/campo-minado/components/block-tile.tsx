import { cn } from "@/lib/utils";



// Tipos de bloco
export type BlockType = "bomb" | "points" | "bonus";

export interface Block {
  id: number;
  type: BlockType;
  value: number; // pontos ou tipo de bônus
  revealed: boolean;
  bonusKind?: "multiplier" | "fixed"; // tipo de bônus
}

export interface GameState {
  blocks: Block[];
  roundScore: number;
  totalScore: number;
  multiplier: number;
  gameOver: boolean;
  roundActive: boolean;
  blocksRevealed: number;
  lastRevealedBlock: Block | null;
}

// Jogadores simulados para ranking
export interface RankedPlayer {
  name: string;
  score: number;
  isPlayer: boolean;
}interface BlockProps {
  block: Block;
  onClick: (id: number) => void;
  disabled: boolean;
}

const typeConfig = {
  bomb: { emoji: "💣", bg: "bg-destructive", label: "Bomba!" },
  points: { emoji: "⭐", bg: "bg-primary", label: "Pontos" },
  bonus: { emoji: "🎁", bg: "bg-accent", label: "Bônus" },
};

export function BlockTile({ block, onClick, disabled }: BlockProps) {
  const config = typeConfig[block.type];

  return (
    <button
      onClick={() => onClick(block.id)}
      disabled={disabled || block.revealed}
      className={cn(
        "relative aspect-square w-full rounded-xl text-2xl font-bold transition-all duration-300",
        "transform active:scale-90",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        block.revealed
          ? cn(config.bg, "text-primary-foreground scale-95 shadow-inner")
          : "bg-secondary hover:bg-secondary/80 shadow-lg hover:shadow-xl hover:scale-[1.03] cursor-pointer",
        (disabled && !block.revealed) && "opacity-60 cursor-not-allowed"
      )}
      aria-label={block.revealed ? config.label : "Bloco fechado"}
    >
      {/* Conteúdo oculto */}
      {!block.revealed && (
        <span className="text-3xl select-none">❓</span>
      )}

      {/* Conteúdo revelado */}
      {block.revealed && (
        <div className="flex flex-col items-center justify-center gap-0.5 animate-scale-in">
          <span className="text-2xl">{config.emoji}</span>
          {block.type === "points" && (
            <span className="text-xs font-semibold">+{block.value}</span>
          )}
          {block.type === "bonus" && (
            <span className="text-xs font-semibold">
              {block.bonusKind === "multiplier" ? "2x" : "+20"}
            </span>
          )}
        </div>
      )}
    </button>
  );
}
