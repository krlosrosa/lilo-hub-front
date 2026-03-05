import { CollapsibleSection } from "@/presentation/shared/components/ui/collapseSection";
import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Globe } from "lucide-react";
import { RedeSocialModel } from "@/infra/api/model";

type SocialPageEstabelecimentoProps = {
  redesSociais: RedeSocialModel[];
}

export default function SocialPageEstabelecimento({ redesSociais }: SocialPageEstabelecimentoProps) {
  return (
    <div>
      {redesSociais.length > 0 && (
        <CollapsibleSection
          icon={Instagram}
          title="Redes Sociais"
          iconColor="text-pink-500"
        >
          <div className="flex flex-wrap gap-2">
            {redesSociais.map((r) => {
              const href = r.url || "#";
              const label = r.label || r.tipo;
              const isInstagram =
                r.tipo.toLowerCase() === "instagram";
              const isFacebook = r.tipo.toLowerCase() === "facebook";
              return (
                <a
                  key={r.id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-secondary/50 px-4 py-3 transition-transform active:scale-95 hover:bg-secondary/70"
                >
                  {isInstagram && (
                    <Instagram className="h-5 w-5 text-pink-500" />
                  )}
                  {isFacebook && (
                    <Facebook className="h-5 w-5 text-blue-600" />
                  )}
                  {!isInstagram && !isFacebook && (
                    <Globe className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className="text-xs md:text-sm font-medium text-foreground">
                    {label}
                  </span>
                </a>
              );
            })}
          </div>
        </CollapsibleSection>
      )}
    </div>
  )
}