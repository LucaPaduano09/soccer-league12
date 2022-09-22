import React, { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="Header__container">
      {isMobile && (
        <>
          <div
            className="Header__container__mobileIcon"
            onClick={() => setOpenMenu(true)}
          >
            <img src="/images/mobile-menu.png" alt="menu-icon" />
          </div>
          <div
            className="Header__container__mobileMenu"
            style={openMenu === true ? { width: "100vw" } : { width: "0vw" }}
          >
            {openMenu && (
              <>
                <img
                  src="/images/close1.png"
                  alt=""
                  className="Header__container__mobileMenu__close"
                  onClick={() => setOpenMenu(false)}
                />
                <Link to={"/"}>
                  <a
                    className="Header__container__mobileMenu__option"
                    onClick={() => setOpenMenu(false)}
                  >
                    Home
                  </a>
                </Link>
                <Link to={"/mvp"}>
                  <a
                    className="Header__container__mobileMenu__option"
                    onClick={() => setOpenMenu(false)}
                  >
                    MVP
                  </a>
                </Link>
                <Link to={"/fotogallery"}>
                  <a 
                  className="Header__container__mobileMenu__option"
                  onClick={() => setOpenMenu(false)}
                  >FOTO</a>
                </Link>
                <Link>
                  <a className="Header__container__mobileMenu__option">ABOUT</a>
                </Link>
                <div className="Header__container__mobileMenu__socialWrapper">
                  <a
                    target="blank"
                    href="https://www.facebook.com/profile.php?id=100063831220028"
                  >
                    <img src="./images/facebook1.png" alt="" />
                  </a>
                  <a
                    target="blank"
                    href="https://www.instagram.com/befootballstar_8/?hl=it"
                  >
                    <img src="./images/instagram1.png" alt="" />
                  </a>
                  <a href="https://www.tiktok.com/@befootballstar2022">
                    <img src="./images/tiktok.png" alt="" />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCIDBCmD5MvTurXZ4FvsYDAA"
                    target={"_blank"}
                  >
                    <img src="./images/youtube1.png" alt="" />
                  </a>
                </div>
              </>
            )}
          </div>
          <div className="Header__container__mobileLogo">
            <img src="/images/befootball-logo.png" alt="mobile-logo" />
          </div>
        </>
      )}
      {isMobile === false && (
        <>
          <div className="Header__container__logo">
            <img src="/images/befootball-logo.png" alt="Logo" />
          </div>
          <div className="Header__container__menu">
            <Link to={"/"}>
              <li className="Header__container__menu__option">Home</li>
            </Link>
            <Link to={"/mvp"}>
              <li className="Header__container__menu__option">MVP</li>
            </Link>
            <Link to={"/fotogallery"}>
              <li className="Header__container__menu__option">Foto</li>
            </Link>
            <li className="Header__container__menu__option">About</li>
          </div>
          <div className="Header__container__social">
            <a
              target="blank"
              href="https://www.facebook.com/profile.php?id=100063831220028"
            >
              <img
                src="./images/facebook1.png"
                alt="social-logo"
                className="Header__container__social__icon"
              />
            </a>
            <a
              target="blank"
              href="https://www.instagram.com/befootballstar_8/?hl=it"
            >
              <img
                src="./images/instagram1.png"
                alt="social-logo"
                className="Header__container__social__icon"
              />
            </a>
            <a target="blank" href="https://www.tiktok.com/@befootballstar2022">
              <img
                src="./images/tiktok.png"
                alt="social-logo"
                className="Header__container__social__icon"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCIDBCmD5MvTurXZ4FvsYDAA"
              target={"_blank"}
            >
              <img
                src="./images/youtube1.png"
                alt="yt-logo"
                className="Header__container__social__icon"
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
