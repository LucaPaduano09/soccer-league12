import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./Games.scss";

const Games = () => {
  const [id, setId] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [teams, setTeams] = useState([{}]);
  const [games, setGames] = useState([{}]);
  const history = useHistory();

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
        window.alert("Something went wrong fetching teams...");
      }
      const result = await response.json();
      setTeams(result);
    };
    getTeams();
  }, [teams.length]);
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
        window.alert("Something went wrong fetching teams...");
      }
      const result = await response.json();
      setGames(result);
    };
    getGames();
  }, [games.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(games !== null && games !== undefined && games.length > 0){
      let searchedGameId =  [{}];
      searchedGameId = games.filter((game: any) => game._id === id)
      if(searchedGameId.length === 0){
        const response = await fetch('https://soccer-league12.herokuapp.com/games/add',{
          method: "POST",
          body: JSON.stringify({_id: id, team1: team1, team2: team2, date: date, time: time}),
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type" : "application/json"
          }
        })
        if(!response.ok){
          window.alert("Something went wrong creating game...");
        } else {
          history.push("/admin/dashboard")
        }
      } else {
        window.alert("Esiste gia una partita con questo id")
      }
    } else {
      window.alert("Something went wrong fetching teams...")
    }
  };


  return (
    <div className="Games__container">
      <div className="Games__container__topBanner">
        <Link to="/admin/dashboard">indietro</Link>
        <h3>Aggiungi Partita</h3>
      </div>
      <div className="Games__container__middleBanner">
        <div>
          <label>Id</label>
          <input type="text" onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <label>Squadra 1</label>
          <select onChange={(e) => setTeam1(e.target.value)}>
            <option> - </option>
            {teams !== null &&
              teams !== undefined &&
              teams.length > 0 &&
              teams.map((team: any) => (
                <option value={team._id}>{team.name}</option>
              ))}
          </select>
        </div>
        <div>
          <label>Squadra 2</label>
          <select onChange={(e) => setTeam2(e.target.value)}>
          <option> - </option>
            {teams !== null &&
              teams !== undefined &&
              teams.length > 0 &&
              teams.map((team: any) => (
                <option value={team._id}>{team.name}</option>
              ))}
          </select>
        </div>
        <div>
          <label>Fase:</label>
          <select>
            <option value="-"disabled>-</option>
            <option value="girone">girone</option>
            <option value="fase-finale">fase finale</option>
          </select>
        </div>
        <div>
          <label>Data:</label>
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Ora:</label>
          <input type="time" onChange={(e) => setTime(e.target.value)} />
        </div>
        <div>
          <input
            type="submit"
            value="Aggiungi"
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Games;
