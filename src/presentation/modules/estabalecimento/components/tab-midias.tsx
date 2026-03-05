"use client";

import { useRef } from "react";
import { Button } from "@/presentation/shared/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/presentation/shared/components/ui/collapsible";
import { imageUrl } from "@/presentation/shared/lib/image-url";
import { Plus, Trash2, Upload, ImageIcon, ChevronDown } from "lucide-react";
import { useCadastrarMidiasMutation } from "../hooks/mutations/cadastrar-midias.mutation";
import Image from "next/image";

type TabMidiaProps = {
  midiasBanco?: string[];
};

export function TabMidia({ midiasBanco = [] }: TabMidiaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    midias,
    midiasBancoState,
    imagensToDelete,
    handleAdd,
    handleRemove,
    handleDelete,
    handleUpload,
  } = useCadastrarMidiasMutation({ midiasBanco });

  const previewUrls = midias?.map(f => URL.createObjectURL(f)) ?? [];

  return (
    <div className="space-y-6">
      {/* Novas fotos */}
      <section className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-medium">Novas fotos</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Adicione as fotos e clique em Enviar para salvar no estabelecimento.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleAdd}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              <Plus className="mr-1.5 h-4 w-4" /> Adicionar
            </Button>
            <Button type="button" size="sm" onClick={handleUpload}>
              <Upload className="mr-1.5 h-4 w-4" /> Salvar
            </Button>
          </div>
        </div>

        {(!midias || midias.length === 0) ? (
          <div
            className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 py-12 text-center cursor-pointer hover:bg-muted/30 transition-colors"
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Nenhuma foto selecionada</p>
            <p className="text-xs text-muted-foreground mt-1">Clique aqui ou use o botão para adicionar</p>
          </div>
        ) : (
          <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {midias.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="group relative rounded-lg border overflow-hidden bg-muted/30 aspect-square"
              >
                {previewUrls[index] ? (
                  <Image
                    src={previewUrls[index]}
                    alt={file.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover"
                    quality={95}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleRemove(index)}
                    aria-label="Remover foto"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs px-2 py-1 truncate">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Fotos já enviadas */}
      {midiasBancoState.length > 0 && (
        <Collapsible defaultOpen className="rounded-lg border bg-muted/30">
          <CollapsibleTrigger className="group/trigger flex w-full items-center justify-between gap-2 px-4 py-3 text-left hover:bg-muted/50 transition-colors rounded-t-lg">
            <span className="text-sm font-medium">Fotos já enviadas</span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              {midiasBancoState.length} foto(s)
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=open]/trigger:rotate-180" />
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-4 pt-0">
              {midiasBancoState.map((midia) => {
                const marcadaExclusao = imagensToDelete.includes(midia);
                return (
                  <li key={midia} className="group relative rounded-lg border overflow-hidden bg-background aspect-square">
                    <Image
                      src={imageUrl(midia)}
                      alt={midia}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      className={`object-cover transition-opacity ${marcadaExclusao ? "opacity-50" : ""}`}
                      quality={95}
                    />
                    {marcadaExclusao ? (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-destructive/20 border-2 border-destructive rounded-lg">
                        <span className="text-xs font-medium text-destructive px-2 py-1 bg-background/90 rounded">
                          Marcada para exclusão
                        </span>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="mt-2 text-xs"
                          onClick={() => handleDelete(midia)}
                        >
                          Desfazer
                        </Button>
                      </div>
                    ) : (
                      <div className="absolute top-1 right-1 z-10">
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 shadow-md bg-background/90 hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleDelete(midia)}
                          aria-label="Marcar para exclusão"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}