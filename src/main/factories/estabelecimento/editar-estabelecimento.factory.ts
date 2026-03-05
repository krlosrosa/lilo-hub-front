import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { EditarEstabelecimentoUsecase } from "@/application/estabelecimentos/editar-estabelecimento.usecase";
import { MinioService } from "@/infra/services/minio.service";

export function makeEditarEstabelecimentoFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  const minioService = new MinioService();
  const editarEstabelecimentoUsecase = new EditarEstabelecimentoUsecase(estabelecimentoDb, minioService);
  return editarEstabelecimentoUsecase;
}