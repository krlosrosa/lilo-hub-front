import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { HorarioModel } from "@/infra/api/model";

export class BuscarHorarioPorEstabelecimentoIdUsecase {
  constructor(private readonly buscarHorarioPorEstabelecimentoIdRepository: EstabelecimentoRepository) {
  }

  async execute(estabelecimentoId: string): Promise<HorarioModel[]> {
    const horarios = await this.buscarHorarioPorEstabelecimentoIdRepository.buscarHorarioPorEstabelecimentoIdDb(estabelecimentoId);
    if(!horarios.success) {
      throw new Error(horarios.message);
    }
    return horarios.data;
  }
}