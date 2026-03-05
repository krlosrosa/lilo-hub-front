import { EstabelecimentoDb } from "@/infra/db/estabelecimento.db";
import { MinioService } from "@/infra/services/minio.service";
import { AddMidiasEstabelecimentoUsecase } from "@/application/estabelecimentos/add-midias-estabelecimento.usecase";

export function makeAddMidiasFactory() {
  const estabelecimentoDb = new EstabelecimentoDb();
  const minioService = new MinioService();
  const addMidiasUsecase = new AddMidiasEstabelecimentoUsecase(estabelecimentoDb, minioService);
  return addMidiasUsecase;
}