import { CollapsibleSection } from "@/presentation/shared/components/ui/collapseSection";
import { Users } from "lucide-react";

type AboutPageEstabelecimentoProps = {
  sobreNos: string;
}

export default function AboutPageEstabelecimento({ sobreNos }: AboutPageEstabelecimentoProps) {
  return(
    <div>
      {sobreNos && (
      <CollapsibleSection icon={Users} title="Sobre Nós" defaultOpen>
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
          {sobreNos}
        </p>
      </CollapsibleSection>
    )}
    </div>
  )
}