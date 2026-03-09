"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/presentation/shared/components/ui/button";
import { Input } from "@/presentation/shared/components/ui/input";
import { Label } from "@/presentation/shared/components/ui/label";
import { Progress } from "@/presentation/shared/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/shared/components/ui/select";
import { ChevronRight, ChevronLeft, Building2, Clock, Image, Sparkles } from "lucide-react";
import { useEstabelecimentoAdminStore } from "../store/estabelecimento-admin.store";
import { MOCK_CATEGORIAS_ESTABELECIMENTO } from "../data/mock";
import { MOCK_SERVICOS_PLATAFORMA } from "../data/mock";
import { cn } from "@/presentation/shared/lib/utils";

const TOTAL_ETAPAS = 5;

export function OnboardingFlow() {
  const { setOnboardingConcluido, setPerfil } = useEstabelecimentoAdminStore();
  const [etapa, setEtapa] = useState(1);

  const [dados, setDados] = useState({
    nome: "",
    descricao: "",
    categoriaId: "restaurante",
    telefone: "",
    endereco: "",
    horarioAbre: "09:00",
    horarioFecha: "18:00",
    logoUrl: "",
    servicosIniciais: [] as string[],
  });

  const avancar = () => {
    if (etapa < TOTAL_ETAPAS) setEtapa((e) => e + 1);
    else {
      setPerfil({
        nome: dados.nome || "Meu Estabelecimento",
        descricao: dados.descricao || "",
        categoria: MOCK_CATEGORIAS_ESTABELECIMENTO.find((c) => c.id === dados.categoriaId)?.nome ?? "Restaurante",
        categoriaId: dados.categoriaId,
        telefone: dados.telefone || "",
        endereco: dados.endereco || "",
        logo: dados.logoUrl || null,
      });
      setOnboardingConcluido(true);
    }
  };

  const voltar = () => setEtapa((e) => Math.max(1, e - 1));

  const toggleServico = (id: string) => {
    setDados((d) => ({
      ...d,
      servicosIniciais: d.servicosIniciais.includes(id)
        ? d.servicosIniciais.filter((s) => s !== id)
        : [...d.servicosIniciais, id],
    }));
  };

  const progresso = (etapa / TOTAL_ETAPAS) * 100;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Configure seu estabelecimento</h1>
          <p className="text-sm text-muted-foreground">
            Etapa {etapa} de {TOTAL_ETAPAS}
          </p>
          <Progress value={progresso} className="h-2" />
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              {etapa === 1 && <Building2 className="size-4" />}
              {etapa === 2 && <Sparkles className="size-4" />}
              {etapa === 3 && <Clock className="size-4" />}
              {etapa === 4 && <Image className="size-4" />}
              {etapa === 5 && <Sparkles className="size-4" />}
              {etapa === 1 && "Informações do negócio"}
              {etapa === 2 && "Categoria"}
              {etapa === 3 && "Horário de funcionamento"}
              {etapa === 4 && "Logo ou foto"}
              {etapa === 5 && "Serviços iniciais"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnimatePresence mode="wait">
              {etapa === 1 && (
                <motion.div
                  key="etapa1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <Label>Nome do estabelecimento</Label>
                    <Input
                      placeholder="Ex: Pizzaria do Bairro"
                      value={dados.nome}
                      onChange={(e) => setDados((d) => ({ ...d, nome: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Descrição (opcional)</Label>
                    <Input
                      placeholder="Conte um pouco sobre seu negócio"
                      value={dados.descricao}
                      onChange={(e) => setDados((d) => ({ ...d, descricao: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <Input
                      placeholder="(11) 98765-4321"
                      value={dados.telefone}
                      onChange={(e) => setDados((d) => ({ ...d, telefone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Endereço</Label>
                    <Input
                      placeholder="Rua, número - Bairro"
                      value={dados.endereco}
                      onChange={(e) => setDados((d) => ({ ...d, endereco: e.target.value }))}
                    />
                  </div>
                </motion.div>
              )}

              {etapa === 2 && (
                <motion.div
                  key="etapa2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <Label>Categoria do estabelecimento</Label>
                  <Select
                    value={dados.categoriaId}
                    onValueChange={(v) => setDados((d) => ({ ...d, categoriaId: v }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_CATEGORIAS_ESTABELECIMENTO.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}

              {etapa === 3 && (
                <motion.div
                  key="etapa3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <Label>Abre às</Label>
                    <Input
                      type="time"
                      value={dados.horarioAbre}
                      onChange={(e) => setDados((d) => ({ ...d, horarioAbre: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Fecha às</Label>
                    <Input
                      type="time"
                      value={dados.horarioFecha}
                      onChange={(e) => setDados((d) => ({ ...d, horarioFecha: e.target.value }))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Você poderá ajustar horários por dia depois no painel.
                  </p>
                </motion.div>
              )}

              {etapa === 4 && (
                <motion.div
                  key="etapa4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <Label>URL da logo ou foto (simulado)</Label>
                  <Input
                    placeholder="https://exemplo.com/logo.png"
                    value={dados.logoUrl}
                    onChange={(e) => setDados((d) => ({ ...d, logoUrl: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Em produção, aqui haveria upload de imagem.
                  </p>
                </motion.div>
              )}

              {etapa === 5 && (
                <motion.div
                  key="etapa5"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <Label>Escolha os serviços que deseja usar (simulado)</Label>
                  <div className="flex flex-wrap gap-2">
                    {MOCK_SERVICOS_PLATAFORMA.slice(0, 4).map((s) => (
                      <Button
                        key={s.id}
                        type="button"
                        variant={dados.servicosIniciais.includes(s.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleServico(s.id)}
                      >
                        {s.nome}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={cn("flex gap-2 pt-4", etapa === 1 ? "justify-end" : "justify-between")}>
              {etapa > 1 && (
                <Button variant="outline" onClick={voltar} className="gap-1">
                  <ChevronLeft className="size-4" /> Voltar
                </Button>
              )}
              <Button onClick={avancar} className="ml-auto gap-1">
                {etapa === TOTAL_ETAPAS ? "Entrar no painel" : "Próximo"}
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
