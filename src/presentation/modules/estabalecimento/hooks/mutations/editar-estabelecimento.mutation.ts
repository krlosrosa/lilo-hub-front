import { useParams } from "next/navigation";
import { useState } from "react";
import { useEditarEstabelecimentoForm } from "../../forms/editar-estabelecimento.form";
import { makeEditarEstabelecimentoFactory } from "@/main/factories/estabelecimento/editar-estabelecimento.factory";
import { EstabelecimentoModelOutput } from "@/infra/api/model";

type FileImage = {
  logo: File | null;
  cover: File | null;
}

type props = {
  estabelecimento: EstabelecimentoModelOutput;
}

const editarEstabelecimentoUseCase = makeEditarEstabelecimentoFactory();

export function useEditarEstabelecimentoMutation({ estabelecimento }: props) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const form = useEditarEstabelecimentoForm({ estabelecimento });
  const [fileImage, setFileImage] = useState<FileImage>({
    logo: null,
    cover: null,
  });
  

  const editarEstabelecimento = form.handleSubmit(async (data) => {
    setLoading(true);
    try {
      await editarEstabelecimentoUseCase.execute(id as string, data, fileImage.logo, fileImage.cover);
      setLoading(false);
    } catch (error) {
      setError(error as Error); 
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  });

  return { form, editarEstabelecimento, fileImage, setFileImage, loading, error };
}