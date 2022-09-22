import React, { useState, useEffect } from "react";
import "./Classifica.scss";
import { Image } from "cloudinary-react";
const Classifica = () => {
  const [teams, setTeams] = useState([{}]);
  const [teamsRankActive, setTeamsRankActive] = useState(true);
  const [playersRankActive, setPlayersRankActive] = useState(false);
  const [players, setPlayers] = useState([{}]);
  const sorted =
    teams !== undefined && teams !== null
      ? teams
          .sort((a, b) =>
            a.points > b.points ? 1 : b.points > a.points ? -1 : 0
          )
          .reverse()
      : "";
  const sortedPlayers =
    players !== undefined && players !== null
      ? players
          .sort((a: any, b: any) =>
            a.scores > b.scores ? 1 : b.scores > a.scores ? -1 : 0
          )
          .reverse()
      : "";

  const handleTeamsActiveClick = () => {
    setTeamsRankActive(true);
    setPlayersRankActive(false);
  }
  const handlePlayersActiveClick = () => {
    setTeamsRankActive(false);
    setPlayersRankActive(true);
  }
  const getTeamGoal = (teamId) => {
    if(players !== null && players !== undefined && players.length > 0){
      let correctPlayers = players.filter((player: any) => player.teamId === teamId);
      let goals = 0;
      correctPlayers.forEach((cp: any) => {
        goals += cp.scores
      })
      return goals
    }
  }
  const getTeamLogo = (teamId) => {
    if(teams !== null && teams !== undefined && teams.length > 0){
      let searchedTeam = teams.filter((team: any) => team._id === teamId);
      return searchedTeam[0].logo
    }
  }
  const getTeamName = (teamId) => {
    if(teams !== null && teams !== undefined && teams.length > 0){
      let searchedTeam = teams.filter((team: any) => team._id === teamId);
      return searchedTeam[0].name
    }
  }

  useEffect(() => {
    const getTeams = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/teams",
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        window.alert("Something went wrong fetching teams...");
      }
      const result = await response.json();
      setTeams(result);
    };
    getTeams();
  }, [teams.length]);

  useEffect(() => {
    const getPlayers = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/players",
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        window.alert("Something went wrong fetching players...");
      } else {
        const result = await response.json();
        setPlayers(result);
      }
    };
    getPlayers();
  }, [players.length]);

  return (
    <div className="Classifica__container">
      {teams.length === 0 && (
        <p>
          In questa sezione potrai vedere la classifica aggiornata di Qatar 2022
          by BeFootballStar
        </p>
      )}
      {teams.length > 0 && teamsRankActive && (
        <>
          <div className="Classifica__container__slider">
            <button
              className={
                "Classifica__container__slider" +
                (teamsRankActive ? "__active" : "__noActive")
              }
              onClick={() => handleTeamsActiveClick()}
            >
              <p>
              Classifica Squadre
              </p>
            </button>
            <button
              className={
                "Classifica__container__slider" +
                (playersRankActive ? "__active" : "__noActive")
              }
              onClick={() => handlePlayersActiveClick()}
            >
              <p>
              Classifica Marcatori
              </p>
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th colSpan={2} style={{width: "50%"}}>Squadra</th>
                <th>P</th>
                <th>GF</th>
                <th>GS</th>
                <th>+/-</th>
              </tr>
            </thead>
            <tbody>
              {teams !== null &&
                teams !== undefined &&
                sorted.map((team, index) => (
                  <tr>
                    {/* <td style={{width: "20px"}}>{index + 1}</td> */}
                    <td style={{width: "50%", justifyContent:"space-evenly"}}>
                    {index + 1}
                      <Image publicId={team.logo} cloudName="dhadbk8ko" style={{marginLeft:"5px"}}/>
                      {team.name}
                    </td>
                    <td>{team.points}</td>
                    <td>{getTeamGoal(team._id)}</td>
                    <td>{team.goal_subiti}</td>
                    <td>{getTeamGoal(team._id) - team.goal_subiti}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
      {players.length > 0 && playersRankActive && (
        <>
          <div className="Classifica__container__slider">
            <button
              className={
                "Classifica__container__slider" +
                (teamsRankActive ? "__active" : "__noActive")
              }
              onClick={() => handleTeamsActiveClick()}
            >
              Classifica Squadre
            </button>
            <button
              className={
                "Classifica__container__slider" +
                (playersRankActive ? "__active" : "__noActive")
              }
              onClick={() => handlePlayersActiveClick()}
            >
              Classifica Marcatori
            </button>
          </div>
          <table>
          <thead>
              <tr>
                <th style={{width: "40%"}}>Giocatore</th>
                <th style={{width:"40%"}}>Squadra</th>
                <th style={{width:"20%"}}>Goal</th>
              </tr>
            </thead>
            <tbody>
              {teams !== null &&
                teams !== undefined &&
                sortedPlayers.map((player, index) => (
                  <tr>
                    <td style={{width:"40%"}}>
                      <Image publicId={player.logo} cloudName="dhadbk8ko" />
                      <p>
                      {player.first_name + " " + player.last_name}
                      </p>
                    </td>
                    <td style={{width: "40%"}}>
                    <Image publicId={getTeamLogo(player.teamId)} cloudName="dhadbk8ko" />
                      <p style={{textAlign: "center"}}>
                      {getTeamName(player.teamId)}
                      </p>
                    </td>
                    <td style={{width:"20%"}}>
                      <p style={{textAlign: "center"}}>
                      {player.scores}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Classifica;
