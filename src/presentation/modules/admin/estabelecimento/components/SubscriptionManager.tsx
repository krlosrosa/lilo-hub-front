"use client";

import { motion } from "framer-motion";
import { Button } from "@/presentation/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/shared/components/ui/card";
import { Badge } from "@/presentation/shared/components/ui/badge";
import { Check, CreditCard, Settings } from "lucide-react";
import { MOCK_PLANO } from "../data/mock";

export function SubscriptionManager() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Assinatura / Plano</h2>
        <p className="text-sm text-muted-foreground">
          Informações do seu plano atual (dados mockados).
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              Plano Atual
              <Badge variant="secondary">{MOCK_PLANO.nome}</Badge>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="size-4 mr-1" /> Gerenciar plano
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Valor mensal: </span>
                <span className="font-semibold">
                  R$ {MOCK_PLANO.valorMensal.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Próxima renovação: </span>
                <span className="font-medium">{MOCK_PLANO.dataRenovacao}</span>
              </div>
            </div>
            <ul className="space-y-2">
              <p className="text-sm font-medium">Benefícios:</p>
              {MOCK_PLANO.beneficios.map((b, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-4 text-primary shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button>
                <CreditCard className="size-4 mr-2" />
                Fazer upgrade
              </Button>
              <Button variant="outline">Ver planos</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
