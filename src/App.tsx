import React from "react";
import classNames from "classnames";
import { Header } from "./components/Header/Header";
import { SlotMachine } from "./components/SlotMachine/SlotMachine";
import { BetControls } from "./components/BetControls/BetControls";
import { BackgroundDecorations } from "./components/BackgroundDecorations/BackgroundDecorations";
import { ResultPopup } from "./components/ResultPopup/ResultPopup";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { useAudioInit } from "./hooks/useAudioInit";
import { useGameStore } from "./store/useGameStore";
import { useShallow } from "zustand/shallow";
import soundOnIcon from "./assets/toggleSound/sound-on.svg";
import soundOffIcon from "./assets/toggleSound/sound-off.svg";
import { APP_CLASSES } from "./constants/classNames";
import type { IconSource } from "./types/game";

const SOUND_ON: IconSource = soundOnIcon;
const SOUND_OFF: IconSource = soundOffIcon;

export const App: React.FC = () => {
  const { toggleMute, isMuted } = useGameStore(
    useShallow((state) => ({
      isMuted: state.isMuted,
      toggleMute: state.toggleMute,
    })),
  );

  useAudioInit();

  return (
    <div className={classNames(APP_CLASSES.CONTAINER)}>
      <button className={APP_CLASSES.MUTE_BUTTON} onClick={toggleMute}>
        <img
          src={isMuted ? SOUND_OFF : SOUND_ON}
          alt={isMuted ? "Sound Off" : "Sound On"}
        />
      </button>
      <BackgroundDecorations />

      <div className={APP_CLASSES.GAME_CONTENT}>
        <Header />
        <main className={APP_CLASSES.MAIN_AREA}>
          <SlotMachine />
          <BetControls />
        </main>
        <Footer />
      </div>

      <ResultPopup />
    </div>
  );
};

export default App;
