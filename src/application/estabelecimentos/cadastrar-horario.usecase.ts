import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { CadastrarHorarioDto } from "@/infra/api/model";

export class CadastrarHorarioUsecase {
  constructor(private readonly cadastrarHorarioRepository: EstabelecimentoRepository) { }
  async execute(estabelecimentoId: string, cadastrarHorarioDto: CadastrarHorarioDto[]): Promise<void> {
    const horario = await this.cadastrarHorarioRepository.cadastrarHorarioDb(estabelecimentoId, cadastrarHorarioDto);
    if(!horario.success) {
      throw new Error(horario.message);
    }
    return horario.data;
  }
}