"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
  import { useRouter } from "next/navigation";

export interface Story {
  id: string;
  businessId: string;
  businessName: string;
  businessLogo: string;
  image: string;
  title: string;
  subtitle?: string;
  gradientFrom: string;
  gradientTo: string;
  seen?: boolean;
}

const stories: Story[] = [
  {
    id: "s1",
    businessId: "1",
    businessName: "Sabor & Arte",
    businessLogo: "/placeholder.svg",
    image: "/placeholder.svg",
    title: "20% OFF no Jantar!",
    subtitle: "De segunda a quinta",
    gradientFrom: "hsl(0 72% 51%)",
    gradientTo: "hsl(25 80% 45%)",
  },
  {
    id: "s2",
    businessId: "3",
    businessName: "Beleza Pura",
    businessLogo: "/placeholder.svg",
    image: "/placeholder.svg",
    title: "Combo Escova + Hidratação",
    subtitle: "Por apenas R$49",
    gradientFrom: "hsl(280 68% 60%)",
    gradientTo: "hsl(320 70% 55%)",
  },
  {
    id: "s3",
    businessId: "5",
    businessName: "FitMax",
    businessLogo: "/placeholder.svg",
    image: "/placeholder.svg",
    title: "1ª Mensalidade Grátis!",
    subtitle: "Para novos alunos",
    gradientFrom: "hsl(142 70% 40%)",
    gradientTo: "hsl(168 80% 36%)",
  },
  {
    id: "s4",
    businessId: "10",
    businessName: "Boutique",
    businessLogo: "/placeholder.svg",
    image: "/placeholder.svg",
    title: "30% em Vestidos",
    subtitle: "Coleção de festa",
    gradientFrom: "hsl(340 82% 52%)",
    gradientTo: "hsl(280 68% 60%)",
  },
  {
    id: "s5",
    businessId: "2",
    businessName: "Clínica Vida",
    businessLogo: "/placeholder.svg",
    image: "/placeholder.svg",
    title: "Check-up Completo",
    subtitle: "Consulta + exames",
    gradientFrom: "hsl(200 80% 45%)",
    gradientTo: "hsl(210 90% 55%)",
  },
  {
    id: "s6",
    businessId: "4",
    businessName: "TechSolve",
    businessLogo: "/placeholder.svg",
    image: "/placeholder.svg",
    title: "Manutenção com 15% OFF",
    subtitle: "Qualquer serviço",
    gradientFrom: "hsl(38 92% 50%)",
    gradientTo: "hsl(25 80% 45%)",
  },
];

const PromotionsStories = () => {
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [seenStories, setSeenStories] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const openStory = (index: number) => {
    setActiveStory(index);
    setProgress(0);
    setSeenStories((prev) => new Set(prev).add(stories[index].id));
  };

  const closeStory = () => {
    setActiveStory(null);
    setProgress(0);
  };

  const nextStory = useCallback(() => {
    if (activeStory !== null && activeStory < stories.length - 1) {
      const next = activeStory + 1;
      setActiveStory(next);
      setProgress(0);
      setSeenStories((prev) => new Set(prev).add(stories[next].id));
    } else {
      closeStory();
    }
  }, [activeStory]);

  const prevStory = useCallback(() => {
    if (activeStory !== null && activeStory > 0) {
      setActiveStory(activeStory - 1);
      setProgress(0);
    }
  }, [activeStory]);

  const goToBusiness = (businessId: string) => {
    closeStory();
    router.push(`/guia/comercial/${businessId}`);
  };

  // Auto-advance timer
  useEffect(() => {
    if (activeStory === null) return;
    setTimeout(() => {
      setProgress(0);
    }, 0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          nextStory();
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [activeStory, nextStory]);

  return (
    <>
      {/* Stories Row */}
      <div className="flex gap-3 overflow-x-auto px-4 py-2 scrollbar-hide">
        {stories.map((story, index) => {
          const isSeen = seenStories.has(story.id);
          return (
            <button
              key={story.id}
              onClick={() => openStory(index)}
              className="flex shrink-0 flex-col items-center gap-1.5 group"
            >
              <div
                className={`rounded-full p-[2.5px] transition-all duration-300 ${
                  isSeen ? "bg-muted" : ""
                }`}
                style={
                  !isSeen
                    ? {
                        background: `linear-gradient(135deg, ${story.gradientFrom}, ${story.gradientTo})`,
                      }
                    : undefined
                }
              >
                <div className="h-[62px] w-[62px] rounded-full border-[2.5px] border-card overflow-hidden bg-muted group-hover:scale-105 transition-transform duration-200">
                  <img
                    src={story.businessLogo}
                    alt={story.businessName}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[10px] font-medium text-foreground/80 max-w-[68px] truncate">
                {story.businessName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Story Viewer */}
      {activeStory !== null && (
        <StoryViewer
          stories={stories}
          activeIndex={activeStory}
          progress={progress}
          onClose={closeStory}
          onNext={nextStory}
          onPrev={prevStory}
          onGoToBusiness={goToBusiness}
        />
      )}
    </>
  );
};

interface StoryViewerProps {
  stories: Story[];
  activeIndex: number;
  progress: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onGoToBusiness: (id: string) => void;
}

const StoryViewer = ({
  stories,
  activeIndex,
  progress,
  onClose,
  onNext,
  onPrev,
  onGoToBusiness,
}: StoryViewerProps) => {
  const story = stories[activeIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black animate-fade-in">
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 px-2 pt-2">
        {stories.map((s, i) => (
          <div key={s.id} className="h-[3px] flex-1 rounded-full bg-white/25 overflow-hidden">
            <div
              className="h-full rounded-full bg-white transition-all duration-100 ease-linear"
              style={{
                width:
                  i < activeIndex
                    ? "100%"
                    : i === activeIndex
                    ? `${progress}%`
                    : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-5 left-0 right-0 z-10 flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white/30 bg-white/10">
            <img
              src={story.businessLogo}
              alt={story.businessName}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-sm font-bold text-white drop-shadow-lg">
            {story.businessName}
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Story Content */}
      <div
        className="flex h-full w-full flex-col items-center justify-center px-8"
        style={{
          background: `linear-gradient(160deg, ${story.gradientFrom}, ${story.gradientTo})`,
        }}
      >
        <div className="animate-scale-in space-y-4 text-center">
          <div className="mx-auto h-20 w-20 rounded-2xl overflow-hidden border-2 border-white/30 bg-white/15 backdrop-blur-sm shadow-2xl">
            <img
              src={story.image}
              alt={story.title}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-extrabold text-white drop-shadow-lg leading-tight">
            {story.title}
          </h2>
          {story.subtitle && (
            <p className="text-base text-white/85 font-medium drop-shadow">
              {story.subtitle}
            </p>
          )}
          <button
            onClick={() => onGoToBusiness(story.businessId)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm border border-white/25 hover:bg-white/30 transition-colors"
          >
            Ver mais <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Navigation zones */}
      <button
        onClick={onPrev}
        className="absolute left-0 top-16 bottom-20 w-1/3"
        aria-label="Anterior"
      />
      <button
        onClick={onNext}
        className="absolute right-0 top-16 bottom-20 w-1/3"
        aria-label="Próximo"
      />

      {/* Navigation arrows (desktop hint) */}
      {activeIndex > 0 && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
          <ChevronLeft className="h-5 w-5" />
        </div>
      )}
      {activeIndex < stories.length - 1 && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
          <ChevronRight className="h-5 w-5" />
        </div>
      )}
    </div>
  );
};

export default PromotionsStories;
