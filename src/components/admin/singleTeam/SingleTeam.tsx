import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {
  openDeleteTeamModal,
  closeDeleteTeamModal,
  openUpdateTeamNameModal,
  closeUpdateTeamNameModal,
  closeUpdateTeamPointsModal,
  openUpdateTeamPointsModal,
  openUpdateTeamLogoModal,
  closeUpdateTeamLogoModal,
} from "../../../redux/modals";
import "./SingleTeam.scss";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

const SingleTeam = () => {
  const [team, setTeam] = useState([{}]);
  const [players, setPlayers] = useState([{}]);
  const [correctPlayers, setCorrectPlayers] = useState([{}]);
  const [loadingPlayers, setLoadingPlayers] = useState(true);
  const [allTeams, setAllTeams] = useState([{}]);
  const [newTeamName, setNewTeamName] = useState("");
  const [teamPointsToAdd, setTeamPointsToAdd] = useState(0);
  const [fileName, setFileName] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState();
  const [publicIds, setPublicIds] = useState([]);
  const [specificPublicId, setSpecificPublicId] = useState("c");
  const sortedTeams = allTeams
    .sort((a, b) => (a.points > b.points ? 1 : b.points > a.points ? -1 : 0))
    .reverse();

  const urlQueryString = window.location.pathname;
  const id = urlQueryString.replace("/admin/team/", "");
  const deleteTeamModal = useSelector(
    (state: any) => state.addModal.deleteTeamModal
  );
  const updateTeamNameModal = useSelector(
    (state: any) => state.addModal.updateTeamNameModal
  );
  const updateTeamPointsModal = useSelector(
    (state: any) => state.addModal.updateTeamPointsModal
  );
  const updateTeamLogoModal = useSelector(
    (state: any) => state.addModal.updateTeamLogoModal
  );
  const dispatch = useDispatch();
  const history = useHistory();

  //funzioni per gestire upload file sul modifica team
  // const handleFileInputChange = (event) => {
  //   const file = event.target.files[0];
  //   previewFile(file);
  // };
  // const previewFile = (file) => {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setPreviewSource(reader.result);
  //       setFileName(file.name);
  //     };
  //   }
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("submitting...");
  //   uploadImage(previewSource, fileName);
  //   window.location.reload();
  // };
  // const uploadImage = async (base64EncondedImage, name) => {
  //   let fileNameWithNoExtension = name.replace(".png","");
  //   fileNameWithNoExtension.replace(".jpg","");
  //   fileNameWithNoExtension.replace(".jpeg","");
  //   try {
  //     await fetch("https://soccer-league12.herokuapp.com/api/uploads", {
  //       method: "POST",
  //       body: JSON.stringify({ data: base64EncondedImage, name: fileNameWithNoExtension }),
  //       mode: "cors",
  //       cache: "no-cache",
  //       credentials: "same-origin",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then(() => uploadTeamLogo(fileNameWithNoExtension))
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const uploadTeamLogo = async (name) => {
  //   const response = await fetch('https://soccer-league12.herokuapp.com/teams-logo/' + id,{
  //     method: "POST",
  //     body: JSON.stringify({logo: "soccerManage12/" + name}),
  //     mode: "cors",
  //     cache: "no-cache",
  //     credentials: "same-origin",
  //     headers: {
  //       "Content-Type" : "application/json"
  //     }
  //   });
  //   if(!response.ok){
  //     window.alert("Something went wrong updating team logo...");
  //   } else {
  //     window.alert("Team logo updated successfully");
  //     window.location.reload();
  //   }
  // }
  const handleDeleteTeam = async () => {
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/teams/" + id,
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
      window.alert("Something went wrong deleting team...");
    } else {
      window.alert("Team deleted successfully");
      history.push("/admin/teams");
    }
  };
  const handleUpdateTeamName = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://soccer-league12.herokuapp.com/teams-name/" + id,
      {
        method: "POST",
        body: JSON.stringify({ name: newTeamName }),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("something went wrong updating team name...");
    } else {
      window.alert("team name updated successfully");
      window.location.reload();
    }
  };
  const handleUpdateTeamPoints = async (e) => {
    e.preventDefault();
    const response = await fetch('https://soccer-league12.herokuapp.com/teams-points/' + id,{
      method: "POST",
      mode: "cors",
      body: JSON.stringify({points: teamPointsToAdd}),
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json"
      }
    });
    if(!response.ok){
      window.alert("Something went wrong updating team points...")
    } else {
      window.alert("Team points updated successfully");
      window.location.reload();
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

    getCorrectTeam();
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

  useEffect(() => {
    const getPlayers = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/players",
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
        window.alert("Something went wrong fetching all players...");
      }
      const result = await response.json();
      setPlayers(result);
    };
    getPlayers();
  }, [players.length]);

  useEffect(() => {
    let correctP = players.filter((p: any) => p.teamId === id);
    setCorrectPlayers(correctP);
    setLoadingPlayers(false);
  }, [correctPlayers.length, players]);

  return (
    <div className="SingleTeam__container">
      {deleteTeamModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeDeleteTeamModal())}
            >
              X
            </button>
            <h2>Cancella la squadra</h2>
            <p>Sicuro di voler cancellare la squadra ? </p>
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={() => handleDeleteTeam()}
            >
              Cancella
            </button>
          </div>
        </>
      )}
      {updateTeamNameModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeUpdateTeamNameModal())}
            >
              X
            </button>
            <h2>Modifica Nome Squadra</h2>
            <input
              type="text"
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Nome Squadra"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamName(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {updateTeamPointsModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeUpdateTeamPointsModal())}
            >
              X
            </button>
            <h2>Modifica Punti Squadra</h2>
            <input
              type="number"
              onChange={(e) => setTeamPointsToAdd(e.target.valueAsNumber)}
              placeholder="Punti da aggiungere"
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleUpdateTeamPoints(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )}
      {/* {updateTeamLogoModal && (
        <>
          <div className="SingleTeam__container__modal__overlay" />
          <div className="SingleTeam__container__modal__container">
            <button
              className="SingleTeam__container__modal__container__close"
              onClick={() => dispatch(closeUpdateTeamLogoModal())}
            >
              X
            </button>
            <h2>Modifica Logo Squadra</h2>
            <input
              type="file"
              onChange={(e) => handleFileInputChange(e)}
            />
            <button
              className="SingleTeam__container__modal__container__submit"
              onClick={(e) => handleSubmit(e)}
            >
              Modifica
            </button>
          </div>
        </>
      )} */}
      <div className="SingleTeam__container__topBanner">
        <div className="SingleTeam__container__topBanner__image">
          {specificPublicId.length > 0 && (
            <Image
              publicId={specificPublicId[0] + ".png"}
              cloudName="dhadbk8ko"
            ></Image>
          )}
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
              <td>{team._id}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="SingleTeam__container__middleBanner">
        <h2>Squadra</h2>
        <table>
          <thead>
            <th>
              <td>Nome</td>
              <td>Cognome</td>
              <td>Goal</td>
              <td>Capitano</td>
            </th>
          </thead>
          <tbody>
            {correctPlayers.length === 0 && (
              <p>Stiamo caricando i giocatori presenti . . .</p>
            )}
            {correctPlayers !== null &&
              correctPlayers !== undefined &&
              correctPlayers.length > 0 &&
              correctPlayers.map((cp: any) => (
                <Link
                  to={"/admin/giocatore/" + cp._id}
                  style={{
                    color: "#000",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  <tr>
                    <td>{cp.first_name}</td>
                    <td>{cp.last_name}</td>
                    <td>{cp.scores ? cp.scores : "0"}</td>
                    <td>{cp.capitain ? cp.capitain : "-"}</td>
                  </tr>
                </Link>
              ))}
          </tbody>
        </table>
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
                  <td
                    className={
                      st.name === team.name
                        ? "SingleTeam__container__middleBanner__yellow"
                        : ""
                    }
                  >
                    {st.name}
                  </td>
                  <td>
                    <Image publicId={st.logo + ".png"} cloudName="dhadbk8ko" />
                  </td>
                  <td>{st.points}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="SingleTeam__container__bottomBanner">
        <div>
          <button onClick={() => dispatch(openUpdateTeamNameModal())}>
            Modifica Nome
          </button>
          <button onClick={() => dispatch(openUpdateTeamPointsModal())}>Modifica Punti</button>
        </div>
        <div>
          {/* <button onClick={() => dispatch(openUpdateTeamLogoModal())}>Modifica Logo</button> */}
          <button onClick={() => dispatch(openDeleteTeamModal())}>
            Elimina
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTeam;
