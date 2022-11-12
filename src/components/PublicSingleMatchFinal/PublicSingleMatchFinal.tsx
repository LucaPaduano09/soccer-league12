import React, { useState, useEffect } from "react";
import "../admin/Calendar/SingleMatch.scss";
import { Image } from "cloudinary-react";


const SingleMatch = () => {
  const urlQueryString = window.location.pathname;
  const id = urlQueryString.replace("/partita-final/", "");
  const [partita, setPartita] = useState();
  const [teams, setTeams] = useState([{}]);
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [players, setPlayers] = useState([{}]);
  const [filteredPlayers, setFilteredPlayers] = useState([{}]);

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
    const getPlayers = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/players",
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
      } else {
        const result = await response.json();
        setPlayers(result);
      }
    };
    getPlayers();
  }, [players.length]);

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
      } else {
        const result = await response.json();
        setTeams(result);
      }
    };
    getTeams();
  }, [teams.length]);

  useEffect(() => {
    const filterPlayersForTeams = (players: any, team1: any, team2: any) => {
      let filteredPlayers = players.filter(
        (player: any) =>
          player.teamId === team1._id || player.teamId === team2._id
      );
      setFilteredPlayers(filteredPlayers);
    };
    if (
      players !== null &&
      players !== undefined &&
      players.length > 0 &&
      team1 !== null &&
      team1 !== undefined &&
      team2 !== null &&
      team2 !== undefined
    ) {
      filterPlayersForTeams(players, team1, team2);
    }
  }, [players, team1, team2]);
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

  const getMarcatore = (marcatore) => {
    if(players !== undefined && players !== null && players?.length > 0){
    if(partita){
        let fp = players.filter((player:any) => player._id === marcatore);
        console.log(fp)
        if(fp !== null && fp !== undefined && fp.length > 0){
          if(team1){
            if(fp[0].teamId === team1._id){
              return (
              <>
                <p>{(fp[0] as any).first_name + " " + (fp[0] as any).last_name}</p>
              </>
              )
            }
          }
        }
      }
    }
  }
  const getMarcatore2 = (marcatore) => {
    if(players !== undefined && players !== null && players?.length > 0){
    if(partita){
        let fp = players.filter((player:any) => player._id === marcatore);
        console.log(fp)
        if(fp !== null && fp !== undefined && fp.length > 0){
          if(team2){
            if(fp[0].teamId === team2._id){
              return (
              <>
                <p>{(fp[0] as any).first_name + " " + (fp[0] as any).last_name}</p>
              </>
              )
            }
          }
        }
      }
    }
  }

  return (
    <div className="SingleMatch__container">
      <div className="SingleMatch__container__middleBanner" style={{marginTop: "80px"}}>
        <div className="SingleMatch__container__middleBanner__team1">
          <Image
            public_id={team1 !== null && team1 !== undefined && team1.logo}
            cloudName="dhadbk8ko"
          />
          <p>{team1 !== null && team1 !== undefined && team1.name}</p>
        </div>
        <p className="SingleMatch__container__middleBanner__separator">
          {partita !== null && partita !== undefined && <p>{partita.date}</p>}
          {partita !== null && partita !== undefined && <p>{partita.time}</p>}
          {partita !== null && partita !== undefined && (
            <div className="SingleMatch__container__middleBanner__separator__result">
              {partita.result}
            </div>
          )}
        </p>
        <div className="SingleMatch__container__middleBanner__team2">
          <Image
            public_id={team2 !== null && team2 !== undefined && team2.logo}
            cloudName="dhadbk8ko"
          />
          <p>{team2 !== null && team2 !== undefined && team2.name}</p>
        </div>
      </div>
      <div className="SingleMatch__container__midlowerBanner">
        <div className="SingleMatch__container__midlowerBanner__team1">
          {
            partita !== null && partita !== undefined && partita.marcatori.map((marc: any) => (
              getMarcatore(marc)
            ))
          }
        </div>
        <div className="SingleMatch__container__midlowerBanner__separator" />
        <div className="SingleMatch__container__midlowerBanner__team2">
        {
            partita !== null && partita !== undefined && partita.marcatori.map((marc: any) => (
              getMarcatore2(marc)
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SingleMatch;
