export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: string;
  image: string;
  popular?: boolean;
}

export interface HistoryItem {
  id: string;
  date: string;
  description: string;
  points: number;
  type: "earned" | "redeemed" | "bonus";
}

export interface RedeemedReward {
  id: string;
  reward: Reward;
  redeemedAt: string;
  expiresAt: string;
  used: boolean;
  code: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export type LoyaltyLevel = "bronze" | "silver" | "gold" | "vip";

export interface UserProfile {
  name: string;
  email: string;
  points: number;
  totalPointsEarned: number;
  level: LoyaltyLevel;
  memberSince: string;
  rewardsRedeemed: number;
}

export const STORE_NAME = "Café & Bistrô Aroma";

export const LEVELS: Record<LoyaltyLevel, { label: string; minPoints: number; nextLevel?: LoyaltyLevel; nextLevelMin?: number; color: string }> = {
  bronze: { label: "Bronze", minPoints: 0, nextLevel: "silver", nextLevelMin: 500, color: "bronze" },
  silver: { label: "Prata", minPoints: 500, nextLevel: "gold", nextLevelMin: 1500, color: "silver" },
  gold: { label: "Ouro", minPoints: 1500, nextLevel: "vip", nextLevelMin: 3000, color: "gold" },
  vip: { label: "VIP", minPoints: 3000, color: "vip" },
};

export const userProfile: UserProfile = {
  name: "Marina Silva",
  email: "marina@email.com",
  points: 1240,
  totalPointsEarned: 2850,
  level: "silver",
  memberSince: "Mar 2025",
  rewardsRedeemed: 7,
};

export const rewards: Reward[] = [
  { id: "1", name: "Café Espresso", description: "Um café espresso clássico preparado com grãos selecionados. Perfeito para dar aquela energia no seu dia.", pointsCost: 150, category: "Bebidas", image: "☕", popular: true },
  { id: "2", name: "Sobremesa do Dia", description: "Escolha qualquer sobremesa disponível no cardápio do dia. Inclui opções como pudim, mousse e torta.", pointsCost: 300, category: "Sobremesas", image: "🍰" },
  { id: "3", name: "10% de Desconto", description: "Ganhe 10% de desconto em qualquer pedido. Válido para consumo no local ou delivery.", pointsCost: 200, category: "Descontos", image: "🏷️", popular: true },
  { id: "4", name: "Combo Especial", description: "Combo com prato principal + bebida + sobremesa. Uma experiência completa por pontos.", pointsCost: 800, category: "Combos", image: "🍽️" },
  { id: "5", name: "Suco Natural", description: "Suco natural da fruta da estação. Refrescante e saudável.", pointsCost: 120, category: "Bebidas", image: "🧃" },
  { id: "6", name: "Pizza Margherita", description: "Pizza margherita inteira com massa artesanal, molho de tomate fresco e mussarela de búfala.", pointsCost: 1000, category: "Pratos", image: "🍕" },
  { id: "7", name: "Milkshake Premium", description: "Milkshake cremoso no sabor de sua escolha: chocolate, morango ou baunilha.", pointsCost: 250, category: "Bebidas", image: "🥤" },
  { id: "8", name: "25% de Desconto", description: "Desconto de 25% em qualquer pedido acima de R$50. Exclusivo para membros.", pointsCost: 500, category: "Descontos", image: "💎", popular: true },
];

export const history: HistoryItem[] = [
  { id: "1", date: "2026-03-06", description: "Compra no Café & Bistrô Aroma", points: 45, type: "earned" },
  { id: "2", date: "2026-03-05", description: "Bônus de terça-feira", points: 30, type: "bonus" },
  { id: "3", date: "2026-03-04", description: "Resgate: Café Espresso", points: -150, type: "redeemed" },
  { id: "4", date: "2026-03-03", description: "Compra no Café & Bistrô Aroma", points: 78, type: "earned" },
  { id: "5", date: "2026-03-01", description: "Compra no Café & Bistrô Aroma", points: 120, type: "earned" },
  { id: "6", date: "2026-02-28", description: "Bônus indicação de amigo", points: 100, type: "bonus" },
  { id: "7", date: "2026-02-26", description: "Resgate: 10% de Desconto", points: -200, type: "redeemed" },
  { id: "8", date: "2026-02-25", description: "Compra no Café & Bistrô Aroma", points: 55, type: "earned" },
  { id: "9", date: "2026-02-22", description: "Compra no Café & Bistrô Aroma", points: 90, type: "earned" },
  { id: "10", date: "2026-02-20", description: "Bônus de boas-vindas", points: 200, type: "bonus" },
];

export const redeemedRewards: RedeemedReward[] = [
  { id: "1", reward: rewards[0], redeemedAt: "2026-03-04", expiresAt: "2026-03-11", used: false, code: "CAFE-7X2K" },
  { id: "2", reward: rewards[2], redeemedAt: "2026-02-26", expiresAt: "2026-03-05", used: true, code: "DESC-9M4P" },
  { id: "3", reward: rewards[4], redeemedAt: "2026-02-15", expiresAt: "2026-02-22", used: true, code: "SUCO-3R8W" },
];

export const achievements: Achievement[] = [
  { id: "1", name: "Primeira Compra", description: "Faça sua primeira compra", icon: "🎯", unlocked: true, progress: 1, target: 1 },
  { id: "2", name: "Frequente", description: "Faça 10 compras", icon: "🔥", unlocked: true, progress: 10, target: 10 },
  { id: "3", name: "Explorador", description: "Resgate 5 recompensas diferentes", icon: "🗺️", unlocked: false, progress: 3, target: 5 },
  { id: "4", name: "Colecionador", description: "Acumule 5.000 pontos no total", icon: "⭐", unlocked: false, progress: 2850, target: 5000 },
  { id: "5", name: "Social", description: "Indique 3 amigos", icon: "👥", unlocked: false, progress: 1, target: 3 },
];

export const notifications = [
  { id: "1", message: "Você ganhou 45 pontos hoje! 🎉", time: "Agora" },
  { id: "2", message: "Faltam apenas 260 pontos para o nível Ouro! 🏆", time: "2h atrás" },
  { id: "3", message: "Nova recompensa disponível: Pizza Margherita 🍕", time: "1 dia" },
];
