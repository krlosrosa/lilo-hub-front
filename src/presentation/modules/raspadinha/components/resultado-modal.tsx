import type { ScratchResult } from '../types/scratch.type';
import { Dialog, DialogContent, DialogTitle } from '@/presentation/shared/components/ui/dialog';
import { Button } from '@/presentation/shared/components/ui/button';  
import { PartyPopper, Frown } from 'lucide-react';

interface ResultModalProps {
  result: ScratchResult | null;
  open: boolean;
  onClose: () => void;
}

export function ResultModal({ result, open, onClose }: ResultModalProps) {
  if (!result) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm text-center">
        <DialogTitle>Resultado</DialogTitle>
        {result.won ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <PartyPopper className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold">🎉 Parabéns!</h2>
            <p className="text-muted-foreground">Você ganhou:</p>
            <div className="rounded-lg scratch-gradient px-6 py-3">
              <span className="text-lg font-bold text-primary-foreground">{result.prizeName}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Frown className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">😢 Não foi dessa vez</h2>
            <p className="text-muted-foreground">Tente novamente na próxima!</p>
          </div>
        )}
        <Button onClick={onClose} className="mt-2 w-full">Fechar</Button>
      </DialogContent>
    </Dialog>
  );
}
