import { ComodidadeModel } from "@/infra/api/model";
import { CollapsibleSection } from "@/presentation/shared/components/ui/collapseSection";
import { CheckCircle2, Sparkles } from "lucide-react";

type ComodidadesPageEstabelecimentoProps = {
  comodidadesSelecionadas: ComodidadeModel[];
}


export default function ComodidadesPageEstabelecimento({ comodidadesSelecionadas }: ComodidadesPageEstabelecimentoProps) {
  return (
    <div>
      {comodidadesSelecionadas.length > 0 && (
        <CollapsibleSection
          icon={Sparkles}
          title="Por que nos escolher"
          defaultOpen
        >
          {comodidadesSelecionadas.map((c) => (
            <div key={c.id} className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm md:text-base text-foreground">{c.nome}</span>
            </div>
          ))}
        </CollapsibleSection>
      )}
    </div>
  )
}