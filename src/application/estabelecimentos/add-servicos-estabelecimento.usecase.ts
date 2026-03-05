import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { AddServicoDto } from "@/infra/api/model";

export class AddServicosEstabelecimentoUsecase {
  constructor(
    private readonly estabelecimentoRepository: EstabelecimentoRepository
  ) {}

  async execute(
    estabelecimentoId: string,
    body: AddServicoDto[]
  ): Promise<void> {
    const result =
      await this.estabelecimentoRepository.addServicosEstabelecimentoDb(
        estabelecimentoId,
        body
      );
    if (!result.success) {
      throw new Error(result.message);
    }
  }
}
