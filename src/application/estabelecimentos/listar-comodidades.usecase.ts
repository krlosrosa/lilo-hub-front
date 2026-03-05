import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { ComodidadeModel } from "@/infra/api/model";

export class ListarComodidadesUsecase {
  constructor(
    private readonly estabelecimentoRepository: EstabelecimentoRepository
  ) {}

  async execute(): Promise<ComodidadeModel[]> {
    const result = await this.estabelecimentoRepository.listarComodidadesDb();
    if (!result.success) {
      throw new Error(result.message);
    }
    return result.data;
  }
}
