import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { RedeSocialModel } from "@/infra/api/model";

export class ListarRedesSociaisPorEstabelecimentoUsecase {
  constructor(
    private readonly estabelecimentoRepository: EstabelecimentoRepository
  ) {}

  async execute(estabelecimentoId: string): Promise<RedeSocialModel[]> {
    const result = await this.estabelecimentoRepository.listarRedesSociaisPorEstabelecimentoDb(estabelecimentoId);
    if (!result.success) {
      throw new Error(result.message);
    }
    return result.data;
  }
}
