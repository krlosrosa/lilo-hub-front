import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { AddAvaliacaoDto } from "@/infra/api/model";

export class AddAvaliacaoUsecase {
  constructor(
    private readonly estabelecimentoRepository: EstabelecimentoRepository
  ) {}

  async execute(
    estabelecimentoId: string,
    dto: AddAvaliacaoDto
  ): Promise<void> {
    const result = await this.estabelecimentoRepository.addAvaliacaoDb(
      estabelecimentoId,
      dto
    );
    if (!result.success) {
      throw new Error(result.message);
    }
  }
}
