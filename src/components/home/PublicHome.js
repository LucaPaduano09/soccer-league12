import React, { useState, useEffect } from "react";
import "./PublicHome.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/loader";

const PublicHome = () => {
  const [loading, setLoading] = useState(true);
  const [classificheActive, setClassificheActive] = useState(false);
  const [calendarioActive, setCalendarioActive] = useState(false);
  const loader = useSelector((state) => state.loader.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      dispatch(update(loading));
    }, 3000);
  });
  return (
    <div className="PublicHome__container">
      {/* <VerticalGallery videos={[
          {
            src: "https://www.youtube.com/embed/01QbeS4G8FM",
            title: "Be Football Star",
            type: "youtube",
            content: "Il primo torneo di calcio ad 8 al Vomero!",
            id: "Reset",
          },
        ]} /> */}

      {classificheActive && (
        <div
          className="PublicHome__container__blackContainer"
          style={classificheActive ? { width: "100vw" } : { width: "0vw" }}
        >
          <button onClick={() => setClassificheActive(false)}>
            <img
              src="/images/close1.png"
              alt=""
              // className="Header__container__mobileMenu__close"
              // onClick={() => setOpenMenu(false)}
            />
          </button>
          <Link to={"/classifica-torneo/A"}>
            <h2>Girone A</h2>
          </Link>
          <Link to={"/classifica-torneo/B"}>
            <h2>Girone B</h2>
          </Link>
          <Link to={"/classifica-torneo/C"}>
            <h2>Girone C</h2>
          </Link>
          <Link to={"/classifica-torneo/Finale"}>
            <h2>Fase Finale</h2>
          </Link>
          <Link to={"/classifica-Marcatori"}>
            <h2>Marcatori</h2>
          </Link>
        </div>
      )}
      {
        calendarioActive && (
          <div
          className="PublicHome__container__blackContainer"
          style={calendarioActive ? { width: "100vw" } : { width: "0vw" }}
        >
          <button onClick={() => setCalendarioActive(false)}>
            <img
              src="/images/close1.png"
              alt=""
            />
          </button>
          <Link to={"/calendario"}>
            <h2>Calendario Gironi</h2>
          </Link>
          <Link to={"/calendario-final"}>
            <h2>Calendario Finale</h2>
          </Link>
          </div>
        )
      }
      <div
        className="PublicHome__container__leftItem"
        onClick={() => setClassificheActive(true)}
      >
        <h2>Classifiche</h2>
        <img
          className="PublicHome__container__image"
          src="/images/ball1.jpg"
          alt="squadre"
        />
      </div>
      <div className="PublicHome__container__rightItem" onClick={() => setCalendarioActive(true)} style={{marginBottom: "0px"}}>
        {/* <Link to="/calendario"> */}
          <h2>Calendario</h2>
          <img
            className="PublicHome__container__image"
            src="/images/squadra3.jpg"
            alt="squadre"
          />
        {/* </Link> */}
      </div>
      <div className="PublicHome__container__rightItem">
        <Link to="/squadre">
          <h2>Squadre</h2>
          <img
            className="PublicHome__container__image"
            src="/images/team2-res.jpg"
            alt="squadre"
          />
        </Link>
      </div>
      <div className="PublicHome__container__rightItemDesc">
        <h2 style={{ width: "90%", textAlign: "center" }}>BeFootballStar</h2>
        <p style={{ width: "90%", textAlign: "center" }}>
          E' il primo torneo di calciotto al Vomero! Per info e contatti:{" "}
          <a href="https://wa.me/3312147601" target={"blank"}>
            3312147601
          </a>
        </p>
        <h2 style={{ width: "90%", textAlign: "center" }}>Dove ci troviamo</h2>
        <iframe
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=campetti%20marasca%20napoli&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      </div>
    </div>
  );
};

export default PublicHome;
