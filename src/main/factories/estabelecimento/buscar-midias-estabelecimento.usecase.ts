import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { BuscarMidiaEstabelecimentoUsecase } from "@/application/estabelecimentos/buscar-midia-estabelecimento.usecase";  

export function makeBuscarMidiasEstabelecimentoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  const buscarMidiasEstabelecimentoUsecase = new BuscarMidiaEstabelecimentoUsecase(estabelecimentoDb);
  return buscarMidiasEstabelecimentoUsecase;
} 