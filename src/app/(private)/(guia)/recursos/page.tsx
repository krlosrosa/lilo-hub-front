"use client";

import Link from "next/link";
import { Button } from "@/presentation/shared/components/ui/button";
import { ChevronRight } from "lucide-react";

/** Rotas do grupo (guia), exceto [territorio] e a própria página recursos */
const RECURSOS_GUIA = [
  { href: "/guia", label: "Guia comercial" },
  { href: "/raspadinha", label: "Raspadinha" },
  { href: "/cartao-fidelidade-carimbo", label: "Cartão fidelidade (carimbo)" },
  { href: "/jogo-memoria", label: "Jogo da memória" },
  { href: "/bingo-digital", label: "Bingo digital" },
  { href: "/campo-minado", label: "Campo minado" },
  { href: "/mapa-cupom", label: "Mapa cupom" },
  { href: "/pergunta-relampago", label: "Pergunta relâmpago" },
] as const;

export default function RecursosPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-6">
      <h1 className="text-xl font-bold text-foreground mb-2">Recursos</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Acesso rápido às funcionalidades do guia
      </p>
      <ul className="flex flex-col gap-2">
        {RECURSOS_GUIA.map(({ href, label }) => (
          <li key={href}>
            <Button
              variant="outline"
              className="w-full justify-between h-12 text-left"
              asChild
            >
              <Link href={href}>
                {label}
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
