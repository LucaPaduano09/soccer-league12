import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAddPlayerModal, closeAddPlayerModal } from "../../../redux/modals";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import "./Players.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Player } from "../../../types/Player"

const Players = () => {
  const [players, setPlayers] = useState<[Player]>();
  const dispatch = useDispatch();
  const history = useHistory();
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
  const [id, setId] = useState("");
  const [sorted, setSorted] = useState<[Player]>();
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    previewFile(file);
  };
  const previewFile = (file: any) => {
    let fileWithNoExtension = file.name.replace(".png", "");
    fileWithNoExtension = fileWithNoExtension.replace(".jpg", "");
    fileWithNoExtension = fileWithNoExtension.replace(".jpeg", "");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      window.alert(fileWithNoExtension);
      setFileName(fileWithNoExtension);
    };
  };
  const handleSubmit = (e, fileName) => {
    e.preventDefault();
    console.log("submitting...");
    if (!previewSource) {
      return;
    }
    uploadImage(previewSource, fileName);
    dispatch(closeAddPlayerModal());
  };

  const uploadImage = async (base64EncondedImage, filename) => {
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
      })
        .then(() => createPlayer(fileName, name, surname, teamId, captain))
        .then(() => dispatch(closeAddPlayerModal()))
        .then(() => window.location.reload());
    } catch (error) {
      console.log(error);
    }
  };
  const createPlayer = async (logo, name, surname, teamId, captain) => {
    let searchedPlayerId = [{}];
    searchedPlayerId = players?.filter((game: any) => game._id === id) as [Player];
    if (searchedPlayerId.length === 0) {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/players/add",
        {
          method: "POST",
          body: JSON.stringify({
            id: id,
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
      } else {
        window.alert("player created successfully");
      }
    } else {
      window.alert(
        `Esiste gia un giocatore con id: ${id}\ngiocatore: ${
          (searchedPlayerId[0] as any).first_name +
          " " +
          (searchedPlayerId[0] as any).last_name
        }`
      );
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
      let filteredPlayers= result?.sort((a, b) => (a.first_name > b.first_name ? 1 : b.first_name > a.first_name ? -1 : 0))
      setPlayers(filteredPlayers);
    };
    getPlayers();
  }, [players?.length]);


  return (
    <div className="Players__container">
      <h1>Giocatori</h1>
          {/* <div className="Players__container__filter">
            <label>Filtra per </label>
            <select onChange={(e) => handleFilter(e.target.value)}>
                <option disabled selected>-</option>
                <option value="name">nome</option>
                <option value="team">squadra</option>
                <option value="goal">goal</option>
            </select>
          </div> */}
      {players !== null && players !== undefined && players?.length === 0 && (
        <>
          <p>Non ci sono giocatori in database</p>
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
              <label>id</label>
              <input type="text" onChange={(e) => setId(e.target.value)} />
            </div>
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
              <input
                type="checkbox"
                value="si"
                onChange={(e) => setCaptain(e.target.value)}
              />
            </div>
            <div>
              <label></label>
              <input type="submit" onClick={(e) => handleSubmit(e, fileName)} />
            </div>
          </div>
        </>
      )}
      <table>
        <button
          className="Players__container__addNewPlayer"
          onClick={() => dispatch(openAddPlayerModal())}
        >
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
        <tbody>
          {
            players?.map((player: any) => (
              <Link to={"/admin/giocatore/" + player._id}>
                <tr className="Players__container__playerContainer">
                  <td>
                    {player !== null &&
                    player !== undefined &&
                    player.logo !== null &&
                    player.logo !== undefined &&
                    player.logo.indexOf(".jpeg") ? (
                      <Image
                        public_id={player.logo + ".jpeg"}
                        cloudName="dhadbk8ko"
                      />
                    ) : (
                      <Image public_id={player.logo} cloudName="dhadbk8ko" />
                    )}
                  </td>
                  <td>{player.first_name}</td>
                  <td>{player.last_name}</td>
                  <td>{player.scores ? player.scores : "0"}</td>
                  <td>
                    <Link
                      style={{ color: "red", textDecoration: "underline" }}
                      to={"/admin/team/" + player.teamId}
                    >
                      {player.teamId}
                    </Link>
                  </td>
                </tr>
              </Link>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Players;
