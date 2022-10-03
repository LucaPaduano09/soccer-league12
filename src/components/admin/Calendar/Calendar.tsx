import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Calendar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openAddDayModal,
  closeAddDayModal,
  openAddGameModal,
  closeAddGameModal,
  openAddGameToDayModal,
  closeAddGameToDayModal,
  openRemoveGameFromDayModal,
  closeRemoveGameFromDayModal,
  openRemoveDayModal,
  closeRemoveDayModal,
} from "../../../redux/modals";
import { Image } from "cloudinary-react";

import "../../../mixins/global.scss";

const Calendar = () => {
  const [calendar, setCalendar] = useState([{}]);
  const [dayNumber, setDayNumber] = useState();
  const [addGame, setAddGame] = useState(false);
  const [teams, setTeams] = useState([{}]);
  const [team, setTeam] = useState([{}]);
  const [game, setGame] = useState([{}]);
  const [games, setGames] = useState([{}]);
  const [filteredTeam, setFilteredTeam] = useState([{}]);
  const [filteredTeam2, setFilteredTeam2] = useState([{}]);
  const history = useHistory();
  const dispatch = useDispatch();
  const [indexActive, setIndexActive] = useState(0);
  const [selectedDayGames, setSelectedDayGames] = useState([{}]);
  const [gameToAddId, setGameToAddId] = useState("");
  const [gameToRemoveId, setGameToRemoveId] = useState("");
  const [dayToRemove, setDayToRemove] = useState("");
  const changeMatchStatusModal = useSelector(
    (state: any) => state.addModal.changeMatchStatusModal
  );
  const addDayModal = useSelector((state: any) => state.addModal.addDayModal);
  const addGameModal = useSelector((state: any) => state.addModal.addGameModal);
  const addGameToDayModal = useSelector(
    (state: any) => state.addModal.addGameToDayModal
  );
  const removeGameFromDayModal = useSelector(
    (state: any) => state.addModal.removeGameFromDayModal
  );
  const removeDayModal = useSelector(
    (state: any) => state.addModal.removeDayModal
  );
  var x = [{}];
  var y = [{}];

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
    setSelectedDayGames([calendar[0]]);
  }, [calendar.length]);
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
        window.alert("Something went wrong fetching games");
      }
      const result = await response.json();
      setGames(result);
    };
    getGames();
  }, [games.length]);

  const handleCreateDay = async (e) => {
    e.preventDefault();
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
    } else {
      dispatch(closeAddDayModal());
      window.location.reload();
    }
  };
  const filterTeams = (teamId) => {
    const filteredTeamM = teams.filter((team: any) => team._id == teamId);
    if (
      filteredTeamM !== null &&
      filteredTeamM !== undefined &&
      filteredTeamM.length > 0
    ) {
      return <Image public_id={filteredTeamM[0].logo} cloudName="dhadbk8ko" />;
    }
  };
  const filterGames = (partita) => {
    let filteredGames = games.filter((game: any) => game._id === partita);
    if (
      filteredGames[0] !== null &&
      filteredGames[0] !== undefined &&
      filteredGames.length > 0
    ) {
      return filteredGames[0].team1;
    }
  };
  const filterGames2 = (partita) => {
    let filteredGames = games.filter((game: any) => game._id === partita);
    if (
      filteredGames[0] !== null &&
      filteredGames[0] !== undefined &&
      filteredGames.length > 0
    ) {
      return filteredGames[0].team2;
    }
  };
  const handleDayClick = (index, c: any) => {
    setIndexActive(index);
    if (c !== null && c !== undefined) {
      setSelectedDayGames([c]);
    }
  };
  const handleAddGameToDay = async (gameId) => {
    if (selectedDayGames?.length > 0) {
      let add: any = calendar.filter(
        (c: any) => c.giornata === selectedDayGames[0].giornata
      );
      let giornataToFind = add[0]._id;
      if (add[0].partite === null) {
        const response = await fetch(
          "https://soccer-league12.herokuapp.com/calendar-first/" +
            giornataToFind,
          {
            method: "POST",
            body: JSON.stringify({ partite: [gameToAddId] }),
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (!response.ok) {
          window.alert(
            `Something went wrong updating calendar\ngiornata: ${add[0].giornata}\npartitaId: ${gameToAddId}`
          );
        }
        window.location.reload();
      }
      if (add[0].partite.length !== null) {
        const response = await fetch(
          "https://soccer-league12.herokuapp.com/calendar/" + giornataToFind,
          {
            method: "POST",
            body: JSON.stringify({ partite: gameToAddId }),
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        if (!response.ok) {
          window.alert(
            `Something went wrong updating calendar\ngiornata: ${add[0].giornata}\npartitaId: ${gameToAddId}`
          );
        }
        window.location.reload();
      }
    }
  };
  const handleRemoveGame = async (gameId) => {
    let remove: any = calendar.filter(
      (c: any) => c.giornata === (selectedDayGames[0] as any).giornata
    );
    let giornataToFind = remove[0]._id;
    if (remove[0].partite.length === 1) {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/calendar-remove-first/" +
          giornataToFind,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.ok) {
        window.alert("Something went wrong removing game...");
      } else {
        dispatch(closeRemoveGameFromDayModal());
        window.location.reload();
      }
      // window.location.reload();
    }
    if (remove[0].partite.length > 1) {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/calendar-remove/" +
          giornataToFind,
        {
          method: "POST",
          body: JSON.stringify({ partite: gameToRemoveId }),
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.ok) {
        window.alert("Something went wrong removing game...");
      } else {
        dispatch(closeRemoveGameFromDayModal());
        window.location.reload();
      }
    }
  };
  const getResult = (partita: any) => {
    const filteredGame: any = games.filter((game: any) => game._id === partita);
    if (filteredGame[0] !== null && filteredGame[0] !== undefined) {
      return filteredGame[0].result !== null ? filteredGame[0].result : "0 - 0";
    }
  };
  const getDateTime = (partita: any) => {
    const filteredGame: any = games.filter((game: any) => game._id === partita);
    if (filteredGame[0] !== null && filteredGame[0] !== undefined) {
      return (
        <>
          <p >{filteredGame[0].date}</p>
          <p >{filteredGame[0].time}</p>
        </>
      );
    }
  };
  const getTeamName = (teamId: any) => {
    const filteredTeamM = teams.filter((team: any) => team._id == teamId);
    if (
      filteredTeamM !== null &&
      filteredTeamM !== undefined &&
      filteredTeamM.length > 0
    ) {
      return filteredTeamM[0].name;
    }
  };
  const handleRemoveDay = async (e) => {
    e.preventDefault();
    if (calendar?.length > 0) {
      let searchedDay = calendar.filter(
        (cl: any) => cl.giornata === dayToRemove
      );
      if (searchedDay?.length > 0) {
        const response = await fetch(
          "https://soccer-league12.herokuapp.com/calendar-remove-day",
          {
            method: "DELETE",
            mode: "cors",
            body: JSON.stringify({ giornata: dayToRemove }),
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          window.alert("Something went wrong deleting day...");
        } else {
          dispatch(closeRemoveDayModal());
          window.location.reload();
        }
      } else {
        window.alert(`Non esiste nessuna giornata numero: ${dayToRemove}`);
      }
    }
  };

  return (
    <div className="Calendar">
      <div className="Calendar__container">
        {addDayModal && (
          <>
            <div className="Calendar__container__overlay" />
            <div className="Calendar__container__gameModal">
              <button onClick={() => dispatch(closeAddDayModal())}> X </button>
              <h3>Aggiungi Giornata</h3>
              <div>
                <input
                  type="number"
                  placeholder="0"
                  onChange={(e) => setDayNumber(e.target.value)}
                />
              </div>
              <input type="submit" onClick={(e) => handleCreateDay(e)} />
            </div>
          </>
        )}
        {addGameToDayModal && (
          <>
            <div className="Calendar__container__overlay" />
            <div className="Calendar__container__gameModal">
              <button
                className="Calendar__container__gameModal__close"
                onClick={() => dispatch(closeAddGameToDayModal())}
              >
                X
              </button>
              <h2>Aggiungi una Partita</h2>
              <label>Partita</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "space-evenly",
                  flexDirection: "row",
                }}
              >
                <select
                  style={{ width: "70%" }}
                  onChange={(e) => setGameToAddId(e.target.value)}
                >
                  <option selected disabled>
                    {" "}
                    -{" "}
                  </option>
                  {games !== undefined &&
                    games !== null &&
                    games.length > 0 &&
                    games.map((game: any) => (
                      <option value={game._id}>
                        {(x = teams.filter(
                          (team: any) => team._id === game.team1
                        )) +
                          "" +
                          x !==
                          undefined &&
                          x !== null &&
                          x.length > 0 &&
                          x[0].name + " vs "}
                        {(y = teams.filter(
                          (team: any) => team._id === game.team2
                        )) +
                          "" +
                          y !==
                          null &&
                          y !== undefined &&
                          y.length > 0 &&
                          y[0].name}
                      </option>
                    ))}
                </select>
              </div>
              <input
                type="submit"
                onClick={() => handleAddGameToDay(gameToAddId)}
              />
            </div>
          </>
        )}
        {removeGameFromDayModal && (
          <>
            <div className="Calendar__container__overlay" />
            <div className="Calendar__container__gameModal">
              <button
                className="Calendar__container__gameModal__close"
                onClick={() => dispatch(closeRemoveGameFromDayModal())}
              >
                X
              </button>
              <h2>Rimuovi Partita</h2>
              <label>Partita</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "space-evenly",
                  flexDirection: "row",
                }}
              >
                <select
                  style={{ width: "70%" }}
                  onChange={(e) => setGameToRemoveId(e.target.value)}
                >
                  <option selected disabled>
                    {" "}
                    -{" "}
                  </option>
                  {selectedDayGames !== undefined &&
                    selectedDayGames !== null &&
                    selectedDayGames.length > 0 &&
                    (selectedDayGames[0] as any).partite.map((partita: any) => (
                      <option value={partita}>
                        {getTeamName(filterGames(partita)) +
                          "  vs  " +
                          getTeamName(filterGames2(partita))}
                      </option>
                    ))}
                </select>
              </div>
              <input
                type="submit"
                onClick={() => handleRemoveGame(gameToRemoveId)}
              />
            </div>
          </>
        )}
        {removeDayModal && (
          <>
            <div className="Calendar__container__overlay" />
            <div className="Calendar__container__gameModal">
              <button
                className="Calendar__container__gameModal__close"
                onClick={() => dispatch(closeRemoveDayModal())}
              >
                X
              </button>
              <h2>Rimuovi Giornata</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "space-evenly",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  placeholder="giornata"
                  onChange={(e) => setDayToRemove(e.target.value)}
                  style={{ textAlign: "center", fontStyle: "italic" }}
                />
              </div>
              <input type="submit" onClick={(e) => handleRemoveDay(e)} />
            </div>
          </>
        )}
        <div className="Calendar__container__topBanner">
          <Link to="/admin/dashboard">indietro</Link>
          <h3>Calendario</h3>
        </div>
        <div className="Calendar__container__subTopBanner">
          <div className="Calendar__container__subTopBanner__logo">
            <img src="/images/befootball-logo.png" />
          </div>
          <div className="Calendar__container__subTopBanner__name">
            <h3>be football star qatar 2022</h3>
            <p>Calcio a 8</p>
          </div>
          <div className="Calendar__container__subTopBanner__actionContainer">
            <button
              className="Calendar__container__close"
              onClick={() => dispatch(openAddDayModal())}
            >
              +
            </button>
            <button
              className="Calendar__container__close"
              onClick={() => dispatch(openRemoveDayModal())}
            >
              -
            </button>
          </div>
        </div>
        <div className="Calendar__container__daysContainer">
          {calendar !== null &&
            calendar !== undefined &&
            calendar.map((c: any, index) => (
              <>
                <h3>
                  <p
                    className={
                      "Calendar__container__daysContainer" +
                      (index === indexActive ? "__active" : "__notActive")
                    }
                    onClick={() => handleDayClick(index, c)}
                  >
                    {"Giornata " + c.giornata}
                  </p>
                </h3>
              </>
            ))}

          {calendar == null ||
            (calendar === undefined && (
              <>
                <h3 className="Calendar__container__daysContainer__noDaysYet">
                  non ci sono ancora giornate nel calendario
                </h3>
              </>
            ))}
        </div>
        <div className="Calendar__container__middleBanner">
          {calendar !== null &&
            calendar !== undefined &&
            calendar.length > 0 &&
            selectedDayGames !== null &&
            selectedDayGames !== undefined &&
            selectedDayGames.length > 0 &&
            selectedDayGames.map((c: any, index) =>
              c.partite !== null &&
              c.partite !== undefined &&
              c.partite.length > 0 ? (
                c.partite.map(
                  (partita: any, index) =>
                    games.filter((gameM: any) => gameM._id === partita) && (
                      <>
                        <Link
                          to={"/admin/calendario/partita/" + partita}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div
                            key={partita._id}
                            className="Calendar__container__middleBanner__gameContainer"
                          >
                            <div className="Calendar__container__middleBanner__gameContainer__firstTeam">
                              <div className="Calendar__container__middleBanner__gameContainer__firstTeam__logo">
                                {filterTeams(filterGames(partita))}
                              </div>
                              <div className="Calendar__container__middleBanner__gameContainer__firstTeam__name">
                                {getTeamName(filterGames(partita))}
                              </div>
                            </div>
                            <div className="Calendar__container__middleBanner__gameContainer__result">
                              {getResult(partita)}
                              <div className="Calendar__container__middleBanner__gameContainer__result__dateTime">
                                {getDateTime(partita)}
                              </div>
                            </div>
                            <div className="Calendar__container__middleBanner__gameContainer__secondTeam">
                              <div className="Calendar__container__middleBanner__gameContainer__secondTeam__name">
                                {getTeamName(filterGames2(partita))}
                              </div>
                              <div className="Calendar__container__middleBanner__gameContainer__secondTeam__logo">
                                {filterTeams(filterGames2(partita))}
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="Calendar__container__middleBanner__separator" />
                      </>
                    )
                )
              ) : (
                <>
                  <p className="Calendar__container__middleBanner__noGames">
                    Non Ci sono partite per questa giornata
                  </p>
                  <div className="Calendar__container__middleBanner__separator" />
                </>
              )
            )}
        </div>
      </div>
      <div className="Calendar__buttonContainer">
        {calendar?.length > 0 &&
          selectedDayGames.map((c: any, index) =>
            c.partite !== null &&
            c.partite !== undefined &&
            c.partite.length > 0 ? (
              <>
                <button
                  className="Calendar__button"
                  onClick={() => dispatch(openAddGameToDayModal())}
                >
                  Aggiungi
                </button>
                <button
                  className="Calendar__button"
                  onClick={() => dispatch(openRemoveGameFromDayModal())}
                >
                  rimuovi
                </button>
              </>
            ) : (
              <button
                className="Calendar__button"
                onClick={() => dispatch(openAddGameToDayModal())}
              >
                Aggiungi
              </button>
            )
          )}
      </div>
    </div>
  );
};

export default Calendar;
