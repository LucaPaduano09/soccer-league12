import React, { useState, useEffect } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { openAddFotoModal, closeAddFotoModal } from "../../../redux/modals";
import { Image } from "cloudinary-react";
import "./Foto.scss";

const Foto = () => {
  const [fotos, setFotos] = useState([{}]);
  const dispatch = useDispatch();
  const addFotoModal = useSelector((state: any) => state.addModal.addFotoModal);
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
    let fileWithNoExtension = file.name.replace(".png", "");
    fileWithNoExtension = fileWithNoExtension.replace(".jpg", "");
    fileWithNoExtension = fileWithNoExtension.replace(".jpeg", "");
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      window.alert(fileWithNoExtension);
      setFileName(fileWithNoExtension);
    };
  };
  const handleCreateFoto = async () => {
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/foto/add",
      {
        method: "POST",
        body: JSON.stringify({ name: "fotoUploads/" + fileName }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong updating foto in database...");
    } else {
      dispatch(closeAddFotoModal());
      window.location.reload();
    }
  };
  const uploadImage = async (base64EncondedImage, filename) => {
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/api/uploads",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify({
          data: base64EncondedImage,
          name: fileName,
          type: "foto",
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong updating image...");
    } else {
      console.log("foto uploaded");
      handleCreateFoto();
    }
  };
  const handleRemoveFoto = async (id) => {
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/foto/" + id,
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
      window.alert("something went wrong deleting foto...");
    } else {
      window.alert("foto cancellata con successo");
      window.location.reload();
    }
  };

  useEffect(() => {
    const getFoto = async () => {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/foto",
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
        window.alert("Something went wrong fetching foto...");
      } else {
        const result = await response.json();
        setFotos(result);
      }
    };
    getFoto();
  }, [fotos.length]);

  return (
    <div className="Foto__container">
      {addFotoModal && (
        <>
          <div className="Foto__container__overlay" />
          <div className="Foto__container__modal">
            <button
              className="Foto__container__modal__close"
              onClick={() => dispatch(closeAddFotoModal())}
            >
              <p>X</p>
            </button>
            <h2>Aggiungi una foto</h2>
            {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                className="Foto__container__modal__image"
              />
            )}
            {!previewSource && (
              <div className="Foto__container__modal__placeholder">
                <p>Inserire un immagine per visualizzare l'anteprima</p>
              </div>
            )}

            <input
              value={fileInputState}
              type="file"
              onChange={(e) => handleFileInputChange(e)}
            />
            <button onClick={() => uploadImage(previewSource, fileName)}>
              Aggiungi
            </button>
          </div>
        </>
      )}
      <div className="Foto__container__topBanner">
        <Link to="/admin/dashboard">indietro</Link>
        <h3>Elenco Foto</h3>
        {fotos?.length > 0 && fotos?.length < 3 && (
          <button
            className="Foto__container__topBanner__addFoto"
            onClick={() => dispatch(openAddFotoModal())}
          >
            <p>+</p>
          </button>
        )}
      </div>
      <div className="Foto__container__middleBanner">
        {fotos.length === 0 && (
          <div className="Foto__container__middleBanner__noFoto">
            <p>Non ci sono foto in database</p>
            <p>Iniziare ad aggiungerne una</p>
            <button onClick={() => dispatch(openAddFotoModal())}>
              {" "}
              Aggiungi{" "}
            </button>
          </div>
        )}
        {fotos.length > 0 && (
          <>
            <div className="Foto__container__middleBanner__fotosContainer">
              {fotos !== null &&
                fotos !== undefined &&
                fotos.map((foto: any) => (
                  <div className="Foto__container__middleBanner__fotosContainer__singleFoto">
                    <button
                      className="Foto__container__middleBanner__fotosContainer__singleFoto__delete"
                      onClick={() => handleRemoveFoto(foto._id)}
                    >
                      <p>-</p>
                    </button>
                    <Image public_id={foto.name} cloudName="dhadbk8ko" />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Foto;
