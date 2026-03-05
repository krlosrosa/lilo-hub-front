import { AddServicoDto } from "@/infra/api/model";
import { makeAddServicosEstabelecimentoFactory } from "@/main/factories/estabelecimento/add-servicos-estabelecimento.factory";
import { makeBuscarServicoByEstabelecimentoFactory } from "@/main/factories/estabelecimento/buscar-servico-by-estabelecimento.factory";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCadastrarServicoForm } from "../forms/cadastrar-servico.form";

export function useServico() {
  const { id: estabelecimentoId } = useParams();
  const [servicos, setServicos] = useState<AddServicoDto[]>([]);
  const forms = useCadastrarServicoForm();

  const addServicoUsecase = useMemo(() => makeAddServicosEstabelecimentoFactory(), []);
  const buscarServicosUsecase = useMemo(() => makeBuscarServicoByEstabelecimentoFactory(), []);

  const addServico = useCallback(async (): Promise<void> => {
    await addServicoUsecase.execute(estabelecimentoId as string, servicos);
  }, [addServicoUsecase, estabelecimentoId, servicos]);

  useEffect(() => {
    if (!estabelecimentoId) return;
    let cancelled = false;
    buscarServicosUsecase.execute(estabelecimentoId as string).then((data) => {
      if (!cancelled) setServicos(data);
    });
    return () => { cancelled = true; };
  }, [estabelecimentoId, buscarServicosUsecase]);

  const handleAddServico = forms.handleSubmit((data) => {
    setServicos((prev) => [...prev, data]);
    forms.reset();
  });

  const handleRemoveServico = useCallback((index: number) => {
    setServicos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return { servicos, form: forms, addServico, handleAddServico, handleRemoveServico };
}