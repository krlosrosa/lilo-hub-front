import { CriarEstabelecimentoDto } from "@/infra/api/model";
import { CriarEstabelecimentoBody } from "@/infra/api/schema/estabelecimentos/estabelecimentos.zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";


export function useEstabelecimentoForm() {
  const form = useForm<CriarEstabelecimentoDto>({
    resolver: zodResolver(CriarEstabelecimentoBody),
    defaultValues: {
      nome: '',
    },
  });
  return form;
}