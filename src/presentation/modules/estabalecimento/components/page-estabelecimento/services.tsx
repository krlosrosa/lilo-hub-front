import { AddServicoDto } from "@/infra/api/model";
import { CollapsibleSection } from "@/presentation/shared/components/ui/collapseSection";
import { Award } from "lucide-react";

type ServicesPageEstabelecimentoProps = {
  servicos: AddServicoDto[];
}

export default function ServicesPageEstabelecimento({ servicos }: ServicesPageEstabelecimentoProps) {
  return (
    <div>
      {servicos.length > 0 && (
        <CollapsibleSection icon={Award} title="Nossos Serviços" defaultOpen>
          <div className="gap-2 flex flex-col text-foreground">
            {servicos.map((s, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-3 rounded-xl bg-secondary/50 p-3"
              >
                <div className="space-y-0.5 min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {s.titulo ?? "—"}
                  </p>
                  {s.descricao && (
                    <p className="text-xs text-muted-foreground">
                      {s.descricao}
                    </p>
                  )}
                </div>
                {s.valor && (
                  <span className="shrink-0 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    {s.valor}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  )
}