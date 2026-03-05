/**
 * GET avaliações por estabelecimento (endpoint não gerado pelo Orval).
 */
import { axiosFetcher } from "@/infra/http/axios.http";
import type { AvaliacaoModel } from "../../model";

export const getAvaliacoes = (estabelecimentoId: string) =>
  axiosFetcher<AvaliacaoModel[]>({
    url: `/api/estabelecimentos/${estabelecimentoId}/avaliacoes`,
    method: "GET",
  });
