"use client";

import { motion } from "framer-motion";
import { Button } from "@/presentation/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/shared/components/ui/card";
import { Badge } from "@/presentation/shared/components/ui/badge";
import {
  UtensilsCrossed,
  Gamepad2,
  CalendarCheck,
  Ticket,
  Star,
  Megaphone,
  LucideIcon,
} from "lucide-react";
import { MOCK_SERVICOS_PLATAFORMA } from "../data/mock";
import { cn } from "@/presentation/shared/lib/utils";

const ICONE_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Gamepad2,
  CalendarCheck,
  Ticket,
  Star,
  Megaphone,
};

export function ServicesMarketplace() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Serviços da plataforma</h2>
        <p className="text-sm text-muted-foreground">
          Ative e gerencie os serviços disponíveis para seu estabelecimento (mockado).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {MOCK_SERVICOS_PLATAFORMA.map((s, i) => {
          const Icon = ICONE_MAP[s.icone] ?? Star;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={cn(!s.ativo && "border-dashed")}>
                <CardHeader className="flex flex-row items-start justify-between gap-2">
                  <div className="flex gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{s.nome}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-0.5">{s.descricao}</p>
                    </div>
                  </div>
                  <Badge variant={s.ativo ? "default" : "secondary"}>
                    {s.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  {s.ativo ? (
                    <Button variant="outline" size="sm">
                      Gerenciar
                    </Button>
                  ) : (
                    <Button size="sm">Ativar serviço (upsell)</Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
