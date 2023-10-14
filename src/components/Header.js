import React from 'react';
import Logo from "../assets/Logo V.png"
import "../styles/Header.css"

function Header() {
    return (
        <header className="header">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className="contact-container">
          <a href="#" className="contact">Contact</a>
        </div>
      </header>
    );
}

export default Header;
