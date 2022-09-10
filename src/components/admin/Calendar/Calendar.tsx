import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Calendar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openAddDayModal, closeAddDayModal } from "../../../redux/modals";
import { Image } from "cloudinary-react";

import "../../../mixins/global.scss";
const Calendar = () => {
  const [calendar, setCalendar] = useState([{}]);
  const [dayNumber, setDayNumber] = useState();
  const [addGame, setAddGame] = useState(false);
  const [teams, setTeams] = useState([{}]);
  const [team, setTeam] = useState([{}]);
  const [game, setGame] = useState([{}]);
  const [filteredTeam, setFilteredTeam] = useState([{}]);
  const [filteredTeam2, setFilteredTeam2] = useState([{}]);
  const history = useHistory();
  const dispatch = useDispatch();
  const [indexActive, setIndexActive] = useState(0);
  const [selectedDayGames, setSelectedDayGames] = useState([{}]);
  const changeMatchStatusModal = useSelector(
    (state: any) => state.addModal.changeMatchStatusModal
  );

  const addDayModal = useSelector((state: any) => state.addModal.addDayModal);

  const handleChangeStatus = () => {
    // dispatch(openChangeMatchStatusModal());
    console.log(changeMatchStatusModal);
  };

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
      window.alert("Giornata creata correttamente: " + (await response.json()));
    }
  };
  const handleAddGame = (idGiornata) => {
    setAddGame(true);
    setDayId(idGiornata);
  };
  const getPartita = async (idPartita) => {
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/games/" + idPartita,
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
    } else {
      // window.alert("response: " + (await response.json()));
      const result = await response.json();
      setGame(result);
      if (game !== null && game !== undefined) {
        filterTeams(game.team1);
        filterTeams2(game.team2);
      }
    }
  };
  const filterTeams = (teamId) => {
    const filteredTeamM = teams.filter((team: any) => team._id == teamId);
    setFilteredTeam(filteredTeamM);
  };
  const filterTeams2 = (teamId) => {
    const filteredTeamM = teams.filter((team: any) => team._id == teamId);
    setFilteredTeam2(filteredTeamM);
  };
  const handleDayClick = (index, c: any) => {
    setIndexActive(index);
    if(c !== null && c !== undefined){
      setSelectedDayGames([c]);
    }
  }

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

  return (
    <div className="Calendar__container">
      {addDayModal && (
        <>
          <div className="Calendar__container__overlay" />
          <div className="Calendar__container__modal">
            <button onClick={() => dispatch(closeAddDayModal())}> X </button>
            <h3>Aggiungi Giornata</h3>
            <div>
              <label>numero giornata:</label>
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
      <button
        className="Calendar__container__close"
        onClick={() => dispatch(openAddDayModal())}
      >
        +
      </button>
      <div className="Calendar__container__middleBanner">
        {calendar !== null &&
          calendar !== undefined &&
          selectedDayGames !== null &&
          selectedDayGames !== undefined &&
          selectedDayGames.length > 0 &&
          selectedDayGames.map(
            (c: any, index) =>
              c.partite !== null &&
              c.partite !== undefined &&
              c.partite.length > 0 &&
              c.partite.map(
                (partita: any, index) =>
                  getPartita(partita) && (
                    <>
                      <div className="Calendar__container__middleBanner__gameContainer">
                        <div className="Calendar__container__middleBanner__gameContainer__firstTeam">
                          <div className="Calendar__container__middleBanner__gameContainer__firstTeam__logo">
                          {game !== null &&
                            game !== undefined &&
                            filteredTeam !== undefined &&
                            filteredTeam.length > 0 &&
                            <Image public_id={filteredTeam[0].logo + ".png"}cloudName="dhadbk8ko"/>
                            }
                          </div>
                          <div className="Calendar__container__middleBanner__gameContainer__firstTeam__name">
                          {game !== null &&
                            game !== undefined &&
                            filteredTeam !== undefined &&
                            filteredTeam.length > 0 &&
                            filteredTeam[0].name}
                          </div>
                        </div>
                        <div className="Calendar__container__middleBanner__gameContainer__result">
                          {game !== null &&
                           game !== undefined &&
                           game.result === null ? "0-0" : game.result
                          }
                          
                        </div>
                        <div className="Calendar__container__middleBanner__gameContainer__secondTeam">
                          <div className="Calendar__container__middleBanner__gameContainer__secondTeam__name">
                          {game !== null &&
                            game !== undefined &&
                            filteredTeam2 !== undefined &&
                            filteredTeam2.length > 0 &&
                            filteredTeam2[0].name}
                          </div>
                          <div className="Calendar__container__middleBanner__gameContainer__secondTeam__logo">
                          {game !== null &&
                            game !== undefined &&
                            filteredTeam2 !== undefined &&
                            filteredTeam2.length > 0 &&
                            <Image public_id={filteredTeam2[0].logo + ".png"}cloudName="dhadbk8ko"/>
                            }
                          </div>
                        </div>
                      </div>
                      <div className="Calendar__container__middleBanner__separator" />
                    </>
                  )
              )
          )}
          {
            selectedDayGames !== null && 
            selectedDayGames !== undefined &&
            selectedDayGames.length > 0 &&
            selectedDayGames.map(
              (c: any, index) =>
                c.partite == null ||
                c.partite == undefined &&
                <div>
                  <p>Non ci sono partite in questa giornata</p>
                </div>
            )
          }
      </div>
    </div>
  );
};

export default Calendar;
