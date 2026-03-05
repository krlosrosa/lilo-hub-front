import { EditarEstabelecimentoDto, EstabelecimentoModelOutput } from "@/infra/api/model";
import { EditarEstabelecimentoBody } from "@/infra/api/schema/estabelecimentos/estabelecimentos.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type props = {
  estabelecimento: EstabelecimentoModelOutput;
}

export function useEditarEstabelecimentoForm({ estabelecimento }: props) {
  const form = useForm<EditarEstabelecimentoDto>({
    resolver: zodResolver(EditarEstabelecimentoBody),
    defaultValues: {
      coverUrl: estabelecimento.coverUrl ?? '',
      logoUrl: estabelecimento.logoUrl ?? '',
      nome: estabelecimento.nome,
      descricao: estabelecimento.descricao ?? '',
      sobreNos: estabelecimento.sobreNos ?? '',
      telefone: estabelecimento.telefone ?? '',
      priceRange: estabelecimento.priceRange ?? '',
      status: estabelecimento.status ?? '',
      verificado: estabelecimento.verificado,
      destaque: estabelecimento.destaque,
      slug: estabelecimento.slug,
    },
  });
  return form;
}