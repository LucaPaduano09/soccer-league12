import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enableMenu, disableMenu } from "../../../redux/menu";
import { closeAdminFotoModal, openAdminFotoModal } from "../../../redux/modals";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import "./TopBar.scss";

const TopBar = () => {
  const showModal = useSelector(state => state.addModal.adminFotoModal)
  const showMenu = useSelector(state => state.showMenu);
  const [adminProfileImage, setAdminProfileImage] = useState("");
  const [fileName, setFileName] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState();
  const [showAlert, setShowAlert] = useState({
    state: false,
    status: "failed",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowModal = () => {
    console.log(showModal);
      dispatch(disableMenu())
      dispatch(openAdminFotoModal());
      console.log(showModal);
  };
  
  const handleShowMenu = () => {
    dispatch(enableMenu());
  }

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
    if (!previewSource) {
      console.log("no preview source")
      return;
    }
    uploadImage(previewSource, name);
    handleShowModal(false);
    dispatch(closeAdminFotoModal());
    window.location.reload()
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
      })
        .then(() => updateProfileImage(name))
        .then(() => setShowAlert({ state: true, status: "success" }))
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfileImage = async (name) => {
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/admin/6308a7c2a21a1eea547ba271",
      {
        body: JSON.stringify({ name: "admin1", profile_image: name }),
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("something went wrong");
    }
  };

  useEffect(() => {
    if (setShowAlert) {
      let timer = setTimeout(() => {
        setShowAlert({ state: false, status: "" });
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  });
  useEffect(() => {
    const getAdminFoto = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/admin/6308a7c2a21a1eea547ba271",
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
        window.alert("something went wrong");
      }
      const result = await response.json();
      setAdminProfileImage(result.profile_image);
    };

    getAdminFoto();
  }, []);

  return (
    <div className="TopBar__container">
      <div className="TopBar__container__searchContainer">
        <div className="TopBar__container__searchContainer__search">
          <input
            type="text"
            className="TopBar__container__searchContainer__search__input"
            placeholder="cerca una competizione, una squadra o un giocatore..."
          />
          <img
            src=""
            alt="icon"
            className="TopBar__container__searchContainer__search__icon"
          />
        </div>
      </div>
      {showAlert.state && showAlert.status === "success" && (
        <div className="TopBar__container__alertsContainer__success">
          Hai caricato correttamente la foto profilo
        </div>
      )}
      <div className="TopBar__container__profileContainer">
        <p className="TopBar__container__profileContainer__label">Ciao, Admin</p>
        {showMenu.showMenu === true && (
          <div className="TopBar__container__profileContainer__label__dropMenu">
            <p onClick={() => handleShowModal(true)}>
              Aggiungi una foto profilo
            </p>
          </div>
        )}
        <img
          src={
            adminProfileImage !== ""
              ? "https://res.cloudinary.com/dhadbk8ko/image/upload/v1661516026/soccerManage12/" +
                adminProfileImage +
                ".png"
              : "/images/default-profile.png"
          }
          alt="icon"
          className="TopBar__container__profileContainer__icon"
          onClick={() => handleShowMenu()}
        />
      </div>
      {showModal === true && (
        <>
          <div className="AddImage__overlay"></div>
          <div className="AddImage__container">
            <div
              className="AddImage__container__close"
              onClick={() => dispatch(closeAdminFotoModal())}
            >
              x
            </div>
            <form
              className="AddImage__container__form"
              onSubmit={(e) => handleSubmit(e, fileName)}
            >
              <p>Aggiungi un immagine profilo</p>
              <div className="AddImage__container__form__preview">
                {previewSource && (
                  <img
                    className="AddImage__container__form__preview__image"
                    src={previewSource}
                  />
                )}
              </div>
              <input
                type="file"
                placeholder="scegli la foto"
                onChange={(e) => handleFileInputChange(e)}
                value={fileInputState}
              />
              <input type="submit" placeholder="invia" />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default TopBar;
