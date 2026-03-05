import {
  Utensils, Heart, Scissors, Wrench, GraduationCap, ShoppingBag,
  Car, Dumbbell, Briefcase, PawPrint, Stethoscope, Palette,
} from "lucide-react";

export type PlanType = "premium" | "gold" | "silver" | "free";

export interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
  businessCount: number;
}

export interface BusinessService {
  name: string;
  description: string;
  price?: string;
  icon?: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  date: string;
  avatar?: string;
}

export interface Business {
  id: string;
  name: string;
  categoryId: string;
  category: string;
  description: string;
  shortDescription: string;
  longDescription?: string;
  address: string;
  phone: string;
  whatsapp: string;
  website?: string;
  rating: number;
  reviewCount: number;
  plan: PlanType;
  logo: string;
  images: string[];
  hours: { day: string; open: string; close: string }[];
  isOpen: boolean;
  social?: { instagram?: string; facebook?: string; tiktok?: string; youtube?: string };
  tags: string[];
  services?: BusinessService[];
  testimonials?: Testimonial[];
  highlights?: string[];
  slogan?: string;
  yearFounded?: number;
  specialOffer?: string;
  mapEmbed?: string;
}

export interface Coupon {
  id: string;
  businessId: string;
  businessName: string;
  title: string;
  discount: string;
  description: string;
  validUntil: string;
  code: string;
}

export const categories: Category[] = [
  { id: "restaurantes", name: "Restaurantes", icon: Utensils, color: "hsl(0 72% 51%)", businessCount: 24 },
  { id: "saude", name: "Saúde", icon: Heart, color: "hsl(340 82% 52%)", businessCount: 18 },
  { id: "beleza", name: "Beleza", icon: Scissors, color: "hsl(280 68% 60%)", businessCount: 15 },
  { id: "servicos", name: "Serviços", icon: Wrench, color: "hsl(38 92% 50%)", businessCount: 32 },
  { id: "educacao", name: "Educação", icon: GraduationCap, color: "hsl(210 90% 55%)", businessCount: 12 },
  { id: "comercio", name: "Comércio", icon: ShoppingBag, color: "hsl(168 80% 36%)", businessCount: 28 },
  { id: "automotivo", name: "Automotivo", icon: Car, color: "hsl(220 14% 40%)", businessCount: 10 },
  { id: "fitness", name: "Fitness", icon: Dumbbell, color: "hsl(142 70% 40%)", businessCount: 8 },
  { id: "juridico", name: "Jurídico", icon: Briefcase, color: "hsl(25 80% 45%)", businessCount: 6 },
  { id: "pets", name: "Pets", icon: PawPrint, color: "hsl(30 80% 55%)", businessCount: 9 },
  { id: "clinicas", name: "Clínicas", icon: Stethoscope, color: "hsl(200 80% 45%)", businessCount: 14 },
  { id: "design", name: "Design", icon: Palette, color: "hsl(320 70% 55%)", businessCount: 7 },
];

const placeholderImg = "/placeholder.svg";

