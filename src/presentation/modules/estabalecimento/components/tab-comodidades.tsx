"use client";

import { ComodidadeModel } from "@/infra/api/model";
import { Badge } from "@/presentation/shared/components/ui/badge";
import { Button } from "@/presentation/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/shared/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/presentation/shared/components/ui/collapsible";
import { Skeleton } from "@/presentation/shared/components/ui/skeleton";
import * as LucideIcons from "lucide-react";
import { Check, ChevronDown, Plus, Sparkles, X } from "lucide-react";
import { useCadastrarComodidadeMutation } from "../hooks/mutations/cadastrar-comodidade.mutation";

function getLucideIcon(
  iconName: string | null
): React.ComponentType<{ className?: string; size?: number }> {
  const DefaultIcon = Sparkles;

  if (!iconName) return DefaultIcon;

  const Icon = (LucideIcons as Record<string, unknown>)[iconName];

  return Icon
    ? (Icon as React.ComponentType<{ className?: string; size?: number }>)
    : DefaultIcon;
}

type TabComodidadesProps = {
  comodidades: ComodidadeModel[];
  comodidadeInitialState: ComodidadeModel[];
};

export function TabComodidades({
  comodidadeInitialState,
  comodidades
}: TabComodidadesProps) {

  const { comodidadeState, handleAdicionarComodidade, handleRemoverComodidade, cadastrarComodidades, loading, error } = useCadastrarComodidadeMutation({ comodidades: comodidadeInitialState });

  const isSelected = (c: ComodidadeModel) => comodidadeState.some((s) => s.id === c.id);

  const porCategoria = comodidades.reduce<Record<string, ComodidadeModel[]>>((acc, c) => {
    const cat = (c.categoria ?? "").trim() || "Outros";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(c);
    return acc;
  }, {});
  const categorias = Object.keys(porCategoria).sort((a, b) => a.localeCompare(b, "pt-BR"));

  if (loading) {
    return (
      <div className="space-y-6">
        <section className="space-y-3">
          <div>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-9 rounded-md" />
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Erro ao carregar comodidades</CardTitle>
          <CardDescription>{error.message}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (comodidades.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Sparkles className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-sm font-medium text-muted-foreground">Nenhuma comodidade disponível</p>
          <p className="text-xs text-muted-foreground mt-1">Não há comodidades cadastradas no momento.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <div>
          <h3 className="text-sm font-medium">Comodidades disponíveis</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Clique para adicionar ou remover as comodidades do estabelecimento. As selecionadas serão salvas ao concluir o cadastro.
          </p>
        </div>

        {comodidadeState.length > 0 && (
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Selecionadas ({comodidadeState.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {comodidadeState.map((c) => {
                const IconC = getLucideIcon(c.icon);
                return (
                  <Badge
                    key={c.id}
                    variant="secondary"
                    className="pl-2 pr-1 py-1.5 gap-1.5 font-normal items-center"
                  >
                    {IconC ? <IconC className="h-3.5 w-3.5 shrink-0" /> : <Sparkles className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                    {c.nome}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full hover:bg-destructive/20 hover:text-destructive"
                      onClick={() => handleRemoverComodidade(c)}
                      aria-label={`Remover ${c.nome}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
        <div className="space-y-2">
          {categorias.map((categoria, index) => {
            const itens = porCategoria[categoria];
            return (
              <Collapsible
                key={categoria}
                defaultOpen={index === 0}
                className="rounded-lg border bg-muted/20"
              >
                <CollapsibleTrigger className="group/trigger flex w-full items-center justify-between gap-2 px-4 py-3 text-left hover:bg-muted/40 transition-colors rounded-lg">
                  <span className="text-sm font-medium">{categoria}</span>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    {itens.length} item(ns)
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=open]/trigger:rotate-180" />
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-4 pt-0">
                    {itens.map((comodidade) => {
                      const selected = isSelected(comodidade);
                      const IconC = getLucideIcon(comodidade.icon);
                      return (
                        <Button
                          key={comodidade.id}
                          type="button"
                          variant={selected ? "default" : "outline"}
                          size="sm"
                          className="h-auto py-3 px-4 justify-start gap-3 font-normal text-left"
                          onClick={() => (selected ? handleRemoverComodidade(comodidade) : handleAdicionarComodidade(comodidade))}
                          aria-pressed={selected}
                          aria-label={selected ? `Remover ${comodidade.nome}` : `Adicionar ${comodidade.nome}`}
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-background/20">
                            {IconC ? <IconC className="h-5 w-5" /> : <Sparkles className="h-5 w-5 text-muted-foreground" />}
                          </span>
                          <span className="truncate flex-1 min-w-0">{comodidade.nome}</span>
                          {selected ? <Check className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0 opacity-70" />}
                        </Button>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
        <Button type="button" variant="default" className="w-full" onClick={cadastrarComodidades}>
          <LucideIcons.Save className="mr-1.5 h-4 w-4" /> Salvar
        </Button>
      </section>
    </div>
  );
}
