import { AddServicoDto } from "@/infra/api/model";
import { Button } from "@/presentation/shared/components/ui/button";
import { Input } from "@/presentation/shared/components/ui/input";
import { Label } from "@/presentation/shared/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/shared/components/ui/table";
import { Textarea } from "@/presentation/shared/components/ui/textarea";
import { Package, Plus, Save, Trash2 } from "lucide-react";
import { useCadastrarServicoMutation } from "../hooks/mutations/cadastrar-servico.mutation";

type TabServicosProps = {
  servicosInitialState: AddServicoDto[];
};

export function TabServicos({
  servicosInitialState,
}: TabServicosProps) {
  const { handleAddServico, handleRemoveServico, forms, servicoState, handleSubmitServico } = useCadastrarServicoMutation({ servicos: servicosInitialState });
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Configure os serviços oferecidos pelo estabelecimento.
        </p>
        <Button type="button" size="sm" onClick={handleSubmitServico}>
          <Save className="mr-1.5 h-4 w-4" /> Salvar serviços
        </Button>
      </div>
      {/* Formulário para adicionar novo serviço */}
      <div className="rounded-xl border bg-card p-4 md:p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">
          Adicionar novo serviço
        </h3>
        <form onSubmit={handleAddServico} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div className="space-y-2">
              <Label htmlFor="servico-titulo">Título</Label>
              <Input
                id="servico-titulo"
                placeholder="Ex: Corte de cabelo"
                {...forms.register("titulo")}
              />
              {forms.formState.errors.titulo && (
                <p className="text-destructive text-xs">
                  {forms.formState.errors.titulo.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="servico-valor">Valor</Label>
              <Input
                id="servico-valor"
                placeholder="Ex: R$ 50,00"
                {...forms.register("valor")}
              />
              {forms.formState.errors.valor && (
                <p className="text-destructive text-xs">
                  {forms.formState.errors.valor.message}
                </p>
              )}
            </div>
            <Button type="submit" variant="outline" size="sm" className="md:self-end">
              <Plus className="mr-1.5 h-4 w-4" /> Adicionar
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="servico-descricao">Descrição</Label>
            <Textarea
              id="servico-descricao"
              placeholder="Descreva o serviço (opcional)"
              rows={2}
              className="resize-none"
              {...forms.register("descricao")}
            />
            {forms.formState.errors.descricao && (
              <p className="text-destructive text-xs">
                {forms.formState.errors.descricao.message}
              </p>
            )}
          </div>
        </form>
      </div>

      {servicoState.length === 0 ? (
        <div className="rounded-xl border border-dashed border-muted-foreground/25 bg-muted/20 p-8 text-center">
          <Package className="mx-auto mb-2 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm font-medium text-muted-foreground">
            Nenhum serviço na lista
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Preencha o formulário acima e clique em Adicionar.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop: tabela */}
          <div className="hidden md:block overflow-hidden rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="min-w-[160px]">Título</TableHead>
                  <TableHead className="min-w-[200px]">Descrição</TableHead>
                  <TableHead className="w-[120px]">Valor</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {servicoState.map((s, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {s.titulo ?? "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                      {s.descricao ?? "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {s.valor ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveServico(index)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile: cards */}
          <div className="md:hidden space-y-3">
            {servicoState.map((s, index) => (
              <div
                key={index}
                className="rounded-xl border bg-card p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-medium text-foreground">
                      {s.titulo ?? "—"}
                    </p>
                    {s.descricao && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {s.descricao}
                      </p>
                    )}
                    {s.valor && (
                      <p className="text-sm font-medium text-primary">
                        {s.valor}
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveServico(index)}
                    className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
