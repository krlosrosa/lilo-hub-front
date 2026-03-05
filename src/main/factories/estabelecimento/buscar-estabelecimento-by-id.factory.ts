import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { GetEstabelecimentoByIdUsecase } from "@/application/estabelecimentos/get-estabelecimento-by-id.usecase";

export function makeBuscarEstabelecimentoByIdFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  const buscarEstabelecimentoByIdUsecase = new GetEstabelecimentoByIdUsecase(estabelecimentoDb);
  return buscarEstabelecimentoByIdUsecase;
}