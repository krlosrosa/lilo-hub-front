import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { CadastrarComodidadesUsecase } from "@/application/estabelecimentos/cadastrar-comodidades.usecase";

export function makeCadastrarComodidadesFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  return new CadastrarComodidadesUsecase(estabelecimentoDb);
}
