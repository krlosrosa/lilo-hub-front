import { MessageCircle } from "lucide-react";
import { Phone } from "lucide-react";

type StickyBarPageEstabelecimentoProps = {
  whatsappLink: string;
  telefone: string;
}


export default function StickyBarPageEstabelecimento({ whatsappLink, telefone }: StickyBarPageEstabelecimentoProps) {
  return (
    <div>
      <div className="fixed bottom-5 left-0 right-0 z-30 px-4 md:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
          <div className="flex gap-2 rounded-2xl bg-card/95 p-3 shadow-2xl backdrop-blur-md border border-border">
            <a
              href={whatsappLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 py-3 text-sm font-bold text-white transition-transform active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={
                telefone
                  ? `tel:${telefone}`
                  : "#"
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-transform active:scale-95"
            >
              <Phone className="h-4 w-4" />
              Ligar Agora
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}