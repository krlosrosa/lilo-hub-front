import { Truck, Clock, ShieldCheck, Wifi } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Truck, Clock, ShieldCheck, Wifi };

type AboutSectionProps = {
  label: string;
  description: string;
}

const AboutSection = ({ label, description }: AboutSectionProps) => {

  return (
    <section id="about" className="px-4 py-10 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: `hsl(var(--theme-primary))` }}>
        {label}
      </h2>
      <p className="text-sm sm:text-base leading-relaxed text-foreground/80 mb-8">
        {description}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => {
          const Icon = iconMap[`Truck`];
          return (
            <div
              key={index}
              className="rounded-xl p-4 text-center shadow-sm border transition-transform hover:scale-105"
              style={{ backgroundColor: `hsl(var(--theme-bg))` }}
            >
              <div
                className="mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `hsl(var(--theme-primary) / 0.15)` }}
              >
                <Icon className="w-5 h-5" style={{ color: `hsl(var(--theme-primary))` }} />
              </div>
              <p className="font-semibold text-sm">{`Label ${index + 1}`}</p>
              <p className="text-xs text-muted-foreground mt-1">{`Descrição ${index + 1}`}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutSection;