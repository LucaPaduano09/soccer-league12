import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import "./SinglePlayer.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  openDeletePlayerModal,
  closeDeletePlayerModal,
} from "../../../redux/modals";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SinglePlayer = () => {
  const [player, setPlayer] = useState([{}]);
  const [team, setTeam] = useState([{}]);
  const [deleteOption, setDeleteOption] = useState("");
  const queryUrl = window.location.pathname;
  const id = queryUrl.replace("/admin/giocatore/", "");
  const dispatch = useDispatch();
  const deletePlayerModal = useSelector(
    (state: any) => state.addModal.deletePlayerModal
  );
  const history = useHistory();

    const handleDeletePlayer = async () => {
        if(deleteOption === "si"){
            console.log(deleteOption)
            if(player !== null && player !== undefined){
                console.log(player)
                const response = await fetch('https://soccer-league12.herokuapp.com/players/' + player._id,{
                    method: "DELETE",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers:{
                        "Content-Type" : "application/json"
                    }
                });
                if(!response.ok){
                    window.alert("Something went wrong deleting player with id: " + player._id)
                } else {
                    console.log("deleted player with id: " + player._id)
                  }
                  
                }
                history.push("/admin/dashboard");
        }
    }

  useEffect(() => {
    const getPlayer = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/players/" + id,
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
        window.alert("Something went wrong fetching player...");
      }
      const result = await response.json();
      setPlayer(result);
    };
    getPlayer();
  }, [player.length]);
  useEffect(() => {
    const getTeam = async (teamId) => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/teams/" + teamId,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application",
          },
        }
      );
      if (!response.ok) {
        window.alert("Something went wrong fetching team...");
      }
      const result = await response.json();
      setTeam(result);
    };
    if (
      player !== null &&
      player !== undefined &&
      (player.teamId !== undefined || player.teamId !== null)
    ) {
      getTeam(player.teamId);
    }
  }, [player.length]);

  return (
    <div className="SinglePlayer__container">
      {deletePlayerModal && (
        <>
        <div className="SinglePlayer__container__overlay" />
        <div className="SinglePlayer__container__deletePlayerModal">
          <button onClick={() => dispatch(closeDeletePlayerModal())}> x </button>
          <h2>Cancella Giocatore</h2>
          <Image public_id={player.logo + ".png"} cloudName="dhadbk8ko" />
          <div>
            <p>Sei sicuro di voler cancellare il giocatore ?</p>
            <label>Cancella: </label>
            <input type="checkbox" value="si" onChange={(e) => setDeleteOption(e.target.value)}/>
          </div>
          <input type="submit" onClick={() => handleDeletePlayer()}/>
        </div>
        </>
      )}
      <div className="SinglePlayer__container__left">
        {player !== null && player !== undefined && (
          <>
            <Image public_id={player.logo + ".png"} cloudName="dhadbk8ko" />
            <div className="SinglePlayer__container__left__buttons">
              <button>Modifica</button>
              <button onClick={() => dispatch(openDeletePlayerModal())}>
                Elimina
              </button>
            </div>
          </>
        )}
      </div>
      <div className="SinglePlayer__container__right">
        {player !== null && player !== undefined && (
          <>
            <div className="SinglePlayer__container__right__elem">
              <p>Nome: </p>
              {player.first_name}
            </div>
            <div className="SinglePlayer__container__right__elem">
              <p>Cognome: </p>
              {player.last_name}
            </div>
            <div className="SinglePlayer__container__right__elem">
              <p>Goal Fatti: </p>
              {player.scores ? player.scores : "0"}
            </div>
            <div className="SinglePlayer__container__right__elem">
              <p>Capitano: </p>
              {player.capitain ? player.capitain : "no"}
            </div>
            <div className="SinglePlayer__container__right__elem">
              <p>Squadra: </p>
              <Link to={"/admin/team/" + player.teamId}>
                {team !== null && team !== undefined && team.name}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePlayer;
