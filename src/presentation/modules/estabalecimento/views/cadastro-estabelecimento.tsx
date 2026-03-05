"use client";
import { Card, CardContent } from "@/presentation/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/presentation/shared/components/ui/tabs";
import { Info, MapPin, Clock, LinkIcon, ImageIcon, RotateCcw, Save, Star, Package } from "lucide-react";
import { TabInformacoesGerais } from "../components/tab-informacao";
import { TabEndereco } from "../components/tab-endereco";
import { TabHorarios } from "../components/tab-horarios";
import { TabMidia } from "../components/tab-midias";
import { TabLinks } from "../components/tab-links";
import { Button } from "@/presentation/shared/components/ui/button";
import { TabComodidades } from "../components/tab-comodidades";
import { useServico } from "../hooks/servico.hook";
import { TabServicos } from "../components/tab-servicos";
import { ComodidadeModel, EnderecoModel, EstabelecimentoModelOutput, HorarioModel, RedeSocialModel } from "@/infra/api/model";

type CadastroEstabelecimentoViewProps = {
  horarios: HorarioModel[];
  estabelecimento: EstabelecimentoModelOutput;
  endereco: EnderecoModel;
  midiasBanco: string[];
  links: RedeSocialModel[];
  comodidades: ComodidadeModel[];
  comodidadeState: ComodidadeModel[];
}

export function CadastroEstabelecimentoView({ horarios, estabelecimento, endereco, midiasBanco, links, comodidades, comodidadeState }: CadastroEstabelecimentoViewProps) {

const { servicos, form: formServico, addServico, handleAddServico, handleRemoveServico } = useServico();

  return (
    <div className="min-h-screen bg-muted/30 pb-24">
      <main className="mx-auto px-4 py-6">
        <Tabs defaultValue="geral" className="space-y-6">
          <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="geral" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Info className="h-4 w-4" /> <span className="hidden sm:inline">Informações</span> Gerais
            </TabsTrigger>
            <TabsTrigger value="endereco" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <MapPin className="h-4 w-4" /> Endereço
            </TabsTrigger>
            <TabsTrigger value="horarios" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Clock className="h-4 w-4" /> Horários
            </TabsTrigger>
            <TabsTrigger value="midia" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <ImageIcon className="h-4 w-4" /> Mídia
              </TabsTrigger>
              <TabsTrigger value="comodidades" className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Star className="h-4 w-4" /> Comodidades
              </TabsTrigger>
              <TabsTrigger value="servicos" className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Package className="h-4 w-4" /> Serviços
              </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center gap-1.5 text-xs sm:text-sm">
              <LinkIcon className="h-4 w-4" /> Links
            </TabsTrigger>
          </TabsList>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <TabsContent value="geral">
                <TabInformacoesGerais estabelecimento={estabelecimento}/>
              </TabsContent>
              <TabsContent value="endereco">
                <TabEndereco
                  endereco={endereco}
                />
              </TabsContent>
              <TabsContent value="horarios">
                <TabHorarios
                  horarios={horarios}
                />
              </TabsContent>
              <TabsContent value="midia">
                <TabMidia
                  midiasBanco={midiasBanco}
                />
              </TabsContent>
              <TabsContent value="links">
                <TabLinks
                  links={links}
                />
              </TabsContent>
              <TabsContent value="comodidades">
                <TabComodidades
                  comodidades={comodidades}
                  comodidadeInitialState={comodidadeState}
                />
              </TabsContent>  
              <TabsContent value="servicos">
                <TabServicos
                  servicosInitialState={servicos}
                />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-end gap-3 px-4 py-3">
          <Button type="button" variant="outline">
            <RotateCcw className="mr-1.5 h-4 w-4" /> Cancelar
          </Button>
          <Button type="button">
            <Save className="mr-1.5 h-4 w-4" /> Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
