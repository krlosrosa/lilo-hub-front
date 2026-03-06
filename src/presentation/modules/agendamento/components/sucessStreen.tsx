import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Appointment } from "@/presentation/modules/agendamento/data/mock";
import { Button } from "@/presentation/shared/components/ui/button";
import { CheckCircle2, CalendarDays, Clock, MapPin, Plus } from "lucide-react";
import { business } from "@/presentation/modules/agendamento/data/mock";

interface SuccessScreenProps {
  appointment: Appointment;
  onNewBooking: () => void;
  onViewAppointments: () => void;
}

export default function SuccessScreen({
  appointment,
  onNewBooking,
  onViewAppointments,
}: SuccessScreenProps) {
  const date = new Date(appointment.date + "T12:00:00");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <div className="w-20 h-20 rounded-full bg-[hsl(var(--success))] flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-10 h-10 text-[hsl(var(--success-foreground))]" />
        </div>
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold">Agendamento confirmado!</h2>
        <p className="text-muted-foreground mt-1">
          Tudo pronto, {appointment.customerName.split(" ")[0]}!
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full rounded-2xl border border-border bg-card p-5 text-left space-y-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{appointment.service.icon}</span>
          <div>
            <p className="font-bold">{appointment.service.name}</p>
            <p className="text-sm text-muted-foreground">
              com {appointment.professional.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>{format(date, "EEE, d MMM", { locale: ptBR })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{appointment.time}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{business.address}</span>
        </div>
      </motion.div>

      <div className="w-full space-y-3 pt-2">
        <Button
          onClick={onViewAppointments}
          variant="outline"
          className="w-full h-12 rounded-xl font-semibold"
        >
          Ver meus agendamentos
        </Button>
        <Button
          onClick={onNewBooking}
          variant="ghost"
          className="w-full h-12 rounded-xl font-semibold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo agendamento
        </Button>
      </div>
    </motion.div>
  );
}
