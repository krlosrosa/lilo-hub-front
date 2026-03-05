import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { EnderecoModel } from "@/infra/api/model";

export class BuscarEnderecoPorEstabelecimentoUsecase {

  constructor(private readonly estabelecimentoRepository: EstabelecimentoRepository) {
  }

  async execute(territorio: string, slug: string): Promise<EnderecoModel> {
    const endereco = await this.estabelecimentoRepository.buscarEnderecoPorEstabelecimentoIdDb(territorio, slug);
    if(!endereco.success) {
      throw new Error(endereco.message);
    }
    return endereco.data;
  }
}