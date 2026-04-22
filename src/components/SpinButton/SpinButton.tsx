import React from "react";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { useGameStore } from "../../store/useGameStore";
import {
  PRESS_DEPTH,
  PRESS_SCALE_X,
  PRESS_SCALE_Y,
} from "../../constants/gameConstants";
import "./SpinButton.css";

export const SpinButton: React.FC = () => {
  const { status, spinReels, balance, betAmount } = useGameStore(
    useShallow((state) => ({
      status: state.status,
      spinReels: state.spinReels,
      balance: state.balance,
      betAmount: state.betAmount,
    })),
  );

  const isSpinning = status === "spinning";
  const hasEnoughBalance = balance >= betAmount;
  const isDisabled = isSpinning || !hasEnoughBalance;

  return (
    <div className="spin-button-container">
      <div className="spin-base"></div>

      <motion.button
        className={`spin-top ${!hasEnoughBalance && !isSpinning ? "disabled" : ""}`}
        onClick={spinReels}
        disabled={isDisabled}
        initial={false}
        animate={{
          y: isSpinning ? PRESS_DEPTH : 0,
          scaleY: isSpinning ? PRESS_SCALE_Y : 1,
          scaleX: isSpinning ? PRESS_SCALE_X : 1,
        }}
        whileTap={
          isDisabled
            ? {}
            : {
                y: PRESS_DEPTH,
                scaleY: PRESS_SCALE_Y,
                scaleX: PRESS_SCALE_X,
              }
        }
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 25,
        }}
        style={{
          originY: 0,
        }}
      ></motion.button>
    </div>
  );
};
