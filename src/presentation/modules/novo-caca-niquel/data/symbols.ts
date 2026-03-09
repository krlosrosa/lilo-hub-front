/**
 * Símbolos do caça-níquel.
 * Centralizados aqui para fácil alteração e reutilização.
 */
export const SLOT_SYMBOLS = [
  { id: "cherry", emoji: "🍒", label: "Cereja" },
  { id: "lemon", emoji: "🍋", label: "Limão" },
  { id: "star", emoji: "⭐", label: "Estrela" },
  { id: "bell", emoji: "🔔", label: "Sino" },
  { id: "diamond", emoji: "💎", label: "Diamante" },
] as const;

export type SymbolId = (typeof SLOT_SYMBOLS)[number]["id"];

export function getSymbolById(id: SymbolId) {
  return SLOT_SYMBOLS.find((s) => s.id === id) ?? SLOT_SYMBOLS[0];
}

export function getRandomSymbol(): (typeof SLOT_SYMBOLS)[number] {
  return SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
}
