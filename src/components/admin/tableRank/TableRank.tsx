import React, { useState, useEffect } from "react";
// @ts-ignore
import useTableMapper from "../../../hooks/useTableMapper.tsx";
import "./TableRank.scss";

const TableRank = () => {
  // const filler = useTableMapper("teams");

  const [fill, setFill] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selTeam, setSelTeam] = useState();
  // @ts-ignore
  // const ranking = fill.teams[0];
  // console.log(ranking)
  useEffect(() => {
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
        console.error("Error fetching data in useTableMapper...");
      }
      const result = await response.json();
      setTeams(result);
    };
    const getFiller = async (typology: string) => {
      const response = await fetch(
        "https://soccer-league12-42ba9ac5d9ae.herokuapp.com/" + typology,
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
        console.error("Error fetching data in useTableMapper...");
      }
      const result = await response.json();
      setFill(result);
    };
    getTeams();
    getFiller("competizione");
    console.log(teams);
  }, []);

  return (
    <div className="TableRank__container">
      {
        // @ts-ignore
        fill.map((competizione: any, index) => {
          return (
            <>
              <p className="TableRank__container__labelTable">
                {competizione.name}
              </p>
              <div className="TableRank__container__table">
                <thead>
                  <th>
                    <td>Posizione</td>
                    <td>Squadra</td>
                    <td>Punti</td>
                    <td>Status</td>
                  </th>
                </thead>
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{selTeam}</td>
                    <td>1</td>
                    <td>2</td>
                    {/* <td className="TableRank__container__table__teamName"><img src={competizione.teams[index]}/>{competizione.teams[index].name}</td> */}
                    {/* <td>{competizione.teams[index].score}</td> */}
                  </tr>
                </tbody>
              </div>
            </>
          );
        })
      }
    </div>
  );
};

export default TableRank;
