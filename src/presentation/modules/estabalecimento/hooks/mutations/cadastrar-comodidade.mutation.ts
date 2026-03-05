import { ComodidadeModel } from "@/infra/api/model";
import { makeCadastrarComodidadesFactory } from "@/main/factories/estabelecimento/cadastrar-comodidades.factory";
import { useParams } from "next/navigation";
import { useState } from "react";

type props = {
  comodidades: ComodidadeModel[];
}

const cadastrarComodidadesUseCase = makeCadastrarComodidadesFactory();

export function useCadastrarComodidadeMutation({ comodidades }: props) {
  const { id: estabelecimentoId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [comodidadeState, setComodidadeState] = useState<ComodidadeModel[]>(comodidades);

  function handleAdicionarComodidade(comodidade: ComodidadeModel) {
    setComodidadeState([...comodidadeState, comodidade]);
  }

  function handleRemoverComodidade(comodidade: ComodidadeModel) {
    setComodidadeState(comodidadeState.filter((c) => c.id !== comodidade.id));
  }

  const cadastrarComodidades = async () => {
    setLoading(true);
    try {
      await cadastrarComodidadesUseCase.execute(estabelecimentoId as string, { comodidadeIds: comodidadeState.map((c) => c.id) });
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  return {
    comodidadeState,
    setComodidadeState,
    handleAdicionarComodidade,
    handleRemoverComodidade,
    cadastrarComodidades,
    loading,
    error,
  }
}