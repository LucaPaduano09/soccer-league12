import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import "./PublicFoto.scss";

const PublicFoto = () => {
  const [foto, setFoto] = useState([{}]);
  const [galleryFoto, setGalleryFoto] = useState([{}]);
  const [dotActive1, setDotActive1] = useState(true);
  const [dotActive2, setDotActive2] = useState(false);
  const [dotActive3, setDotActive3] = useState(false);
  const [translateGallery, setTranslateGallery] = useState("");
  const handleDotClicked1 = () => {
    setDotActive1(true);
    setDotActive2(false);
    setDotActive3(false);
    setTranslateGallery("__translate1");
  };
  const handleDotClicked2 = () => {
    setDotActive1(false);
    setDotActive2(true);
    setDotActive3(false);
    setTranslateGallery("__translate2");
  };
  const handleDotClicked3 = () => {
    setDotActive1(false);
    setDotActive2(false);
    setDotActive3(true);
    setTranslateGallery("__translate3");
  };

  useEffect(() => {
    const getFoto = async () => {
      const response = await fetch(
        "https://soccer-league12.herokuapp.com/foto",
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
        window.alert("Something went wrong fetching foto...");
      } else {
        const result = await response.json();
        setFoto(result);
      }
    };
    getFoto();
  }, [foto.length]);

  useEffect(() => {
    if (foto.length > 2 && foto !== null && foto !== undefined) {
      var arrayFoto = foto.slice(-3);
      arrayFoto = arrayFoto.reverse();
      setGalleryFoto(arrayFoto);
    }
  }, [foto.length]);

  return (
    <div className="PublicFoto__container">
      {foto.length === 0 && <p>Non ci sono ancora foto in database</p>}
      {foto !== null &&
        foto !== undefined &&
        foto.length > 2 &&
        galleryFoto !== null &&
        galleryFoto !== undefined &&
        galleryFoto.length > 2 && (
          <>
            <div
              className={"PublicFoto__container__gallery" + translateGallery}
            >
              <div className="PublicFoto__container__gallery__slide">
                <Image public_id={galleryFoto[0].name} cloudName="dhadbk8ko" />
              </div>
              <div className="PublicFoto__container__gallery__slide">
                <Image public_id={galleryFoto[1].name} cloudName="dhadbk8ko" />
              </div>
              <div className="PublicFoto__container__gallery__slide">
                <Image public_id={galleryFoto[2].name} cloudName="dhadbk8ko" />
              </div>
            </div>
            <div className="PublicFoto__container__dots">
              <div
                className={
                  "PublicFoto__container__dots__dot" +
                  (dotActive1 ? "__active" : "")
                }
                onClick={() => handleDotClicked1()}
              />
              <div
                className={
                  "PublicFoto__container__dots__dot" +
                  (dotActive2 ? "__active" : "")
                }
                onClick={() => handleDotClicked2()}
              />
              <div
                className={
                  "PublicFoto__container__dots__dot" +
                  (dotActive3 ? "__active" : "")
                }
                onClick={() => handleDotClicked3()}
              />
            </div>
          </>
        )}
    </div>
  );
};

export default PublicFoto;
