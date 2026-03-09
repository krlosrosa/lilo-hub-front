"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/presentation/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/shared/components/ui/card";
import { Badge } from "@/presentation/shared/components/ui/badge";
import { MOCK_AGENDAMENTOS } from "../data/mock";
import type { AgendamentoMock } from "../types";
import { CalendarCheck, Check, X, CalendarClock, User } from "lucide-react";

const statusConfig: Record<
  AgendamentoMock["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  pendente: { label: "Pendente", variant: "secondary" },
  confirmado: { label: "Confirmado", variant: "default" },
  cancelado: { label: "Cancelado", variant: "destructive" },
};

export function BookingManager() {
  const [agendamentos, setAgendamentos] = useState<AgendamentoMock[]>(MOCK_AGENDAMENTOS);

  const confirmar = (id: string) => {
    setAgendamentos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "confirmado" as const } : a))
    );
  };

  const cancelar = (id: string) => {
    setAgendamentos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelado" as const } : a))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Agendamentos</h2>
        <p className="text-sm text-muted-foreground">
          Visualize e gerencie os agendamentos recebidos (dados mockados). Ações simuladas.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {agendamentos.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarCheck className="size-12 text-muted-foreground mb-4" />
              <p className="font-medium">Nenhum agendamento ainda.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Permita que clientes agendem diretamente pelo guia.
              </p>
              <Button className="mt-4">Ativar agendamento</Button>
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {agendamentos.map((ag, i) => {
              const config = statusConfig[ag.status];
              return (
                <motion.li
                  key={ag.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-3">
                          <div className="rounded-lg bg-muted p-2 shrink-0">
                            <User className="size-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{ag.cliente}</p>
                            <p className="text-sm text-muted-foreground">{ag.servico}</p>
                            <p className="text-sm flex items-center gap-1 mt-1">
                              <CalendarClock className="size-3.5" />
                              {ag.data} — {ag.hora}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={config.variant}>{config.label}</Badge>
                          {ag.status === "pendente" && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => confirmar(ag.id)}>
                                <Check className="size-4 mr-1" /> Confirmar
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-destructive"
                                onClick={() => cancelar(ag.id)}
                              >
                                <X className="size-4 mr-1" /> Cancelar
                              </Button>
                            </>
                          )}
                          {ag.status === "confirmado" && (
                            <Button size="sm" variant="outline">Remarcar</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
