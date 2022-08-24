import React from "react";
import "./TopBar.scss";

const TopBar = () => {
  return (
    <div className="TopBar__container">
      <div className="TopBar__container__searchContainer">
        <div className="TopBar__container__searchContainer__search">
          <input
            type="text"
            className="TopBar__container__searchContainer__search__input"
            placeholder="cerca una competizione, una squadra o un giocatore..."
          />
          <img
            src=""
            alt="icon"
            className="TopBar__container__searchContainer__search__icon"
          />
        </div>
      </div>
      <div className="TopBar__container__profileContainer">
        <p className="TopBar__container__profileContainer__label">Hi, Admin</p>
        <img
          src=""
          alt="icon"
          className="TopBar__container__profileContainer__icon"
        />
      </div>
    </div>
  );
};

export default TopBar;
