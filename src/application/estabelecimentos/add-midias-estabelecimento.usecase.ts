import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { MinioService } from "@/infra/services/minio.service";
import { converterParaWebp } from "../utils/convert-webp";

export class AddMidiasEstabelecimentoUsecase {
  constructor(
    private readonly addMidiasEstabelecimentoRepository: EstabelecimentoRepository,
    private readonly minioService: MinioService
  ) { }
  async execute(estabelecimentoId: string, midias: File[], indice: number): Promise<void> {
    const midiasPaths = await Promise.all(midias.map(async (midia, index) => {
      const path = `estabelecimento-${estabelecimentoId}-${indice+index+1}-midia.webp`;
      const convertedMidia = await converterParaWebp(midia, { quality: 0.9 });
      await this.minioService.uploadFile(path, convertedMidia);
      return path;
    }));
    const midiasResponse = await this.addMidiasEstabelecimentoRepository.addMidiasEstabelecimentoDb(estabelecimentoId, midiasPaths);
    if(!midiasResponse.success) {
      throw new Error(midiasResponse.message);
    }
    return midiasResponse.data;
  }
}