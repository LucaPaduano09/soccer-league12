import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import "./SinglePlayer.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  openDeletePlayerModal,
  closeDeletePlayerModal,
  openUpdatePlayerModal,
  closeUpdatePlayerModal,
} from "../../../redux/modals";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SinglePlayer = () => {
  const [player, setPlayer] = useState([{}]);
  const [team, setTeam] = useState([{}]);
  const [deleteOption, setDeleteOption] = useState("");
  const [fileName, setFileName] = useState();
  const [previewSource, setPreviewSource] = useState();
  const queryUrl = window.location.pathname;
  const id = queryUrl.replace("/admin/giocatore/", "");
  const dispatch = useDispatch();
  const deletePlayerModal = useSelector(
    (state: any) => state.addModal.deletePlayerModal
  );
  const updatePlayerModal = useSelector(
    (state: any) => state.addModal.updatePlayerModal
  );
  const goal = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const [added, setAdded] = useState("");
  const history = useHistory();
  const handleDeletePlayer = async () => {
    if (deleteOption === "si") {
      console.log(deleteOption);
      try {
        await fetch(
          "https://soccer-league12.herokuapp.com/players/" + player._id,
          {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(() => history.push("/admin/dashboard"));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
        setFileName(file.name);
      };
    }
  };
  const handleSubmit = (e, name) => {
    e.preventDefault();
    console.log("submitting...");
    if(previewSource) {
      uploadImage(previewSource, name);
    }
  };
  const uploadImage = async (base64EncondedImage, name) => {
    try {
      await fetch("https://soccer-league12.herokuapp.com/api/uploads", {
        method: "POST",
        body: JSON.stringify({ data: base64EncondedImage, name: name }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(()=> createTeam())
    } catch (error) {
      console.log(error);
    }
  };

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
            
          </div>
        </>
      )}
      {updatePlayerModal && (
        <>
          <div className="SinglePlayer__container__overlay" />
          <div className="SinglePlayer__container__updateModal">
            <button className="SinglePlayer__container__updateModal__close" onClick={() => dispatch(closeUpdatePlayerModal())}> X </button>
            <h2>Modifica Giocatore</h2>
            <div>
              <label>Nome:</label>
              <input type="text" placeholder="Mario Rossi" />
            </div>
            <div>
              <label>Foto:</label>
              <input type="file" onChange={(e) => handleFileInputChange(e)}/>
            </div>
            <div className="SinglePlayer__container__updateModal__selectContainer">
              <div>
              <label>Goal</label>
              <select onChange={(e) => setAdded(e.target.value)}>
                {goal.map((g, index) => (
                  <option value={index + 1}>{g}</option>
                ))}
              </select>
              </div>
              <div>
              <label>Capitano:</label>
              <input type="checkbox" value={"si"} />
              </div>
            </div>
            <button>Invia</button>
          </div>
        </>
      )}
      <div className="SinglePlayer__container__left">
        {player !== null && player !== undefined && (
          <>
            <Image public_id={player.logo + ".png"} cloudName="dhadbk8ko" />
            <div className="SinglePlayer__container__left__buttons">
              <button onClick={() => dispatch(openUpdatePlayerModal())}>
                Modifica
              </button>
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
