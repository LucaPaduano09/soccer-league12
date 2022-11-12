import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./PublicCalendar.scss"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Image } from "cloudinary-react";


const PublicFinalCalendar = () => {
    const [calendar, setCalendar] = useState([{}]);
    const [teams, setTeams] = useState([{}]);
    const [games, setGames] = useState([{}]);
    const [indexActive, setIndexActive] = useState(0);
    const [selectedDayGames, setSelectedDayGames] = useState([{}]);
  
    useEffect(() => {
      const getCalendar = async () => {
        const response = await fetch(
          "https://soccer-league12.herokuapp.com/calendarFinal",
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
        let finalGames = result.filter((game: any) => game.fase === "finale");
        setGames(finalGames);
      };
      getGames();
    }, [games.length]);
  
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
  
    return (
        <div className="PublicCalendar">
        <div className="PublicCalendar__container">
          <div className="PublicCalendar__container__daysContainer">
            {calendar !== null &&
              calendar !== undefined &&
              calendar.map((c: any, index) => (
                <>
                  <h3>
                    <p
                      className={
                        "PublicCalendar__container__daysContainer" +
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
                  <h3 className="PublicCalendar__container__daysContainer__noDaysYet">
                    non ci sono ancora giornate nel calendario
                  </h3>
                </>
              ))}
          </div>
          <div className="PublicCalendar__container__middleBanner">
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
                            to={"/partita-final/" + partita}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <div
                              key={partita._id}
                              className="PublicCalendar__container__middleBanner__gameContainer"
                            >
                              <div className="PublicCalendar__container__middleBanner__gameContainer__firstTeam">
                                <div className="PublicCalendar__container__middleBanner__gameContainer__firstTeam__logo">
                                  {filterTeams(filterGames(partita))}
                                </div>
                                <div className="PublicCalendar__container__middleBanner__gameContainer__firstTeam__name">
                                  {getTeamName(filterGames(partita))}
                                </div>
                              </div>
                              <div className="PublicCalendar__container__middleBanner__gameContainer__result">
                                {getResult(partita)}
                                <div className="PublicCalendar__container__middleBanner__gameContainer__result__dateTime">
                                  {getDateTime(partita)}
                                </div>
                              </div>
                              <div className="PublicCalendar__container__middleBanner__gameContainer__secondTeam">
                                <div className="PublicCalendar__container__middleBanner__gameContainer__secondTeam__name">
                                  {getTeamName(filterGames2(partita))}
                                </div>
                                <div className="PublicCalendar__container__middleBanner__gameContainer__secondTeam__logo">
                                  {filterTeams(filterGames2(partita))}
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="PublicCalendar__container__middleBanner__separator" />
                        </>
                      )
                  )
                ) : (
                  <>
                    <p className="PublicCalendar__container__middleBanner__noGames">
                      Non Ci sono partite per questa giornata
                    </p>
                    <div className="PublicCalendar__container__middleBanner__separator" />
                  </>
                )
              )}
          </div>
        </div>
      </div>
    );
  }

export default PublicFinalCalendar