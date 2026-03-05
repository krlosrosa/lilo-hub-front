import { cn } from "@/lib/utils";
import { imageUrl } from "@/presentation/shared/lib/image-url";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import Image from "next/image";

type HeroProps = {
  isPremium: boolean;
  coverUrl: string;
  nome: string;
}

export default function HeroPageEstabelecimento({ isPremium, coverUrl, nome }: HeroProps) {
  const src = coverUrl ? imageUrl(coverUrl) : "";
  return (
    <div className={cn("relative overflow-hidden", isPremium ? "h-72" : "h-56")}>
      {src ? (
        <Image
          fill
          src={src}
          alt={nome}
          className="object-cover"
          sizes="100vw"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-muted" aria-hidden />
      )}
      <div className={cn(
        "absolute inset-0",
        isPremium
          ? "bg-linear-to-t from-foreground/80 via-foreground/30 to-transparent"
          : "bg-linear-to-t from-foreground/60 to-transparent"
      )} />
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-4">
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-background/20 backdrop-blur-md">
          <ArrowLeft className="h-5 w-5 text-primary-foreground" />
        </button>
        <div className="flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-background/20 backdrop-blur-md">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-background/20 backdrop-blur-md">
            <Share2 className="h-4 w-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}