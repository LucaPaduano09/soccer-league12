import React, { useState, useEffect } from "react";
import { Squadra } from "../../types/Squadra";
import { Player } from "../../types/Player";
import { Image } from "cloudinary-react";
import "./SinglePublicSquadra.scss";

const SinglePublicSquadra = () => {
  const urlString = window.location.pathname;
  const id = urlString.replace("/squadra/", "");
  const [squadra, setSquadra] = useState<Squadra>();
  const [players, setPlayers] = useState<[Player]>();
  const [teamPlayes, setTeamPlayers] = useState<[Player]>();
  const [fase, setFase] = useState("girone");

  useEffect(() => {
    const getTeam = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/teams/" + id,
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
        window.alert(`Something went wrong fetching team with id: ${id}`);
      } else {
        const result = await response.json();
        setSquadra(result);
      }
    };
    getTeam();
  }, [squadra]);

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
        window.alert("something went wrong fetching teams...");
      } else {
        const result = await response.json();
        setPlayers(result);
      }
    };
    getPlayers();
  }, [players?.length]);

  useEffect(() => {
    if (players !== null && players !== undefined && players?.length > 0) {
      if (squadra !== null && squadra !== undefined) {
        let filteredPlayers = players.filter(
          (player: Player) => player.teamId === squadra._id
        )as [Player];
        setTeamPlayers(filteredPlayers);
      }
    }
  }, [players?.length, teamPlayes?.length]);

  return (
    <div className="SinglePublicSquadra__container">
      <div className="SinglePublicSquadra__container__topBanner">
        <Image public_id={squadra?.logo} cloudName="dhadbk8ko" />
        {
          squadra !== null &&
          squadra !== undefined &&
          squadra?.final === true && (
            <div className="SinglePublicSquadra__container__topBanner__switcher">
              <button className={"SinglePublicSquadra__container__topBanner__switcher" + (fase === "girone" ? "__active" : "__noActive")} onClick={() => setFase("girone")}>Fase Gironi</button>
              <button className={"SinglePublicSquadra__container__topBanner__switcher" + (fase === "finale" ? "__active" : "__noActive")} onClick={() => setFase("finale")}>Fase Finale</button>
            </div>
          )
        }
        <div className="SinglePublicSquadra__container__topBanner__info">
          <p>{squadra?.name}</p>
          {
            fase === "girone" && (
              <>
                <p>
                  <p>
                  PUNTI:
                  </p>
                  <p>{squadra?.points}</p>
                </p>
                <p>
                <p>
                  VITTORIE:
                </p>
                  <p>{squadra?.vittorie}</p>
                </p>
                <p>
                  <p>
                  PAREGGI:
                  </p>
                  <p>{squadra?.pareggi}</p>
                </p>
                <p>
                  <p>
                  SCONFITTE:
                  </p>
                  <p>{squadra?.sconfitte}</p>
                </p>
              </>

            )
          }
          {
            fase === "finale" && (
              <>
                <p>
                  <p>
                  PUNTI:
                  </p>
                  <p>{squadra?.points_final}</p>
                </p>
                <p>
                <p>
                  VITTORIE:
                </p>
                  <p>{squadra?.vittorie_final}</p>
                </p>
                <p>
                  <p>
                  PAREGGI:
                  </p>
                  <p>{squadra?.pareggi_final}</p>
                </p>
                <p>
                  <p>
                  SCONFITTE:
                  </p>
                  <p>{squadra?.sconfitte_final}</p>
                </p>
              </>

            )
          }
        </div>
      </div>
      <div className="SinglePublicSquadra__container__middleBanner">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cognome</th>
              <th>Goal</th>
              <th>Capitano</th>
            </tr>
          </thead>
          <tbody>
            {
              fase === "girone" &&
              teamPlayes !== null &&
              teamPlayes !== undefined &&
              teamPlayes?.length > 0 &&
              teamPlayes.map((tp: Player) => (
                <tr>
                  <th>{tp.first_name}</th>
                  <th>{tp.last_name}</th>
                  <th>{tp.scores}</th>
                  <th>{tp.capitain === false ? "-" : "si"}</th>
                </tr>
              ))
            }

            {
              fase === "finale" &&
              teamPlayes !== null &&
              teamPlayes !== undefined &&
              teamPlayes?.length > 0 &&
              teamPlayes.map((tp: Player) => (
                <tr>
                  <th>{tp.first_name}</th>
                  <th>{tp.last_name}</th>
                  <th>{tp.scores_final}</th>
                  <th>{tp.capitain === false ? "-" : "si"}</th>
                </tr>
              ))
            }
              
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SinglePublicSquadra;
