import { HorarioModel } from "@/infra/api/model";
import { CollapsibleSection } from "@/presentation/shared/components/ui/collapseSection";
import { Clock } from "lucide-react";

const DIAS = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

type HoursPageEstabelecimentoProps = {
  horarios: HorarioModel[];
}

export default function HoursPageEstabelecimento({ horarios }: HoursPageEstabelecimentoProps) {
  const list = Array.isArray(horarios) ? horarios : [];
  return (
    <CollapsibleSection
      icon={Clock}
      title="Horário de Funcionamento"
      iconColor="text-muted-foreground"
    >
      {list.length === 0 ? (
        <p className="text-sm md:text-base text-muted-foreground">
          Horários não informados.
        </p>
      ) : (
        list.map((h, i) => (
        <div key={i} className="flex justify-between text-sm md:text-base">
          <span className="text-muted-foreground">
            {DIAS[h.diaSemana] ?? `Dia ${h.diaSemana}`}
          </span>
          <span className="font-medium text-foreground">
            {h.isClosed
              ? "Fechado"
              : `${h.abre} - ${h.fecha}`}
          </span>
        </div>
        ))
      )}
    </CollapsibleSection>
  );
}