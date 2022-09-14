import React, { useState, useEffect } from "react";
import "./Classifica.scss";
import { Image } from "cloudinary-react";
const Classifica = () => {
  const [teams, setTeams] = useState([{}]);
  const sorted =
    teams !== undefined && teams !== null
      ? teams
          .sort((a, b) =>
            a.points > b.points ? 1 : b.points > a.points ? -1 : 0
          )
          .reverse()
      : "";
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
        window.alert("Something went wrong fetching teams...");
      }
      const result = await response.json();
      setTeams(result);
    };
    getTeams();
  }, [teams.length]);

  return (
    <div className="Classifica__container">
      <>
        <table>
          <tbody>
            {teams !== null &&
              teams !== undefined &&
              sorted.map((team, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <Image
                      publicId={team.logo + ".png"}
                      cloudName="dhadbk8ko"
                    />
                  </td>
                  <td>{team.name}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </div>
  );
};

export default Classifica;
