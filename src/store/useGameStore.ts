import { create } from "zustand";
import type { GameState, GameStore, GameStatus } from "../types/game";
import {
  SYMBOLS,
  SPIN_DURATION,
  REEL_STOP_DELAY,
} from "../constants/gameConstants";
import { generateReelsSpin, calculateWin, delay } from "../utils/gameHelpers";

const initialState: GameState = {
  balance: 999999.99,
  betAmount: 100,
  status: "idle",
  reels: Array(4).fill(SYMBOLS[0]),
  currentWinAmount: 0,
  isMuted: true,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setBetAmount: (amount) => set({ betAmount: amount }),
  setGameStatus: (status: GameStatus) => set({ status }),

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

  spinReels: async () => {
    const { balance, betAmount, status } = get();

    if (status === "spinning" || betAmount > balance) return;

    set({
      balance: balance - betAmount,
      status: "spinning",
      currentWinAmount: 0,
    });

    const newReelsSet = generateReelsSpin(SYMBOLS);

    set({ reels: newReelsSet });

    const totalSpinTime = SPIN_DURATION + REEL_STOP_DELAY * 3;

    await delay(totalSpinTime);

    const winAmount = calculateWin(newReelsSet, betAmount);

    if (winAmount > 0) {
      set((state) => ({
        balance: state.balance + winAmount,
        status: "win",
        currentWinAmount: winAmount,
      }));
    } else {
      set({
        status: "lose",
        currentWinAmount: betAmount,
      });
    }
  },
  toggleMute: () => {},
  stopReel: (reelIndex) => {},

  calculateResult: () => {},
}));
