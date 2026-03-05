import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { MelhorarTextoUsecase } from "@/application/estabelecimentos/melhorar-texto.usecase";

export function makeMelhorarTextoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();  
  const melhorarTextoUsecase = new MelhorarTextoUsecase(estabelecimentoDb);
  return melhorarTextoUsecase;
}