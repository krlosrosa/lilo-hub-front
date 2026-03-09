"use client";

import { Button } from "@/presentation/shared/components/ui/button";
import { Card, CardContent } from "@/presentation/shared/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icone: LucideIcon;
  titulo: string;
  descricao: string;
  acaoLabel: string;
  onAcao?: () => void;
}

export function EmptyState({
  icone: Icon,
  titulo,
  descricao,
  acaoLabel,
  onAcao,
}: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Icon className="size-12 text-muted-foreground mb-4" />
        <p className="font-medium">{titulo}</p>
        <p className="text-sm text-muted-foreground mt-1">{descricao}</p>
        {onAcao && (
          <Button className="mt-4" onClick={onAcao}>
            {acaoLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
