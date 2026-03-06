import { motion } from "framer-motion";
import { Service, services } from "@/presentation/modules/agendamento/data/mock";
import { Clock } from "lucide-react";

interface ServiceListProps {
  onSelect: (service: Service) => void;
}

const categories = [...new Set(services.map((s) => s.category))];

export default function ServiceList({ onSelect }: ServiceListProps) {
  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-1">
            {cat}
          </h3>
          <div className="space-y-2">
            {services
              .filter((s) => s.category === cat)
              .map((service, i) => (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => onSelect(service)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-left group active:scale-[0.98]"
                >
                  <span className="text-3xl flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-secondary">
                    {service.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {service.name}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {service.duration}min
                      </span>
                      <span className="text-sm font-bold text-primary">
                        R$ {service.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
