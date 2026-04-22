import React from "react";
import "./Header.css";
import bannerBg from "../../assets/banner-bg.svg";

export const Header: React.FC = () => {
  return (
    <header className="header-wrapper">
      <div className="logo-container">
        <div
          className="logo-banner"
          style={{ backgroundImage: `url(${bannerBg})` }}
        >
          <h1 className="logo-text">Tokyo Slots</h1>
        </div>
      </div>
    </header>
  );
};
