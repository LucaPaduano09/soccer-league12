import React, {useState} from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isActiveDash, setIsActiveDash] = useState(true); 
  const [isActiveComp, setIsActiveComp] = useState(false); 
  const [isActiveTeams, setIsActiveTeams] = useState(false); 
  const [isActivePlayers, setIsActivePlayers] = useState(false); 
  return (
    <div className="Sidebar__container">
      <img src="/images/podium.png" alt="logo"/>
      <div className="Sidebar__container__menu">
      <div className={"Sidebar__container__menu__option" + (isActiveDash ? "__withActive" : "")}>
          <img src="/images/soccer-player.png" alt="" />
          <Link to="/admin">
            <p>Dashboard</p>
          </Link>
        </div>
        <div className={"Sidebar__container__menu__option" + (isActiveComp ? "__withActive" : "")}>
          <img src="/images/podium.png" alt="" />
          <Link to="/admin/tournaments">
            <p>Leghe</p>
          </Link>
        </div>
        <div className={"Sidebar__container__menu__option" + (isActiveTeams ? "__withActive" : "")}>
          <img src="/images/team.png" alt="" />
          <Link to="/">
            <p>Squadre</p>
          </Link>
        </div>
        <div className={"Sidebar__container__menu__option" + (isActivePlayers ? "__withActive" : "")}>
          <img src="/images/soccer-player.png" alt="" />
          <Link to="">
            <p>Giocatori</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
