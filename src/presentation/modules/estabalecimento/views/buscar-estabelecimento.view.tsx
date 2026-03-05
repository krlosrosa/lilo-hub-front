"use client";

import HeroPageEstabelecimento from "../components/page-estabelecimento/hero";
import MainInfoCardPageEstabelecimento from "../components/page-estabelecimento/main-info-card";
import ActionsButtonsPageEstabelecimento from "../components/page-estabelecimento/actions-buttons";
import ComodidadesPageEstabelecimento from "../components/page-estabelecimento/comodidades";
import AboutPageEstabelecimento from "../components/page-estabelecimento/about";
import ServicesPageEstabelecimento from "../components/page-estabelecimento/services";
import GaleriaPageEstabelecimento from "../components/page-estabelecimento/galeria";
import HoursPageEstabelecimento from "../components/page-estabelecimento/Hours";
import TestimonialsPageEstabelecimento from "../components/page-estabelecimento/Testimonials";
import SocialPageEstabelecimento from "../components/page-estabelecimento/Social";
import StickyBarPageEstabelecimento from "../components/page-estabelecimento/sticky-bar";
import { AvaliacaoModel, ComodidadeModel, EnderecoModel, EstabelecimentoModelOutput, HorarioModel, RedeSocialModel, ServicoModel } from "@/infra/api/model";

type BuscarEstabelecimentoViewProps = {
  estabelecimento: EstabelecimentoModelOutput;
  endereco: EnderecoModel;
  servicos: ServicoModel[];
  horarios: HorarioModel[];
  comodidades: ComodidadeModel[];
  redesSociais: RedeSocialModel[];
  initialAvaliacoes: AvaliacaoModel[];
  midias: string[];
}

export function BuscarEstabelecimentoView({ estabelecimento, endereco, servicos, horarios, comodidades, redesSociais, initialAvaliacoes, midias }: BuscarEstabelecimentoViewProps) {

  const isPremium = true

  if (!estabelecimento) {
    return (
      <main
        className="flex min-h-screen items-center justify-center"
        role="status"
        aria-live="polite"
        aria-label="Carregando"
      >
        <p className="text-muted-foreground">Carregando estabelecimento...</p>
      </main>
    );
  }

  const enderecoTexto =
    endereco &&
    [
      endereco.rua,
      endereco.numero,
      endereco.bairro,
      endereco.cidade,
      endereco.estado
    ]
      .filter(Boolean)
      .join(", ");

  const redesList = Array.isArray(redesSociais) ? redesSociais : [];
  const whatsappLink = redesList.find(
    (r) => r.tipo?.toLowerCase() === "whatsapp"
  )?.url;
  const siteLink = redesList.find((r) => r.tipo?.toLowerCase() === "site")?.url;
  const mapsQuery = encodeURIComponent(enderecoTexto || estabelecimento.nome);

  return (
    <div className="min-h-screen bg-background">
      <header aria-label="Capa do estabelecimento">
        <HeroPageEstabelecimento
          isPremium={isPremium}
          coverUrl={estabelecimento.coverUrl ?? ""}
          nome={estabelecimento.nome ?? "Nome do Estabelecimento"}
        />
      </header>

      <main
        id="main-content"
        className="mx-auto w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl relative z-10 px-4 md:px-6 lg:px-8 space-y-4 md:space-y-6 pb-28 md:pb-12"
        style={{ marginTop: "-3rem" }}
        aria-label="Conteúdo principal"
      >
        <article aria-label={estabelecimento.nome ?? "Estabelecimento"}>
          {/* Main Info Card */}
          <section aria-label="Informações do estabelecimento">
            <MainInfoCardPageEstabelecimento
              isPremium={isPremium}
              logoUrl={estabelecimento.logoUrl ?? ""}
              nome={estabelecimento.nome}
              ratingAvg={estabelecimento.ratingAvg ?? 0}
              ratingCount={estabelecimento.ratingCount ?? 0}
              verificado={estabelecimento.verificado ?? false}
              descricao={estabelecimento.descricao ?? ""}
              enderecoTexto={enderecoTexto ?? ""}
            />
          </section>

          {/* Action buttons */}
          <nav className="my-4" aria-label="Ações rápidas (WhatsApp, ligar, site, rota)">
            <ActionsButtonsPageEstabelecimento
              whatsappLink={whatsappLink ?? ""}
              telefone={estabelecimento.telefone ?? ""}
              siteLink={siteLink ?? ""}
              enderecoTexto={enderecoTexto ?? ""}
              mapsQuery={mapsQuery ?? ""}
            />
          </nav>

          {/* Seções: detalhes do estabelecimento */}
          <section
            className="space-y-4 md:space-y-6"
            aria-label="Detalhes do estabelecimento"
          >
            <ComodidadesPageEstabelecimento
              comodidadesSelecionadas={comodidades}
            />
            <AboutPageEstabelecimento
              sobreNos={estabelecimento.sobreNos ?? ""}
            />
            <ServicesPageEstabelecimento
              servicos={servicos ?? []}
            />
            <GaleriaPageEstabelecimento
              midiasBanco={midias}
              nome={estabelecimento.nome}
            />
            <HoursPageEstabelecimento
              horarios={horarios ?? []}
            />
            <TestimonialsPageEstabelecimento
              initialAvaliacoes={initialAvaliacoes}
              ratingAvg={estabelecimento.ratingAvg ?? 0}
              ratingCount={estabelecimento.ratingCount ?? 0}
            />
            <SocialPageEstabelecimento
              redesSociais={redesList}
            />
          </section>
        </article>

        {/* CTA sticky bar */}
        <footer aria-label="Ações de contato">
          <StickyBarPageEstabelecimento
            whatsappLink={whatsappLink ?? ""}
            telefone={estabelecimento.telefone ?? ""}
          />
        </footer>
      </main>
    </div>
  );
}
