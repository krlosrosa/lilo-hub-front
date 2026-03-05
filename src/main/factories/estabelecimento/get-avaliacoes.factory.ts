import { GetAvaliacoesUsecase } from "@/application/estabelecimentos/get-avaliacoes.usecase";
import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";

export function makeGetAvaliacoesFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  return new GetAvaliacoesUsecase(estabelecimentoDb);
}
