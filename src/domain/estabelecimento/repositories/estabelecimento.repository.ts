import { AddAvaliacaoDto, AddServicoDto, AvaliacaoModel, CadastrarComodidadesDto, CadastrarEnderecoDto, CadastrarHorarioDto, CadastrarRedeSocialDto, ComodidadeModel, CriarEstabelecimentoDto, EditarEstabelecimentoDto, EnderecoModel, EstabelecimentoModelOutput, HorarioModel, RedeSocialModel, ServicoModel } from "@/infra/api/model";
import { ApiResponse } from "@/infra/http/axios.http";

export interface EstabelecimentoRepository {
  criarEstabelecimentoDb(estabelecimento: CriarEstabelecimentoDto): Promise<ApiResponse<number>>;
  getEstabelecimentoDb(id: string): Promise<ApiResponse<EstabelecimentoModelOutput>>;
  cadastrarEnderecodb(estabelecimentoId: string, endereco: CadastrarEnderecoDto): Promise<ApiResponse<void>>;
  editarEstabelecimentoDb(id: string, estabelecimento: EditarEstabelecimentoDto): Promise<ApiResponse<void>>;
  cadastrarHorarioDb(estabelecimentoId: string, horario: CadastrarHorarioDto[]): Promise<ApiResponse<void>>;
  getEstabelecimentoDbById(id: string): Promise<ApiResponse<EstabelecimentoModelOutput>>;
  buscarEnderecoPorEstabelecimentoIdDb(territorio: string, slug: string): Promise<ApiResponse<EnderecoModel>>;
  buscarHorarioPorEstabelecimentoIdDb(estabelecimentoId: string): Promise<ApiResponse<HorarioModel[]>>;
  addMidiasEstabelecimentoDb(estabelecimentoId: string, midias: string[]): Promise<ApiResponse<void>>;
  buscarMidiasEstabelecimentoDb(estabelecimentoId: string): Promise<ApiResponse<string[]>>;
  deletarFotosEstabelecimentoDb(estabelecimentoId: string, fotos: string[]): Promise<ApiResponse<void>>;
  melhorarTextoDb(texto: string): Promise<ApiResponse<string>>;
  listarComodidadesPorEstabelecimentoDb(estabelecimentoId: string): Promise<ApiResponse<ComodidadeModel[]>>;
  listarComodidadesDb(): Promise<ApiResponse<ComodidadeModel[]>>;
  cadastrarComodidadesDb(estabelecimentoId: string, dto: CadastrarComodidadesDto): Promise<ApiResponse<void>>;
  listarRedesSociaisPorEstabelecimentoDb(estabelecimentoId: string): Promise<ApiResponse<RedeSocialModel[]>>;
  cadastrarRedesSociaisDb(estabelecimentoId: string, body: CadastrarRedeSocialDto[]): Promise<ApiResponse<void>>;
  addServicosEstabelecimentoDb(estabelecimentoId: string, body: AddServicoDto[]): Promise<ApiResponse<void>>;
  buscarServicosPorEstabelecimentoIdDb(estabelecimentoId: string): Promise<ApiResponse<ServicoModel[]>>;
  addAvaliacaoDb(estabelecimentoId: string, dto: AddAvaliacaoDto): Promise<ApiResponse<void>>;
  getAvaliacoesDb(estabelecimentoId: string): Promise<ApiResponse<AvaliacaoModel[]>>;
  listarEstabelecimentosPorTerritorioDb(territorioNome: string): Promise<ApiResponse<EstabelecimentoModelOutput[]>>;
}