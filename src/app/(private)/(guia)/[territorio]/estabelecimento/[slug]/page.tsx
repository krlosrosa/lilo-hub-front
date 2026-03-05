import { AvaliacaoModel, ComodidadeModel, EnderecoModel, EstabelecimentoDominioModel, EstabelecimentoModelOutput, HorarioModel, RedeSocialModel, ServicoModel } from "@/infra/api/model";
import { fetchJson } from "@/infra/http/fetch.http";
import { BuscarEstabelecimentoView } from "@/presentation/modules/estabalecimento/views/buscar-estabelecimento.view";
import { headers } from "next/headers";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const estabelecimento = await fetchJson<EstabelecimentoModelOutput>(`/api/estabelecimentos/id/${slug}`);
  return {
    title: estabelecimento.nome,
    description: estabelecimento.descricao,
  }
}


export default async function EstabelecimentoPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const estabelecimento = await fetchJson<EstabelecimentoModelOutput>(`/api/estabelecimentos/id/${slug}`);
  const enderecos = await fetchJson<EnderecoModel>(`/api/estabelecimentos/endereco/estabelecimento/${slug}`);
  const servicos = await fetchJson<ServicoModel[]>(`/api/estabelecimentos/${slug}/servicos`);
  const horarios = await fetchJson<HorarioModel[]>(`/api/estabelecimentos/horarios/estabelecimento/${slug}`);
  const comodidades = await fetchJson<ComodidadeModel[]>(`/api/estabelecimentos/${slug}/comodidades`);
  const redesSociais = await fetchJson<RedeSocialModel[]>(`/api/estabelecimentos/${slug}/redes-sociais`);
  const midias = await fetchJson<string[]>(`/api/estabelecimentos/${slug}/midias`);
  const initialAvaliacoes = await fetchJson<AvaliacaoModel[]>(`/api/estabelecimentos/${slug}/avaliacoes`);

  if (!estabelecimento || !enderecos || !servicos || !horarios || !comodidades || !redesSociais || !midias) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Carregando estabelecimento...</p>
      </div>
    );
  }

  console.log(redesSociais);
  return (
    <div>
      <BuscarEstabelecimentoView 
        initialAvaliacoes={initialAvaliacoes}
        estabelecimento={estabelecimento} 
        endereco={enderecos}
        servicos={servicos}
        horarios={horarios}
        comodidades={comodidades}
        redesSociais={redesSociais}
        midias={midias}
      />
    </div>
  )
}