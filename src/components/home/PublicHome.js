import React, { useState, useEffect } from "react";
// import Gallery from '../gallery/Gallery'
// import VerticalGallery from '../verticalGallery/VerticalGallery.tsx'
import "./PublicHome.scss";

const PublicHome = () => {
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
      <div className="PublicHome__container__videoWrapper">
        <video autoPlay muted loop>
          <source src="/images/main-video.mov"  />
        </video>
      </div>
      <div className="PublicHome__container__titleWrapper">
        <p>Be</p>
        <p>Football</p>
        <p>Star</p>
      </div>
      {/* <div className="PublicHome__container__descWrapper">
        <p>Il primo torneo di calciotto al Vomero</p>
      </div> */}
    </div>
  );
};

export default PublicHome;
