import React from 'react';
import { Link } from "react-router-dom";
import "./Games.scss"

const Games = () => {
  return (
    <div className="Games__container">
      <div className="Games__container__topBanner">
      <Link to="/admin/dashboard">indietro</Link>
          <h3>Aggiungi Partita</h3>
      </div>
      <div className="Games__container__middleBanner">
        <div>
          <label>Id</label>
          <input type="text" />
        </div>
        <div>
          <label>Squadra 1</label>
          <select></select>
        </div>
        <div>
          <label>Squadra 2</label>
          <select></select>
        </div>
        <div>
          <label>Data:</label>
          <input type="date" />
        </div>
        <div>
          <label>Ora:</label>
          <input type="time" />
        </div>
        <div>
          <input type="submit" />
        </div>
      </div>
    </div>
  )
}

export default Games