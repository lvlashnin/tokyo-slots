import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useGameStore } from "../../store/useGameStore";
import { MIN_BET, MAX_BET, BET_STEP } from "../../constants/gameConstants";

export const useBetLogic = () => {
  const { betAmount, setBetAmount, incrementBet, decrementBet, status } =
    useGameStore(
      useShallow((state) => ({
        betAmount: state.betAmount,
        setBetAmount: state.setBetAmount,
        incrementBet: state.incrementBet,
        decrementBet: state.decrementBet,
        status: state.status,
      })),
    );

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(betAmount));

  const isControlsDisabled = status !== "idle";

  const handleStartEdit = () => {
    if (isControlsDisabled) return;
    setInputValue(String(betAmount));
    setIsEditing(true);
  };

  const handleSave = () => {
    let value = parseFloat(inputValue);

    if (isNaN(value) || value < MIN_BET) {
      value = MIN_BET;
    } else if (value > MAX_BET) {
      value = MAX_BET;
    }

    setBetAmount(value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return {
    betAmount,
    inputValue,
    isEditing,
    isControlsDisabled,
    setInputValue,
    handleStartEdit,
    handleSave,
    handleKeyDown,
    incrementBet: () => incrementBet(BET_STEP, MAX_BET),
    decrementBet: () => decrementBet(BET_STEP, MIN_BET),
    isMinusDisabled: isControlsDisabled || betAmount <= MIN_BET,
    isPlusDisabled: isControlsDisabled || betAmount >= MAX_BET,
  };
};
