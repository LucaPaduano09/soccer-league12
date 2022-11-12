import React from 'react';
import { Link } from "react-router-dom";
import "./CalendarioScelta.scss";

const CalendarioScelta = () => {
  return (
    <div className="CalendarioScelta__container">
        <h1>Scegli quale calendario controllare:</h1>
        <Link to={"/admin/calendario"}>
            Fase a gironi
        </Link>
        <Link to={"/admin/calendario-finale"}>
            Fase finale
        </Link>
    </div>
  )
}

export default CalendarioScelta