import React, { useState, useEffect } from "react";
import "./Cards.scss";

const Cards = () => {
  const [competitions, setCompetitions] = useState("0");
  const [teams, setTeams] = useState("0");
  const [players, setPlayers] = useState("0");

  useEffect(() => {
    const getCompetitions = async () => {
      const response = await fetch("https://soccer-league12.herokuapp.com/competizione", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!response.ok){
        console.error("Error while fetching competitions")
        return
      }
      const result = await response.json();
      setCompetitions(result.length);
    };
    const getTeams = async () => {
        const response = await fetch("https://soccer-league12.herokuapp.com/teams", {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(!response.ok){
          console.error("Error while fetching teams")
          return
        }
        const result = await response.json();
        setTeams(result.length);
      };
    const getPlayers = async () => {
        const response = await fetch("https://soccer-league12.herokuapp.com/players", {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(!response.ok){
          console.error("Error while fetching players")
          return
        }
        const result = await response.json();
        setPlayers(result.length);
      };
    getCompetitions()
    getTeams()
    getPlayers()
  }, []);

  return (
    <div className="Cards__container">
      <div className="Cards__container__card">
        <p className="Cards__container__card__number">{competitions}</p>
        <p className="Cards__container__card__label">Competizioni</p>
      </div>
      <div className="Cards__container__card">
        <p className="Cards__container__card__number">{teams}</p>
        <p className="Cards__container__card__label">squadre</p>
      </div>
      <div className="Cards__container__card">
        <p className="Cards__container__card__number">{players}</p>
        <p className="Cards__container__card__label">giocatori</p>
      </div>
    </div>
  );
};

export default Cards;
