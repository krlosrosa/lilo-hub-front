import { CartProvider } from "@/presentation/modules/cardapio-digital/hooks/contexto";
import CardapioDigitalView from "@/presentation/modules/cardapio-digital/views/cardapio-digital.view";

export default function CardapioDigitalPage() {
  return <CartProvider><CardapioDigitalView /></CartProvider>;
}