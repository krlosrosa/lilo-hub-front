"use client";
import { useRouter } from "next/navigation";
import { categories } from "../data/mock-data";

const CategoryGrid = () => {
  const router = useRouter();

  return (
    <section className="space-y-3">
      <h2 className="px-4 font-display text-lg font-bold text-foreground">Categorias</h2>
      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => router.push(`/guia/comercial/categoria/${cat.id}`)}
              className="flex shrink-0 flex-col items-center gap-2 rounded-2xl bg-card p-3 shadow-sm transition-transform active:scale-95"
              style={{ minWidth: 76 }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: cat.color + "18" }}
              >
                <Icon className="h-6 w-6" style={{ color: cat.color }} />
              </div>
              <span className="text-[11px] font-medium text-foreground">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
