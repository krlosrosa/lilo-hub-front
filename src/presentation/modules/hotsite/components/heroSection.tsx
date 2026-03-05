'use client';
import { MessageCircle, Tag, Star, Settings } from "lucide-react";
import { Button } from "@/presentation/shared/components/ui/button";

import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  const whatsappUrl = `https://wa.me/5511999999999`;

  return (
    <section className="relative w-full">
      {/* Cover Image */}
      <div className="relative h-56 sm:h-72 md:h-80 w-full overflow-hidden">
        <img
          src={"https://timelinecovers.pro/facebook-cover/download/life-facebook-cover.jpg"}
          alt={"Capa de"}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 g-linear-to-b from-black/30 via-transparent to-black/60" />
        {/* Admin link */}
        <button
          onClick={() => router.push("/admin")}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow hover:bg-white transition-colors"
          title="Painel Admin"
        >
          <Settings className="w-4 h-4 text-foreground/70" />
        </button>
      </div>

      {/* Logo + Info */}
      <div className="relative -mt-16 px-4 pb-6 text-center">
        <div className="mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
          <img
            src={"https://images.vexels.com/media/users/3/142789/isolated/preview/2bfb04ad814c4995f0c537c68db5cd0b-logotipo-do-circulo-multicolorido.png"}
            alt={"Logo"}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold" style={{ color: `hsl(var(--theme-primary))` }}>
          {"Estabelecimento"}
        </h1>
        <p className="text-sm sm:text-base mt-1" style={{ color: `hsl(var(--theme-secondary))` }}>
          {"Categoria"}
        </p>
        <div className="mt-2">
          <div className="w-10 h-10 bg-green-500 rounded-full"></div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              className="text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: `hsl(var(--theme-button))` }}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Falar no WhatsApp
            </Button>
          </a>
          <Button
            variant="outline"
            className="font-semibold border-2 transition-all"
            style={{
              borderColor: `hsl(var(--theme-primary))`,
              color: `hsl(var(--theme-primary))`,
            }}
            onClick={() => document.getElementById("promos")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Tag className="w-4 h-4 mr-1" />
            Ver Promoções
          </Button>
          <Button
            variant="outline"
            className="font-semibold border-2 transition-all"
            style={{
              borderColor: `hsl(var(--theme-secondary))`,
              color: `hsl(var(--theme-secondary))`,
            }}
            onClick={() => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Star className="w-4 h-4 mr-1" />
            Avaliar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;