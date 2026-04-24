import React from "react";
import classNames from "classnames";
import { Header } from "./components/Header/Header";
import { SlotMachine } from "./components/SlotMachine/SlotMachine";
import { BetControls } from "./components/BetControls/BetControls";
import { BackgroundDecorations } from "./components/BackgroundDecorations/BackgroundDecorations";
import { ResultPopup } from "./components/ResultPopup/ResultPopup";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { useGameStore } from "./store/useGameStore";

export const App: React.FC = () => {
  const startMusic = useGameStore((state) => state.playMainMusic);
  return (
    <div className={classNames("app-container")} onClick={startMusic}>
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
