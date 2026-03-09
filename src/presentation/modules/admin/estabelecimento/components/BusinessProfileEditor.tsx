"use client";

import { motion } from "framer-motion";
import { Button } from "@/presentation/shared/components/ui/button";
import { Input } from "@/presentation/shared/components/ui/input";
import { Label } from "@/presentation/shared/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/shared/components/ui/select";
import { Textarea } from "@/presentation/shared/components/ui/textarea";
import { useEstabelecimentoAdminStore } from "../store/estabelecimento-admin.store";
import { MOCK_CATEGORIAS_ESTABELECIMENTO } from "../data/mock";
import { MOCK_HORARIOS } from "../data/mock";

export function BusinessProfileEditor() {
  const { perfil, setPerfil } = useEstabelecimentoAdminStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Dados do estabelecimento</h2>
        <p className="text-sm text-muted-foreground">
          Edite as informações exibidas no guia (dados mockados, salvos apenas na sessão).
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Informações básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input
                value={perfil.nome}
                onChange={(e) => setPerfil({ nome: e.target.value })}
                placeholder="Nome do estabelecimento"
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea
                value={perfil.descricao}
                onChange={(e) => setPerfil({ descricao: e.target.value })}
                placeholder="Descreva seu negócio"
                rows={3}
              />
            </div>
            <div>
              <Label>Categoria</Label>
              <Select
                value={perfil.categoriaId}
                onValueChange={(v) => {
                  const cat = MOCK_CATEGORIAS_ESTABELECIMENTO.find((c) => c.id === v);
                  setPerfil({ categoriaId: v, categoria: cat?.nome ?? "" });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CATEGORIAS_ESTABELECIMENTO.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Telefone</Label>
              <Input
                value={perfil.telefone}
                onChange={(e) => setPerfil({ telefone: e.target.value })}
                placeholder="(11) 98765-4321"
              />
            </div>
            <div>
              <Label>Endereço</Label>
              <Input
                value={perfil.endereco}
                onChange={(e) => setPerfil({ endereco: e.target.value })}
                placeholder="Rua, número - Bairro"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Horário de funcionamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Simulado: exibindo horários padrão. Em produção, cada dia seria editável.
            </p>
            <ul className="space-y-2">
              {MOCK_HORARIOS.map((h) => (
                <li
                  key={h.dia}
                  className="flex justify-between text-sm py-1 border-b border-border/50 last:border-0"
                >
                  <span>{h.dia}</span>
                  <span className="text-muted-foreground">
                    {h.abre === "Fechado" ? "Fechado" : `${h.abre} - ${h.fecha}`}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Logo e fotos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Em produção, aqui haveria upload de logo e galeria. Por ora os dados são mockados.
            </p>
          </CardContent>
        </Card>

        <Button>Salvar alterações (simulado)</Button>
      </motion.div>
    </div>
  );
}
