import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { GetEstabelecimentoUsecase } from "@/application/estabelecimentos/get-estabelecimento.usecase";

export function makeBuscarEstabelecimentoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  const buscarEstabelecimentoUsecase = new GetEstabelecimentoUsecase(estabelecimentoDb);
  return buscarEstabelecimentoUsecase;
}