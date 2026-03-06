import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isToday, isTomorrow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Service, getAvailableDates, generateAvailability } from "@/presentation/modules/agendamento/data/mock";

interface DateTimePickerProps {
  service: Service;
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
  onBack: () => void;
}

function formatDateLabel(date: Date): string {
  if (isToday(date)) return "Hoje";
  if (isTomorrow(date)) return "Amanhã";
  return format(date, "EEE, d MMM", { locale: ptBR });
}

export default function DateTimePicker({
  service,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onBack,
}: DateTimePickerProps) {
  const dates = useMemo(() => getAvailableDates(), []);

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    return generateAvailability(service.duration, selectedDate);
  }, [selectedDate, service.duration]);

  const morningSlots = timeSlots.filter(
    (s) => parseInt(s.time.split(":")[0]) < 12
  );
  const afternoonSlots = timeSlots.filter(
    (s) => {
      const h = parseInt(s.time.split(":")[0]);
      return h >= 12 && h < 17;
    }
  );
  const eveningSlots = timeSlots.filter(
    (s) => parseInt(s.time.split(":")[0]) >= 17
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      {/* Service summary */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/60">
        <span className="text-2xl">{service.icon}</span>
        <div className="flex-1">
          <p className="font-semibold text-sm">{service.name}</p>
          <p className="text-xs text-muted-foreground">
            {service.duration}min · R$ {service.price}
          </p>
        </div>
      </div>

      {/* Date selector */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          Escolha o dia
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {dates.map((date) => {
            const isSelected =
              selectedDate &&
              format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
            return (
              <button
                key={date.toISOString()}
                onClick={() => onSelectDate(date)}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all min-w-[72px] active:scale-95 ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <span className="text-[10px] uppercase font-semibold opacity-70">
                  {isToday(date)
                    ? "Hoje"
                    : isTomorrow(date)
                    ? "Amanhã"
                    : format(date, "EEE", { locale: ptBR })}
                </span>
                <span className="text-xl font-bold">{format(date, "d")}</span>
                <span className="text-[10px] opacity-70">
                  {format(date, "MMM", { locale: ptBR })}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={format(selectedDate, "yyyy-MM-dd")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {[
              { label: "Manhã", slots: morningSlots },
              { label: "Tarde", slots: afternoonSlots },
              { label: "Noite", slots: eveningSlots },
            ]
              .filter((group) => group.slots.length > 0)
              .map((group) => (
                <div key={group.label}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {group.label}
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {group.slots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => onSelectTime(slot.time)}
                        className={`py-2.5 px-1 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                          !slot.available
                            ? "bg-muted/50 text-muted-foreground/40 cursor-not-allowed line-through"
                            : selectedTime === slot.time
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "bg-card border border-border hover:border-primary/40 text-foreground"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
