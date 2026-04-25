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

export const App: React.FC = () => {
  const { toggleMute, isMuted } = useGameStore(
    useShallow((state) => ({
      isMuted: state.isMuted,
      toggleMute: state.toggleMute,
    })),
  );

  useAudioInit();

  return (
    <div className={classNames("app-container")}>
      <button className="mute-button" onClick={toggleMute}>
        <img
          src={isMuted ? soundOffIcon : soundOnIcon}
          alt={isMuted ? "Sound Off" : "Sound On"}
        />
      </button>
      <BackgroundDecorations />

      <div className="game-content">
        <Header />
        <main className="main-area">
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
