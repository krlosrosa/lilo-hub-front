'use client';
import {
  ArrowLeft, Star, MapPin, Phone, MessageCircle, Globe, Navigation,
  Clock, Instagram, Facebook, Share2, CheckCircle2, Quote, Sparkles,
  Gift, Calendar, Users, Award, ChevronRight, Heart,
} from "lucide-react";
import { getBusinessById, coupons } from "../data/mock.data";
import PlanBadge from "../components/plan-badge";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/presentation/shared/components/ui/collapsible";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CollapsibleSection = ({
  icon: Icon,
  title,
  iconColor = "text-primary",
  defaultOpen = false,
  children,
}: {
  icon: React.ElementType;
  title: string;
  iconColor?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="rounded-2xl bg-card shadow-sm overflow-hidden">
        <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left">
          <div className="flex items-center gap-2">
            <Icon className={cn("h-4 w-4", iconColor)} />
            <h2 className="font-display text-sm font-bold text-foreground">{title}</h2>
          </div>
          <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", open && "rotate-90")} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-3">
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

const LandPageView = () => {
  const router = useRouter();
  const biz = getBusinessById('1');

  if (!biz) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Empresa não encontrada</p>
      </div>
    );
  }

  const isPaid = biz.plan !== "free";
  const isPremium = biz.plan === "premium";
  const isGoldOrAbove = biz.plan === "premium" || biz.plan === "gold";
  const bizCoupons = coupons.filter(c => c.businessId === biz.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className={cn("relative", isPremium ? "h-72" : "h-56")}>
        <img src={biz.images[0]} alt={biz.name} className="h-full w-full object-cover" />
        <div className={cn(
          "absolute inset-0",
          isPremium
            ? "bg-linear-to-t from-foreground/80 via-foreground/30 to-transparent"
            : "bg-linear-to-t from-foreground/60 to-transparent"
        )} />
        <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="flex h-9 w-9 items-center justify-center rounded-full bg-background/20 backdrop-blur-md">
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
        {isPremium && biz.slogan && (
          <div className="absolute bottom-6 left-4 right-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
              {biz.yearFounded && `Desde ${biz.yearFounded}`}
            </p>
            <p className="mt-1 font-display text-lg font-bold italic text-primary-foreground">
              &quot;{biz.slogan}&quot;
            </p>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-lg relative z-10 px-4 space-y-4 pb-28" style={{ marginTop: "-3rem" }}>
        {/* Main Info Card */}
        <div className={cn(
          "rounded-2xl bg-card p-5 shadow-lg space-y-3",
          isPremium && "border border-primary/20 shadow-primary/10 shadow-xl"
        )}>
          <div className="flex items-start gap-3">
            <div className={cn(
              "h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted shadow-md",
              isPremium ? "border-2 border-primary" : "border-2 border-card"
            )}>
              <img src={biz.logo} alt={biz.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-xl font-extrabold text-foreground">{biz.name}</h1>
                {isPaid && <PlanBadge plan={biz.plan} />}
              </div>
              <p className="text-xs text-muted-foreground">{biz.category}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-bold">{biz.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">({biz.reviewCount} avaliações)</span>
                <span className={cn("h-2 w-2 rounded-full", biz.isOpen ? "bg-green-500" : "bg-destructive")} />
                <span className="text-xs font-medium">{biz.isOpen ? "Aberto" : "Fechado"}</span>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{biz.description}</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{biz.address}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { href: `https://wa.me/${biz.whatsapp}`, icon: MessageCircle, label: "WhatsApp", color: "bg-green-500" },
            { href: `tel:${biz.phone}`, icon: Phone, label: "Ligar", color: "bg-primary" },
            { href: biz.website || "#", icon: Globe, label: "Site", color: "bg-muted-foreground" },
            { href: `https://maps.google.com/?q=${encodeURIComponent(biz.address)}`, icon: Navigation, label: "Rota", color: "bg-accent" },
          ].map((action) => (
            <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-xl bg-card p-3 shadow-sm transition-transform active:scale-95">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white", action.color)}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-medium text-foreground">{action.label}</span>
            </a>
          ))}
        </div>

        {/* Special Offer Banner */}
        {isGoldOrAbove && biz.specialOffer && (
          <div className={cn(
            "rounded-2xl p-4 shadow-sm",
            isPremium
              ? "bg-linear-to-r from-primary to-primary/80 text-primary-foreground"
              : "bg-linear-to-r from-accent to-accent/80 text-accent-foreground"
          )}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                <Gift className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Oferta Especial</p>
                <p className="text-sm font-bold">{biz.specialOffer}</p>
              </div>
            </div>
          </div>
        )}

        {/* === COLLAPSIBLE SECTIONS === */}

        {/* Highlights */}
        {isGoldOrAbove && biz.highlights && biz.highlights.length > 0 && (
          <CollapsibleSection icon={Sparkles} title="Por que nos escolher" defaultOpen={true}>
            {biz.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{h}</span>
              </div>
            ))}
          </CollapsibleSection>
        )}

        {/* About */}
        {isPremium && biz.longDescription && (
          <CollapsibleSection icon={Users} title="Sobre Nós" defaultOpen={true}>
            <p className="text-sm leading-relaxed text-muted-foreground">{biz.longDescription}</p>
          </CollapsibleSection>
        )}

        {/* Services */}
        {isGoldOrAbove && biz.services && biz.services.length > 0 && (
          <CollapsibleSection icon={Award} title="Nossos Serviços" defaultOpen={true}>
            {biz.services.map((s, i) => (
              <div key={i} className="flex items-start justify-between gap-3 rounded-xl bg-secondary/50 p-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
                {s.price && (
                  <span className="shrink-0 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    {s.price}
                  </span>
                )}
              </div>
            ))}
          </CollapsibleSection>
        )}

        {/* Gallery */}
        {isPremium && biz.images.length > 1 && (
          <CollapsibleSection icon={Calendar} title="Galeria" defaultOpen={true}>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {biz.images.map((img, i) => (
                <div key={i} className="h-32 w-44 shrink-0 overflow-hidden rounded-xl bg-muted">
                  <img src={img} alt={`${biz.name} ${i + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Coupons */}
        {bizCoupons.length > 0 && (
          <CollapsibleSection icon={Gift} title="Cupons Disponíveis" iconColor="text-accent" defaultOpen={true}>
            {bizCoupons.map(c => (
              <div key={c.id} className="flex items-center justify-between rounded-xl border border-dashed border-accent/50 bg-accent/5 p-3">
                <div>
                  <p className="text-sm font-bold text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.description}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-extrabold text-accent">{c.discount}</p>
                  <p className="text-[10px] text-muted-foreground">Código: {c.code}</p>
                </div>
              </div>
            ))}
          </CollapsibleSection>
        )}

        {/* Testimonials */}
        {isGoldOrAbove && biz.testimonials && biz.testimonials.length > 0 && (
          <CollapsibleSection icon={Quote} title="O que dizem nossos clientes">
            {biz.testimonials.map((t, i) => (
              <div key={i} className="rounded-xl bg-secondary/50 p-3.5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={cn("h-3 w-3", s <= t.rating ? "fill-accent text-accent" : "text-muted")} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{t.text}</p>
              </div>
            ))}
          </CollapsibleSection>
        )}

        {/* Hours */}
        <CollapsibleSection icon={Clock} title="Horário de Funcionamento" iconColor="text-muted-foreground">
          {biz.hours.map((h, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{h.day}</span>
              <span className="font-medium text-foreground">{h.open} - {h.close}</span>
            </div>
          ))}
        </CollapsibleSection>

        {/* Reviews */}
        <CollapsibleSection icon={Star} title="Avaliações" iconColor="text-accent">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="font-display text-3xl font-extrabold text-foreground">{biz.rating}</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={cn("h-3.5 w-3.5", s <= Math.round(biz.rating) ? "fill-accent text-accent" : "text-muted")} />
                ))}
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">{biz.reviewCount} avaliações</p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-3 text-[10px] text-muted-foreground">{s}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${s === 5 ? 65 : s === 4 ? 25 : s === 3 ? 7 : s === 2 ? 2 : 1}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        {/* Social */}
        {biz.social && (
          <CollapsibleSection icon={Instagram} title="Redes Sociais" iconColor="text-pink-500">
            <div className="flex flex-wrap gap-2">
              {biz.social.instagram && (
                <a href={`https://instagram.com/${biz.social.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-secondary/50 px-4 py-3 transition-transform active:scale-95">
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <span className="text-xs font-medium text-foreground">{biz.social.instagram}</span>
                </a>
              )}
              {biz.social.facebook && (
                <a href={`https://facebook.com/${biz.social.facebook}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-secondary/50 px-4 py-3 transition-transform active:scale-95">
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <span className="text-xs font-medium text-foreground">Facebook</span>
                </a>
              )}
            </div>
          </CollapsibleSection>
        )}

        {/* CTA sticky bar for premium */}
        {isPremium && (
          <div className="fixed bottom-20 left-0 right-0 z-30 px-4">
            <div className="mx-auto max-w-lg">
              <div className="flex gap-2 rounded-2xl bg-card/95 p-3 shadow-2xl backdrop-blur-md border border-border">
                <a href={`https://wa.me/${biz.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 py-3 text-sm font-bold text-white transition-transform active:scale-95">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a href={`tel:${biz.phone}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-transform active:scale-95">
                  <Phone className="h-4 w-4" />
                  Ligar Agora
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandPageView;
