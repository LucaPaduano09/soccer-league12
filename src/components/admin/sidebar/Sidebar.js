import React, { useState } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCompetitions,
  toggleTeams,
  toggleDashboard,
  togglePlayers,
  toggleCalendar
} from "../../../redux/sidebar";

const Sidebar = () => {

  const dashboardState = useSelector((state)=> state.sidebar.dashboard);
  const competitionsState = useSelector((state)=> state.sidebar.competitions);
  const teamsState = useSelector((state)=> state.sidebar.teams);
  const playersState = useSelector((state)=> state.sidebar.players);
  const calendarState = useSelector((state)=> state.sidebar.calendar);
  const urlQueryString = window.location.pathname;

  const dispatch = useDispatch();

  const handleDashboardClick = () => {
    dispatch(toggleDashboard(true));
    dispatch(toggleCompetitions(false));
    dispatch(toggleTeams(false));
    dispatch(togglePlayers(false));
    dispatch(toggleCalendar(false));
  }
  const handleCompetitionsClick = () => {
    dispatch(toggleDashboard(false));
    dispatch(toggleCompetitions(true));
    dispatch(toggleTeams(false));
    dispatch(togglePlayers(false));
    dispatch(toggleCalendar(false));
  }
  const handleTeamsClick = () => {
    dispatch(toggleDashboard(false));
    dispatch(toggleCompetitions(false));
    dispatch(toggleTeams(true));
    dispatch(togglePlayers(false));
    dispatch(toggleCalendar(false));
  }
  const handlePlayersClick = () => {
    dispatch(toggleDashboard(false));
    dispatch(toggleCompetitions(false));
    dispatch(toggleTeams(false));
    dispatch(togglePlayers(true));
    dispatch(toggleCalendar(false));
  }
  const handleCalendarClick = () => {
    dispatch(toggleDashboard(false));
    dispatch(toggleCompetitions(false));
    dispatch(toggleTeams(false));
    dispatch(togglePlayers(false));
    dispatch(toggleCalendar(true));
  }

  return (
    <div className="Sidebar__container">
      <div className="Sidebar__container__logoContainer" />
      <div className="Sidebar__container__menu">
        <div
          className={
            "Sidebar__container__menu__option" +
            ( urlQueryString.indexOf("dashboard") !== -1 ? "__withActive" : "")
          }
        >
          <Link to="/admin/dashboard">
          <img src="/images/dashboard.png" alt="" />
          </Link>
          <Link to="/admin/dashboard" onClick={()=>handleDashboardClick()}>
            <p>Dashboard</p>
          </Link>
        </div>
        <div
          className={
            "Sidebar__container__menu__option" +
            ( urlQueryString.indexOf("tournaments") !== -1 ? "__withActive" : "")
          }
        >
          <Link to="/admin/tournaments">
          <img src="/images/podium.png" alt="" />
          </Link>
          <Link to="/admin/tournaments"onClick={()=>handleCompetitionsClick()}>
            <p>Tornei</p>
          </Link>
        </div>
        <div
          className={
            "Sidebar__container__menu__option" +
            ( urlQueryString.indexOf("teams") !== -1 ? "__withActive" : "")
          }
        >
          <Link to="/admin/teams">
          <img src="/images/team.png" alt="" />
          </Link>
          <Link to="/admin/teams"onClick={()=>handleTeamsClick()}>
            <p>Squadre</p>
          </Link>
        </div>
        <div
          className={
            "Sidebar__container__menu__option" +
            ( urlQueryString.indexOf("giocatori") !== -1 ? "__withActive" : "")
          }
        >
          <Link to="/admin/giocatori">
          <img src="/images/soccer-player.png" alt="" />
          </Link>
          <Link to="/admin/giocatori"onClick={()=>handlePlayersClick()}>
            <p>Giocatori</p>
          </Link>
        </div>
        <div
          className={
            "Sidebar__container__menu__option" +
            ( urlQueryString.indexOf("games") !== -1 ? "__withActive" : "")
          }
        >
          <Link to="/admin/games">
          <img src="/images/games.png" alt="" />
          </Link>
          <Link to="/admin/games"onClick={()=>handleCalendarClick()}>
            <p>Partite</p>
          </Link>
        </div>
        <div
          className={
            "Sidebar__container__menu__option" +
            ( urlQueryString.indexOf("calendario") !== -1 ? "__withActive" : "")
          }
        >
          <Link to="/admin/calendario">
          <img src="/images/calendar1.png" alt="" />
          </Link>
          <Link to="/admin/calendario"onClick={()=>handleCalendarClick()}>
            <p>Calendario</p>
          </Link>
        </div>
        <div
          className={
            "Sidebar__container__menu__option" +
            ( urlQueryString.indexOf("foto") !== -1 ? "__withActive" : "")
          }
        >
          <Link to="/admin/foto">
          <img src="/images/camera.png" alt="" />
          </Link>
          <Link to="/admin/foto"onClick={()=>handleCalendarClick()}>
            <p>Foto</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
