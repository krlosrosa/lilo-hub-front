import { AddServicosEstabelecimentoUsecase } from "@/application/estabelecimentos/add-servicos-estabelecimento.usecase";
import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";

export function makeAddServicosEstabelecimentoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  return new AddServicosEstabelecimentoUsecase(estabelecimentoDb);
}
