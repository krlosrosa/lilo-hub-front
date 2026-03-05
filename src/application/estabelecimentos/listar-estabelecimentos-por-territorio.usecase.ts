import type { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import type { EstabelecimentoModelOutput } from "@/infra/api/model";

export class ListarEstabelecimentosPorTerritorioUsecase {
  constructor(
    private readonly estabelecimentoRepository: EstabelecimentoRepository
  ) {}

  async execute(territorioNome: string): Promise<EstabelecimentoModelOutput[]> {
    const result = await this.estabelecimentoRepository.listarEstabelecimentosPorTerritorioDb(
      territorioNome
    );

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  }
}

