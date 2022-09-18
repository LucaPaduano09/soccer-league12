import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import "./SinglePlayer.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  openDeletePlayerModal,
  closeDeletePlayerModal,
  openUpdatePlayerNameModal,
  closeUpdatePlayerNameModal,
  openUpdatePlayerLastNameModal,
  closeUpdatePlayerLastNameModal,
  openUpdatePlayerGoalModal,
  closeUpdatePlayerGoalModal,
  openUpdatePlayerLogoModal,
  closeUpdatePlayerLogoModal,
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
  const updatePlayerNameModal = useSelector(
    (state: any) => state.addModal.updatePlayerNameModal
  );
  const updatePlayerLastNameModal = useSelector(
    (state: any) => state.addModal.updatePlayerLastNameModal
  );
  const updatePlayerGoalModal = useSelector(
    (state: any) => state.addModal.updatePlayerGoalModal
  )
  const updatePlayerLogoModal = useSelector(
    (state: any) => state.addModal.updatePlayerLogoModal
  )
  const history = useHistory();
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [goalToAdd, setGoalToAdd] = useState(0);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    if (file) {
      let fileWithNoExtension = file.name.replace(".png","");
      fileWithNoExtension.replace(".jpg","");
      window.alert(fileWithNoExtension)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
        setFileName(fileWithNoExtension);
        dispatch(openUpdatePlayerLogoModal())
      };
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
      }).then(() => uploadPlayerLogo())
    } catch (error) {
      console.log(error);
    }
  };
  const uploadPlayerLogo = async () => {
    const response = await fetch('https://soccer-league12.herokuapp.com/players-logo/' + id,{
      method: "POST",
      body: JSON.stringify({logo: "soccerManage12/"+ fileName}),
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json"
      }
    })
    if(!response.ok){
      window.alert("Something went wrong updating logo...");
    }else{
      dispatch(closeUpdatePlayerLogoModal());
      window.location.reload();
    }
  }
  const handleSubmitNewName = async (e) => {
    const response = await fetch('https://soccer-league12.herokuapp.com/players-name/' + id,{
      method: "POST",
      mode: "cors",
      body: JSON.stringify({first_name: newName}),
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json"
      }
    });
    if(!response.ok){
      window.alert("Something went wrong updating name...")
    } else {
      dispatch(closeUpdatePlayerNameModal())
      history.push("/admin/giocatori")
    }
  }
  const handleUpdatePlayerLastName = async (e) => {
    const response = await fetch('https://soccer-league12.herokuapp.com/players-last-name/' + id,{
      method: "POST",
      mode: "cors",
      body: JSON.stringify({last_name: newLastName}),
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json"
      }
    });
    if(!response.ok){
      window.alert("Something went wrong updating lastname...")
    } else {
      dispatch(closeUpdatePlayerLastNameModal())
      history.push("/admin/giocatori")
    }
  }
  const handleUpdatePlayerGoal = async (e) => {
    const response = await fetch('https://soccer-league12.herokuapp.com/players-goal/' + id,{
      method: "POST",
      mode: "cors",
      body: JSON.stringify({scores: goalToAdd}),
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json"
      }
    });
    if(!response.ok){
      window.alert("Something went wrong updating lastname...")
    } else {
      dispatch(closeUpdatePlayerGoalModal())
      history.push("/admin/giocatori")
    }
  }
  const handleDeletePlayer = async () => {
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/players/" + id,
      {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong deleting player...");
    } else {
      dispatch(closeDeletePlayerModal())
      history.push("/admin/giocatori");
    }
  };
  const handleCloseUpdateLogo = () => {
    dispatch(closeUpdatePlayerLogoModal())
    window.location.reload()
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
            <button className="SinglePlayer__container__deletePlayerModal__close" onClick={() => dispatch(closeDeletePlayerModal())}>
              X
            </button>
            <h2>Cancella Giocatore</h2>
            <p>
              sicuro di voler cancellare il giocatore ? Tutti i dati andranno
              persi.
            </p>
            <button onClick={() => handleDeletePlayer()}>Cancella</button>
          </div>
        </>
      )}
      {updatePlayerNameModal && (
        <>
        <div className="SinglePlayer__container__overlay" />
        <div className="SinglePlayer__container__deletePlayerModal">
          <button className="SinglePlayer__container__deletePlayerModal__close" onClick={() => dispatch(closeUpdatePlayerNameModal())}> X </button>
          <h2>Nuovo Nome</h2>
          <p>Inserisci il nuovo nome</p>
          <input type="text" onChange={(e) => setNewName(e.target.value)}/>
          <button onClick={(e) => handleSubmitNewName(e)}>Modifica</button>
        </div>
        </>
      )}
      {updatePlayerLastNameModal && (
        <>
        <div className="SinglePlayer__container__overlay" />
        <div className="SinglePlayer__container__deletePlayerModal">
          <button className="SinglePlayer__container__deletePlayerModal__close" onClick={() => dispatch(closeUpdatePlayerLastNameModal())}> X </button>
          <h2>Nuovo Cognome</h2>
          <p>Inserisci il nuovo cognome</p>
          <input type="text" onChange={(e) => setNewLastName(e.target.value)}/>
          <button onClick={(e) => handleUpdatePlayerLastName(e)}>Modifica</button>
        </div>
        </>
      )}
      {updatePlayerGoalModal && (
        <>
        <div className="SinglePlayer__container__overlay" />
        <div className="SinglePlayer__container__deletePlayerModal">
          <button className="SinglePlayer__container__deletePlayerModal__close" onClick={() => dispatch(closeUpdatePlayerGoalModal())}> X </button>
          <h2>Goal</h2>
          <p>Inserisci i goal da aggiungere</p>
          <input type="number" onChange={(e) => setGoalToAdd(e.target.valueAsNumber)}/>
          <button onClick={(e) => handleUpdatePlayerGoal(e)}>Modifica</button>
        </div>
        </>
      )}
      {updatePlayerLogoModal && (
        <>
        <div className="SinglePlayer__container__overlay" />
        <div className="SinglePlayer__container__deletePlayerModal">
          <button className="SinglePlayer__container__deletePlayerModal__close" onClick={() => handleCloseUpdateLogo()}> X </button>
          <h2>Foto</h2>
          <p>Modificare scelta: <i><b>{fileName}</b></i></p>
          <button onClick={(e) => uploadImage(previewSource, fileName)}>Modifica</button>
        </div>
        </>
      )}
      <div className="SinglePlayer__container__left">
        {player !== null && player !== undefined && player.logo !== null && player.logo !== undefined &&  (
          player.logo.indexOf(".jpeg") ?
          (<Image public_id={player.logo + ".jpeg"} cloudName="dhadbk8ko" />) :
          (<Image public_id={player.logo} cloudName="dhadbk8ko" />)
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
      <div className="SinglePlayer__container__buttonsContainer">
        <button onClick={() => dispatch(openUpdatePlayerNameModal())}>Modifica Nome</button>
        <button onClick={() => dispatch(openUpdatePlayerLastNameModal())}>Modifica Cognome</button>
        <button onClick={() => dispatch(openUpdatePlayerGoalModal())}>Modifica Goal</button>
        <input type="file" onChange={(e) => handleFileInputChange(e)}/>
        <button onClick={() => dispatch(openDeletePlayerModal())}>Elimina</button>
      </div>
    </div>
  );
};

export default SinglePlayer;
