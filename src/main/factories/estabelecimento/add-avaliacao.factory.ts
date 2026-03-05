import { AddAvaliacaoUsecase } from "@/application/estabelecimentos/add-avaliacao.usecase";
import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";

export function makeAddAvaliacaoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  return new AddAvaliacaoUsecase(estabelecimentoDb);
}
