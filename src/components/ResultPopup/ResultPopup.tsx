import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import { useGameStore } from "../../store/useGameStore";
import "./ResultPopup.css";

export const ResultPopup: React.FC = () => {
  const { status, currentWinAmount } = useGameStore(
    useShallow((state) => ({
      status: state.status,
      currentWinAmount: state.currentWinAmount,
    })),
  );

  const isVisible = status === "win" || status === "lose";
  const isWin = status === "win";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`result-overlay ${isWin ? "overlay-win" : "overlay-lose"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isWin && <div className="rays-background"></div>}

          <motion.div
            className="result-plate-container"
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: 0.1,
            }}
          >
            <div
              className={`result-plate ${isWin ? "plate-win-bg" : "plate-lose-bg"}`}
            >
              <div
                className={`result-amount ${!isWin && "result-amount-lose"}`}
              >
                <span className="result-plus">{isWin ? "+" : "-"}</span>
                {currentWinAmount}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
