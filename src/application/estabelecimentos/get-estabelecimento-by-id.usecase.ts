import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { EstabelecimentoModelOutput } from "@/infra/api/model";

export class GetEstabelecimentoByIdUsecase {
  constructor(private readonly getEstabelecimentoRepository: EstabelecimentoRepository) { }
  async execute(id: string): Promise<EstabelecimentoModelOutput> {
    const estabelecimento = await this.getEstabelecimentoRepository.getEstabelecimentoDbById(id);
    if(!estabelecimento.success) {
      throw new Error(estabelecimento.message);
    }
    return estabelecimento.data;
  }
}