import { BuscarServicoByEstabelecimentoUsecase } from "@/application/estabelecimentos/buscar-servico-by-estabelecimento.usecase";
import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";

export function makeBuscarServicoByEstabelecimentoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  return new BuscarServicoByEstabelecimentoUsecase(estabelecimentoDb);
}
