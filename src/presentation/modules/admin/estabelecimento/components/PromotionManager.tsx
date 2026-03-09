"use client";

import { motion } from "framer-motion";
import { Button } from "@/presentation/shared/components/ui/button";
import { Input } from "@/presentation/shared/components/ui/input";
import { Label } from "@/presentation/shared/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/shared/components/ui/card";
import { MOCK_OFERTA_PROMOCAO } from "../data/mock";
import { Gift, Ticket } from "lucide-react";

export function PromotionManager() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Promoção (Caça-Níquel)</h2>
        <p className="text-sm text-muted-foreground">
          Oferta cadastrada para o sistema de promoções gamificadas (mockado).
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Gift className="size-5 text-primary" />
            <CardTitle className="text-base">Oferta atual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Título</p>
              <p className="font-medium">{MOCK_OFERTA_PROMOCAO.titulo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Descrição</p>
              <p className="text-sm">{MOCK_OFERTA_PROMOCAO.descricao}</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Ticket className="size-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>{MOCK_OFERTA_PROMOCAO.cuponsDisponiveis}</strong> cupons disponíveis
                </span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Validade: </span>
                <span className="text-sm font-medium">{MOCK_OFERTA_PROMOCAO.validade}</span>
              </div>
            </div>
            <Button variant="outline">Editar oferta (simulado)</Button>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Nova oferta (simulado)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Título da oferta</Label>
              <Input placeholder="Ex: 20% de desconto em qualquer pizza" />
            </div>
            <div>
              <Label>Descrição</Label>
              <Input placeholder="Condições e como usar o cupom" />
            </div>
            <div>
              <Label>Quantidade de cupons</Label>
              <Input type="number" placeholder="100" />
            </div>
            <div>
              <Label>Validade</Label>
              <Input placeholder="Ex: 30 dias" />
            </div>
            <Button>Cadastrar oferta</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
