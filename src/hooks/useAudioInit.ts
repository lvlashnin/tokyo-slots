import { useEffect } from "react";
import { useGameStore } from "../store/useGameStore";

export const useAudioInit = () => {
  const initAudio = useGameStore((state) => state.initAudio);

  useEffect(() => {
    const handleInteraction = () => {
      initAudio();

      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [initAudio]);
};
