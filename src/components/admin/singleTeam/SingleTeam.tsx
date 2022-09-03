import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {
  openDeleteTeamModal,
  closeDeleteTeamModal,
  openModifyTeamModal,
  closeModifyTeamModal,
} from "../../../redux/modals";
import "./SingleTeam.scss";
import { Image } from "cloudinary-react";

const SingleTeam = () => {
  const [team, setTeam] = useState([{}]);
  const [allTeams, setAllTeams] = useState([{}]);
  const [competizione, setCompetizione] = useState([{}]);
  const [insertTeamId, setInsertTeamId] = useState(0);
  const [newName, setNewName] = useState(null);
  const [newPoints, setNewPoints] = useState(null);
  const [fileName, setFileName] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState();
  const [publicIds, setPublicIds] = useState([]);
  const [specificPublicId, setSpecificPublicId] = useState("c");
  const sortedTeams = allTeams.sort((a, b) =>
    a.points > b.points ? 1 : b.points > a.points ? -1 : 0
  ).reverse();

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
  const handleSubmit = (e, newName) => {
    e.preventDefault();
    console.log("submitting...");
    if (previewSource) {
      uploadImage(previewSource, fileName.replace(" ", "%20"));
    } else {
      uploadTeam()
    }
    window.location.reload();
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
      }).then(() => uploadTeam(newName, fileName, newPoints));
    } catch (error) {
      console.log(error);
    }
  };

  const uploadTeam = async (newName, newLogo, newPoints) => {
    console.log(
      JSON.stringify({ name: newName, logo: newLogo, points: newPoints })
    );
    let body = {};
    if(newName !== null){
      body = body + JSON.stringify({name: newName})
    }
    if(newPoints !== null){
      body = body + JSON.stringify({points: newPoints})
    }
    if(fileName !== ""){
      body = body + JSON.stringify({logo: newLogo})
    }
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/teams/" + id,
      {
        method: "POST",
        body: JSON.stringify(body),
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong updating team...");
    }
  };

  const handleDeleteTeam = async (e, insertTeamId) => {
    e.preventDefault();
    console.log("entro in handleDeleteTeam");
    if (insertTeamId === team.teamId.toString()) {
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
          .then(() => dispatch(closeDeleteTeamModal()))
          .then(() => history.push("/admin/teams"));
      } catch (error) {}
    }
  };

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
        window.alert("Something went wrong fetching specific team");
      }
      const result = await response.json();
      setAllTeams(result);
    };
    getTeams();
  }, [allTeams.length]);

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

  useEffect(() => {
    const getPublicIds = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/api/images",
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
        window.alert("Something went wrong fetching all public_ids");
      }
      const result = await response.json();
      setPublicIds(result);
    };
    const getSpecificPublicId = async (publicIds) => {
      let filtered = publicIds.filter((public_id) => public_id === team.logo);
      setSpecificPublicId(filtered);
    };
    getSpecificPublicId(publicIds);
    getPublicIds();
    console.log(
      publicIds,
      "specificId: " + specificPublicId,
      "team logo:" + team.logo
    );
  }, [publicIds.length]);

  return (
    <div className="SingleTeam__container">
      <div className="SingleTeam__container__topBanner">
        <div className="SingleTeam__container__topBanner__image">
          {specificPublicId.length > 0 && (
            <Image
              publicId={specificPublicId[0] + ".png"}
              cloudName="dhadbk8ko"
            ></Image>
          )}
          <div className="SingleTeam__container__topBanner_menu">
            <button onClick={() => dispatch(openModifyTeamModal())}>
              Modifica
            </button>
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
            <div className="SingleTeam__container__modal__container__close">
              <button onClick={() => dispatch(closeDeleteTeamModal())}>
                {" "}
                X{" "}
              </button>
            </div>
            <div className="SingleTeam__container__modal__container__form">
              <h1>Cancella la Squadra</h1>
              <p>Sei sicuro di voler cancellare la squadra ? </p>
              <p>Inserisci l'id della squadra per continuare</p>
              <input
                type="number"
                placeholder="id team"
                onChange={(e) => setInsertTeamId(e.target.value)}
              />
              <input type="submit"  onClick={(e) => handleDeleteTeam(e, insertTeamId)}/>
            </div>
          </div>
        </>
      )}
      {showChangeModal === true && (
        <>
          <div className="SingleTeam__container__modal__overlay"></div>
          <div className="SingleTeam__container__modal__container">
            <div className="SingleTeam__container__modal__container__close">
              <button onClick={() => dispatch(closeModifyTeamModal())}>
                {" "}
                X{" "}
              </button>
            </div>
            <div className="SingleTeam__container__modal__container__form">
              <h1>Modifica La squadra</h1>
              <p>Se non vuoi cambiare tutti i parametri</p>
              <p>Lascia pure vuoti quelli che devono rimanere uguali</p>

              <input
                type="text"
                placeholder="nome squadra"
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="text"
                placeholder="punti squadra"
                onChange={(e) => setNewPoints(e.target.value)}
              />
              <div className="SingleTeam__container__modal__container__fileInput">
                <input
                  type="file"
                  placeholder="logo squadra"
                  onChange={(e) => handleFileInputChange(e)}
                  value={fileInputState}
                />
                <div className="SingleTeam__container__modal__container__fileInput__tooltip">
                  <img src="/images/tooltip.png" />
                </div>
              </div>
              <input type="submit" onClick={(e) => handleSubmit(e, newName)}/>
            </div>
          </div>
        </>
      )}
      <div className="SingleTeam__container__middleBanner">
        <h2>Classifica</h2>
        <table>
          <thead>
            <th>
              <td>posizione</td>
              <td>Nome</td>
              <td>Logo</td>
              <td>Punti</td>
            </th>
          </thead>
          <tbody>
            {allTeams !== null &&
              allTeams !== undefined &&
              sortedTeams.map((st, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td className={st.name === team.name ? "SingleTeam__container__middleBanner__yellow" : ""}>{st.name}</td>
                  <td>
                    <Image
                      publicId={st.logo + ".png"}
                      cloudName="dhadbk8ko"
                    />
                  </td>
                  <td>
                    {st.points}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleTeam;
