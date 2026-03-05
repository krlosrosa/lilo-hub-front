import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { BuscarEnderecoPorEstabelecimentoUsecase } from "@/application/estabelecimentos/bucar-endereco-por-estabelecimento.usecase";

export function makeBuscarEnderecoPorEstabelecimentoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  const buscarEnderecoPorEstabelecimentoUsecase = new BuscarEnderecoPorEstabelecimentoUsecase(estabelecimentoDb);
  return buscarEnderecoPorEstabelecimentoUsecase;
}