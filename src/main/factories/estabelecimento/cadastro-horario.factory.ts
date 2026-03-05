import { CadastrarHorarioUsecase } from "@/application/estabelecimentos/cadastrar-horario.usecase";
import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";


export function makeCadastroHorarioFactory() {
  const estabelecimentoRepository = new EstabelecimentoDb();
  const cadastroHorarioUsecase = new CadastrarHorarioUsecase(estabelecimentoRepository);
  return cadastroHorarioUsecase;
}