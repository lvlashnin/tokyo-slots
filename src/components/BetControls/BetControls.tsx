import React from "react";
import { motion } from "framer-motion";
import "./BetControls.css";
import { useBetLogic } from "./useBetControlsLogic";

export const BetControls: React.FC = () => {
  const {
    betAmount,
    inputValue,
    isEditing,
    setInputValue,
    handleStartEdit,
    handleSave,
    handleKeyDown,
    incrementBet,
    decrementBet,
    isMinusDisabled,
    isPlusDisabled,
  } = useBetLogic();

  const buttonVariants = {
    idle: { y: 0, boxShadow: "0px 6px 0px #3d2c1e" },
    pressed: { y: 6, boxShadow: "0px 0px 0px #3d2c1e" },
  };

  return (
    <div className="bet-controls-wrapper">
      <h3 className="bet-title">PLACE A BID</h3>

      <div className="bet-controls-row">
        <motion.button
          className="bet-action-btn"
          onClick={decrementBet}
          disabled={isMinusDisabled}
          variants={buttonVariants}
          initial="idle"
          whileTap={isMinusDisabled ? "idle" : "pressed"}
        >
          <span className="bet-action-text">-</span>
        </motion.button>

        <div className="bet-plate" onClick={handleStartEdit}>
          {isEditing ? (
            <input
              autoFocus
              className="bet-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div className="bet-amount">{betAmount}</div>
          )}
        </div>

        <motion.button
          className="bet-action-btn"
          onClick={incrementBet}
          disabled={isPlusDisabled}
          variants={buttonVariants}
          initial="idle"
          whileTap={isPlusDisabled ? "idle" : "pressed"}
        >
          <span className="bet-action-text">+</span>
        </motion.button>
      </div>
    </div>
  );
};
