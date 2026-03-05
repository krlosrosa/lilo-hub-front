import { Megaphone } from "lucide-react";
import { useRouter } from "next/navigation";

const AdBanner = () => {
  const router = useRouter();

  return (
    <section className="px-4">
      <button
        onClick={() => router.push("/guia/comercial/anuncie")}
        className="w-full overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-5 text-left shadow-lg transition-transform active:scale-[0.98]"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/20">
            <Megaphone className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="space-y-0.5">
            <h3 className="font-display text-base font-bold text-primary-foreground">
              Anuncie seu Negócio
            </h3>
            <p className="text-xs text-primary-foreground/80">
              Destaque sua empresa e alcance mais clientes
            </p>
          </div>
        </div>
      </button>
    </section>
  );
};

export default AdBanner;