export const businesses: Business[] = [
  {
    id: "1",
    name: "Restaurante Sabor & Arte",
    categoryId: "restaurantes",
    category: "Restaurantes",
    description: "Restaurante premiado com culinária contemporânea brasileira. Chef renomado, ingredientes orgânicos e ambiente sofisticado para experiências gastronômicas únicas.",
    shortDescription: "Culinária contemporânea brasileira com ingredientes orgânicos",
    longDescription: "Há mais de 10 anos, o Sabor & Arte é referência em gastronomia contemporânea brasileira. Nosso chef premiado combina técnicas internacionais com ingredientes orgânicos selecionados de pequenos produtores locais. Cada prato é uma experiência sensorial única, servida em um ambiente sofisticado e acolhedor. Nosso cardápio sazonal é renovado a cada estação, garantindo frescor e criatividade em cada visita. Oferecemos espaço para eventos privativos com capacidade para até 80 pessoas, cardápio especial para restrições alimentares e uma carta de vinhos premiada com mais de 200 rótulos nacionais e importados.",
    slogan: "Onde cada prato conta uma história",
    yearFounded: 2015,
    specialOffer: "Ganhe uma sobremesa especial do chef no seu aniversário!",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    phone: "(11) 99999-0001",
    whatsapp: "5511999990001",
    website: "https://saborarte.com.br",
    rating: 4.8,
    reviewCount: 342,
    plan: "premium",
    logo: placeholderImg,
    images: [placeholderImg, placeholderImg, placeholderImg],
    hours: [
      { day: "Seg-Sex", open: "11:30", close: "23:00" },
      { day: "Sáb-Dom", open: "12:00", close: "00:00" },
    ],
    isOpen: true,
    social: { instagram: "@saborarte", facebook: "saborarte" },
    tags: ["gastronomia", "jantar", "almoço", "orgânico"],
    highlights: ["Chef premiado internacionalmente", "Ingredientes 100% orgânicos", "Carta de vinhos com 200+ rótulos", "Espaço para eventos privativos", "Cardápio sazonal renovado"],
    services: [
      { name: "Almoço Executivo", description: "Menu completo com entrada, prato principal e sobremesa", price: "R$ 59,90" },
      { name: "Jantar Degustação", description: "8 etapas harmonizadas com vinhos selecionados", price: "R$ 189,00" },
      { name: "Eventos Privativos", description: "Espaço exclusivo para até 80 pessoas com menu personalizado", price: "Sob consulta" },
      { name: "Delivery Gourmet", description: "Pratos especiais entregues com embalagem premium", price: "A partir de R$ 45" },
    ],
    testimonials: [
      { name: "Maria Silva", text: "Melhor restaurante que já fui! O jantar degustação é uma experiência incrível. Cada prato surpreende.", rating: 5, date: "2026-01-15" },
      { name: "João Santos", text: "Ambiente sofisticado, atendimento impecável e comida extraordinária. Vale cada centavo.", rating: 5, date: "2026-01-10" },
      { name: "Ana Costa", text: "Frequento há anos e nunca decepciona. O cardápio sazonal sempre traz novidades deliciosas.", rating: 4, date: "2025-12-20" },
    ],
  },
  {
    id: "2",
    name: "Clínica Vida Plena",
    categoryId: "saude",
    category: "Saúde",
    description: "Centro médico multidisciplinar com mais de 20 especialidades. Equipamentos de última geração e atendimento humanizado.",
    shortDescription: "Centro médico com 20+ especialidades",
    longDescription: "A Clínica Vida Plena é referência em saúde integrada há mais de 15 anos. Contamos com uma equipe de mais de 50 profissionais altamente qualificados, atuando em mais de 20 especialidades médicas. Nosso compromisso é oferecer atendimento humanizado com tecnologia de ponta, em um ambiente moderno e acolhedor. Realizamos check-ups completos, exames de alta complexidade e procedimentos ambulatoriais com total segurança. Aceitamos os principais convênios médicos e oferecemos condições especiais para particulares.",
    slogan: "Sua saúde em boas mãos",
    yearFounded: 2010,
    specialOffer: "Check-up completo com 40% de desconto para novos pacientes!",
    address: "Rua Augusta, 500 - São Paulo, SP",
    phone: "(11) 99999-0002",
    whatsapp: "5511999990002",
    website: "https://vidaplena.com.br",
    rating: 4.9,
    reviewCount: 528,
    plan: "premium",
    logo: placeholderImg,
    images: [placeholderImg, placeholderImg],
    hours: [
      { day: "Seg-Sex", open: "07:00", close: "20:00" },
      { day: "Sáb", open: "08:00", close: "14:00" },
    ],
    isOpen: true,
    social: { instagram: "@vidaplena" },
    tags: ["médico", "saúde", "clínica", "especialidades"],
    highlights: ["Mais de 20 especialidades médicas", "Equipamentos de última geração", "Atendimento humanizado", "Aceita principais convênios", "15+ anos de experiência"],
    services: [
      { name: "Consulta Médica", description: "Atendimento com especialistas em diversas áreas", price: "A partir de R$ 200" },
      { name: "Check-up Completo", description: "Avaliação geral com exames laboratoriais e de imagem", price: "R$ 890" },
      { name: "Exames de Imagem", description: "Ressonância, tomografia, ultrassonografia e raio-X", price: "Sob consulta" },
      { name: "Telemedicina", description: "Consultas online com os mesmos especialistas", price: "R$ 150" },
    ],
    testimonials: [
      { name: "Carlos Mendes", text: "Atendimento excepcional! Os médicos são muito atenciosos e o resultado dos exames sai rapidamente.", rating: 5, date: "2026-02-01" },
      { name: "Fernanda Lima", text: "Faço acompanhamento há 5 anos. Clínica limpa, organizada e com profissionais de altíssimo nível.", rating: 5, date: "2026-01-25" },
      { name: "Roberto Alves", text: "O check-up completo é muito bem organizado. Em um dia você faz tudo. Recomendo!", rating: 5, date: "2026-01-18" },
    ],
  },
  {
    id: "3",
    name: "Studio Beleza Pura",
    categoryId: "beleza",
    category: "Beleza",
    description: "Salão de beleza premium com serviços completos. Coloração, cortes modernos, tratamentos capilares e estética facial.",
    shortDescription: "Salão premium com serviços completos de beleza",
    slogan: "Realce sua beleza natural",
    address: "Rua Oscar Freire, 200 - São Paulo, SP",
    phone: "(11) 99999-0003",
    whatsapp: "5511999990003",
    rating: 4.7,
    reviewCount: 215,
    plan: "gold",
    logo: placeholderImg,
    images: [placeholderImg, placeholderImg],
    hours: [
      { day: "Seg-Sáb", open: "09:00", close: "20:00" },
    ],
    isOpen: true,
    social: { instagram: "@belezapura" },
    tags: ["cabelo", "estética", "beleza", "salão"],
    highlights: ["Produtos importados de alta qualidade", "Profissionais especializados", "Ambiente climatizado e confortável"],
    services: [
      { name: "Corte Feminino", description: "Corte moderno com lavagem e finalização", price: "R$ 120" },
      { name: "Coloração", description: "Coloração completa com produtos premium", price: "A partir de R$ 180" },
      { name: "Tratamento Capilar", description: "Hidratação profunda e reconstrução", price: "R$ 95" },
    ],
    testimonials: [
      { name: "Patrícia Gomes", text: "Saio sempre linda! Profissionais muito competentes e atenciosos.", rating: 5, date: "2026-01-20" },
      { name: "Juliana Reis", text: "Melhor salão da região. Ambiente maravilhoso e resultado impecável.", rating: 5, date: "2026-01-05" },
    ],
  },
  {
    id: "4",
    name: "AutoTech Mecânica",
    categoryId: "automotivo",
    category: "Automotivo",
    description: "Oficina mecânica especializada em veículos importados e nacionais. Diagnóstico computadorizado e garantia de serviço.",
    shortDescription: "Mecânica especializada com diagnóstico computadorizado",
    slogan: "Tecnologia e confiança para seu veículo",
    address: "Av. Brasil, 1500 - São Paulo, SP",
    phone: "(11) 99999-0004",
    whatsapp: "5511999990004",
    rating: 4.5,
    reviewCount: 189,
    plan: "gold",
    logo: placeholderImg,
    images: [placeholderImg],
    hours: [
      { day: "Seg-Sex", open: "08:00", close: "18:00" },
      { day: "Sáb", open: "08:00", close: "13:00" },
    ],
    isOpen: false,
    tags: ["mecânica", "carro", "manutenção"],
    highlights: ["Diagnóstico computadorizado", "Garantia de 6 meses", "Atendimento sem agendamento"],
    services: [
      { name: "Revisão Completa", description: "Revisão de todos os sistemas do veículo", price: "R$ 350" },
      { name: "Troca de Óleo", description: "Óleo sintético + filtro + verificação de níveis", price: "R$ 189" },
    ],
  },
  {
    id: "5",
    name: "FitMax Academia",
    categoryId: "fitness",
    category: "Fitness",
    description: "Academia completa com musculação, crossfit, natação e artes marciais. Personal trainers certificados.",
    shortDescription: "Academia completa com diversas modalidades",
    address: "Rua Consolação, 800 - São Paulo, SP",
    phone: "(11) 99999-0005",
    whatsapp: "5511999990005",
    website: "https://fitmax.com.br",
    rating: 4.6,
    reviewCount: 456,
    plan: "silver",
    logo: placeholderImg,
    images: [placeholderImg, placeholderImg],
    hours: [
      { day: "Seg-Sex", open: "06:00", close: "23:00" },
      { day: "Sáb", open: "08:00", close: "18:00" },
    ],
    isOpen: true,
    tags: ["academia", "treino", "fitness", "saúde"],
  },
  {
    id: "6",
    name: "Pet Shop Amigo Fiel",
    categoryId: "pets",
    category: "Pets",
    description: "Pet shop completo com banho e tosa, veterinário, ração premium e acessórios. Hotel para pets com câmeras 24h.",
    shortDescription: "Pet shop completo com hotel e veterinário",
    address: "Rua Pinheiros, 300 - São Paulo, SP",
    phone: "(11) 99999-0006",
    whatsapp: "5511999990006",
    rating: 4.4,
    reviewCount: 123,
    plan: "silver",
    logo: placeholderImg,
    images: [placeholderImg],
    hours: [
      { day: "Seg-Sáb", open: "08:00", close: "19:00" },
    ],
    isOpen: true,
    tags: ["pet", "banho", "tosa", "veterinário"],
  },
  {
    id: "7",
    name: "Escola Futuro Brilhante",
    categoryId: "educacao",
    category: "Educação",
    description: "Escola particular com ensino fundamental e médio. Metodologia inovadora, inglês desde o maternal e robótica.",
    shortDescription: "Escola com metodologia inovadora e bilíngue",
    address: "Av. Rebouças, 1200 - São Paulo, SP",
    phone: "(11) 99999-0007",
    whatsapp: "5511999990007",
    website: "https://futurobrilhante.edu.br",
    rating: 4.8,
    reviewCount: 89,
    plan: "free",
    logo: placeholderImg,
    images: [placeholderImg],
    hours: [
      { day: "Seg-Sex", open: "07:00", close: "18:00" },
    ],
    isOpen: true,
    tags: ["escola", "educação", "ensino", "bilíngue"],
  },
  {
    id: "8",
    name: "Padaria Pão Dourado",
    categoryId: "restaurantes",
    category: "Restaurantes",
    description: "Padaria artesanal com pães feitos no forno a lenha, confeitaria fina e café especial. Tradição desde 1985.",
    shortDescription: "Padaria artesanal com forno a lenha desde 1985",
    address: "Rua Bela Cintra, 456 - São Paulo, SP",
    phone: "(11) 99999-0008",
    whatsapp: "5511999990008",
    rating: 4.6,
    reviewCount: 678,
    plan: "free",
    logo: placeholderImg,
    images: [placeholderImg],
    hours: [
      { day: "Todos os dias", open: "06:00", close: "22:00" },
    ],
    isOpen: true,
    tags: ["padaria", "pão", "café", "confeitaria"],
  },
  {
    id: "9",
    name: "Tech Solutions Informática",
    categoryId: "servicos",
    category: "Serviços",
    description: "Assistência técnica especializada em computadores, notebooks e celulares. Manutenção preventiva e corretiva empresarial.",
    shortDescription: "Assistência técnica para computadores e celulares",
    address: "Rua da Consolação, 1100 - São Paulo, SP",
    phone: "(11) 99999-0009",
    whatsapp: "5511999990009",
    rating: 4.3,
    reviewCount: 156,
    plan: "silver",
    logo: placeholderImg,
    images: [placeholderImg],
    hours: [
      { day: "Seg-Sex", open: "09:00", close: "18:00" },
    ],
    isOpen: true,
    tags: ["informática", "computador", "celular", "reparo"],
  },
  {
    id: "10",
    name: "Boutique Elegância",
    categoryId: "comercio",
    category: "Comércio",
    description: "Loja de roupas femininas com marcas exclusivas. Moda festa, casual e acessórios. Consultoria de estilo personalizada.",
    shortDescription: "Moda feminina exclusiva com consultoria de estilo",
    address: "Shopping Vila Olímpia - São Paulo, SP",
    phone: "(11) 99999-0010",
    whatsapp: "5511999990010",
    website: "https://boutiqueelegancia.com.br",
    rating: 4.7,
    reviewCount: 201,
    plan: "gold",
    logo: placeholderImg,
    images: [placeholderImg, placeholderImg],
    hours: [
      { day: "Seg-Sáb", open: "10:00", close: "22:00" },
      { day: "Dom", open: "14:00", close: "20:00" },
    ],
    isOpen: true,
    social: { instagram: "@boutiqueelegancia" },
    tags: ["moda", "roupas", "acessórios", "feminino"],
  },
];

