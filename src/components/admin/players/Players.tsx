import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAddPlayerModal, closeAddPlayerModal } from "../../../redux/modals";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import "./Players.scss";

const Players = () => {
  const [players, setPlayers] = useState([{}]);
  const dispatch = useDispatch();

  const addPlayerModal = useSelector(
    (state: any) => state.addModal.addPlayerModal
  );
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [teamId, setTeamId] = useState("");
  const [captain, setCaptain] = useState("");
  const [fileName, setFileName] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState();

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    previewFile(file);
  };
  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setFileName(file.name);
    };
  };
  const handleSubmit = (e, fileName) => {
    e.preventDefault();
    console.log("submitting...");
    if (!previewSource) {
      return;
    }
    uploadImage(previewSource, fileName);
    createPlayer(fileName, name, surname, teamId, captain);
    dispatch(closeAddPlayerModal());
    window.location.reload();
  };

  const uploadImage = async (base64EncondedImage, filename) => {
    // console.log(base64EncondedImage)
    try {
      await fetch("https://soccer-league12.herokuapp.com/api/uploads", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify({ data: base64EncondedImage, name: fileName }),
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const createPlayer = async (logo, name, surname, teamId, captain) => {
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/players/add",
      {
        method: "POST",
        body: JSON.stringify({
          logo: "soccerManage12/" + logo,
          first_name: name,
          last_name: surname,
          scores: 0,
          teamId: teamId,
          capitain: captain,
        }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong creating player...");
    }else {
      window.alert("player created successfully")
    }
  };

  useEffect(() => {
    const getPlayers = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/players",
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
        window.alert("Something went wrong fetching playes...");
      }
      const result = await response.json();
      setPlayers(result);
    };
    getPlayers();
  }, [players.length]);

  return (
    <div className="Players__container">
      <h1>Elenco Giocatori</h1>
      {players.length == 0 && (
        <>
          <p>Non ci sono giocatori in database</p>
          <button onClick={() => dispatch(openAddPlayerModal())}>
            Aggiungi
          </button>
        </>
      )}
      {addPlayerModal === true && (
        <>
          <div className="Players__container__overlay" />
          <div className="Players__container__addPlayerModal">
            <button
              className="Players__container__addPlayerModal__close"
              onClick={() => dispatch(closeAddPlayerModal())}
            >
              {" "}
              X{" "}
            </button>
            <h2> Aggiungi giocatore </h2>
            <div>
              <label>Inserisci il nome</label>
              <input
                type="text"
                placeholder="nome giocatore"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Inserisci il cognome</label>
              <input
                type="text"
                placeholder="cognome giocatore"
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div>
              <label>Inserisci una foto</label>
              <input type="file" onChange={(e) => handleFileInputChange(e)} />
            </div>
            <div>
              <label>Inserisci l'id squadra</label>
              <input
                type="text"
                placeholder="id squadra"
                onChange={(e) => setTeamId(e.target.value)}
              />
            </div>
            <div>
              <label>Capitano</label>
              <input type="checkbox" value="si" onChange={(e) => setCaptain(e.target.value)}/>
            </div>
            <div>
              <label></label>
              <input type="submit" onClick={(e) => handleSubmit(e, fileName)} />
            </div>
          </div>
        </>
      )}
      <table>
        <button className="Players__container__addNewPlayer" onClick={() => dispatch(openAddPlayerModal())}>
          +
        </button>
        <thead>
          <th>
            <td>Foto</td>
            <td>Nome</td>
            <td>Cognome</td>
            <td>goal</td>
            <td>squadra</td>
          </th>
        </thead>
        {players !== null &&
          players !== undefined &&
          players.map((player: any) => (
            <tbody>
              <Link to={"/admin/giocatore/" + player._id}>
                <tr className="Players__container__playerContainer">
                  <td>
                    <Image
                      public_id={player.logo + ".png"}
                      cloudName="dhadbk8ko"
                    />
                  </td>
                  <td>{player.first_name}</td>
                  <td>{player.last_name}</td>
                  <td>{player.scores ? player.scores : "0"}</td>
                  <td>
                    <Link style={{color:"red", textDecoration: "underline"}} to={"/admin/team/" + player.teamId}>{player.teamId}</Link>
                  </td>
                </tr>
              </Link>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default Players;
