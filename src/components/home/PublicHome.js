import React, { useState, useEffect } from "react";
import "./PublicHome.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { update }  from "../../redux/loader";

const PublicHome = () => {
  const [loading, setLoading] = useState(true);
  const loader = useSelector((state)=> state.loader.loading);
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(()=>{
      setLoading(false);
      dispatch(update(loading))
    },3000)
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

      <div
        className={
          "PublicHome__container__videoWrapper"
        }
        style={loader ? { width: "100%" } : { width: 0 }}
      >
        <video autoPlay muted loop playsInline>
          <source src="/images/main-video.mov" />
        </video>
        {/* <div className="PublicHome__container__imageWrapper" >
          <img className="PublicHome__container__imageWrapper__image"src="/images/befootball-logo.png" alt="logo" style={loader ? (isMobile ? { width: "125px" } : {width: "250px"}) : { width: 0 } }/>
        </div> */}
      </div>

      <div className="PublicHome__container__leftItem">
        <Link to="/classifica-torneo">
        <img className="PublicHome__container__image"src="/images/ball1.jpg" alt="squadre" />
        <h1>Grafica Torneo (Classifica)</h1>
        </Link>
      </div>
      <div className="PublicHome__container__rightItem">
        <Link to="/calendario">
        <img className="PublicHome__container__image"src="/images/squadra3.jpg" alt="squadre" />
        <h1>Grafica Calendario</h1>
        </Link>
      </div>
    </div>
  );
};

export default PublicHome;
