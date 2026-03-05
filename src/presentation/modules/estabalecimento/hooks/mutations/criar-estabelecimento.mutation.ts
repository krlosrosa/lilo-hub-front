import { useRouter } from "next/navigation";
import { useEstabelecimentoForm } from "../../forms/estabelecimento.form";
import { useState } from "react";
import { makeCriarEstabelecimentoFactory } from "@/main/factories/estabelecimento/criar-estabelecimento.factory";

type FileImage = {
  logo: File | null;
  cover: File | null;
}

const criarEstabelecimentoUseCase = makeCriarEstabelecimentoFactory();

export function useCriarEstabelecimentoMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const form = useEstabelecimentoForm();
  const router = useRouter();
  const [fileImage, setFileImage] = useState<FileImage>({
    logo: null,
    cover: null,
  });

  const criarEstabelecimento = form.handleSubmit(async (data) => {
    setLoading(true);
    try {
      const estabelecimentoId = await criarEstabelecimentoUseCase.execute(data);
      form.reset();
      router.push(`/estabelecimento/${estabelecimentoId.toString()}/admin`);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  });

  return { form, criarEstabelecimento, fileImage, setFileImage, loading, error };
}