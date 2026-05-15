import type { SlotSymbol } from "../types/game";

export const getRandomSymbol = (symbols: SlotSymbol[]): SlotSymbol => {
  let currentSum = 0;

  const totalWeight = symbols.reduce((sum, symbol) => sum + symbol.weight, 0);
  const randomNum = Math.round(Math.random() * totalWeight);

  for (const symbol of symbols) {
    currentSum += symbol.weight;

    if (randomNum <= currentSum) {
      return { ...symbol, uid: crypto.randomUUID() };
    }
  }

  return { ...symbols[symbols.length - 1], uid: crypto.randomUUID() };
};

export const calculateWin = (
  reels: SlotSymbol[],
  betAmount: number,
): number => {
  const isAllSame = reels.every((symbol) => symbol.id === reels[0].id);

  if (isAllSame) return reels[0].multiplier * betAmount;

  const isThreeSame =
    reels[1].id === reels[2].id &&
    (reels[0].id === reels[1].id || reels[2].id === reels[3].id);

  if (isThreeSame) return (reels[1].multiplier / 2) * betAmount;

  return 0;
};

export const generateReelsSpin = (
  symbols: SlotSymbol[],
  reelsCount: number = 4,
): SlotSymbol[] => {
  return Array.from({ length: reelsCount }, () => getRandomSymbol(symbols));
};

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
