import type { SlotSymbol } from "../types/game";

export const REELS_COUNT = 4;
export const MIN_BET = 10;
export const MAX_BET = 10000;
export const BET_STEP = 10;
export const SPIN_DURATION = 2000;
export const REEL_STOP_DELAY = 500;

export const SYMBOLS: SlotSymbol[] = [
  { id: "seven", icon: "7️⃣", multiplier: 50, weight: 5 },
  { id: "temple", icon: "🏯", multiplier: 20, weight: 15 },
  { id: "sakura", icon: "🌸", multiplier: 10, weight: 30 },
  { id: "sushi", icon: "🍣", multiplier: 5, weight: 50 },
  { id: "onigiri", icon: "🍙", multiplier: 3, weight: 70 },
  { id: "cherry", icon: "🍒", multiplier: 2, weight: 100 },
];
