import React, { useState } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCompetitions,
  toggleTeams,
  toggleDashboard,
  togglePlayers,
} from "../../../redux/sidebar";

const Sidebar = () => {

  const dashboardState = useSelector((state)=> state.sidebar.dashboard);
  const competitionsState = useSelector((state)=> state.sidebar.competitions);
  const teamsState = useSelector((state)=> state.sidebar.teams);
  const playersState = useSelector((state)=> state.sidebar.players);
  const dispatch = useDispatch();

  const handleDashboardClick = () => {
    dispatch(toggleDashboard(true));
    dispatch(toggleCompetitions(false));
    dispatch(toggleTeams(false));
    dispatch(togglePlayers(false));
  }
  const handleCompetitionsClick = () => {
    dispatch(toggleDashboard(false));
    dispatch(toggleCompetitions(true));
    dispatch(toggleTeams(false));
    dispatch(togglePlayers(false));
  }
  const handleTeamsClick = () => {
    dispatch(toggleDashboard(false));
    dispatch(toggleCompetitions(false));
    dispatch(toggleTeams(true));
    dispatch(togglePlayers(false));
  }
  const handlePlayersClick = () => {
    dispatch(toggleDashboard(false));
    dispatch(toggleCompetitions(false));
    dispatch(toggleTeams(false));
    dispatch(togglePlayers(true));
  }

  return (
    <div className="Sidebar__container">
      <img src="/images/podium.png" alt="logo" />
      <div className="Sidebar__container__menu">
        <div
          className={
            "Sidebar__container__menu__option" +
            ( dashboardState === true ? "__withActive" : "")
          }
        >
          <img src="/images/soccer-player.png" alt="" />
          <Link to="/admin" onClick={()=>handleDashboardClick()}>
            <p>Dashboard</p>
          </Link>
        </div>
        <div
          className={
            "Sidebar__container__menu__option" +
            ( competitionsState === true ? "__withActive" : "")
          }
        >
          <img src="/images/podium.png" alt="" />
          <Link to="/admin/tournaments"onClick={()=>handleCompetitionsClick()}>
            <p>Leghe</p>
          </Link>
        </div>
        <div
          className={
            "Sidebar__container__menu__option" +
            ( teamsState === true ? "__withActive" : "")
          }
        >
          <img src="/images/team.png" alt="" />
          <Link to="/admin/teams"onClick={()=>handleTeamsClick()}>
            <p>Squadre</p>
          </Link>
        </div>
        <div
          className={
            "Sidebar__container__menu__option" +
            ( playersState === true ? "__withActive" : "")
          }
        >
          <img src="/images/soccer-player.png" alt="" />
          <Link to=""onClick={()=>handlePlayersClick()}>
            <p>Giocatori</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
