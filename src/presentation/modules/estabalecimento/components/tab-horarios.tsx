import { Input } from "@/presentation/shared/components/ui/input";
import { Switch } from "@/presentation/shared/components/ui/switch";
import { Button } from "@/presentation/shared/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/presentation/shared/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/presentation/shared/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { HorarioModel } from "@/infra/api/model";
import { useCadastrarHorarioMutation } from "../hooks/mutations/cadastrar-horario.mutation";

const DIAS = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

type TabHorariosProps = {
  horarios: HorarioModel[];
}

export function TabHorarios({ horarios }: TabHorariosProps) {

  const { horariosState, adicionarHorario, removerHorario, atualizarHorario, handleCadastrarHorario } = useCadastrarHorarioMutation({ horarios });

  const atualizarCampo = (index: number, campo: keyof HorarioModel, valor: string | number | boolean) => {
    const h = horariosState[index];
    if (!h) return;
    atualizarHorario(index, { ...h, [campo]: valor });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Configure os horários de funcionamento para cada dia.</p>
        <Button type="button" variant="outline" size="sm" onClick={adicionarHorario}>
          <Plus className="mr-1.5 h-4 w-4" /> Adicionar
        </Button>
      </div>

      {horariosState.length === 0 ? (
        <p className="text-sm text-muted-foreground rounded-lg border border-dashed p-6 text-center">
          Nenhum horário cadastrado. Clique em Adicionar para incluir.
        </p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dia</TableHead>
                  <TableHead>Abre</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Fechado</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {horariosState.map((horario, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Select
                        value={DIAS[horario.diaSemana] ?? ""}
                        onValueChange={(v) => atualizarCampo(index, "diaSemana", DIAS.indexOf(v))}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Dia" />
                        </SelectTrigger>
                        <SelectContent>
                          {DIAS.map((d) => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="w-[130px]"
                        value={horario.abre}
                        onChange={(e) => atualizarCampo(index, "abre", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        className="w-[130px]"
                        value={horario.fecha}
                        onChange={(e) => atualizarCampo(index, "fecha", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={!!horario.isClosed}
                        onCheckedChange={(checked) => atualizarCampo(index, "isClosed", !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removerHorario(index)}
                        aria-label="Remover horário"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {horariosState.map((horario, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-3 bg-card">
                <div className="flex items-center justify-between">
                  <Select
                    value={DIAS[horario.diaSemana] ?? ""}
                    onValueChange={(v) => atualizarCampo(index, "diaSemana", DIAS.indexOf(v))}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Dia" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIAS.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removerHorario(index)}
                    aria-label="Remover horário"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={horario.abre}
                    onChange={(e) => atualizarCampo(index, "abre", e.target.value)}
                  />
                  <span className="text-muted-foreground">até</span>
                  <Input
                    type="time"
                    value={horario.fecha}
                    onChange={(e) => atualizarCampo(index, "fecha", e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={!!horario.isClosed}
                    onCheckedChange={(checked) => atualizarCampo(index, "isClosed", !!checked)}
                  />
                  <span className="text-sm text-muted-foreground">Fechado</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <Button onClick={handleCadastrarHorario}>Cadastrar</Button>
    </div>
  );
}
