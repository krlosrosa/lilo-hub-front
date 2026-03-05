import AboutSection from "./components/aboutSection";
import HeroSection from "./components/heroSection";

type HotsiteViewProps = {
  label: string;
  description: string;
}

export function HotsiteView({ label, description }: HotsiteViewProps) {
  return (
    <div>
      <HeroSection />
      <AboutSection label={label} description={description} />
      <footer className="py-6 text-center text-xs text-muted-foreground border-t">
          <p>© 2026 {label}. Todos os direitos reservados.</p>
          <p className="mt-1">Feito com ❤️ pelo Guia Comercial</p>
        </footer>
    </div>
  )
}