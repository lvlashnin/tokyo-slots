import { useState } from "react";
import { SYMBOLS } from "../../constants/gameConstants";

export interface DecorationItem {
  id: string;
  iconUrl: string;
  startX: number;
  startY: number;
  scale: number;
}

export const useBackgroundDecorations = (count: number = 20) => {
  const [decorations] = useState<DecorationItem[]>(() => {
    return Array.from({ length: count }, (_, index) => {
      const symbol = SYMBOLS[index % SYMBOLS.length];

      return {
        id: `decor-${index}`,
        iconUrl: symbol.icon,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        scale: Math.random() * 0.7 + 0.3,
      };
    });
  });

  return { decorations };
};
