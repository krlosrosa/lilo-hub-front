export interface Partner {
  id: number;
  name: string;
  icon: string;
  prize: string;
}

export const partners: Partner[] = [
  { id: 1, name: "Pizzaria Bella", icon: "🍕", prize: "20% de desconto em qualquer pizza" },
  { id: 2, name: "Café Central", icon: "☕", prize: "Café grátis na compra de um bolo" },
  { id: 3, name: "Barbearia Prime", icon: "💈", prize: "10% de desconto no corte" },
  { id: 4, name: "Academia Power", icon: "🏋️", prize: "1 dia de treino grátis" },
  { id: 5, name: "Loja Fashion", icon: "🛍️", prize: "15% de desconto em qualquer peça" },
  { id: 6, name: "Sorveteria Gelato", icon: "🍦", prize: "2 bolas de sorvete grátis" },
  { id: 7, name: "Pet Shop Amigo", icon: "🐾", prize: "Banho grátis no próximo serviço" },
  { id: 8, name: "Livraria Página", icon: "📚", prize: "10% em livros de ficção" },
  { id: 9, name: "Farmácia Saúde+", icon: "💊", prize: "Desconto em dermocosméticos" },
  { id: 10, name: "Hamburgueria Artesanal", icon: "🍔", prize: "Batata frita grátis no combo" },
  { id: 11, name: "Ótica Visão", icon: "👓", prize: "20% em armações" },
  { id: 12, name: "Floricultura Rosa", icon: "🌸", prize: "1 rosa grátis na compra de buquê" },
  { id: 13, name: "Padaria Estrela", icon: "🥐", prize: "Pão na chapa + café por R$ 5" },
  { id: 14, name: "Açaí da Praça", icon: "🍇", prize: "Acréscimo de Nutella grátis" },
  { id: 15, name: "Tech Store", icon: "📱", prize: "Película grátis na compra do celular" },
];
