import React, { useState, useEffect } from "react";
import "./CompetitionSummary.scss";
import { Link } from "react-router-dom";
//@ts-ignore
import AddModal from "../AddModal/AddModal.tsx";
const CompetitionSummary = () => {
  const [competitions, setCompetitions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  var teamsNumber = [];
  var firstInRank = [];
  var pointsToBeat = 0
  const handleToggleModal = () => {
    toggleModal === false ? setToggleModal(true) : setToggleModal(false);
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
      {toggleModal && <AddModal />}
      <div className="CompetitionSummary__container__menu">
        <p className="CompetitionSummary__container__menu__label">
          Elenco Competizioni
        </p>
        <div className="CompetitionSummary__container__menu__add" onClick={()=> handleToggleModal()}>Add</div>
      </div>
      <table className="CompetitionSummary__container__table">
        <thead>
          <th>
            <td>Competizione</td>
            <td>Squadre</td>
            <td>Capolista</td>
            <td>Id Torneo</td>
          </th>
        </thead>
        <tbody>
          {competitions.map((comp: any) => {
            //@ts-ignore
            teamsNumber = teams.filter((elem: any) => {
              return elem.tournamentId === comp.tournamentId;
            });
            console.log(teamsNumber)
            return (
              <tr>
                <td>
                  <Link to={"/admin/leghe/" + comp._id}>
                    {comp.name}
                  </Link>
                </td>
                <td>{teamsNumber.length}</td>
                <td>
                  {
                  teamsNumber.map((tn:any) =>{
                    if( tn.points > pointsToBeat ){
                      pointsToBeat = tn.points;
                      return tn.name
                    }
                  })
                  }
                  </td>
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
