import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { EditarEstabelecimentoDto } from "@/infra/api/model";
import { MinioService } from "@/infra/services/minio.service";
import { converterParaWebp } from "../utils/convert-webp";

export class EditarEstabelecimentoUsecase {

  constructor(
    private readonly editarEstabelecimentoRepository: EstabelecimentoRepository,
    private readonly minioService: MinioService
  ) { }
  async execute(id: string, editarEstabelecimentoDto: EditarEstabelecimentoDto, logo: File | null, cover: File | null): Promise<void> {

    const pathlogo = logo ? `estabelecimento-${id}-logo.webp` : null;
    const pathcover = cover ? `estabelecimento-${id}-cover.webp` : null;

    if(editarEstabelecimentoDto.logoUrl) {
      editarEstabelecimentoDto.logoUrl = `estabelecimento-${id}-logo.webp`;
    }

    if(editarEstabelecimentoDto.coverUrl) {
      editarEstabelecimentoDto.coverUrl = `estabelecimento-${id}-cover.webp`;
    }

    if(logo) {
      alert(JSON.stringify(logo));
      const convertedLogo = await converterParaWebp(logo, { quality: 0.9 });
      const infoReturnUdl = await this.minioService.uploadFile(pathlogo as string, convertedLogo);
      alert(JSON.stringify(infoReturnUdl));
      editarEstabelecimentoDto.logoUrl = pathlogo as string;
    }

    if(cover) {
      const convertedCover = await converterParaWebp(cover, { quality: 0.9 });
      await this.minioService.uploadFile(pathcover as string  , convertedCover);
      editarEstabelecimentoDto.coverUrl = pathcover as string;
    }
    const estabelecimento = await this.editarEstabelecimentoRepository.editarEstabelecimentoDb(id, editarEstabelecimentoDto);
    if(!estabelecimento.success) {
      throw new Error(estabelecimento.message);
    }
    return estabelecimento.data;
  }
}