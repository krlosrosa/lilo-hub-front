import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";

export class MelhorarTextoUsecase {
  constructor(private readonly estabelecimentoRepository: EstabelecimentoRepository) {}
  async execute(texto: string): Promise<string> {
    const textoMelhorado = await this.estabelecimentoRepository.melhorarTextoDb(texto);
    if(!textoMelhorado.success) {
      throw new Error(textoMelhorado.message);
    }
    return textoMelhorado.data;
  }
}