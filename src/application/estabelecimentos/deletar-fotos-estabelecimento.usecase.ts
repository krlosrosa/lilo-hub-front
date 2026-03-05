import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";

export class DeletarFotosEstabelecimentoUsecase {
  constructor(private readonly estabelecimentoRepository: EstabelecimentoRepository) {}
  async execute(estabelecimentoId: string, fotos: string[]): Promise<void> {
    const fotosDeletadas = await this.estabelecimentoRepository.deletarFotosEstabelecimentoDb(estabelecimentoId, fotos);
    if(!fotosDeletadas.success) {
      throw new Error(fotosDeletadas.message);
    }
    return fotosDeletadas.data;
  }
}