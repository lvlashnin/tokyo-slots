import { create } from "zustand";
import type { GameState, GameStore, GameStatus } from "../types/game";
import {
  SYMBOLS,
  SPIN_DURATION,
  REEL_STOP_DELAY,
} from "../constants/gameConstants";
import { generateReelsSpin, calculateWin, delay } from "../utils/gameHelpers";
import { setMuteState, playSound } from "../utils/soundManager";

const initialState: GameState = {
  balance: 999999.99,
  betAmount: 100,
  status: "idle",
  reels: Array(4).fill(SYMBOLS[0]),
  currentWinAmount: 0,
  isMuted: false,
  isMusicPlaying: false,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  setBetAmount: (amount) => set({ betAmount: amount }),
  setGameStatus: (status: GameStatus) => set({ status }),
  playMainMusic: () => {
    const { isMuted, isMusicPlaying } = get();
    if (!isMuted && !isMusicPlaying) playSound("main");
    set({ isMusicPlaying: true });
  },

  incrementBet: (step, max) => {
    playSound("ui_click");
    const { betAmount } = get();
    if (betAmount + step <= max) {
      set({ betAmount: betAmount + step });
    }
  },

  decrementBet: (step, min) => {
    playSound("ui_click");
    const { betAmount } = get();
    if (betAmount - step >= min) {
      set({ betAmount: betAmount - step });
    }
  },

  spinReels: async () => {
    playSound("lever_pull");
    const { balance, betAmount, status } = get();

    if (status === "spinning" || betAmount > balance) return;

    set({
      balance: balance - betAmount,
      status: "spinning",
      currentWinAmount: 0,
    });

    playSound("reels_spin");
    const newReelsSet = generateReelsSpin(SYMBOLS);

    set({ reels: newReelsSet });

    const totalSpinTime = SPIN_DURATION + REEL_STOP_DELAY * 3;

    await delay(totalSpinTime);
    playSound("reel_stop");

    const winAmount = calculateWin(newReelsSet, betAmount);

    if (winAmount > 0) {
      playSound("win_simple");
      set((state) => ({
        balance: state.balance + winAmount,
        status: "win",
        currentWinAmount: winAmount,
      }));
    } else {
      playSound("lose");
      set({
        status: "lose",
        currentWinAmount: betAmount,
      });
    }
    await delay(SPIN_DURATION);
    set({ status: "idle" });
  },
  toggleMute: () => {
    const newMutedState = !get().isMuted;

    set({ isMuted: newMutedState });
    setMuteState(newMutedState);
  },
}));
