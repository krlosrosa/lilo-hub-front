import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { ServicoModel } from "@/infra/api/model";

export class BuscarServicoByEstabelecimentoUsecase {
  constructor(
    private readonly estabelecimentoRepository: EstabelecimentoRepository
  ) {}

  async execute(estabelecimentoId: string): Promise<ServicoModel[]> {
    const result =
      await this.estabelecimentoRepository.buscarServicosPorEstabelecimentoIdDb(
        estabelecimentoId
      );
    if (!result.success) {
      throw new Error(result.message);
    }
    return result.data ?? [];
  }
}
