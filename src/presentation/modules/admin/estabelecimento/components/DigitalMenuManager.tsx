"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/presentation/shared/components/ui/button";
import { Input } from "@/presentation/shared/components/ui/input";
import { Label } from "@/presentation/shared/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/shared/components/ui/card";
import {
  MOCK_CATEGORIAS_MENU,
  MOCK_ITENS_MENU,
} from "../data/mock";
import type { ItemMenuDigital } from "../types";
import { Plus, Pencil, Trash2, UtensilsCrossed } from "lucide-react";

export function DigitalMenuManager() {
  const [itens, setItens] = useState<ItemMenuDigital[]>(MOCK_ITENS_MENU);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const remover = (id: string) => {
    setItens((prev) => prev.filter((i) => i.id !== id));
  };

  const itensPorCategoria = MOCK_CATEGORIAS_MENU.map((cat) => ({
    ...cat,
    itens: itens.filter((i) => i.categoriaId === cat.id),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Menu digital</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie categorias e itens do cardápio (dados mockados).
          </p>
        </div>
        <Button>
          <Plus className="size-4 mr-2" />
          Adicionar item
        </Button>
      </div>

      {itens.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <UtensilsCrossed className="size-12 text-muted-foreground mb-4" />
            <p className="font-medium">Você ainda não criou seu menu digital.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Crie agora para mostrar seus produtos aos clientes.
            </p>
            <Button className="mt-4">
              <Plus className="size-4 mr-2" />
              Criar menu
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {itensPorCategoria.map(({ id, nome, itens: itensCat }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{nome}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {itensCat.map((item) => (
                        <motion.li
                          key={item.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex items-center justify-between gap-4 py-2 border-b border-border/50 last:border-0"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-medium">{item.nome}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {item.descricao}
                            </p>
                            <p className="text-sm font-medium text-primary mt-0.5">
                              R$ {item.preco.toFixed(2).replace(".", ",")}
                            </p>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                setEditandoId(editandoId === item.id ? null : item.id)
                              }
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => remover(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                    {itensCat.length === 0 && (
                      <li className="text-sm text-muted-foreground py-2">
                        Nenhum item nesta categoria.
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {editandoId && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Editar item (simulado)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nome</Label>
              <Input placeholder="Nome do item" />
            </div>
            <div>
              <Label>Preço</Label>
              <Input type="number" placeholder="0,00" />
            </div>
            <div>
              <Label>Descrição</Label>
              <Input placeholder="Descrição" />
            </div>
            <Button onClick={() => setEditandoId(null)}>Fechar</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
