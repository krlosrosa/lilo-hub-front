import { BlockTile } from "./block-tile";
import { Block } from "./block-tile";

interface GameBoardProps {
  blocks: Block[];
  onReveal: (id: number) => void;
  disabled: boolean;
}

export function CampoMinadoGameBoard({ blocks, onReveal, disabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-5 gap-2 w-full max-w-sm mx-auto">
      {blocks.map((block) => (
        <BlockTile
          key={block.id}
          block={block}
          onClick={onReveal}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
