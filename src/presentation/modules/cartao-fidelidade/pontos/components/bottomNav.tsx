import { cn } from "@/lib/utils";
import { Home, Gift, Clock, User, Bell } from "lucide-react";
import Link from "next/link";

const navItems = [
  { to: "/cartao-fidelidade-pontos", icon: Home, label: "Início" },
  { to: "/cartao-fidelidade-pontos/reward", icon: Gift, label: "Recompensas" },
  { to: "/cartao-fidelidade-pontos/history", icon: Clock, label: "Histórico" },
  { to: "/cartao-fidelidade-pontos/profile", icon: User, label: "Perfil" },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card safe-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            href={item.to}
            className={cn("flex flex-col items-center gap-0.5 rounded-xl px-4 py-2 text-xs font-medium transition-colors", item.to === "/rewards" ? "text-primary" : "text-muted-foreground hover:text-foreground")}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
