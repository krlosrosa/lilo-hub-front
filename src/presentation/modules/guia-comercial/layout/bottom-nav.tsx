import { Home, Grid3X3, Search, User, Megaphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Início", icon: Home },
  { path: "/categorias", label: "Categorias", icon: Grid3X3 },
  { path: "/busca", label: "Busca", icon: Search },
  { path: "/anuncie", label: "Anuncie", icon: Megaphone },
  { path: "/perfil", label: "Perfil", icon: User },
];

const BottomNav = () => {
const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around py-1.5">
        {navItems.map((item) => {
          const isActive = false; 
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] font-medium transition-colors rounded-lg",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
