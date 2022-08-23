import React, { useState, useEffect } from "react";
import "./CompetitionSummary.scss";
import {Link} from "react-router-dom"
const CompetitionSummary = () => {
  const [competitions, setCompetitions] = useState([]);
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
    getCompetitions();
  }, []);

  return (
    <div className="CompetitionSummary__container">
      <div className="CompetitionSummary__container__menu">
        <p className="CompetitionSummary__container__menu__label">
          Elenco Competizioni
        </p>
        <div className="CompetitionSummary__container__menu__add">Add</div>
      </div>
      <table className="CompetitionSummary__container__table">
        <thead>
          <th>
            <td>Competizione</td>
            <td>Squadre</td>
            <td>Cannoniere</td>
          </th>
        </thead>
        <tbody>
          {competitions.map((comp: any) => (
            <tr>
              <td>
                <Link to={'/leghe/' + comp._id} >
                {comp.name}
                </Link>
            </td>
              <td>{comp.teams.length}</td>
              <td>{comp.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitionSummary;
