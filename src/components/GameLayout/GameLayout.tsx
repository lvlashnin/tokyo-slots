import React from "react";
import cx from "classnames";
import { useShallow } from "zustand/react/shallow";
import { useGameStore } from "../../store/useGameStore";
// import { BackgroundDecorations } from "../BackgroundDecorations/BackgroundDecorations";
import "./GameLayout.css";

interface GameLayoutProps {
  children: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  const status = useGameStore(useShallow((state) => state.status));

  const layoutClass = cx("game-layout", {
    "bg-idle": status === "idle" || status === "spinning",
    "bg-win": status === "win",
    "bg-lose": status === "lose",
  });

  return (
    <div className={layoutClass}>
      {/* <BackgroundDecorations status={status} /> */}

      <main className="game-content">{children}</main>
    </div>
  );
};
