import { AddServicoDto } from "@/infra/api/model";
import { AddServicoEstabelecimentoBodyItem } from "@/infra/api/schema/estabelecimentos/estabelecimentos.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useCadastrarServicoForm() {
  return useForm<AddServicoDto>({
    resolver: zodResolver(AddServicoEstabelecimentoBodyItem),
    defaultValues: {
      titulo: '',
      descricao: '',
      valor: '',
    },
  });
}