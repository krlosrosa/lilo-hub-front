import { AddServicoDto } from "@/infra/api/model";
import { makeAddServicosEstabelecimentoFactory } from "@/main/factories/estabelecimento/add-servicos-estabelecimento.factory";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useCadastrarServicoForm } from "../../forms/cadastrar-servico.form";

type props = {
  servicos: AddServicoDto[];
}

const cadastrarServicosUseCase = makeAddServicosEstabelecimentoFactory();

export function useCadastrarServicoMutation({ servicos }: props) {
  const { id: estabelecimentoId } = useParams();
  const forms = useCadastrarServicoForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [servicoState, setServicoState] = useState<AddServicoDto[]>(servicos);

  const handleSubmitServico = async (): Promise<void> => {
    await cadastrarServicosUseCase.execute(estabelecimentoId as string, servicoState);
  };

  const handleAddServico = forms.handleSubmit((data) => {
    setServicoState((prev) => [...prev, data]);
    forms.reset();
  });

  const handleRemoveServico = useCallback((index: number) => {
    setServicoState((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const cadastrarServicos = async () => {
    setLoading(true);
    try {
      await cadastrarServicosUseCase.execute(estabelecimentoId as string, servicoState);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  return {
    servicoState,
    setServicoState,
    handleAddServico,
    handleRemoveServico,
    cadastrarServicos,
    loading,
    error,
    forms,
    handleSubmitServico,
  }
}