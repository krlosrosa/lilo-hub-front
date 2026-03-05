import { ListarEstabelecimentosPorTerritorioUsecase } from "@/application/estabelecimentos/listar-estabelecimentos-por-territorio.usecase";
import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";

export function makeListarEstabelecimentosPorTerritorioFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  return new ListarEstabelecimentosPorTerritorioUsecase(estabelecimentoDb);
}

