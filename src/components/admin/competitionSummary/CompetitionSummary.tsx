import React, { useState, useEffect } from "react";
import "./CompetitionSummary.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { openLeagueModal } from "../../../redux/modals"

//@ts-ignore
import AddModal from "../AddModal/AddModal.tsx";
const CompetitionSummary = () => {
  const [competitions, setCompetitions] = useState([]);
  const [teams, setTeams] = useState([]);
  const showCreateModal = useSelector(state => state.addModal.leagueModal)
  const dispatch = useDispatch()
  var teamsNumber = [];

  console.log(teams)
  const handleOpenModal = () => {
    dispatch(openLeagueModal());
  }
  useEffect(() => {
    const getCompetitions = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/competizione",
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
    getCompetitions();
    getTeams();
  }, []);

  return (
    <div className="CompetitionSummary__container">
      {showCreateModal === true && <AddModal />}
      <div className="CompetitionSummary__container__menu">
        <p className="CompetitionSummary__container__menu__label">
          Elenco Competizioni
        </p>
        <div className="CompetitionSummary__container__menu__add" onClick={()=> dispatch(openLeagueModal())}>Aggiungi</div>
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
            teamsNumber = teams.filter(team => team.tournamentId.toString() === comp.tournamentId)
            return (
              <tr>
                <td>
                  <Link to={"/admin/leghe/" + comp._id}>
                    {comp.name}
                  </Link>
                </td>
                <td>{teamsNumber.length}</td>
                <td>{comp.tournamentId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitionSummary;
