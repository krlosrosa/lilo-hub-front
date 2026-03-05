import { makeBuscarEstabelecimentoFactory } from "@/main/factories/estabelecimento/buscar-estabelecimento.factory";
import { HotsiteView } from "@/presentation/modules/hotsite/hotsite.view";

export default async function TenantPage({ params }: { params: { tenant: string } }) {

  const { tenant } = await params;
  //const buscarEstabelecimentoUseCase = makeBuscarEstabelecimentoFactory();

  const estabelecimento = await fetch(`http://127.0.0.1:4000/api/estabelecimentos/${tenant}`);
  const estabelecimentoData = await estabelecimento.json();

  return (
    <div>
      {estabelecimentoData && <HotsiteView label={estabelecimentoData.data.nome} description={estabelecimentoData.data.descricao} />}
    </div>
  )
}