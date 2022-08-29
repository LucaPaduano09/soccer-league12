import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {
  openDeleteTeamModal,
  closeDeleteTeamModal,
  openModifyTeamModal,
  closeModifyTeamModal
} from "../../../redux/modals";
import "./SingleTeam.scss";

const SingleTeam = () => {
  const [team, setTeam] = useState([{}]);
  const [competizione, setCompetizione] = useState([{}]);
  const [insertTeamId, setInsertTeamId] = useState(0);
  const [newName, setNewName] = useState(null);
  const [newPoints, setNewPoints] = useState(null);
  const [fileName, setFileName] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState();

  const urlQueryString = window.location.pathname;
  const id = urlQueryString.replace("/admin/team/", "");
  const showDeleteModal = useSelector(
    (state) => state.addModal.deleteTeamModal
  );
  const showChangeModal = useSelector(
    (state) => state.addModal.modifyTeamModal
  );
  const dispatch = useDispatch();
  const history = useHistory();

  //funzioni per gestire upload file sul modifica team
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
    uploadImage(previewSource, fileName.replace(" ", "%20"));
    // window.location.reload()
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
      }).then(uploadTeam(newName, fileName, newPoints));
    } catch (error) {
      console.log(error);
    }
  };

  const uploadTeam = async (newName, newLogo, newPoints) => {
    console.log(JSON.stringify({name: newName, logo: newLogo, points: newPoints}))
    const response = await fetch('https://soccer-league12.herokuapp.com/teams/'+ id,{
        method:"POST",
        body: JSON.stringify({name:newName, logo: "https://res.cloudinary.com/dhadbk8ko/image/upload/v1661761515/soccerManage12/" + newLogo.replace(" ", "%20"), points: newPoints}),
        mode:"cors",
        cache:"no-cache",
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(!response.ok){
        window.alert("Something went wrong updating team...")
    }
  }

  const handleDeleteTeam = async (e, insertTeamId) => {
    e.preventDefault();
    console.log("entro in handleDeleteTeam");
    if (insertTeamId === team.teamId) {
      try {
        console.log("id uguali");
        await fetch("https://soccer-league12.herokuapp.com/teams/" + team._id, {
          method: "DELETE",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(dispatch(closeDeleteTeamModal()))
          .then(history.push("/admin/teams"));
      } catch (error) {}
    }
  };

  useEffect(() => {
    const getCorrectTeam = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/teams/" + id,
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
        window.alert("Something went wrong fetching specific team");
      }
      const result = await response.json();
      setTeam(result);
    };
    const getTournamentName = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/competizione",
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
        window.alert("something went wrong fetching competitions....");
      }
      const result = await response.json();
      result.forEach((element) => {
        if (element.tournamentId === team.tournamentId.toString()) {
          setCompetizione(element);
        }
      });
    };

    getCorrectTeam().then(() => getTournamentName());
  }, [team.length]);

  return (
    <div className="SingleTeam__container">
      <div className="SingleTeam__container__topBanner">
        <div className="SingleTeam__container__topBanner__image">
          <img src={team.logo + ".png"} />
          <div className="SingleTeam__container__topBanner_menu">
            <button onClick={() => dispatch(openModifyTeamModal())}>Modifica</button>
            <button onClick={() => dispatch(openDeleteTeamModal())}>
              Elimina
            </button>
          </div>
        </div>
        <div className="SingleTeam__container__topBanner__desc">
          <table>
            <tr>
              <th>Nome</th>
              <td>{team.name}</td>
            </tr>
            <tr>
              <th>Capitano</th>
              <td>{team.capitain}</td>
            </tr>
            <tr>
              <th>Punti</th>
              <td>{team.points}</td>
            </tr>
            <tr>
              <th>Id Squadra</th>
              <td>{team.teamId}</td>
            </tr>
            <tr>
              <th>Torneo</th>
              <td>{competizione.name}</td>
            </tr>
            <tr>
              <th>Id Torneo</th>
              <td>{competizione.tournamentId}</td>
            </tr>
          </table>
        </div>
      </div>
      {showDeleteModal === true && (
        <>
          <div className="SingleTeam__container__modal__overlay"></div>
          <div className="SingleTeam__container__modal__container">
            <form onSubmit={(e) => handleDeleteTeam(e, insertTeamId)}>
              <h1>Cancella la Squadra</h1>
              <p>Sei sicuro di voler cancellare la squadra ? </p>
              <p>Inserisci l'id della squadra per continuare</p>
              <input
                type="number"
                placeholder="id team"
                onChange={(e) => setInsertTeamId(e.target.value)}
              />
              <input type="submit" />
            </form>
          </div>
        </>
      )}
      {showChangeModal === true && (
        <>
          <div className="SingleTeam__container__modal__overlay"></div>
          <div className="SingleTeam__container__modal__container">
            <form onSubmit={(e) => handleSubmit(e, newName)}>
              <h1>Modifica La squadra</h1>
              <p>Se non vuoi cambiare tutti i parametri</p>
              <p>Lascia pure vuoti quelli che devono rimanere uguali</p>

              <input
                type="text"
                placeholder="nome squadra"
                onChange={(e) => setNewName(e.target.value)}
              />
              {/* {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                className="AddModal__container__right__image"
                style={{height:"200px", width:"200px"}}
              />
            )} */}
            <input
                type="text"
                placeholder="punti squadra"
                onChange={(e) => setNewPoints(e.target.value)}
              />
              <input
                type="file"
                placeholder="logo squadra"
                onChange={(e) => handleFileInputChange(e)}
                value={fileInputState}
              />
              <input type="submit" />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleTeam;
