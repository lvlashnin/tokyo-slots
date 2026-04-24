import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { SlotSymbol } from "../../types/game";
import { SYMBOLS } from "../../constants/gameConstants";
import { getRandomSymbol } from "../../utils/gameHelpers";

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
  const tapeRef = useRef<HTMLDivElement>(null);
  const [tapeSymbols, setTapeSymbols] = useState<SlotSymbol[]>([targetSymbol]);
  const [prevSpinning, setPrevSpinning] = useState(isSpinning);
  const SYMBOL_HEIGHT = 120;

  if (isSpinning !== prevSpinning) {
    setPrevSpinning(isSpinning);

    if (isSpinning) {
      const oldSymbol = tapeSymbols[tapeSymbols.length - 1];
      const spinLength = 15 + index * 6;
      const randoms = Array.from({ length: spinLength }, () =>
        getRandomSymbol(SYMBOLS),
      );
      setTapeSymbols([targetSymbol, ...randoms, oldSymbol]);
    } else {
      setTapeSymbols([targetSymbol]);
    }
  }

  useGSAP(() => {
    if (isSpinning && tapeSymbols.length > 1) {
      const totalOffset = (tapeSymbols.length - 1) * SYMBOL_HEIGHT;

      gsap.set(tapeRef.current, { y: -totalOffset });

      gsap.to(tapeRef.current, {
        y: 0,
        duration: 1.5 + index * 0.4,
        ease: "back.out(1.1)",
      });
    } else {
      gsap.set(tapeRef.current, { y: 0 });
    }
  }, [tapeSymbols, isSpinning]);

  return (
    <div className="reel-window">
      <div className="reel-tape" ref={tapeRef}>
        {tapeSymbols.map((symbol, i) => (
          <div key={`${i}-${symbol.id}`} className="reel-symbol">
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
