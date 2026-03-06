import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Service, Professional } from "@/presentation/modules/agendamento/data/mock";
import { Input } from "@/presentation/shared/components/ui/input";
import { Button } from "@/presentation/shared/components/ui/button";
import { User, Phone, CalendarDays, Clock, Star, Check } from "lucide-react";

interface ConfirmStepProps {
  service: Service;
  professional: Professional;
  date: Date;
  time: string;
  customerName: string;
  customerPhone: string;
  onSetCustomerInfo: (name: string, phone: string) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export default function ConfirmStep({
  service,
  professional,
  date,
  time,
  customerName,
  customerPhone,
  onSetCustomerInfo,
  onConfirm,
  onBack,
}: ConfirmStepProps) {
  const [name, setName] = useState(customerName);
  const [phone, setPhone] = useState(customerPhone);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const handleConfirm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = "Informe seu nome";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10)
      newErrors.phone = "Informe um telefone válido";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSetCustomerInfo(name.trim(), phone.trim());
    setTimeout(onConfirm, 50);
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7)
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-5"
    >
      {/* Summary card */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="p-4 bg-secondary/40">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Resumo do agendamento
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{service.icon}</span>
            <div>
              <p className="font-bold">{service.name}</p>
              <p className="text-sm text-muted-foreground">
                {service.duration}min · R$ {service.price}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={professional.avatar}
              alt={professional.name}
              className="w-10 h-10 rounded-full bg-secondary"
            />
            <div>
              <p className="font-semibold text-sm">{professional.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-warning text-warning" />
                {professional.rating} ({professional.reviewCount})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {format(date, "EEE, d 'de' MMMM", { locale: ptBR })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-medium">{time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer info */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Seus dados
        </h3>
        <div className="space-y-3">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Seu nome"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((er) => ({ ...er, name: undefined }));
                }}
                className="pl-10 h-12 rounded-xl text-base"
              />
            </div>
            {errors.name && (
              <p className="text-xs text-destructive mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => {
                  setPhone(formatPhone(e.target.value));
                  setErrors((er) => ({ ...er, phone: undefined }));
                }}
                className="pl-10 h-12 rounded-xl text-base"
                inputMode="tel"
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-destructive mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Confirm button */}
      <Button
        onClick={handleConfirm}
        className="w-full h-14 rounded-xl text-base font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform"
        size="lg"
      >
        <Check className="w-5 h-5 mr-2" />
        Confirmar Agendamento
      </Button>
    </motion.div>
  );
}
