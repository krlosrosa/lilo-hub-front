import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { BuscarHorarioPorEstabelecimentoIdUsecase } from "@/application/estabelecimentos/buscar-horario-por-estabelecimenti-id.usecase";

export function makeBuscarHorarioPorEstabelecimentoIdFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  const buscarHorarioPorEstabelecimentoIdUsecase = new BuscarHorarioPorEstabelecimentoIdUsecase(estabelecimentoDb);
  return buscarHorarioPorEstabelecimentoIdUsecase;
}