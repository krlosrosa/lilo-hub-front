import type { Prize } from '../types/scratch.type';

export function generatePrize(prizes: Prize[]): Prize | null {
  const available = prizes.filter((p) => p.remainingQuantity > 0);
  if (available.length === 0) return null;

  const totalProbability = available.reduce((sum, p) => sum + p.probability, 0);
  if (totalProbability <= 0) return null;

  const roll = Math.random() * 100;
  let cumulative = 0;

  for (const prize of available) {
    cumulative += prize.probability;
    if (roll < cumulative) {
      return prize;
    }
  }

  // No prize won (remaining probability = no prize)
  return null;  
}
