import React, { useState, useEffect } from "react";
import "./Classifica.scss";
import { Image } from "cloudinary-react";
const Classifica = () => {
  const queryString = window.location.pathname;
  const girone = queryString.replace("/classifica-torneo/","");
  console.log(girone)
  const [teams, setTeams] = useState([{}]);
  const [teamsFiltered, setTeamsFiltered] = useState([{}]);
  const [playersRankActive, setPlayersRankActive] = useState(false);
  const [players, setPlayers] = useState([{}]);
  const [goalActive, setGoalActive] = useState(false);
  const [scoreActive, setScoreActive] = useState(true);
  const sorted =
    teamsFiltered !== undefined && teamsFiltered !== null
      ? teamsFiltered
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
  const handleScoreActive = () => {
    setGoalActive(false);
    setScoreActive(true);
  }
  const handleGoalActive = () => {
    console.log("goal active cliccked")
    setGoalActive(true);
    setScoreActive(false);
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

  useEffect(() => {
    let filteredGirone = [{}];
    if(teams !== null && teams !== undefined && teams.length > 0){
      filteredGirone = teams.filter((team: any) => team.girone === girone);
      setTeamsFiltered(filteredGirone);
    }
  },[teams.length]);

  return (
    <>
    <div className="Classifica__container">
      <div className="Classifica__container__slider">
        <button className={"Classifica__container__slider" + (scoreActive ? "__active" : "__noActive")} onClick={() => handleScoreActive()}>Vittorie</button>
        <button className={"Classifica__container__slider" + (goalActive ? "__active" : "__noActive")} onClick={() => handleGoalActive()}>Goal</button>
      </div>
      {teams.length === 0 && (
        <p>
          In questa sezione potrai vedere la classifica aggiornata di Qatar 2022
          by BeFootballStar
        </p>
      )}
      {teams?.length > 0 && goalActive && (
        <>
          <table>
            <thead>
              <tr>
                <th colSpan={2} style={{width: "50%"}}>Squadra</th>
                <th>PT</th>
                <th>GF</th>
                <th>GS</th>
                <th>+/-</th>
              </tr>
            </thead>
            <tbody>
              {teams !== null &&
                teams !== undefined &&
                sorted?.map((team, index) => (
                  <tr>
                    {/* <td style={{width: "20px"}}>{index + 1}</td> */}
                    <td style={{width: "50%", justifyContent:"space-evenly"}}>
                    {index + 1}
                      <Image publicId={team.logo} cloudName="dhadbk8ko" style={{marginLeft:"5px"}}/>
                      <p>
                      {team.name}
                      </p>
                    </td>
                    <td>{team.points}</td>
                    <td>{getTeamGoal(team._id) + team.goal_fatti}</td>
                    <td>{team.goal_subiti}</td>
                    <td>{getTeamGoal(team._id) - team.goal_subiti}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
      {teams?.length > 0 && scoreActive && (
        <>
          <table>
            <thead>
              <tr>
                <th colSpan={2} style={{width: "50%"}}>Squadra</th>
                <th>PT</th>
                <th>V</th>
                <th>P</th>
                <th>S</th>
              </tr>
            </thead>
            <tbody>
              {teams !== null &&
                teams !== undefined &&
                sorted?.map((team, index) => (
                  <tr>
                    {/* <td style={{width: "20px"}}>{index + 1}</td> */}
                    <td style={{width: "50%", justifyContent:"space-evenly"}}>
                    {index + 1}
                      <Image publicId={team.logo} cloudName="dhadbk8ko" style={{marginLeft:"5px"}}/>
                      <p>
                      {team.name}
                      </p>
                    </td>
                    <td>{team.points}</td>
                    <td>{team.vittorie ? team.vittorie : 0}</td>
                    <td>{team.pareggi ? team.pareggi : 0}</td>
                    <td>{team.sconfitte ? team.sconfitte : 0}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
    </>
  );
};

export default Classifica;
