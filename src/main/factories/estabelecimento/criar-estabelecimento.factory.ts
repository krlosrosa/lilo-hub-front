import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { CriarEstabelecimentoUsecase } from "@/application/estabelecimentos/criar-estabelecimento.usecase";

export function makeCriarEstabelecimentoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  const criarEstabelecimentoUsecase = new CriarEstabelecimentoUsecase(estabelecimentoDb);
  return criarEstabelecimentoUsecase;
}