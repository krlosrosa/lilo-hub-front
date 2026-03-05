import { ComodidadeModel, EnderecoModel, EstabelecimentoModelOutput, HorarioModel, RedeSocialModel } from "@/infra/api/model";
import { fetchJson } from "@/infra/http/fetch.http";
import { CadastroEstabelecimentoView } from "@/presentation/modules/estabalecimento/views/cadastro-estabelecimento";

export default async function EstabelecimentoAdminPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const horarios = await fetchJson<HorarioModel[]>(`/api/estabelecimentos/horarios/estabelecimento/${id}`);
  const estabelecimento = await fetchJson<EstabelecimentoModelOutput>(`/api/estabelecimentos/id/${id}`);
  const enderecos = await fetchJson<EnderecoModel>(`/api/estabelecimentos/endereco/estabelecimento/${id}`);
  const midias = await fetchJson<string[]>(`/api/estabelecimentos/${id}/midias`);
  const redesSociais = await fetchJson<RedeSocialModel[]>(`/api/estabelecimentos/${id}/redes-sociais`);
  const comodidadesState = await fetchJson<ComodidadeModel[]>(`/api/estabelecimentos/${id}/comodidades`);
  const comodidades = await fetchJson<ComodidadeModel[]>(`/api/estabelecimentos/buscar/comodidades`);
  
  return (
    <CadastroEstabelecimentoView
      horarios={horarios}
      estabelecimento={estabelecimento}
      endereco={enderecos}
      midiasBanco={midias}
      links={redesSociais}
      comodidadeState={comodidadesState}
      comodidades={comodidades}
    />
  )
}