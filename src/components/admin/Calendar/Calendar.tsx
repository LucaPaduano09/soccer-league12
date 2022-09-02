import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import "./Calendar.scss";
import { Link } from "react-router-dom";

const Calendar = () => {
  const [calendar, setCalendar] = useState([{}]);
  const [showWarning, setShowWarning] = useState(true);
  const [addDay, setAddDay] = useState(false);
  const [dayNumber, setDayNumber] = useState();
  const [addGame, setAddGame] = useState(false);
  const [teams, setTeams] = useState([{}]);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [gameDate, setGameDate] = useState();
  const [gameTime, setGameTime] = useState()
  const [dayId, setDayId] = useState();
  const [gameId, setGameId] = useState();
  const history = useHistory();

  const handleCreateDay = async () => {
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/calendar/add",
      {
        method: "POST",
        body: JSON.stringify({ giornata: dayNumber, partite: null }),
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong creating new calendar day");
    }
    const result = await response.json();
  };
  const handleAddGame = (idGiornata) => {
    setAddGame(true);
    setDayId(idGiornata);
  }
  const updateDay = async () => {
    const response = await fetch('https://soccer-league12.herokuapp.com/calendar/' + dayId,{
      method: "POST",
      body: JSON.stringify({giornata: dayNumber, partite: gameId}),
      mode: "cors",
      cache: "no-cache",
      headers:{
        "Content-Type" : "application/json"
      }
    })
    if(!response.ok){
      window.alert("Something went wrong updating calendar...")
    }
    const result = response.json();
  }
  const handleCreateGame = async () => {
    console.log("entro in handleCreateGame")
    if(team1 === team2){
      window.alert("Le due squadre inserite sono uguali, Riprova!")
      window.alert(`dati inseriti: \nteam1: ${team1}\nteam2: ${team2}\ndate: ${gameDate}\ntime: ${gameTime}\nid-giornata: ${dayId}\nid-partita: ${gameId} `)
      // history.push("/admin/calendario");
    } else {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/games/add",
        {
          method: "POST",
          body: JSON.stringify({ team1: team1, team2: team2, result: null }),
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        window.alert("Something went wrong creating new calendar day");
      }
      const result = await response.json().then(() => updateDay())
    }
  };
  useEffect(() => {
    const getCalendar = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/calendar",
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
        window.alert("Something went wrong fetching calendar...");
      }
      const result = await response.json();
      setCalendar(result);
    };
    getCalendar();
  });
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
  },[teams.length]);

  return (
    <div className="Calendar__container">
      {calendar.length === 0 && showWarning === true && (
        <div className="Calendar__container__noDays">
          <p className="Calendar__container__noDays__label">
            Non ci sono ancora giornate
          </p>

          <button
            className="Calendar__container__noDays__add"
            onClick={() => {
              setAddDay(true);
              setShowWarning(false);
            }}
          >
            Aggiungi
          </button>
        </div>
      )}
      {addDay === true && (
        <>
          <div className="Calendar__container__overlay" />
          <div className="Calendar__container__addDayModal">
            <p>Aggiungi una giornata</p>
            <form onSubmit={() => handleCreateDay()}>
              <input
                type="number"
                placeholder="inserisci il numero della giornata"
                onChange={(e) => setDayNumber(e.target.value)}
              />
              <input type="submit" value="Crea" />
            </form>
          </div>
        </>
      )}
      {calendar.length !== 0 && <h1>Calendario</h1>}
      {calendar.length !== 0 &&
        calendar.map((c) => (
          <table>
            <thead>
              <tr>
                <th>Giornata {c.giornata}</th>
              </tr>
            </thead>
            <tbody>
              {c.partite === null && (
                <>
                  <p>Non ci sono ancora partite per questa giornata</p>
                  <Link to={"/admin/calendario/add-partita/" + c._id}>
                  <button onClick={() => handleAddGame(c._id)}>
                    Aggiungi Partita
                  </button>
                  </Link>
                </>
              )}
              {
                c.partite && c.partite.length > 0 && c.partite.map((partita)=>(
                  <p>partita ID : {partita}</p>
                ))
              }
            </tbody>
          </table>
        ))}
    </div>
  );
};

export default Calendar;
