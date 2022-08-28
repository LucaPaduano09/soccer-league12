import React from 'react';
import "./Header.scss";
import { Link } from "react-router-dom"
const Header = () => {
  return (
    <div className="Header__container">
        <div className="Header__container__logo">
            <img src="" alt="Logo" />
        </div>
        <div className="Header__container__menu">
            <li className="Header__container__menu__option">Home</li>
            <li className="Header__container__menu__option">Leghe</li>
            <li className="Header__container__menu__option">About</li>
            {/* <li className="Header__container__menu__option"></li> */}
        </div>
        <div className="Header__container__social">
            <img src="./images/facebook.png" alt="social-logo"className="Header__container__social__icon" />
            <img src="./images/instagram.png" alt="social-logo"className="Header__container__social__icon" />
            <img src="./images/twitter.png" alt="social-logo"className="Header__container__social__icon" />
        </div>
        <Link to="/admin/login">
        <div>Admin</div>
        </Link>
    </div>
  )
}

export default Header