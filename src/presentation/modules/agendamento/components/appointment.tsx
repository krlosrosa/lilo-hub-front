import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Appointment } from "@/presentation/modules/agendamento/data/mock";
import { Button } from "@/presentation/shared/components/ui/button";
import {
  CalendarDays,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/presentation/shared/components/ui/dialog";

interface AppointmentListProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
  onBack: () => void;
}

export default function AppointmentList({
  appointments,
  onCancel,
  onBack,
}: AppointmentListProps) {
  const [cancelId, setCancelId] = useState<string | null>(null);

  const sorted = [...appointments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleCancel = () => {
    if (cancelId) {
      onCancel(cancelId);
      setCancelId(null);
    }
  };

  if (sorted.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <CalendarDays className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h3 className="font-semibold text-lg">Nenhum agendamento</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Seus agendamentos aparecerão aqui
        </p>
        <Button onClick={onBack} className="mt-6 rounded-xl" size="lg">
          Agendar agora
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      {sorted.map((apt, i) => {
        const date = new Date(apt.date + "T12:00:00");
        const isCancelled = apt.status === "cancelled";

        return (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-2xl border bg-card p-4 transition-all ${
              isCancelled ? "opacity-60 border-destructive/20" : "border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{apt.service.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm">{apt.service.name}</h4>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      isCancelled
                        ? "bg-destructive/10 text-destructive"
                        : "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
                    }`}
                  >
                    {isCancelled ? "Cancelado" : "Confirmado"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  com {apt.professional.name}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {format(date, "d MMM", { locale: ptBR })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {apt.time}
                  </span>
                  <span className="font-semibold text-foreground">
                    R$ {apt.service.price}
                  </span>
                </div>

                {!isCancelled && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCancelId(apt.id)}
                    className="mt-2 h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 -ml-2"
                  >
                    Cancelar agendamento
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Cancel confirmation dialog */}
      <Dialog open={!!cancelId} onOpenChange={() => setCancelId(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl mx-4">
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
            </div>
            <DialogTitle className="text-center">
              Cancelar agendamento?
            </DialogTitle>
            <DialogDescription className="text-center">
              Essa ação não pode ser desfeita. O horário será liberado para
              outros clientes.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl"
              onClick={() => setCancelId(null)}
            >
              Manter
            </Button>
            <Button
              variant="destructive"
              className="flex-1 h-12 rounded-xl"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
