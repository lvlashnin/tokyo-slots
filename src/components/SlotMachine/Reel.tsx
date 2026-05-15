import React from "react";
import type { SlotSymbol } from "../../types/game";
import { useReelLogic } from "./useReelLogic";

interface ReelProps {
  index: number;
  targetSymbol: SlotSymbol;
  isSpinning: boolean;
}

export const Reel: React.FC<ReelProps> = ({
  index,
  targetSymbol,
  isSpinning,
}) => {
  const { tapeRef, tapeSymbols } = useReelLogic(
    index,
    targetSymbol,
    isSpinning,
  );

  return (
    <div className="reel-window">
      <div className="reel-tape" ref={tapeRef}>
        {tapeSymbols.map((symbol) => (
          <div key={symbol.uid} className="reel-symbol">
            <img
              src={symbol.icon}
              alt={symbol.id}
              className="symbol-image"
              draggable="false"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
