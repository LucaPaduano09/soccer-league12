import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { play, stop } from "../../redux/playerSlice";
import { isMobile } from "react-device-detect";
import "./Gallery.scss";
import { visitParameterList } from "typescript";
import  useGallery  from "../../hooks/useGallery";

const Gallery = (props) => {
  var cards = props.cards;
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
  const gallery  = useGallery(cards);

  return (
    <div className="Gallery__container">
      <div className="Gallery__container__gallery">
        {playing === false && (
          <div
            className="Gallery__container__gallery__leftArrow"
            onClick={() => gallery.handleArrowClick("left")}
          >
            <img
              className="Gallery__container__gallery__leftArrow__img"
              src="/images/l-arrow.png"
              alt=""
            />
          </div>
        )}
        <div
          className={
            "Gallery__container__gallery__slideContainer__transform" + gallery.transform.id
          }
        >
          {cards.map((x) => (
            <>
              <li
                className="Gallery__container__gallery__slideContainer__slide"
                key={x.img}
                style={{backgroundImage:`url("${x.img}")` }}
              >
              </li>
            </>
          ))}
        </div>
        {playing === false && (
          <div
            className="Gallery__container__gallery__rightArrow"
            onClick={() => gallery.handleArrowClick("right")}
          >
            <img
              className="Gallery__container__gallery__rightArrow__img"
              src="/images/r-arrow.png"
              alt=""
            />
          </div>
        )}
      </div>
      <div className="Gallery__container__dots">
        {cards.map((v) => (
          <div
            className={
              "Gallery__container__dots__dot" +
              (gallery.transform.id === v.id ? "__active" : "")
            }
            onClick={() => {
              gallery.handleDotClick(v.id, gallery.getId(props.videos));
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
