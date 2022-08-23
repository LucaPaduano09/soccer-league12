import React, { useState, useEffect } from "react";
// @ts-ignore
import useTableMapper from "../../../hooks/useTableMapper.tsx";
import "./TableRank.scss";

const TableRank = () => {
  // const filler = useTableMapper("teams");
  const [fill, setFill] = useState([]);
  // @ts-ignore
  // const ranking = fill.teams[0];
  // console.log(ranking)
  useEffect(()=>{
      const getFiller = async (typology: string) => {
          const response = await fetch("https://soccer-league12.herokuapp.com/" + typology, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            console.error("Error fetching data in useTableMapper...");
          }
          const result = await response.json();
          setFill(result);
        };
      getFiller("competizione")
      console.log(fill)
  },[fill.length])
  
  return (
    <div className="TableRank__container">
      <p className="TableRank__container__label">Top Leghe</p>
      {
        // @ts-ignore
        fill.map((competizione: any, index) => (
          <>
            <p className="TableRank__container__labelTable">{competizione.name}</p>
            <div className="TableRank__container__table">
              <thead>
                <th>
                  <td>Posizione</td>
                  <td>Squadra</td>
                  <td>Punti</td>
                </th>
              </thead>
              <tbody>
                <tr>
                  <td>{index + 1}</td>
                  <td className="TableRank__container__table__teamName"><img src={competizione.teams[index]}/>{competizione.teams[index].name}</td>
                  <td>{competizione.teams[index].score}</td>
                </tr>
              </tbody>
            </div>
          </>
        ))
      }
    </div>
  );
};

export default TableRank;
