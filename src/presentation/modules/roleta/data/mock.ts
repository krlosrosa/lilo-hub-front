export interface Partner {
  id: string;
  name: string;
  category: string;
  prize: string;
  description: string;
  weight: number; // higher = more likely
  color: string;  // wheel segment color
  emoji: string;
  tier: 'common' | 'rare' | 'epic';
}

export const partners: Partner[] = [
  {
    id: '1',
    name: 'Pizzaria Bella',
    category: 'Alimentação',
    prize: '20% de desconto',
    description: '20% de desconto em qualquer pizza do cardápio.',
    weight: 18,
    color: '#FF6B35',
    emoji: '🍕',
    tier: 'common',
  },
  {
    id: '2',
    name: 'Farmácia Vida+',
    category: 'Saúde',
    prize: '15% em medicamentos',
    description: '15% de desconto em medicamentos genéricos.',
    weight: 16,
    color: '#4ECDC4',
    emoji: '💊',
    tier: 'common',
  },
  {
    id: '3',
    name: 'Salão Glamour',
    category: 'Beleza',
    prize: 'Hidratação grátis',
    description: 'Hidratação capilar grátis na compra de qualquer corte.',
    weight: 12,
    color: '#FF69B4',
    emoji: '💅',
    tier: 'rare',
  },
  {
    id: '4',
    name: 'Academia FitPro',
    category: 'Fitness',
    prize: '1 mês grátis',
    description: '1 mês de academia grátis para novos alunos.',
    weight: 6,
    color: '#9B59B6',
    emoji: '🏋️',
    tier: 'epic',
  },
  {
    id: '5',
    name: 'Restaurante Sabor',
    category: 'Alimentação',
    prize: 'Sobremesa grátis',
    description: 'Sobremesa grátis em qualquer refeição acima de R$30.',
    weight: 18,
    color: '#F39C12',
    emoji: '🍽️',
    tier: 'common',
  },
  {
    id: '6',
    name: 'Cinema Star',
    category: 'Entretenimento',
    prize: 'Ingresso 50% OFF',
    description: '50% de desconto em qualquer sessão de terça a quinta.',
    weight: 8,
    color: '#E74C3C',
    emoji: '🎬',
    tier: 'rare',
  },
  {
    id: '7',
    name: 'Modas Chic',
    category: 'Moda',
    prize: 'R$50 de desconto',
    description: 'R$50 de desconto em compras acima de R$200.',
    weight: 10,
    color: '#3498DB',
    emoji: '👗',
    tier: 'rare',
  },
  {
    id: '8',
    name: 'Padaria Dourada',
    category: 'Alimentação',
    prize: 'Café da manhã grátis',
    description: 'Café da manhã completo grátis para 2 pessoas.',
    weight: 12,
    color: '#2ECC71',
    emoji: '🥐',
    tier: 'common',
  },
];

export const TOTAL_WEIGHT = partners.reduce((sum, p) => sum + p.weight, 0);

export function pickWeightedWinner(): Partner {
  const rand = Math.random() * TOTAL_WEIGHT;
  let cumulative = 0;
  for (const partner of partners) {
    cumulative += partner.weight;
    if (rand <= cumulative) return partner;
  }
  return partners[partners.length - 1];
}

export const TIER_LABELS: Record<Partner['tier'], string> = {
  common: 'Comum',
  rare: 'Raro',
  epic: '✨ ÉPICO',
};

export const TIER_COLORS: Record<Partner['tier'], string> = {
  common: 'hsl(210 60% 60%)',
  rare: 'hsl(270 80% 65%)',
  epic: 'hsl(42 100% 54%)',
};
