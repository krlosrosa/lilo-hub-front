import { makeAddMidiasFactory } from "@/main/factories/estabelecimento/add-midias.factory";
import { makeDeletarImagensFactory } from "@/main/factories/estabelecimento/deletar-imagens.factory";
import { useParams } from "next/navigation";
import { useState } from "react";

type props = {
  midiasBanco: string[];
}

const cadastrarMidiasUseCase = makeAddMidiasFactory();
const deletarMidiasUseCase = makeDeletarImagensFactory();

export function useCadastrarMidiasMutation({ midiasBanco }: props) {
  const { id: estabelecimentoId } = useParams();
  const [midiasBancoState, setMidiasBancoState] = useState<string[]>(midiasBanco);
  const [imagensToDelete, setImagensToDelete] = useState<string[]>([]);
  const [midias, setMidias] = useState<File[] | null>(null);

  const addMidias = async () => {
    if (!midias) return;
    await cadastrarMidiasUseCase.execute(estabelecimentoId as string, midias, midiasBanco.length);
    setMidiasBancoState(midias.map((midia) => midia.name));
    setMidias(null);
  }

  const handleDelete = (midia: string) => {
    setImagensToDelete((prev) =>
      prev.includes(midia) ? prev.filter((m) => m !== midia) : [...prev, midia]
    );
  };

  const handleDeleteAllImagens = async () => {
    await deletarMidiasUseCase.execute(estabelecimentoId as string, imagensToDelete);
    setImagensToDelete([]);
  }

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const newFiles = Array.from(files);
    setMidias([...(midias ?? []), ...newFiles]);
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    const next = (midias ?? []).filter((_, i) => i !== index);
    setMidias(next.length ? next : null);
  };

  const handleUpload = async () => {
    await addMidias();
    await handleDeleteAllImagens();
  };


  return {
    midiasBancoState,
    imagensToDelete,
    midias,
    setMidias,
    setImagensToDelete,
    addMidias,
    handleDelete,
    handleDeleteAllImagens,
    handleAdd,
    handleRemove,
    handleUpload,
  }
}