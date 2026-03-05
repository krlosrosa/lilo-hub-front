import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { ListarComodidadesUsecase } from "@/application/estabelecimentos/listar-comodidades.usecase";

export function makeListarComodidadesFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  return new ListarComodidadesUsecase(estabelecimentoDb);
}
