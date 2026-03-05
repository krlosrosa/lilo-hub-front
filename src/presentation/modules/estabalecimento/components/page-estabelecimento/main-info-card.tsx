import { MapPin, Star } from "lucide-react";
import PlanBadge from "./plan-badge";
import { cn } from "@/lib/utils";
import { imageUrl } from "@/presentation/shared/lib/image-url";
import Image from "next/image";

type MainInfoCardPageEstabelecimentoProps = {
  isPremium: boolean;
  logoUrl: string;
  nome: string;
  ratingAvg: number;
  ratingCount: number;
  verificado: boolean;
  descricao: string;
  enderecoTexto: string;
}

export default function MainInfoCardPageEstabelecimento({ isPremium, logoUrl, nome, ratingAvg, ratingCount, verificado, descricao, enderecoTexto }: MainInfoCardPageEstabelecimentoProps) {
  return (
    <div className="rounded-2xl bg-card p-5 md:p-6 lg:p-8 shadow-lg space-y-3 md:space-y-4">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 shrink-0 overflow-hidden rounded-xl bg-muted shadow-md border-2 border-card">
          {logoUrl ? (
            <Image
            width={100}
            height={100}
            src={imageUrl(logoUrl)}
            alt={nome}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-muted" aria-hidden />
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display text-xl md:text-2xl lg:text-3xl font-extrabold text-foreground">
              {nome}
            </h1>
            {isPremium && <PlanBadge plan="premium" />}
            {verificado && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Verificado
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-0.5">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm md:text-base font-bold">
                {ratingAvg?.toFixed(1) ?? "-"}
              </span>
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              ({ratingCount ?? 0} avaliações)
            </span>
            <span className={cn("h-2 w-2 rounded-full", true ? "bg-green-500" : "bg-destructive")} />
            <span className="text-xs font-medium">{true ? "Aberto" : "Fechado"}</span>
          </div>
        </div>
      </div>
      {descricao && (
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-3xl">
          {descricao}
        </p>
      )}
      {enderecoTexto && (
        <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>{enderecoTexto}</span>
        </div>
      )}
    </div>
  )
}