import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { ListarRedesSociaisPorEstabelecimentoUsecase } from "@/application/estabelecimentos/listar-redes-sociais-por-estabelecimento.usecase";

export function makeListarRedesSociaisPorEstabelecimentoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  return new ListarRedesSociaisPorEstabelecimentoUsecase(estabelecimentoDb);
}
