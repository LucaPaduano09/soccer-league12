import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Games.scss";

const Games = () => {
  const [games, setGames] = useState([{}]);
  const [teams, setTeams] = useState([{}]);
  useEffect(() => {
    const getGames = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/games",
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
      }
      const result = await response.json();
      setGames(result);
    };
    getGames();
  }, [games.length]);

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
        window.alert("Something went wrong fetching players...");
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
    <div className="Games__container">
      <h1>Elenco Partite</h1>
      <div className="Games__container__tableContainer">
        <table>
          <thead>
            <th>
              <td>Id</td>
              <td>Team 1</td>
              <td>Team 2</td>
              <td>Data</td>
              <td>Ora</td>
              <td>Risultato</td>
              <td>Status</td>
            </th>
          </thead>
          <tbody>
            {games !== null &&
              games !== undefined &&
              teams !== null &&
              teams !== undefined &&
              games.map((game: any) =>
                teams.map(
                  (team: any) =>
                    game.team1 === team._id && (
                      <Link to={"/admin/game/"+ game._id}>
                        <tr>
                          <td>{game._id}</td>
                          <td>{game.team1 === team._id ? team.name : ""}</td>
                          <td>{getTeam2(game, teams)}</td>
                          <td>
                            {game.date !== null &&
                              game.date !== undefined &&
                              game.date.replace("2022", "22")}
                          </td>
                          <td>{game.time}</td>
                          <td>{game.result ? game.result : "0-0"}</td>
                          <td>{game.status}</td>
                        </tr>
                      </Link>
                    )
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Games;
