import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { CadastrarRedeSocialDto } from "@/infra/api/model";

export class CadastrarRedesSociaisUsecase {
  constructor(
    private readonly estabelecimentoRepository: EstabelecimentoRepository
  ) {}

  async execute(estabelecimentoId: string, body: CadastrarRedeSocialDto[]): Promise<void> {
    const result = await this.estabelecimentoRepository.cadastrarRedesSociaisDb(estabelecimentoId, body);
    if (!result.success) {
      throw new Error(result.message);
    }
  }
}
