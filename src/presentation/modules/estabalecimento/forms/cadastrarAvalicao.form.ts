import { AddAvaliacaoDto } from "@/infra/api/model";
import { AddAvaliacaoBody } from "@/infra/api/schema/estabelecimentos/estabelecimentos.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useCadastrarAvalicaoForm() {
  const form = useForm<AddAvaliacaoDto>({
    resolver: zodResolver(AddAvaliacaoBody),
    defaultValues: {
      rating: 1,
      comentario: "",
    },
  });
  return form;
}