import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import type { AvaliacaoModel } from "@/infra/api/model";

export class GetAvaliacoesUsecase {
  constructor(
    private readonly estabelecimentoRepository: EstabelecimentoRepository
  ) {}

  async execute(estabelecimentoId: string): Promise<AvaliacaoModel[]> {
    const result =
      await this.estabelecimentoRepository.getAvaliacoesDb(estabelecimentoId);
    if (!result.success) {
      throw new Error(result.message);
    }
    return Array.isArray(result.data) ? result.data : [];
  }
}
