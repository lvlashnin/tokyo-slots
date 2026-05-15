import React from "react";
import { useGameStore } from "../../store/useGameStore";
import "./BalanceBoard.css";

export const BalanceBoard: React.FC = () => {
  const balance = useGameStore((state) => state.balance);

  const [integerPart, fractionPart] = balance
    .toString()
    .replace(",", ".")
    .split(".");

  return (
    <div className="balance-board">
      <h2 className="balance-title">Balance</h2>

      <div className="balance-amount">
        <span className="balance-integer">{integerPart}</span>
        <span className="balance-fraction">.{fractionPart}</span>
      </div>
    </div>
  );
};
