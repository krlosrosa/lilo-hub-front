import { cn } from "@/lib/utils"
import { Globe, MessageCircle, Navigation, Phone } from "lucide-react";

type ActionsButtonsPageEstabelecimentoProps = {
  whatsappLink: string;
  telefone: string;
  siteLink: string;
  enderecoTexto: string;
  mapsQuery: string;
}

export default function ActionsButtonsPageEstabelecimento({ whatsappLink, telefone, siteLink, enderecoTexto, mapsQuery }: ActionsButtonsPageEstabelecimentoProps) {

  const actions = [
    {
      href: whatsappLink || "#",
      icon: MessageCircle,
      label: "WhatsApp",
      color: "bg-green-500",
    },
    {
      href: telefone
        ? `tel:${telefone}`
        : "#",
      icon: Phone,
      label: "Ligar",
      color: "bg-primary",
    },
    {
      href: siteLink || "#",
      icon: Globe,
      label: "Site",
      color: "bg-muted-foreground",
    },
    {
      href: enderecoTexto
        ? `https://maps.google.com/?q=${mapsQuery}`
        : "#",
      icon: Navigation,
      label: "Rota",
      color: "bg-accent",
    },
  ]
  return (
    <div className="grid grid-cols-4 gap-2">
    {actions.map((action) => (
      <a
        key={action.label}
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1.5 rounded-xl bg-card p-3 md:px-5 md:py-3 shadow-sm transition-transform active:scale-95 hover:shadow-md hover:scale-[1.02]"
      >
        <div
          className={cn(
            "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full text-white",
            action.color
          )}
        >
          <action.icon className="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <span className="text-[11px] md:text-sm font-medium text-foreground">
          {action.label}
        </span>
      </a>
    ))}
  </div>
  )
}