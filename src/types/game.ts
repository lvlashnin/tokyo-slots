export type GameStatus = "idle" | "spinning" | "win" | "lose";
export type IconSource = string;

export interface SlotSymbol {
  id: string;
  icon: string;
  multiplier: number;
  weight: number;
  uid?: string;
}

export interface GameState {
  balance: number;
  betAmount: number;
  status: GameStatus;
  reels: SlotSymbol[];
  currentWinAmount: number;
  isMuted: boolean;
  isAudioInitialized: boolean;
}

export interface GameActions {
  setBetAmount: (amount: number) => void;
  incrementBet: (step: number, max: number) => void;
  decrementBet: (step: number, min: number) => void;
  setGameStatus: (status: GameStatus) => void;
  toggleMute: () => void;
  initAudio: () => void;
  spinReels: () => Promise<void>;
}

export type GameStore = GameState & GameActions;
