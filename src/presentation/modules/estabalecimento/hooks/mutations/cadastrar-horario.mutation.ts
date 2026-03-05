import { HorarioModel } from "@/infra/api/model";
import { makeCadastroHorarioFactory } from "@/main/factories/estabelecimento/cadastro-horario.factory";
import { useParams } from "next/navigation";
import { useState } from "react";

type props = {
  horarios?: HorarioModel[];
}

const cadastrarHorarioUseCase = makeCadastroHorarioFactory();

export function useCadastrarHorarioMutation({ horarios }: props) {
  const { id: estabelecimentoId } = useParams();
  const [horariosState, setHorariosState] = useState<HorarioModel[]>(horarios ?? []);

  // CRUD HORARIOS
  function adicionarHorario() {
    setHorariosState([...horariosState, { id: 0, estabelecimentoId: Number(estabelecimentoId), diaSemana: 0, abre: '00:00', fecha: '00:00', isClosed: false }]);
  }
  function removerHorario(index: number) {
    setHorariosState(horariosState.filter((_, i) => i !== index));
  }
  function atualizarHorario(index: number, horario: HorarioModel) {
    if(horario.abre === ''){
      horario.abre = '00:00';
    }
    if(horario.fecha === ''){
      horario.fecha = '00:00';
    }
    setHorariosState(horariosState.map((h, i) => i === index ? { ...h, ...horario } : h));
  }

  async function handleCadastrarHorario() {
    await cadastrarHorarioUseCase.execute(estabelecimentoId as string, horariosState);
  }

  return {
    horariosState,
    setHorariosState,
    adicionarHorario,
    removerHorario,
    atualizarHorario,
    handleCadastrarHorario,
  }
}