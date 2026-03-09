"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/shared/components/ui/card";
import { TrendingUp, TrendingDown, Eye, Phone, Ticket, Gamepad2, Calendar } from "lucide-react";
import {
  MOCK_METRICAS_DASHBOARD,
  MOCK_GRAFICO_SEMANAL,
} from "../data/mock";
import { cn } from "@/presentation/shared/lib/utils";

const ICONES: Record<string, React.ElementType> = {
  "Visualizações do perfil": Eye,
  "Cliques para contato": Phone,
  "Cupons utilizados": Ticket,
  "Giros no caça-níquel": Gamepad2,
  "Agendamentos recebidos": Calendar,
};

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Visão geral</h2>
        <p className="text-sm text-muted-foreground">
          Resumo do desempenho na plataforma (dados simulados).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {MOCK_METRICAS_DASHBOARD.map((m, i) => {
          const Icon = ICONES[m.label] ?? Eye;
          const subiu = (m.variacaoSemanal ?? 0) >= 0;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        {m.label}
                      </p>
                      <p className="text-2xl font-bold">{m.valor.toLocaleString("pt-BR")}</p>
                      {m.variacaoSemanal != null && (
                        <span
                          className={cn(
                            "inline-flex items-center gap-0.5 text-xs",
                            subiu ? "text-emerald-600" : "text-rose-600"
                          )}
                        >
                          {subiu ? (
                            <TrendingUp className="size-3" />
                          ) : (
                            <TrendingDown className="size-3" />
                          )}
                          {subiu ? "+" : ""}
                          {m.variacaoSemanal}% vs semana anterior
                        </span>
                      )}
                    </div>
                    <div className="rounded-lg bg-muted p-2">
                      <Icon className="size-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Atividade semanal (simulado)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_GRAFICO_SEMANAL}>
                  <XAxis dataKey="nome" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(v: number) => [v.toLocaleString("pt-BR"), "Visualizações"]}
                    contentStyle={{ borderRadius: "8px" }}
                  />
                  <Bar dataKey="valor" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
