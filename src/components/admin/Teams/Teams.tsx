import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Image } from "cloudinary-react";
import { useSelector, useDispatch } from "react-redux";

import "./Teams.scss";
import { openAddTeamModal, closeAddTeamModal } from "../../../redux/modals";
const Teams = () => {
  const [teams, setTeams] = useState([{}]);
  const dispatch = useDispatch();
  const addTeamState = useSelector((state) => state.addModal.addTeamModal);
  const [fileName, setFileName] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState();
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState("");
  
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
  const createTeam = async () => {
    const response = await fetch('https://soccer-league12.herokuapp.com/teams/add',{
        method: "POST",
        body: JSON.stringify({ _id: teamId, logo: "soccerManage12/" + fileName, name: teamName, tournamentId: 4}),
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type" : "application/json"
        }
    });
    if(!response.ok){
        window.alert("Something went wrong creating Team");
    }
  }

  useEffect(() => {
    const getTeams = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/teams",
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
        window.alert("something went wrong fetching teams...");
      }
      const result = await response.json();
      setTeams(result);
    };
    getTeams();
  }, [teams.length]);

  return (
    <div className="Teams__container">
      <h1>Tutte le squadre presenti in database</h1>
      <div className="Teams__container__addTeam"
      onClick={() => dispatch(openAddTeamModal())}
      >add</div>
      <div className="Teams__container__tableWrapper">
        <table>
          <thead>
            <th>
              <td>Logo</td>
              <td>Nome</td>
              <td>Id Team</td>
            </th>
          </thead>
          <tbody>
            {teams.map((team: any) => (
              <tr>
                <td>
                  <Image
                    public_id={team.logo + ".png"}
                    cloud_name="dhadbk8ko"
                  />
                </td>
                <td>
                  <Link to={"/admin/team/" + team._id}>{team.name}</Link>
                </td>
                <td>{team.teamId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addTeamState === true && (
        <>
          <div className="Teams__container__overlay" />
          <div className="Teams__container__addTeamModal">
            <button 
            className="Teams__container__addTeamModal__close"
            onClick={() => dispatch(closeAddTeamModal())}
            > X </button>
            <h2>Aggiungi una Squadra</h2>
            <div>
                <label>Inserisci il nome</label>
                <input type="text" placeholder="nome squadra" onChange={(e)=> setTeamName(e.target.value)}/>
            </div>
            <div>
                <label>Inserisci l'id</label>
                <input type="text" placeholder="id squadra" onChange={(e)=> setTeamId(e.target.value)}/>
            </div>
            <div>
                <label>Inserisci il logo</label>
                <input type="file" placeholder="logo squadra" onChange={(e)=>handleFileInputChange(e)}/>
            </div>
            <div>
                <input type="submit" onClick={(e) => handleSubmit(e,fileName)}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Teams;
