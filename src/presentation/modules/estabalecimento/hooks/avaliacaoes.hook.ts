import { AvaliacaoModel } from "@/infra/api/model";
import { makeAddAvaliacaoFactory } from "@/main/factories/estabelecimento/add-avaliacao.factory";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useCadastrarAvalicaoForm } from "../forms/cadastrarAvalicao.form";

export function useAvaliacoes({
  initialAvaliacoes,
}: {
  initialAvaliacoes: AvaliacaoModel[];
}) {
  const { id: estabelecimentoId } = useParams();
  const form = useCadastrarAvalicaoForm();
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoModel[]>(
    initialAvaliacoes ?? []
  );

  const addAvaliacaoUsecase = useMemo(() => makeAddAvaliacaoFactory(), []);

  const addAvaliacao = form.handleSubmit(async (data) => {
    const id = estabelecimentoId as string;
    await addAvaliacaoUsecase.execute(id, data);
    const now = new Date().toISOString();
    setAvaliacoes((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map((a) => a.id), 0) + 1 : 1;
      const newItem: AvaliacaoModel = {
        id: nextId,
        estabelecimentoId: Number(id),
        userId: 0,
        rating: data.rating,
        comentario: data.comentario ?? null,
        approved: null,
        createdAt: now,
        updatedAt: null,
        deletedAt: null,
      };
      return [...prev, newItem];
    });
    form.reset({ rating: 1, comentario: "" });
  });

  return { avaliacoes, form, addAvaliacao };
}