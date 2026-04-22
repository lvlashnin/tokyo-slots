import React from "react";
// import classNames from "classnames";
// import { SpinButton } from "../SpinButton/SpinButton";
import { BalanceBoard } from "../BalanceBoard/BalanceBoard";
import "./Footer.css";

export const Footer: React.FC = () => {
  return (
    <footer className="game-footer">
      <div className="footer-layer city-layer"></div>

      <div className="footer-layer spin-layer">{/* <SpinButton /> */}</div>

      <div className="footer-layer clouds-layer"></div>

      <div className="footer-layer balance-layer">
        <BalanceBoard />
      </div>
    </footer>
  );
};
