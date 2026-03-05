import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";

export class BuscarMidiaEstabelecimentoUsecase {
  constructor(private readonly estabelecimentoRepository: EstabelecimentoRepository) {
  }

  async execute(estabelecimentoId: string): Promise<string[]> {
    const midias = await this.estabelecimentoRepository.buscarMidiasEstabelecimentoDb(estabelecimentoId);
    if(!midias.success) {
      throw new Error(midias.message);
    }
    return midias.data;
  }
}