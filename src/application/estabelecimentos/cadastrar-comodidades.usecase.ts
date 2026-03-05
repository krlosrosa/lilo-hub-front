import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { CadastrarComodidadesDto } from "@/infra/api/model";

export class CadastrarComodidadesUsecase {
  constructor(
    private readonly estabelecimentoRepository: EstabelecimentoRepository
  ) {}

  async execute(estabelecimentoId: string, dto: CadastrarComodidadesDto): Promise<void> {
    const result = await this.estabelecimentoRepository.cadastrarComodidadesDb(estabelecimentoId, dto);
    if (!result.success) {
      throw new Error(result.message);
    }
  }
}
