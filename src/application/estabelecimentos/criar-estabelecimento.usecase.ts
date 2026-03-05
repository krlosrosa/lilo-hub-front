import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { CriarEstabelecimentoDto } from "@/infra/api/model";


export class CriarEstabelecimentoUsecase {
  constructor(private readonly criarEstabelecimentoRepository: EstabelecimentoRepository) { }
  async execute(criarEstabelecimentoDto: CriarEstabelecimentoDto): Promise<number> {
    const estabelecimentoId = await this.criarEstabelecimentoRepository.criarEstabelecimentoDb(criarEstabelecimentoDto);
    if(!estabelecimentoId.success) {
      throw new Error(estabelecimentoId.message);
    }
    return estabelecimentoId.data;
  }
} 