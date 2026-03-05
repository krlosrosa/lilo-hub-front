"use client";

import { CollapsibleSection } from "@/presentation/shared/components/ui/collapseSection";
import { Star } from "lucide-react";
import { cn } from "@/presentation/shared/lib/utils";
import { useState } from "react";
import { useAvaliacoes } from "../../hooks/avaliacaoes.hook";
import type { AvaliacaoModel } from "@/infra/api/model";

type TestimonialsPageEstabelecimentoProps = {
  initialAvaliacoes: AvaliacaoModel[];
  /** Média e total do estabelecimento (fallback quando não há avaliações) */
  ratingAvg?: number;
  ratingCount?: number;
};

export default function TestimonialsPageEstabelecimento({
  initialAvaliacoes,
  ratingAvg: propRatingAvg = 0,
  ratingCount: propRatingCount = 0,
}: TestimonialsPageEstabelecimentoProps) {
  const { avaliacoes, form, addAvaliacao } = useAvaliacoes({
    initialAvaliacoes: initialAvaliacoes ?? [],
  });

  const list = Array.isArray(avaliacoes) ? avaliacoes : [];
  const ratingAvg =
    list.length > 0
      ? list.reduce((acc, a) => acc + (a.rating ?? 0), 0) / list.length
      : propRatingAvg;
  const ratingCount = list.length > 0 ? list.length : propRatingCount;

  const currentRating = form.watch("rating") ?? 1;
  const [hoverStars, setHoverStars] = useState(0);

  return (
    <div>
      <CollapsibleSection icon={Star} title="Avaliações" iconColor="text-accent">
        <div className="space-y-6">
          {/* Resumo */}
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="font-display text-3xl md:text-4xl font-extrabold text-foreground">
                {ratingAvg.toFixed(1)}
              </p>
              <div className="flex gap-0.5 justify-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      "h-3.5 w-3.5 md:h-4 md:w-4",
                      ratingAvg >= s ? "fill-accent text-accent" : "text-muted"
                    )}
                  />
                ))}
              </div>
              <p className="mt-1 text-[10px] md:text-xs text-muted-foreground">
                {ratingCount} avaliações
              </p>
            </div>
          </div>

          {/* Lista de avaliações */}
          {list.length > 0 && (
            <section
              className="space-y-3"
              aria-label="Lista de avaliações"
            >
              {list.map((av) => (
                <AvaliacaoCard key={av.id} avaliacao={av} />
              ))}
            </section>
          )}

          {/* Formulário: enviar avaliação */}
          <form
            onSubmit={addAvaliacao}
            className="rounded-xl border bg-muted/30 p-4 space-y-4"
            aria-label="Enviar avaliação"
          >
            <p className="text-sm font-medium text-foreground">
              Envie sua avaliação
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="p-0.5 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  onMouseEnter={() => setHoverStars(s)}
                  onMouseLeave={() => setHoverStars(0)}
                  onClick={() => form.setValue("rating", s, { shouldValidate: true })}
                  aria-label={`${s} estrela(s)`}
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-colors",
                      (hoverStars || currentRating) >= s
                        ? "fill-accent text-accent"
                        : "text-muted"
                    )}
                  />
                </button>
              ))}
            </div>
            <div>
              <label htmlFor="comentario" className="sr-only">
                Comentário (opcional)
              </label>
              <textarea
                id="comentario"
                placeholder="Comentário (opcional)"
                className="w-full min-h-[80px] rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                rows={3}
                {...form.register("comentario")}
              />
              {form.formState.errors.comentario && (
                <p className="mt-1 text-xs text-destructive">
                  {form.formState.errors.comentario.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
            >
              {form.formState.isSubmitting ? "Enviando..." : "Enviar avaliação"}
            </button>
          </form>
        </div>
      </CollapsibleSection>
    </div>
  );
}

function AvaliacaoCard({ avaliacao }: { avaliacao: AvaliacaoModel }) {
  const stars = avaliacao.rating ?? 0;
  const date =
    avaliacao.createdAt &&
    new Date(avaliacao.createdAt).toLocaleDateString("pt-BR");

  return (
    <article
      className="rounded-xl border bg-muted/30 p-4"
      aria-label={`Avaliação ${stars} estrelas`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={cn(
                "h-4 w-4",
                stars >= s ? "fill-accent text-accent" : "text-muted"
              )}
            />
          ))}
        </div>
        {date && (
          <span className="text-[10px] text-muted-foreground">{date}</span>
        )}
      </div>
      {avaliacao.comentario && (
        <p className="text-sm text-foreground">{avaliacao.comentario}</p>
      )}
    </article>
  );
}
