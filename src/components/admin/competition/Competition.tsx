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
    (elem) => elem.tournamentId.toString() === competition.tournamentId
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

  const handleDeleteComp = async (e, insertCompId) => {
    e.preventDefault();
    console.log("entro in handleDeleteTeam");
    if (insertCompId === competition.tournamentId) {
      try {
        console.log("id uguali");
        await fetch(
          "https://soccer-league12.herokuapp.com/competizione/" +
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
      } catch (error) {}
    }
  };
  useEffect(() => {
    const getCorrectComp = async () => {
      let response = await fetch(
        "https://soccer-league12.herokuapp.com/competizione/" + id,
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
        "https://soccer-league12.herokuapp.com/teams",
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
          <div className="SingleTeam__container__modal__overlay"></div>
          <div className="SingleTeam__container__modal__container">
            <div className="SingleTeam__container__modal__container__close">
              <button onClick={() => dispatch(closeDeleteTeamModal())}>
                {" "}
                X{" "}
              </button>
            </div>
            <div className="SingleTeam__container__modal__container__form">
              <h1>Cancella Il Torneo</h1>
              <p>Sei sicuro di voler cancellare il Torneo ? </p>
              <p>Inserisci l'id della competizione per continuare</p>
              <input
                type="number"
                placeholder="id team"
                onChange={(e) => setInsertCompId(e.target.value)}
              />
              <input
                type="submit"
                onClick={(e) => handleDeleteComp(e, insertCompId)}
              />
            </div>
          </div>
        </>
      )}
      {showModifyModal === true && (
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
              <h1>Modifica Il Toreno</h1>
              <p>
                inserisci i nuovi valori per la competizione:{" "}
                <i>
                  <b>{competition.name}</b>
                </i>
              </p>
              <input type="text" placeholder="nuovo nome" />
              <input type="file" placeholder="nuovo logo" />
              <input
                type="submit"
                onClick={(e) => handleDeleteComp(e, insertCompId)}
              />
            </div>
          </div>
        </>
      )}
      <div className="Competition__container__topBanner">
        <div className="Competition__container__topBanner__back">
          <Link to="/admin/tournaments">
            <p>Torna alle leghe</p>
          </Link>
        </div>
        <div className="Competition__container__topBanner__left">
          <div className="Competition__container__topBanner__left__icon">
            {
              //@ts-ignore
              <Image
                public_id={competition.logo + ".jpg"}
                cloudName="dhadbk8ko"
              ></Image>
            }
          </div>
          <div className="Competition__container__topBanner__left__actions">
            <button onClick={() => dispatch(openModifyTeamModal())}>
              Modifica
            </button>
            <button onClick={() => dispatch(openDeleteTeamModal())}>
              Elimina
            </button>
          </div>
        </div>
        <div className="Competition__container__topBanner__desc">
          <p className="Competition__container__topBanner__desc__title">
            {competition.name}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            consequuntur quibusdam, illo, rerum repellendus voluptas atque
            corrupti optio cupiditate sed minima? Quisquam consequatur corrupti
            aliquam ut dignissimos ea illo fugiat. Nihil nemo qui doloremque
            quia alias molestiae labore explicabo obcaecati dolores placeat, sed
            ex magnam pariatur assumenda mollitia vel! Quo odio aliquid
            accusantium odit error. Quibusdam sit quo temporibus saepe!
          </p>
          <p>Id Competizione: {competition.tournamentId}</p>
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
