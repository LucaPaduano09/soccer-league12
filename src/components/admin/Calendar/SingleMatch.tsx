import React, { useState, useEffect } from "react";
import "./SingleMatch.scss";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import {
  openUpdateResultModal,
  closeUpdateResultModal,
} from "../../../redux/modals";

const SingleMatch = () => {
  const urlQueryString = window.location.pathname;
  const id = urlQueryString.replace("/admin/calendario/partita/", "");
  const [partita, setPartita] = useState();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const dispatch = useDispatch();
  const updateResultModal = useSelector(
    (state: any) => state.addModal.updateResultModal
  );
  const [resultTeam1, setResultTeam1] = useState("");
  const [resultTeam2, setResultTeam2] = useState("");

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

  const handleUpdateResult = async (e) => {
    e.preventDefault();
    const response = await fetch('https://soccer-league12.herokuapp.com/games-update-result/'+ id,{
      method: "POST",
      body: JSON.stringify({result: resultTeam1 + " - " + resultTeam2}),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json"
      }
    });
    if(!response.ok){
      window.alert("Something went wrong updating result . . .")
    } else {
      window.location.reload()
    }
  }

  return (
    <div className="SingleMatch__container">
      {updateResultModal && (
        <>
          <div className="SingleMatch__container__overlay" />
          <div className="SingleMatch__container__modal">
            <h2>Aggiorna Risultato</h2>
            <div>
              <input type="text" onChange={(e) => setResultTeam1(e.target.value)}/>
                <p> - </p>
              <input type="text" onChange={(e) => setResultTeam2(e.target.value)}/>
            </div>
            <button onClick={(e) => handleUpdateResult(e)}>Aggiorna</button>
          </div>
        </>
      )}
      <div className="SingleMatch__container__topBanner">
        <Link to="/admin/dashboard">indietro</Link>
        <h3>Partita</h3>
      </div>
      <div className="SingleMatch__container__middleBanner">
        <div className="SingleMatch__container__middleBanner__team1">
          <Image
            public_id={
              team1 !== null && team1 !== undefined && team1.logo + ".png"
            }
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
            public_id={
              team2 !== null && team2 !== undefined && team2.logo + ".png"
            }
            cloudName="dhadbk8ko"
          />
          <p>{team2 !== null && team2 !== undefined && team2.name}</p>
        </div>
      </div>
      <div className="SingleMatch__container__lowerBanner">
        <div>
          <button onClick={() => dispatch(openUpdateResultModal())}>
            Aggiorna Risultato
          </button>
        </div>
        <div>
          <button>Aggiorna Marcatori</button>
        </div>
        <div>
          <button>Aggiorna Data</button>
        </div>
        <div>
          <button>Aggiorna Ora</button>
        </div>
      </div>
    </div>
  );
};

export default SingleMatch;
