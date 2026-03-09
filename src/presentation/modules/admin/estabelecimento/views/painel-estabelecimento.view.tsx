"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Grid3X3,
  UtensilsCrossed,
  Gift,
  CalendarCheck,
  BarChart3,
  Menu,
  ChevronRight,
} from "lucide-react";
import { useEstabelecimentoAdminStore } from "../store/estabelecimento-admin.store";
import { OnboardingFlow } from "../components/OnboardingFlow";
import { DashboardOverview } from "../components/DashboardOverview";
import { BusinessProfileEditor } from "../components/BusinessProfileEditor";
import { SubscriptionManager } from "../components/SubscriptionManager";
import { ServicesMarketplace } from "../components/ServicesMarketplace";
import { DigitalMenuManager } from "../components/DigitalMenuManager";
import { PromotionManager } from "../components/PromotionManager";
import { BookingManager } from "../components/BookingManager";
import { AnalyticsDashboard } from "../components/AnalyticsDashboard";
import { Button } from "@/presentation/shared/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/presentation/shared/components/ui/sheet";
import { ScrollArea } from "@/presentation/shared/components/ui/scroll-area";
import { cn } from "@/presentation/shared/lib/utils";

type Secao =
  | "dashboard"
  | "perfil"
  | "assinatura"
  | "servicos"
  | "menu"
  | "promocoes"
  | "agendamentos"
  | "analytics";

const NAV_ITEMS: { id: Secao; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Visão geral", icon: LayoutDashboard },
  { id: "perfil", label: "Estabelecimento", icon: Building2 },
  { id: "assinatura", label: "Plano", icon: CreditCard },
  { id: "servicos", label: "Serviços", icon: Grid3X3 },
  { id: "menu", label: "Menu digital", icon: UtensilsCrossed },
  { id: "promocoes", label: "Promoções", icon: Gift },
  { id: "agendamentos", label: "Agendamentos", icon: CalendarCheck },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

function ConteudoPainel({ secao }: { secao: Secao }) {
  switch (secao) {
    case "dashboard":
      return <DashboardOverview />;
    case "perfil":
      return <BusinessProfileEditor />;
    case "assinatura":
      return <SubscriptionManager />;
    case "servicos":
      return <ServicesMarketplace />;
    case "menu":
      return <DigitalMenuManager />;
    case "promocoes":
      return <PromotionManager />;
    case "agendamentos":
      return <BookingManager />;
    case "analytics":
      return <AnalyticsDashboard />;
    default:
      return <DashboardOverview />;
  }
}

interface NavConteudoProps {
  secao: Secao;
  onSelecionar: (id: Secao) => void;
}

function NavConteudo({ secao, onSelecionar }: NavConteudoProps) {
  return (
    <nav className="flex flex-col gap-1 p-2">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const ativo = secao === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelecionar(item.id)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              ativo
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
            {ativo && <ChevronRight className="size-4 ml-auto" />}
          </button>
        );
      })}
    </nav>
  );
}

export function PainelEstabelecimentoView() {
  const { onboardingConcluido, perfil, hydrate } = useEstabelecimentoAdminStore();
  const [secao, setSecao] = useState<Secao>("dashboard");
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const handleSelecionar = (id: Secao) => {
    setSecao(id);
    setMenuAberto(false);
  };

  if (!onboardingConcluido) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Sheet open={menuAberto} onOpenChange={setMenuAberto}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="py-4">
              <p className="px-4 text-sm font-semibold text-foreground">{perfil.nome}</p>
              <p className="px-4 text-xs text-muted-foreground">Painel do estabelecimento</p>
            </div>
            <ScrollArea className="h-[calc(100vh-5rem)]">
              <NavConteudo secao={secao} onSelecionar={handleSelecionar} />
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <div className="flex-1">
          <h1 className="text-lg font-semibold truncate">{perfil.nome}</h1>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Painel administrativo
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/">Sair do painel</Link>
        </Button>
      </header>

      <div className="flex flex-1">
        <aside className="hidden md:flex w-56 flex-col border-r bg-muted/30">
          <div className="p-4 border-b">
            <p className="text-sm font-medium truncate">{perfil.nome}</p>
            <p className="text-xs text-muted-foreground">Guia comercial</p>
          </div>
          <ScrollArea className="flex-1">
            <NavConteudo secao={secao} onSelecionar={handleSelecionar} />
          </ScrollArea>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <motion.div
              key={secao}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ConteudoPainel secao={secao} />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
