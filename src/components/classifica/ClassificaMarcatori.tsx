import React, { useState, useEffect } from "react";
import "./Classifica.scss";
import { Image } from "cloudinary-react";
const ClassificaMarcatori = () => {
  const [teams, setTeams] = useState([{}]);
  const [players, setPlayers] = useState([{}]);
  const [gironeActive, setGironeActive] = useState(true);
  const [finaleActive, setFinaleActive] = useState(true);
  const sortedPlayers =
    players !== undefined && players !== null
      ? players
          .sort((a: any, b: any) =>
            (a.scores > b.scores) ? 1 : (b.scores > a.scores) ? -1 : 0
          )
          .reverse()
      : "";
      // const sortedPlayersFinal =
      // (players !== undefined && players !== null)
      //   ? players
      //       .sort((a: any, b: any) =>
      //         (a.scores_final!== null && a.scores_final !== undefined) ? a.scores_final : 0 > ((b.scores_final !== null && b.scores_final !== undefined ) ?  b.scores_final : 0) ? 1 : ((b.scores_final !== null && b.scores_final !== undefined) ? b.scores_final : 0) > ((a.scores_final !== null && a.scores_final !== undefined) ? a.scores_final : 0) ? -1 : 0
      //       )
      //       .reverse()
      //   : "";

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
  const handleGironeActive = () => {
    setFinaleActive(false);
    setGironeActive(true);
  }
  const handleFinaleActive = () => {
    setGironeActive(false);
    setFinaleActive(true);
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
      {/* <div className="Classifica__container__slider">
        <button className={"Classifica__container__slider" + (gironeActive ? "__active" : "__noActive")} onClick={() => handleGironeActive()}>Gironi</button>
        <button className={"Classifica__container__slider" + (finaleActive ? "__active" : "__noActive")} onClick={() => handleFinaleActive()}>Finale</button>
      </div> */}
      {players.length > 0  && gironeActive && (
        <>
          <table>
          <thead>
              <tr>
                <th style={{width: "40%"}}>Giocatore</th>
                <th style={{width:"40%"}}>Squadra</th>
                <th style={{width:"20%"}}>Goal</th>
              </tr>
            </thead>
            <tbody>
              {
                teams?.length > 1 && players?.length > 1 &&
                gironeActive &&
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
      {/* {players.length > 0  && finaleActive && (
        <>
          <table>
          <thead>
              <tr>
                <th style={{width: "40%"}}>Giocatore</th>
                <th style={{width:"40%"}}>Squadra</th>
                <th style={{width:"20%"}}>Goal</th>
              </tr>
            </thead>
            <tbody>
              {
                teams?.length > 1 && players?.length > 1 &&
                finaleActive && 
                sortedPlayersFinal.map((player, index) => (
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
                      {(player.scores_final !== null && player.scores_final !== undefined) ? player.scores_final : 0}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )} */}
    </div>
  );
};

export default ClassificaMarcatori;
