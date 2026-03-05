import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { DeletarFotosEstabelecimentoUsecase } from "@/application/estabelecimentos/deletar-fotos-estabelecimento.usecase";

export function makeDeletarImagensFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  const deletarFotosEstabelecimentoUsecase = new DeletarFotosEstabelecimentoUsecase(estabelecimentoDb);
  return deletarFotosEstabelecimentoUsecase;
}