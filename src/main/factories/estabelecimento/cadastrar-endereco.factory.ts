import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { CadastrarEnderecoUsecase } from "@/application/estabelecimentos/cadastrar-endereco.usecase";

export function makeCadastrarEnderecoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  const cadastrarEnderecoUsecase = new CadastrarEnderecoUsecase(estabelecimentoDb);
  return cadastrarEnderecoUsecase;
}