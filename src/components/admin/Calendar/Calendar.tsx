import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Calendar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openChangeMatchStatusModal } from "../../../redux/modals";

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
  const [gameTime, setGameTime] = useState();
  const [dayId, setDayId] = useState();
  const [gameId, setGameId] = useState();
  const [match, setMatch] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const changeMatchStatusModal = useSelector(
    (state) => state.addModal.changeMatchStatusModal
  );

  const handleChangeStatus = () => {
    dispatch(openChangeMatchStatusModal());
    console.log(changeMatchStatusModal);
  };

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
  };
  const getPartite = async (idPartita) => {
    try {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/games/" + idPartita,
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
        // window.alert("something went wrong fetching single match...")
      }
      const result = await response.json();
      setMatch(match + result);
    } catch (error) {
      window.alert("errore: " + error);
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
  }, [calendar]);
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
            <section>
              <input
                type="number"
                placeholder="inserisci il numero della giornata"
                onChange={(e) => setDayNumber(e.target.value)}
              />
              <input
                type="submit"
                value="Crea"
                onClick={() => handleCreateDay()}
              />
            </section>
          </div>
        </>
      )}
      {calendar.length !== 0 &&
        calendar !== undefined &&
        calendar.map((c, index) => (
          <>
            <h1>Giornata {c.giornata}</h1>
            <table>
              <thead>
                <tr>
                  <th>Casa</th>
                  <th>Ospiti</th>
                  <th>Data</th>
                  <th>Ora</th>
                  <th>Stato</th>
                  <th>Azioni</th>
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
                {/* {c.partite !== null && c.partite !== undefined && (
                  <tr>
                    <td>{c.partite[index].team1}</td>
                    <td>{c.partite[index].team2}</td>
                    <td>{c.partite[index].date}</td>
                    <td>{c.partite[index].time}</td>
                    <td>{c.partite[index].status}</td>
                    <Link to={"/admin/calendario/modifica-partita/"}>
                      <td>
                        Modifica
                      </td>
                    </Link>
                  </tr>
                )} */}
                {
                  c.partite !== null && c.partite !== undefined && c.partite.map((partita) => (
                    <Link to={"/admin/calendario/partita/" + partita}>
                      <p>Id partita: {partita}</p>
                    </Link>
                  ))
                }
              </tbody>
            </table>
          </>
        ))}
      {/* {changeMatchStatusModal === true && (
        <>
          <div className="Calendar__container__changeStatusModal__overlay" />
          <div className="Calendar__container__changeStatusModal__container">
            <h2>Modifica partita</h2>
            <div>
              <label>Data:</label>
              <input type="date"/>
            </div>
            <div>
              <label>Ora:</label>
              <input type="time"/>
            </div>
            <div>
              <label>Stato: </label>
            <select>
              <option value="in corso"> in corso</option>
              <option value="giocata"> giocata</option>
              <option value="da giocare"> da giocare</option>
            </select>
            </div>
            <button>Invia</button>
          </div>
        </>
      )} */}
    </div>
  );
};

export default Calendar;
