import React, { useState } from "react";
import "./AddModal.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { closeLeagueModal } from "../../../redux/modals";
import {
  toggleCompetitions,
  toggleDashboard,
  togglePlayers,
  toggleTeams,
} from "../../../redux/sidebar";

const AddModal = () => {
  const [nameLeague, setNameLeague] = useState("");
  const [id, setId] = useState("");
  const [fileName, setFileName] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeLeagueModal());
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    previewFile(file);
  };
  const previewFile = (file: any) => {
    const reader = new FileReader();
    let fileWithNoExtension = file.name.replace(".png","");
    fileWithNoExtension = fileWithNoExtension.replace(".jpg","");
    fileWithNoExtension = fileWithNoExtension.replace(".jpeg","");
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
    dispatch(closeLeagueModal());
   
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
      }).then(() => createLeague(nameLeague, id, fileName));
    } catch (error) {
      console.log(error);
    }
  };

  const createLeague = async (name, id, logo) => {
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/competizione/add",
      {
        method: "POST",
        body: JSON.stringify({
          _id: id,
          name: name,
          logo: "soccerManage12/" + logo,
        }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (!response.ok) {
      window.alert("Something went wrong creating league...");
    } else {
      window.alert("League created successfully\nresponse: " + await response.json())
    }
  };

  return (
    <div className="AddModal__overlay">
      <div className="AddModal__container">
        <div className="AddModal__container__left">
          <div className="AddModal__container__left__topBanner">
            <h1 className="AddModal__container__left__topBanner__title">
              {" "}
              Aggiungi un Torneo{" "}
            </h1>
            <button
              className="AddModal__container__closeButton"
              onClick={() => handleCloseModal()}
            >
              X
            </button>
          </div>
          <div className="AddModal__container__right">
            {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                className="AddModal__container__right__image"
              />
            )}
            {!previewSource && (
              <div className="AddModal__container__right__placeholder">
                <p>Inserire un immagine per visualizzare l'anteprima</p>
              </div>
            )}
          </div>
          <div className="AddModal__container__left__formContainer">
            <form onSubmit={(e) => handleSubmit(e, fileName)}>
              <input
                type="text"
                className="AddModal__container__left__formContainer__input"
                placeholder="inserisci il nome del torneo"
                onChange={(e) => setNameLeague(e.target.value)}
              />
              <input
                type="text"
                className="AddModal__container__left__formContainer__input"
                placeholder="inserisci id del torneo"
                onChange={(e) => setId(e.target.value)}
              />
              <input
                type="file"
                className="AddModal__container__left__formContainer__input"
                placeholder="inserisci il logo del torneo"
                onChange={(e) => handleFileInputChange(e)}
                value={fileInputState}
              />

              <input
                type="submit"
                className="AddModal__container__left__formContainer__input"
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
