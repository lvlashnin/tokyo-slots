import React from "react";
import classNames from "classnames";
// import { useShallow } from "zustand/react/shallow";
// import { useGameStore } from "./store/useGameStore";
import { Header } from "./components/Header/Header";
import { SlotMachine } from "./components/SlotMachine/SlotMachine";
import { BetControls } from "./components/BetControls/BetControls";
import { BackgroundDecorations } from "./components/BackgroundDecorations/BackgroundDecorations";
import { ResultPopup } from "./components/ResultPopup/ResultPopup";
import "./App.css";
import { Footer } from "./components/Footer/Footer";

export const App: React.FC = () => {
  return (
    <div className={classNames("app-container")}>
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
