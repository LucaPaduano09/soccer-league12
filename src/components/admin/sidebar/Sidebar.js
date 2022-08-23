import React from "react";
import "./Sidebar.scss";
import {Link} from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="Sidebar__container">
      <div className="Sidebar__container__menu">
        <div className="Sidebar__container__menu__option">
          <img src="/images/podium.png" alt="" />
          <Link to="/admin/tournaments">
          <p>Leghe</p>
          </Link>
        </div>
        <div className="Sidebar__container__menu__option">
          <img src="/images/team.png" alt="" />
          <p>Squadre</p>
        </div>
        <div className="Sidebar__container__menu__option">
          <img src="/images/soccer-player.png" alt="" />
          <p>Giocatori</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
