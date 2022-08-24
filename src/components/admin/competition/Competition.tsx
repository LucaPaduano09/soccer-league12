import React, { useState, useEffect } from "react";
import "./Competition.scss";

const Competition = () => {
  const [competition, setCompetition] = useState({});
  const [teams, setTeams] = useState([]);
  const urlQueryString = window.location.pathname;
  const id = urlQueryString.replace("/admin/leghe/", "");
  const correctTeams = teams.filter((elem: any) => {
    if (elem.tournamentId === competition.tournamentId) {
      return elem;
    }
  });
  correctTeams
    .sort((a, b) => (a.points > b.points ? 1 : b.points > a.points ? -1 : 0))
    .reverse();
  console.log(correctTeams);
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
  }, []);
  console.log(competition);
  return (
    <div className="Competition__container">
      <div className="Competition__container__topBanner">
        <div className="Competition__container__topBanner__icon">
          {
            //@ts-ignore
            <img src={competition && competition.logo} alt="comp-icon" />
          }
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
                  <td><img src={ct.logo} alt="logo" style={{marginRight:"10px"}}/>{ct.name}</td>
                  <td>{ct.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Competition;
