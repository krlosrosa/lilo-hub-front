import BottomNav from "@/presentation/modules/cartao-fidelidade/pontos/components/bottomNav";
import "./app.css";

export default function CartaoFidelidadePontosLayout({ children }: { children: React.ReactNode }) { 
  return (
    <div>
      {children}
      <BottomNav />
    </div>
  )
}