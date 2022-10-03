import React from 'react'
import "./footer.scss"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="Footer__container">
        <p>© BeFootballStar</p>
        <div>
            <img src="/images/whatsapp-128.png" alt="whatsapplogo"/>
            <a href="https://wa.me/3312147601" target={"blank"}>3312147601</a>
        </div>
    </div>
  )
}

export default Footer