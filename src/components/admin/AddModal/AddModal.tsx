import React, { useState } from "react";
import "./AddModal.scss";
import axios from "axios";

const AddModal = () => {
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [fileInputState, setFileInputState] = useState()
  const [previewSource, setPreviewSource] = useState();

  const handleToggleModal = () => {
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
  }
  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      setPreviewSource(reader.result)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault() 
    console.log('submitting...')
    if(!previewSource){
      return
    } 
    uploadImage(previewSource);
  }

  const uploadImage = async (base64EncondedImage) => {
    // console.log(base64EncondedImage)
    try {
      await fetch('/api/uploads',{
        method: "POST",
        body: JSON.stringify({data: base64EncondedImage}),
        headers: {
          'Content-type': 'application/json'
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="AddModal__overlay">
      <div className="AddModal__container">
        <div className="AddModal__container__left">
        <div className="AddModal__container__left__topBanner">
          <h1 className="AddModal__container__left__topBanner__title">
            {" "}
            Aggiungi un Torneo{" "}
          </h1>
          <button onClick={()=>handleToggleModal()}>X</button>
        </div>
        <div className="AddModal__container__left__formContainer">
          <form
          onSubmit={(e)=>handleSubmit(e)}
          >
          <input
            type="text"
            className="AddModal__container__left__formContainer__input"
            placeholder="inserisci il nome del torneo"
            onChange={(e)=> setName(e.target.value)}
          />
          <input
            type="text"
            className="AddModal__container__left__formContainer__input"
            placeholder="inserisci id del torneo"
            onChange={(e)=> setId(e.target.value)}
          />
          <input
            type="file"
            className="AddModal__container__left__formContainer__input"
            placeholder="inserisci il logo del torneo"
            onChange={(e)=> handleFileInputChange(e)}
            value={fileInputState}
          />
          
          <button
            type="submit"
            className="AddModal__container__left__formContainer__input"
          >
          </button>
          </form>
        </div>
        </div>
        <div className="AddModal__container__right">
          {
            previewSource && (
              <img src={previewSource} alt="chosen" style={{height:'300px'}} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AddModal;
