import { Input } from "@/presentation/shared/components/ui/input";
import { Button } from "@/presentation/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/shared/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/shared/components/ui/table";
import { Plus, Trash2, Link2 } from "lucide-react";
import { RedeSocialModel } from "@/infra/api/model";
import { useCadastrarLinksMutation } from "../hooks/mutations/cadastrar-links.mutation";

const TIPOS = ["Instagram", "Facebook", "Site", "WhatsApp", "Outro"] as const;

type TabLinksProps = {
  links: RedeSocialModel[];
};

export function TabLinks({
  links,
}: TabLinksProps) {

  const { handleAddLink, handleRemoveLink, cadastrarRedesSociais, linksState, handleUpdateLink } = useCadastrarLinksMutation({ links });

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Links externos e redes sociais do estabelecimento.
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              handleAddLink({
              id: 0,
              tipo: "Instagram",
              url: "",
              label: null,
            })
          }
          >
            <Plus className="mr-1.5 h-4 w-4" /> Adicionar
          </Button>
          <Button type="button" size="sm" onClick={cadastrarRedesSociais}>
            Salvar links
          </Button>
        </div>
      </div>

      {links.length === 0 ? (
        <div className="rounded-xl border border-dashed border-muted-foreground/25 bg-muted/20 p-8 text-center">
          <Link2 className="mx-auto mb-2 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm font-medium text-muted-foreground">
            Nenhum link cadastrado
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Clique em Adicionar para incluir redes sociais ou links.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() =>
              handleAddLink({
                id: 0,
                tipo: "Instagram",
                url: "",
                label: null,
              })
            }
          >
            <Plus className="mr-1.5 h-4 w-4" /> Adicionar link
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden md:block overflow-hidden rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[140px]">Tipo</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="min-w-[120px]">Label</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {linksState.map((rede, index) => (
                  <TableRow key={rede.id ? `id-${rede.id}` : `new-${index}`}>
                    <TableCell>
                      <Select
                        value={rede.tipo}
                        onValueChange={(v) =>
                          handleUpdateLink(index, {
                            ...rede,
                            tipo: v,
                          })
                        }
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TIPOS.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="https://..."
                        value={rede.url}
                        onChange={(e) =>
                          handleUpdateLink(index, {
                            ...rede,
                            url: e.target.value,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Texto do link"
                        value={rede.label ?? ""}
                        onChange={(e) =>
                          handleUpdateLink(index, {
                            ...rede,
                            label: e.target.value || null,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveLink(rede)}
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

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {linksState.map((rede, index) => (
              <div
                key={rede.id ? `id-${rede.id}` : `new-${index}`}
                className="rounded-xl border bg-card p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <Select
                    value={rede.tipo}
                    onValueChange={(v) =>
                      handleUpdateLink(index, { ...rede, tipo: v })
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPOS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveLink(rede)}
                    className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3 space-y-2">
                  <Input
                    placeholder="https://..."
                    value={rede.url}
                    onChange={(e) =>
                      handleUpdateLink(index, {
                        ...rede,
                        url: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Texto do link"
                    value={rede.label ?? ""}
                    onChange={(e) =>
                      handleUpdateLink(index, {
                        ...rede,
                        label: e.target.value || null,
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
