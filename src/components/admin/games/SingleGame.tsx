import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./SingleGame.scss";

const SingleGame = () => {
  const queryUrl = window.location.pathname;
  const gameId = queryUrl.replace("/admin/game/", "");
  const [game, setGame] = useState([{}]);
  const [teams, setTeams] = useState([{}]);

  useEffect(() => {
    const getGame = async (id: any) => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/games/" + id,
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
        window.alert("Something went wrong fetching game...");
        return;
      }
      const result = await response.json();
      setGame(result);
    };
    getGame(gameId);
  }, [game.length]);

  useEffect(() => {
    const getTeams = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/teams",
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
        window.alert("Something went wrong fetching game...");
        return;
      }
      const result = await response.json();
      setTeams(result);
    };
    getTeams();
  }, [teams.length]);

  const getTeam2 = (game: any, teamsF: any) => {
    let c = teamsF.filter((teamF: any) => game.team2 === teamF._id);
    return c[0].name;
  };
  return (
    <div className="SingleGame__container">
      <div className="SingleGame__container__tableContainer">
        <table>
          {/* <thead>
            <th>
              <td>Id</td>
              <td>Team 1</td>
              <td>Team 2</td>
              <td>Data</td>
              <td>Ora</td>
              <td>Risultato</td>
              <td>Status</td>
            </th>
          </thead> */}
          <tbody>
            {game !== null &&
              game !== undefined &&
              teams !== null &&
              teams !== undefined &&
              teams.map(
                (team: any) =>
                  game.team1 === team._id && (
                    // <tr>
                    //   <td>{game._id}</td>
                    //   <td>{game.team1 === team._id ? team.name : ""}</td>
                    //   <td>vs</td>
                    //   <td>{getTeam2(game, teams)}</td>
                    //   <td>
                    //     {game.date !== null &&
                    //       game.date !== undefined &&
                    //       game.date.replace("2022", "22")}
                    //   </td>
                    //   <td>{game.time}</td>
                    //   <td>{game.result ? game.result : "0-0"}</td>
                    //   <td>{game.status}</td>
                    // </tr>
                    <>
                      <tr>
                        <td>Id partita: </td>
                        <td>{game._id}</td>
                      </tr>
                      <tr>
                        <td>Squadra1 : </td>
                        <td>{game.team1 === team._id ? team.name : ""}</td>
                      </tr>
                      <tr>
                        <td>Squadra2 : </td>
                        <td>{getTeam2(game, teams)}</td>
                      </tr>
                      <tr>
                        <td>Data:</td>
                        <td>
                          {game.date !== null &&
                            game.date !== undefined &&
                            game.date.replace("2022", "22")}
                        </td>
                      </tr>
                     <tr>
                        <td>Ora: </td>
                        <td>{game.time}</td>
                     </tr>
                     <tr>
                        <td>Stato: </td>
                        <td>{game.status}</td>
                     </tr>
                    </>
                  )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleGame;
