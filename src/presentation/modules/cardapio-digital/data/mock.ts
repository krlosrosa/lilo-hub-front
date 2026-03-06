export interface ProductOption {
  name: string;
  type: 'single' | 'multiple';
  required?: boolean;
  items: { id: string; name: string; price: number }[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  image: string;
  categoryId: string;
  badges: ('popular' | 'promo' | 'new' | 'recommended')[];
  featured?: boolean;
  options?: ProductOption[];
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

const U = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

export const restaurant = {
  name: "Brasa Grill",
  tagline: "Hambúrgueres Artesanais & Mais",
  rating: 4.8,
  reviewCount: 1243,
  cuisineType: "Hambúrgueres • Pizzas • Grelhados",
  prepTime: "25-40 min",
  banner: U("1517248135467-4c7edcad34c4", 800),
  logo: U("1529694157872-4e0c0f3b238b", 200),
};

export const categories: Category[] = [
  { id: "burgers", name: "Hambúrgueres", emoji: "🍔" },
  { id: "pizzas", name: "Pizzas", emoji: "🍕" },
  { id: "drinks", name: "Bebidas", emoji: "🥤" },
  { id: "desserts", name: "Sobremesas", emoji: "🍫" },
  { id: "combos", name: "Combos", emoji: "🎁" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Smash Burger Clássico",
    description: "Blend de 160g, queijo cheddar, cebola caramelizada, pão brioche",
    longDescription: "Nosso clássico smash burger com blend bovino de 160g prensado na chapa, queijo cheddar derretido, cebola caramelizada no shoyu e pão brioche artesanal tostado na manteiga.",
    price: 32.90,
    image: U("1568901346375-23c9450c58cd"),
    categoryId: "burgers",
    badges: ["popular"],
    featured: true,
    options: [
      {
        name: "Ponto da carne",
        type: "single",
        required: true,
        items: [
          { id: "p1", name: "Mal passado", price: 0 },
          { id: "p2", name: "Ao ponto", price: 0 },
          { id: "p3", name: "Bem passado", price: 0 },
        ],
      },
      {
        name: "Adicionais",
        type: "multiple",
        items: [
          { id: "a1", name: "Bacon extra", price: 5 },
          { id: "a2", name: "Queijo extra", price: 4 },
          { id: "a3", name: "Ovo", price: 3 },
          { id: "a4", name: "Cebola crispy", price: 4 },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Bacon Supreme",
    description: "Blend de 180g, bacon crocante, cheddar, alface, molho especial",
    longDescription: "O rei do bacon! Blend bovino de 180g, bacon crocante em camadas, cheddar cremoso, alface americana e nosso molho especial da casa no pão brioche.",
    price: 38.90,
    originalPrice: 44.90,
    image: U("1571091718767-18b5b1457add"),
    categoryId: "burgers",
    badges: ["promo"],
    featured: true,
    options: [
      {
        name: "Ponto da carne",
        type: "single",
        required: true,
        items: [
          { id: "p1", name: "Mal passado", price: 0 },
          { id: "p2", name: "Ao ponto", price: 0 },
          { id: "p3", name: "Bem passado", price: 0 },
        ],
      },
      {
        name: "Adicionais",
        type: "multiple",
        items: [
          { id: "a1", name: "Bacon extra", price: 5 },
          { id: "a2", name: "Queijo extra", price: 4 },
          { id: "a3", name: "Ovo", price: 3 },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Burger Trufado",
    description: "Blend de 200g, creme de trufas, rúcula, parmesão, pão brioche",
    longDescription: "Experiência gourmet com blend bovino de 200g, generoso creme de trufas negras, rúcula fresca, lascas de parmesão e pão brioche artesanal.",
    price: 45.90,
    image: U("1553979459-d2229ba7433b"),
    categoryId: "burgers",
    badges: ["recommended", "new"],
    featured: true,
    options: [
      {
        name: "Ponto da carne",
        type: "single",
        required: true,
        items: [
          { id: "p1", name: "Mal passado", price: 0 },
          { id: "p2", name: "Ao ponto", price: 0 },
          { id: "p3", name: "Bem passado", price: 0 },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Pizza Margherita",
    description: "Molho de tomate San Marzano, mozzarella de búfala, manjericão fresco",
    longDescription: "A clássica napolitana com molho de tomate San Marzano importado, mozzarella de búfala artesanal, manjericão fresco e azeite extra virgem. Massa fermentada por 72h.",
    price: 49.90,
    image: U("1574071318508-1cdbab80d002"),
    categoryId: "pizzas",
    badges: ["popular"],
    options: [
      {
        name: "Tamanho",
        type: "single",
        required: true,
        items: [
          { id: "s1", name: "Individual (25cm)", price: 0 },
          { id: "s2", name: "Média (30cm)", price: 12 },
          { id: "s3", name: "Grande (35cm)", price: 20 },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Pizza Pepperoni",
    description: "Pepperoni artesanal, mozzarella, molho de tomate, orégano",
    longDescription: "Pepperoni artesanal fatiado na hora sobre mozzarella derretida, molho de tomate italiano e orégano fresco. Borda recheada com catupiry disponível.",
    price: 54.90,
    image: U("1628840042765-356cda07504e"),
    categoryId: "pizzas",
    badges: ["recommended"],
    featured: true,
    options: [
      {
        name: "Tamanho",
        type: "single",
        required: true,
        items: [
          { id: "s1", name: "Individual (25cm)", price: 0 },
          { id: "s2", name: "Média (30cm)", price: 12 },
          { id: "s3", name: "Grande (35cm)", price: 20 },
        ],
      },
      {
        name: "Borda",
        type: "single",
        items: [
          { id: "b1", name: "Tradicional", price: 0 },
          { id: "b2", name: "Catupiry", price: 8 },
          { id: "b3", name: "Cheddar", price: 8 },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Coca-Cola 350ml",
    description: "Lata gelada",
    price: 7.90,
    image: U("1622483767028-3f66f32aef97"),
    categoryId: "drinks",
    badges: [],
  },
  {
    id: "7",
    name: "Suco Natural de Laranja",
    description: "500ml de suco natural, feito na hora",
    longDescription: "Suco de laranja 100% natural, feito na hora com laranjas selecionadas. Servido com gelo.",
    price: 14.90,
    image: U("1621506289937-a8e4df240d0b"),
    categoryId: "drinks",
    badges: ["new"],
  },
  {
    id: "8",
    name: "Milkshake de Chocolate",
    description: "Milkshake cremoso com calda de chocolate belga e chantilly",
    longDescription: "Milkshake artesanal com sorvete de chocolate belga, leite gelado, calda de chocolate premium e chantilly. Finalizado com raspas de chocolate.",
    price: 22.90,
    image: U("1572490122747-3968b75cc699"),
    categoryId: "drinks",
    badges: ["popular"],
    featured: true,
  },
  {
    id: "9",
    name: "Brownie com Sorvete",
    description: "Brownie caseiro com sorvete de baunilha e calda de chocolate",
    longDescription: "Brownie de chocolate meio amargo, feito na hora, servido quente com uma bola de sorvete artesanal de baunilha e calda de chocolate belga.",
    price: 24.90,
    image: U("1564355808539-22fda35bed7e"),
    categoryId: "desserts",
    badges: ["popular"],
  },
  {
    id: "10",
    name: "Petit Gâteau",
    description: "Bolinho quente com centro derretido, sorvete de baunilha",
    longDescription: "Clássico petit gâteau com centro de chocolate derretido, acompanhado de sorvete artesanal de baunilha e calda de frutas vermelhas.",
    price: 29.90,
    image: U("1624353365286-3f8d62daad51"),
    categoryId: "desserts",
    badges: ["recommended"],
  },
  {
    id: "11",
    name: "Açaí Premium",
    description: "500ml com granola, banana, morango e mel",
    longDescription: "Açaí puro do Pará, 500ml, com granola crocante, banana fatiada, morango fresco e fio de mel. Opção de adicionar complementos.",
    price: 26.90,
    image: U("1594007654729-407eedc4be65"),
    categoryId: "desserts",
    badges: ["new", "popular"],
    featured: true,
    options: [
      {
        name: "Tamanho",
        type: "single",
        required: true,
        items: [
          { id: "t1", name: "300ml", price: 0 },
          { id: "t2", name: "500ml", price: 6 },
          { id: "t3", name: "700ml", price: 12 },
        ],
      },
      {
        name: "Adicionais",
        type: "multiple",
        items: [
          { id: "c1", name: "Leite ninho", price: 4 },
          { id: "c2", name: "Paçoca", price: 3 },
          { id: "c3", name: "Nutella", price: 6 },
          { id: "c4", name: "Leite condensado", price: 3 },
        ],
      },
    ],
  },
  {
    id: "12",
    name: "Combo Família",
    description: "4 burgers + 2 batatas grandes + 4 bebidas",
    longDescription: "O combo perfeito para a família! 4 Smash Burgers Clássicos, 2 porções grandes de batata frita crocante e 4 Coca-Colas lata. Economia de R$30!",
    price: 129.90,
    originalPrice: 159.90,
    image: U("1555396273-367ea4eb4db5"),
    categoryId: "combos",
    badges: ["promo", "popular"],
    featured: true,
  },
];
