import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { CadastrarRedesSociaisUsecase } from "@/application/estabelecimentos/cadastrar-redes-sociais.usecase";

export function makeCadastrarRedesSociaisFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  return new CadastrarRedesSociaisUsecase(estabelecimentoDb);
}