export const coupons: Coupon[] = [
  {
    id: "c1",
    businessId: "1",
    businessName: "Restaurante Sabor & Arte",
    title: "20% OFF no Jantar",
    discount: "20%",
    description: "Válido de segunda a quinta no jantar completo",
    validUntil: "2026-03-31",
    code: "SABOR20",
  },
  {
    id: "c2",
    businessId: "3",
    businessName: "Studio Beleza Pura",
    title: "Escova + Hidratação",
    discount: "R$49",
    description: "Combo escova progressiva + hidratação profunda",
    validUntil: "2026-03-15",
    code: "BELEZA49",
  },
  {
    id: "c3",
    businessId: "5",
    businessName: "FitMax Academia",
    title: "1ª Mensalidade Grátis",
    discount: "Grátis",
    description: "Primeira mensalidade grátis para novos alunos",
    validUntil: "2026-04-30",
    code: "FITFREE",
  },
  {
    id: "c4",
    businessId: "10",
    businessName: "Boutique Elegância",
    title: "30% em Vestidos",
    discount: "30%",
    description: "Desconto em toda a coleção de vestidos de festa",
    validUntil: "2026-03-20",
    code: "FESTA30",
  },
];

export const getPremiumBusinesses = () => businesses.filter(b => b.plan === "premium");
export const getGoldBusinesses = () => businesses.filter(b => b.plan === "gold");
export const getSilverBusinesses = () => businesses.filter(b => b.plan === "silver");
export const getTrendingBusinesses = () => businesses.filter(b => b.rating >= 4.5).slice(0, 6);
export const getBusinessesByCategory = (categoryId: string) =>
  businesses
    .filter(b => b.categoryId === categoryId)
    .sort((a, b) => {
      const planOrder: Record<PlanType, number> = { premium: 0, gold: 1, silver: 2, free: 3 };
      return planOrder[a.plan] - planOrder[b.plan];
    });
export const getBusinessById = (id: string) => businesses.find(b => b.id === id);
export const searchBusinesses = (query: string) => {
  const q = query.toLowerCase();
  return businesses.filter(
    b =>
      b.name.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.tags.some(t => t.toLowerCase().includes(q)) ||
      b.description.toLowerCase().includes(q)
  );
};
