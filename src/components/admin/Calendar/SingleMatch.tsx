import React, { useState, useEffect } from "react";
import "./SingleMatch.scss";
import { Image } from "cloudinary-react";

const SingleMatch = () => {
  const urlQueryString = window.location.pathname;
  const id = urlQueryString.replace("/admin/calendario/partita/", "");
  const [partita, setPartita] = useState();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();

  useEffect(() => {
    const getPartita = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/games/" + id,
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
        window.alert("something went wrong fetching specific game");
      }
      const result = await response.json();
      setPartita(result);
    };
    getPartita();
  }, []);

  useEffect(() => {
    if (partita !== null && partita !== undefined) {
      const getTeam1 = async () => {
        const response = await fetch(
          "https://soccer-league12.herokuapp.com/teams/" + partita.team1,
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
          window.alert("Something went wrong fetching team1");
        }
        const result = await response.json();
        setTeam1(result);
      };
      getTeam1();
    }
  }, [partita]);

  useEffect(() => {
    if (partita !== null && partita !== undefined) {
      const getTeam2 = async () => {
        const response = await fetch(
          "https://soccer-league12.herokuapp.com/teams/" + partita.team2,
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
          window.alert("Something went wrong fetching team1");
        }
        const result = await response.json();
        setTeam2(result);
      };
      getTeam2();
    }
  }, [partita]);

  return (
    <div className="SingleMatch__container">
      <p>{id}</p>
      <div className="SingleMatch__container__topBanner">
        <div className="SingleMatch__container__topBanner__team1">
          <Image
            public_id={
              team1 !== null && team1 !== undefined && team1.logo + ".png"
            }
            cloudName="dhadbk8ko"
          />
          <p>{team1 !== null && team1 !== undefined && team1.name}</p>
        </div>
        <p className="SingleMatch__container__topBanner__separator"> VS </p>
        <div className="SingleMatch__container__topBanner__team2">
          <Image
            public_id={
              team2 !== null && team2 !== undefined && team2.logo + ".png"
            }
            cloudName="dhadbk8ko"
          />
          <p>{team2 !== null && team2 !== undefined && team2.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleMatch;
