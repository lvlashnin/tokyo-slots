import { create } from "zustand";
import type {
  GameState,
  GameActions,
  GameStore,
  GameStatus,
} from "../types/game";

const initialState: GameState = {
  balance: 999999.99,
  betAmount: 100,
  status: "idle",
  reels: [],
  currentWinAmount: 0,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setBetAmount: (amount) => set({ betAmount: amount }),

  incrementBet: (step, max) => {
    const { betAmount } = get();
    if (betAmount + step <= max) {
      set({ betAmount: betAmount + step });
    }
  },

  decrementBet: (step, min) => {
    const { betAmount } = get();
    if (betAmount - step >= min) {
      set({ betAmount: betAmount - step });
    }
  },

  setGameStatus: (status: GameStatus) => set({ status }),

  spinReels: () => {
    const { balance, betAmount } = get();

    if (balance >= betAmount) {
      set({
        balance: balance - betAmount,
        status: "spinning",
        currentWinAmount: 0,
      });
    }
  },

  stopReel: (reelIndex) => {},

  calculateResult: () => {},
}));
