import { RedeSocialModel } from "@/infra/api/model";
import { makeCadastrarRedesSociaisFactory } from "@/main/factories/estabelecimento/cadastrar-redes-sociais.factory";
import { useParams } from "next/navigation";
import { useState } from "react";

const cadastrarRedesSociaisUseCase = makeCadastrarRedesSociaisFactory();

type props = {
  links: RedeSocialModel[];
}

export function useCadastrarLinksMutation({ links }: props) {
  const { id: estabelecimentoId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [linksState, setLinksState] = useState<RedeSocialModel[]>(links);

  const cadastrarRedesSociais = async () => {
    if (!estabelecimentoId) return;
    setLoading(true);
    setError(null);
    try {
      await cadastrarRedesSociaisUseCase.execute(estabelecimentoId as string, linksState);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddLink = (link: RedeSocialModel) => {
    setLinksState((prev) => [...prev, link]);
  }

  const handleRemoveLink = (link: RedeSocialModel) => {
    setLinksState((prev) => prev.filter((l) => l.id !== link.id));
  }

  const handleUpdateLink = (index: number, link: RedeSocialModel) => {
    setLinksState((prev) => {
      const next = [...prev];
      if (index >= 0 && index < next.length) next[index] = link;
      return next;
    });
  }

  return { cadastrarRedesSociais, loading, error, linksState, setLinksState, handleAddLink, handleRemoveLink, handleUpdateLink };
}