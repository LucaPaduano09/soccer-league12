import React, { useState, useEffect } from "react";
import { Squadra } from "../../types/Squadra";
import { Image } from "cloudinary-react";
import "./PublicSquadre.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const PublicSquadre = () => {
  const [squadre, setSquadre] = useState<[Squadra]>();
  useEffect(() => {
    const getSquadre = async () => {
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
        window.alert("Something went wrong fetching teams...");
      } else {
        const result = await response.json();
        setSquadre(result);
      }
    };
    getSquadre();
  }, [squadre?.length]);

  return (
    <div className="PublicSquadre__container">
      {
        squadre !== undefined && squadre?.length <= 1 && (
          <p>Stiamo caricando le squadre . . .</p>
        )
      }
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Nome</th>
            <th>Girone</th>
          </tr>
        </thead>
        <tbody>
          {squadre?.map((squadra: Squadra) => (
            <Link to={"/squadra/" + squadra._id}>
              <tr>
                <td>
                  <Image public_id={squadra.logo} cloudName="dhadbk8ko" />
                </td>
                <td>
                  <p>{squadra.name}</p>
                </td>
                <td>
                  <p>{squadra.girone}</p>
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PublicSquadre;
