import { CollapsibleSection } from "@/presentation/shared/components/ui/collapseSection";
import { imageUrl } from "@/presentation/shared/lib/image-url";
import { Calendar } from "lucide-react";
import Image from "next/image";

type GaleriaPageEstabelecimentoProps = {
  midiasBanco: string[];
  nome: string;
}

export default function GaleriaPageEstabelecimento({ midiasBanco, nome }: GaleriaPageEstabelecimentoProps) {
  return (
    <div>
      {midiasBanco.length > 0 && (
        <CollapsibleSection icon={Calendar} title="Galeria" defaultOpen>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
            {midiasBanco.map((url, i) => (
              <div
                key={i}
                className="h-32 w-44 shrink-0 md:shrink md:h-48 md:w-full md:aspect-square overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={imageUrl(url)}
                  alt={`${nome} ${i + 1}`}
                  className="h-full w-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  )
}