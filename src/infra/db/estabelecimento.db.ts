import { EstabelecimentoRepository } from "@/domain/estabelecimento/repositories/estabelecimento.repository";
import { AddAvaliacaoDto, AddServicoDto, CadastrarComodidadesDto, CadastrarEnderecoDto, CadastrarHorarioDto, CadastrarRedeSocialDto, CriarEstabelecimentoDto, EditarEstabelecimentoDto, EstabelecimentoModelOutput } from "../api/model";
import { addAvaliacao, addMidiasEstabelecimento, addServicoEstabelecimento, buscarEnderecoPorEstabelecimentoId, buscarHorariosPorEstabelecimentoId, buscarMidiasEstabelecimento, buscarServicosById, buscarUmEstabelecimento, buscarUmEstabelecimentoById, cadastrarComodidades, cadastrarRedesSociais, cadastrarEndereco, cadastrarHorario, criarEstabelecimento, deletarFotosEstabelecimento, editarEstabelecimento, listarComodidades, listarComodidadesPorEstabelecimento, listarRedesSociaisPorEstabelecimento, melhorarMensagem, getAvaliacoes, listarEstabelecimentosPorTerritorio } from "../api/service/estabelecimentos/estabelecimentos";
import type { ApiResponse } from "@/infra/http/axios.http";

function toEstabelecimentoModelOutput(data: Awaited<ReturnType<typeof buscarUmEstabelecimentoById>>["data"]): EstabelecimentoModelOutput {
  if (!data) throw new Error("Estabelecimento não encontrado");
  return {
    ...data,
    verificado: data.verificado ?? false,
    destaque: data.destaque ?? false,
    ratingAvg: data.ratingAvg ?? 0,
    ratingCount: data.ratingCount ?? 0,
  } as EstabelecimentoModelOutput;
}

export class EstabelecimentoDb implements EstabelecimentoRepository {
  async criarEstabelecimentoDb(estabelecimento: CriarEstabelecimentoDto){
    const response = await criarEstabelecimento(estabelecimento);
    return response;
  }
  async getEstabelecimentoDb(id: string){
    const response = await buscarUmEstabelecimento(id);
    return response;
  }

  async getEstabelecimentoDbById(id: string): Promise<ApiResponse<EstabelecimentoModelOutput>> {
    const response = await buscarUmEstabelecimentoById(id);
    return {
      ...response,
      data: toEstabelecimentoModelOutput(response.data),
    };
  }

  async buscarEnderecoPorEstabelecimentoIdDb(territorio: string, slug: string) {
    const response = await buscarEnderecoPorEstabelecimentoId(territorio, slug);
    return response;
  }

  async cadastrarEnderecodb(estabelecimentoId: string, endereco: CadastrarEnderecoDto){
    const response = await cadastrarEndereco(estabelecimentoId, endereco);
    return response;
  }

  async editarEstabelecimentoDb(id: string, estabelecimento: EditarEstabelecimentoDto){
    const response = await editarEstabelecimento(id, estabelecimento);
    return response;
  }

  async cadastrarHorarioDb(estabelecimentoId: string, horario: CadastrarHorarioDto[]){
    const response = await cadastrarHorario(estabelecimentoId, horario);
    return response;
  }

  async buscarHorarioPorEstabelecimentoIdDb(estabelecimentoId: string){
    const response = await buscarHorariosPorEstabelecimentoId(estabelecimentoId);
    return response;
  }

  async addMidiasEstabelecimentoDb(estabelecimentoId: string, midias: string[]){
    const response = await addMidiasEstabelecimento(estabelecimentoId, {
      paths: midias
    });
    return response;
  }

  async buscarMidiasEstabelecimentoDb(estabelecimentoId: string){
    const response = await buscarMidiasEstabelecimento(estabelecimentoId);
    return response;
  }

  async deletarFotosEstabelecimentoDb(estabelecimentoId: string, fotos: string[]){
    const response = await deletarFotosEstabelecimento(estabelecimentoId, {
      paths: fotos
    });
    return response;
  }

  async melhorarTextoDb(texto: string){
    const response = await melhorarMensagem({
      texto: texto,
    }, {
      timeout: 50000,
    });
    return response;
  }

  async listarComodidadesPorEstabelecimentoDb(estabelecimentoId: string) {
    return listarComodidadesPorEstabelecimento(estabelecimentoId);
  }

  async listarComodidadesDb() {
    return listarComodidades();
  }

  async cadastrarComodidadesDb(estabelecimentoId: string, dto: CadastrarComodidadesDto) {
    return cadastrarComodidades(estabelecimentoId, dto);
  }

  async listarRedesSociaisPorEstabelecimentoDb(estabelecimentoId: string) {
    return listarRedesSociaisPorEstabelecimento(estabelecimentoId);
  }

  async cadastrarRedesSociaisDb(estabelecimentoId: string, body: CadastrarRedeSocialDto[]) {
    return cadastrarRedesSociais(estabelecimentoId, body);
  }

  async addServicosEstabelecimentoDb(estabelecimentoId: string, body: AddServicoDto[]) {
    return addServicoEstabelecimento(estabelecimentoId, body);
  }

  async buscarServicosPorEstabelecimentoIdDb(estabelecimentoId: string) {
    return buscarServicosById(estabelecimentoId);
  }

  async addAvaliacaoDb(estabelecimentoId: string, dto: AddAvaliacaoDto) {
    return addAvaliacao(estabelecimentoId, dto);
  }

  async getAvaliacoesDb(estabelecimentoId: string) {
    return getAvaliacoes(estabelecimentoId);
  }

  async listarEstabelecimentosPorTerritorioDb(territorioNome: string) {
    return listarEstabelecimentosPorTerritorio(territorioNome);
  }
}