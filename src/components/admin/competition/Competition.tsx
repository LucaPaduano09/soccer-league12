import React, { useState, useEffect } from "react";
import "./Competition.scss";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {
  closeDeleteTeamModal,
  openDeleteTeamModal,
} from "../../../redux/modals";

const Competition = () => {
  const [competition, setCompetition] = useState({});
  const [insertCompId, setInsertCompId] = useState("");
  const [teams, setTeams] = useState([]);
  const urlQueryString = window.location.pathname;
  const id = urlQueryString.replace("/admin/leghe/", "");
  const correctTeams = teams.filter(
    (elem) => elem.tournamentId === competition._id
  );
  const showDeleteModal = useSelector(
    (state) => state.addModal.deleteTeamModal
  );
  const showModifyModal = useSelector(
    (state) => state.addModal.modifyTeamModal
  );
  const dispatch = useDispatch();
  const history = useHistory();
  correctTeams
    .sort((a, b) => (a.points > b.points ? 1 : b.points > a.points ? -1 : 0))
    .reverse();

  const handleDeleteComp = async () => {
    const response = await fetch(
      "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/competizione/" +
        competition._id,
      {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => dispatch(closeDeleteTeamModal()))
      .then(() => history.push("/admin/tournaments"));
  };
  useEffect(() => {
    const getCorrectComp = async () => {
      let response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/competizione/" + id,
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
        window.alert("error fetching competitions...\ncompetition id -> " + id);
      }
      let result = await response.json();
      setCompetition(result);
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
    getCorrectComp();
    getTeams();
  }, [competition]);

  return (
    <div className="Competition__container">
      {showDeleteModal === true && (
        <>
          <div className="Competition__container__modal__overlay" />
          <div className="Competition__container__modal__container">
            <button
              className="Competition__container__modal__container__close"
              onClick={() => dispatch(closeDeleteTeamModal())}
            >
              {" "}
              X{" "}
            </button>

            <h2>Cancella Il Torneo</h2>
            <p>Sei sicuro di voler cancellare il Torneo ? </p>
            <button
              className="Competition__container__modal__container__submit"
              onClick={() => handleDeleteComp()}
            >
              Elimina
            </button>
          </div>
        </>
      )}
      <div className="Foto__container__topBanner">
        <Link to="/admin/tournaments">indietro</Link>
        <h3>Torneo</h3>
      </div>
      <div className="Competition__container__topBanner">
        <div className="Competition__container__topBanner__left">
          <div className="Competition__container__topBanner__left__icon">
            {
              //@ts-ignore
              <Image
                public_id={
                  "https://res.cloudinary.com/dhadbk8ko/image/upload/v1664618826/soccerManage12/logo%203000x3000.png"
                }
                cloudName="dhadbk8ko"
              ></Image>
            }
          </div>
          <div className="Competition__container__topBanner__left__actions">
            <button onClick={() => dispatch(openDeleteTeamModal())}>
              Elimina
            </button>
          </div>
        </div>
      </div>
      <div className="Competition__container__middleBanner">
        <div className="Competition__container__middleBanner__searchContainer"></div>
        <div className="Competition__container__middleBanner__chartContainer">
          <h1>Classifica</h1>
          {teams.length === 0 && (
            <h3>Non ci sono squadre associate alla competizione</h3>
          )}
          {teams !== null && teams !== undefined && teams.length > 0 && (
            <table className="Competition__container__middleBanner__chartContainer__chart">
              <thead>
                <th>
                  <td>Posizione</td>
                  <td>Squadra</td>
                  <td>Punti</td>
                </th>
              </thead>
              <tbody>
                {correctTeams.map((ct: any, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <div>
                        <Image
                          public_id={ct.logo + ".jpg"}
                          cloudName="dhadbk8ko"
                        ></Image>
                        {ct.name}
                      </div>
                    </td>
                    <td>{ct.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Competition;
