import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { SlotSymbol } from "../../types/game";
import { SYMBOLS } from "../../constants/gameConstants";
import { getRandomSymbol } from "../../utils/gameHelpers";

export const REEL_CONSTANTS = {
  SYMBOL_HEIGHT: 120,
  SPIN_BASE_LENGTH: 15,
  SPIN_INDEX_MULTIPLIER: 6,
  SPIN_DURATION_BASE: 3,
  SPIN_DURATION_MULTIPLIER: 0.4,
} as const;

export const useReelLogic = (
  index: number,
  targetSymbol: SlotSymbol,
  isSpinning: boolean,
) => {
  const tapeRef = useRef<HTMLDivElement>(null);
  const [tapeSymbols, setTapeSymbols] = useState<SlotSymbol[]>([targetSymbol]);
  const [prevSpinning, setPrevSpinning] = useState(isSpinning);

  console.log(`[reel ${index}] render.`, {
    isSpinning_Prop: isSpinning,
    prevSpinning_State: prevSpinning,
    target_ID: targetSymbol.id,
    tape_length: tapeSymbols.length,
  });

  if (isSpinning !== prevSpinning) {
    setPrevSpinning(isSpinning);

    if (isSpinning) {
      const oldSymbol = tapeSymbols[tapeSymbols.length - 1];
      const spinLength =
        REEL_CONSTANTS.SPIN_BASE_LENGTH +
        index * REEL_CONSTANTS.SPIN_INDEX_MULTIPLIER;
      const randoms = Array.from({ length: spinLength }, () =>
        getRandomSymbol(SYMBOLS),
      );
      setTapeSymbols([targetSymbol, ...randoms, oldSymbol]);
    } else {
      debugger;
      setTapeSymbols([targetSymbol]);
    }
  }

  useGSAP(() => {
    if (isSpinning && tapeSymbols.length > 1) {
      const totalOffset =
        (tapeSymbols.length - 1) * REEL_CONSTANTS.SYMBOL_HEIGHT;

      gsap.set(tapeRef.current, { y: -totalOffset });

      gsap.to(tapeRef.current, {
        y: 0,
        duration:
          REEL_CONSTANTS.SPIN_DURATION_BASE +
          index * REEL_CONSTANTS.SPIN_DURATION_MULTIPLIER,
        ease: "back.out(1.2)",
      });
    } else {
      gsap.set(tapeRef.current, { y: 0 });
    }
  }, [tapeSymbols, isSpinning]);

  return {
    tapeRef,
    tapeSymbols,
  };
};
