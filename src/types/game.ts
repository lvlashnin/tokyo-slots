export type GameStatus = "idle" | "spinning" | "win" | "lose";

export interface SlotSymbol {
  id: string;
  icon: string;
  multiplier: number;
  weight: number;
}

export interface GameState {
  balance: number;
  betAmount: number;
  status: GameStatus;
  reels: SlotSymbol[];
  currentWinAmount: number;
}

export interface GameActions {
  setBetAmount: (amount: number) => void;
  incrementBet: (step: number, max: number) => void;
  decrementBet: (step: number, min: number) => void;
  spinReels: () => void;
  stopReel: (reelIndex: number) => void;
  setGameStatus: (status: GameStatus) => void;
  calculateResult: () => void;
}

export type GameStore = GameState & GameActions;
