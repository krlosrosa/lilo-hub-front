import { makeCadastrarEnderecoFactory } from "@/main/factories/estabelecimento/cadastrar-endereco.factory";
import { useState } from "react";
import { useCadastroEnderecoForm } from "../../forms/cadastro-endereco.form";
import { useParams, useRouter } from "next/navigation";
import { EnderecoModel } from "@/infra/api/model"; import { makeBuscarEnderecoPorCepFactory } from "@/main/factories/buscar-endereco-por-cep.factory";

type props = {
  endereco?: EnderecoModel | null;
}

const cadastrarEnderecoUseCase = makeCadastrarEnderecoFactory();
const buscarEnderecoPorCepUseCase = makeBuscarEnderecoPorCepFactory();

export function useCadastrarEnderecoMutation({ endereco }: props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [enderecoState, setEnderecoState] = useState<EnderecoModel | null>(endereco ?? null);
  const { id: estabelecimentoId } = useParams();
  const form = useCadastroEnderecoForm({ endereco });
  const router = useRouter();

  const handleCadastrarEndereco = form.handleSubmit(async (data) => {
    setLoading(true);
    try {
      await cadastrarEnderecoUseCase.execute(estabelecimentoId as string, data);
      form.reset();
      router.push(`/estabelecimento/${estabelecimentoId as string}/admin`);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  });

  const buscarEnderecoPorEstabelecimento = async () => {
    const endereco = await buscarEnderecoPorCepUseCase.execute(form.watch('cep'));
    form.setValue('rua', endereco.address);
    form.setValue('bairro', endereco.district);
    form.setValue('cidade', endereco.city);
    form.setValue('estado', endereco.state);
    form.setValue('cep', endereco.cep);
    form.setValue('latitude', endereco.lat.toString());
    form.setValue('longitude', endereco.lng.toString());
    form.setValue('numero', '');
    form.setValue('complemento', '');
  };

  return { form, handleCadastrarEndereco, loading, error, enderecoState, setEnderecoState, buscarEnderecoPorEstabelecimento };
}