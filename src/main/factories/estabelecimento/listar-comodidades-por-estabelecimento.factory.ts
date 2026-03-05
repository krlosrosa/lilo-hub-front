import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { ListarComodidadesPorEstabelecimentoUsecase } from "@/application/estabelecimentos/listar-comodidades-por-estabelecimento.usecase";

export function makeListarComodidadesPorEstabelecimentoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  return new ListarComodidadesPorEstabelecimentoUsecase(estabelecimentoDb);
}
