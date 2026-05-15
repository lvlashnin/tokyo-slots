import type { SlotSymbol } from "../types/game";
import lemonIcon from "../assets/symbols/lemon.svg";
import sevenIcon from "../assets/symbols/seven.svg";
import cherryIcon from "../assets/symbols/cherry.svg";
import crownIcon from "../assets/symbols/crown.svg";
import diamondIcon from "../assets/symbols/diamond.svg";
import coinIcon from "../assets/symbols/coin.svg";
import ethIcon from "../assets/symbols/eth.svg";

export const REELS_COUNT = 4;
export const MIN_BET = 10;
export const MAX_BET = 10000;
export const BET_STEP = 10;

export const GAME_STATUS = {
  IDLE: "idle",
  SPINNING: "spinning",
  WIN: "win",
  LOSE: "lose",
} as const;
export const SPIN_DURATION = 2000;
export const REEL_STOP_DELAY = 500;
export const PRESS_DEPTH = 16;
export const PRESS_SCALE_Y = 0.82;
export const PRESS_SCALE_X = 1.03;

export const SYMBOLS: SlotSymbol[] = [
  { id: "seven", icon: sevenIcon, multiplier: 50, weight: 5 },
  { id: "diamond", icon: diamondIcon, multiplier: 20, weight: 15 },
  { id: "crown", icon: crownIcon, multiplier: 10, weight: 30 },
  { id: "eth", icon: ethIcon, multiplier: 5, weight: 50 },
  { id: "coin", icon: coinIcon, multiplier: 3, weight: 70 },
  { id: "lemon", icon: lemonIcon, multiplier: 2, weight: 90 },
  { id: "cherry", icon: cherryIcon, multiplier: 1, weight: 120 },
];
