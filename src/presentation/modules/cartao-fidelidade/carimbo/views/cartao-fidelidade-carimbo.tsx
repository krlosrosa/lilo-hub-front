'use client';
import { Coffee, Gift, Lock, Clock, FileText, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/shared/components/ui/card";
import { Badge } from "@/presentation/shared/components/ui/badge";
import { Progress } from "@/presentation/shared/components/ui/progress";
import { Button } from "@/presentation/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/presentation/shared/components/ui/dialog";
import { cn } from "@/lib/utils";

// Mock data — will come from backend
const mockData = {
  establishment: {
    id: "est_abc123",
    name: "Café Aroma",
    logo: "☕",
  },
  customer: {
    id: "cust_7f3a9b2e",
    name: "Maria Silva",
    memberSince: "Jan 2025",
    tier: "Membro Gold",
  },
  program: {
    totalStamps: 10,
    currentStamps: 6,
    reward: "1 Café Especial Grátis",
  },
  history: [
    { id: 1, date: "03/03/2026", item: "Cappuccino Grande", time: "14:32" },
    { id: 2, date: "28/02/2026", item: "Espresso Duplo", time: "09:15" },
    { id: 3, date: "24/02/2026", item: "Latte Macchiato", time: "16:45" },
    { id: 4, date: "20/02/2026", item: "Mocha", time: "11:20" },
    { id: 5, date: "15/02/2026", item: "Cappuccino", time: "08:50" },
    { id: 6, date: "10/02/2026", item: "Americano", time: "10:10" },
  ],
};

const { establishment, customer, program, history } = mockData;
const remaining = program.totalStamps - program.currentStamps;
const progressPercent = (program.currentStamps / program.totalStamps) * 100;

const CartaoFidelidadeCarimboView = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-2xl">
              {establishment.logo}
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{establishment.name}</h1>
              <p className="text-xs text-muted-foreground">Desde {customer.memberSince}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-loyalty text-loyalty-foreground border-0 font-medium">
            {customer.tier}
          </Badge>
        </div>

        {/* Stamp Card */}
        <Card className="border-0 shadow-md bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Seus Carimbos</CardTitle>
              <span className="text-sm font-medium text-muted-foreground">
                {program.currentStamps}/{program.totalStamps}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Stamp Grid */}
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: program.totalStamps }).map((_, i) => {
                const filled = i < program.currentStamps;
                return (
                  <div
                    key={i}
                    className={cn(
                      "relative flex aspect-square items-center justify-center rounded-full transition-all duration-300",
                      filled
                        ? "bg-stamp text-stamp-foreground shadow-sm scale-100"
                        : "border-2 border-dashed border-muted-foreground/25 text-muted-foreground/30"
                    )}
                  >
                    {filled ? (
                      <Coffee className="h-5 w-5" />
                    ) : (
                      <span className="text-xs font-medium">{i + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <Progress value={progressPercent} className="h-2 bg-muted" />
              <p className="text-center text-sm text-muted-foreground">
                {remaining > 0 ? (
                  <>
                    Faltam <span className="font-semibold text-foreground">{remaining}</span> para seu prêmio!
                  </>
                ) : (
                  <span className="font-semibold text-stamp">Prêmio disponível! 🎉</span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Reward Card */}
        <Card className={cn(
          "border-0 shadow-md overflow-hidden",
          remaining > 0 ? "opacity-75" : ""
        )}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
              remaining > 0 ? "bg-muted text-muted-foreground" : "bg-stamp text-stamp-foreground"
            )}>
              {remaining > 0 ? <Lock className="h-5 w-5" /> : <Gift className="h-5 w-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Prêmio</p>
              <p className="text-sm text-muted-foreground truncate">{program.reward}</p>
            </div>
            {remaining > 0 ? (
              <Badge variant="outline" className="shrink-0 text-xs">
                {remaining} restantes
              </Badge>
            ) : (
              <Badge className="shrink-0 bg-stamp text-stamp-foreground border-0">
                Resgatar
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* QR Code Button */}
        <Card className="border-0 shadow-md bg-card">
          <CardContent className="p-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-stamp text-stamp-foreground hover:bg-stamp/90 h-12 text-base font-semibold gap-2">
                  <QrCode className="h-5 w-5" />
                  Mostrar QR Code para carimbo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xs mx-auto">
                <DialogHeader className="text-center">
                  <DialogTitle className="text-center">Seu QR Code</DialogTitle>
                  <DialogDescription className="text-center">
                    Apresente ao estabelecimento para registrar seu carimbo
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="rounded-2xl border-2 border-border bg-white p-4">
                    <QRCodeSVG
                      value={JSON.stringify({
                        type: "stamp_validation",
                        customerId: customer.id,
                        establishmentId: establishment.id,
                        timestamp: new Date().toISOString(),
                      })}
                      size={200}
                      level="M"
                      bgColor="#ffffff"
                      fgColor="#1a1a1a"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-medium text-foreground">{customer.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{customer.id}</p>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    O estabelecimento irá escanear este código para validar seu ponto
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base font-semibold">Histórico</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-0 divide-y divide-border">
              {history.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                      <Coffee className="h-3.5 w-3.5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{entry.item}</p>
                      <p className="text-xs text-muted-foreground">{entry.time}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="space-y-3 pb-6 text-center">
          <p className="text-xs text-muted-foreground">
            Apresente este cartão no estabelecimento
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                <FileText className="mr-1 h-3 w-3" />
                Ver regulamento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm mx-4">
              <DialogHeader>
                <DialogTitle>Regulamento</DialogTitle>
                <DialogDescription>Termos e condições do programa de fidelidade</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>1. Cada compra qualificada garante 1 carimbo.</p>
                <p>2. Ao completar {program.totalStamps} carimbos, o cliente ganha: {program.reward}.</p>
                <p>3. O prêmio deve ser resgatado em até 30 dias após completar o cartão.</p>
                <p>4. Carimbos não são transferíveis entre clientes.</p>
                <p>5. O estabelecimento reserva-se o direito de alterar as regras do programa.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CartaoFidelidadeCarimboView;
