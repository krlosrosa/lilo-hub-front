import { CadastrarEnderecoDto, EnderecoModel } from "@/infra/api/model";
import { CadastrarEnderecoBody } from "@/infra/api/schema/estabelecimentos/estabelecimentos.zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";


type props = {
  endereco?: EnderecoModel | null;
}

export function useCadastroEnderecoForm({ endereco }: props) {
  return useForm<CadastrarEnderecoDto>({
    resolver: zodResolver(CadastrarEnderecoBody),
    defaultValues: {
      bairro: endereco?.bairro ?? '',
      cidade: endereco?.cidade ?? '',
      estado: endereco?.estado ?? '',
      cep: endereco?.cep ?? '',
      numero: endereco?.numero ?? '',
      complemento: endereco?.complemento ?? '',
      latitude: endereco?.latitude ?? '',
      longitude: endereco?.longitude ?? '',
      rua: endereco?.rua ?? '',
    },
  });
}