import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { CadastrarEnderecoDto } from "@/infra/api/model";

export class CadastrarEnderecoUsecase {
  constructor(private readonly estabelecimentoRepository: EstabelecimentoRepository) { }
  async execute(estabelecimentoId: string, cadastrarEnderecoDto: CadastrarEnderecoDto): Promise<void> {
    const endereco = await this.estabelecimentoRepository.cadastrarEnderecodb(estabelecimentoId, cadastrarEnderecoDto);
    if(!endereco.success) {
      throw new Error(endereco.message);
    }
    return endereco.data;
  }
}