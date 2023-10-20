import React, { useState, useEffect } from "react";
import "./CompetitionSummary.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openLeagueModal } from "../../../redux/modals";
import { closeLeagueModal } from "../../../redux/modals";

const CompetitionSummary = () => {
  const [competitions, setCompetitions] = useState([]);
  const [teams, setTeams] = useState([]);
  const showCreateModal = useSelector(
    (state: any) => state.addModal.leagueModal
  );
  const dispatch = useDispatch();
  const [nameLeague, setNameLeague] = useState("");
  const [id, setId] = useState("");
  const [fileName, setFileName] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [fileInputState, setFileInputState] = useState();
  var teamsNumber = [];

  console.log(teams);
  const handleOpenModal = () => {
    dispatch(openLeagueModal());
  };
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
  const handleSubmit = (e, fileName) => {
    e.preventDefault();
    console.log("submitting...");
    if (!previewSource) {
      return;
    }
    uploadImage(previewSource, fileName);
  };
  const uploadImage = async (base64EncondedImage, filename) => {
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/api/uploads",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify({ data: base64EncondedImage, name: fileName }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      window.alert("Something went wrong updating image...");
    } else {
      createLeague(nameLeague, id, fileName);
    }
  };
  const createLeague = async (name, id, logo) => {
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/competizione/add",
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
    );
    if (!response.ok) {
      window.alert("Something went wrong creating league...");
    } else {
      dispatch(closeLeagueModal());
      window.location.reload();
    }
  };
  useEffect(() => {
    const getCompetitions = async () => {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/competizione",
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
        window.alert("Error fetching competitions...");
      }
      const result = await response.json();
      setCompetitions(result);
    };
    const getTeams = async () => {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/teams",
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
        window.alert("Error fetching teams...");
      }
      const result = await response.json();
      setTeams(result);
    };
    getCompetitions();
    getTeams();
  }, []);

  return (
    <div className="CompetitionSummary__container">
      {showCreateModal === true && (
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
      )}
      <div className="CompetitionSummary__container__menu">
        <h2 className="CompetitionSummary__container__menu__label">
          Competizioni
        </h2>
        {competitions !== null &&
          competitions !== undefined &&
          competitions.length === 0 && (
            <div
              className="CompetitionSummary__container__menu__add"
              onClick={() => dispatch(openLeagueModal())}
            >
              +
            </div>
          )}
      </div>
      <table className="CompetitionSummary__container__table">
        <thead>
          <th>
            <td>Competizione</td>
            <td>Squadre</td>
            <td>Id Torneo</td>
          </th>
        </thead>
        <tbody>
          {competitions.map((comp: any) => {
            //@ts-ignore
            teamsNumber = teams.filter(
              (team) => team.tournamentId === comp.tournamentId
            );
            return (
              <tr>
                <td>
                  <Link to={"/admin/leghe/" + comp._id}>{comp.name}</Link>
                </td>
                <td>{teamsNumber.length}</td>
                <td>{comp._id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitionSummary;
