import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { ComodidadeModel } from "@/infra/api/model";

export class ListarComodidadesPorEstabelecimentoUsecase {
  constructor(
    private readonly estabelecimentoRepository: EstabelecimentoRepository
  ) {}

  async execute(estabelecimentoId: string): Promise<ComodidadeModel[]> {
    const result = await this.estabelecimentoRepository.listarComodidadesPorEstabelecimentoDb(estabelecimentoId);
    if (!result.success) {
      throw new Error(result.message);
    }
    return result.data;
  }
}
