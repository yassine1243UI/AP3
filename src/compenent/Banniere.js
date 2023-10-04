import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Banniere.css';
import MenuLateral from '../asset/Hamburger.png';
import AccountIcon from '../asset/User.png';
import Cart from '../asset/Cart.png';
import heart from '../asset/Heart.png';
import search from '../asset/Search.png';

export default function Banniere({ shouldDisplayBanner, toggleBanner }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true); // Ajout de l'état pour l'icône

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDisplayMenu = () => {
    var menu = document.getElementById('Menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    menu.style.flexDirection = 'column';
  };

  const handleImageClick = () => {
    // Inversez l'état de l'icône lorsqu'elle est cliquée
    setIsIconVisible(!isIconVisible);

    // Si l'icône est visible, masquez la bannière en appelant toggleBanner
    if (isIconVisible) {
      toggleBanner(false);
    }
  };

  return (
    <div className="header">
      <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
        <div className="menu-button" onClick={toggleMenu}>
          <div className="hamburger"></div>
        </div>
        <div className='MenuL'>
          <img
            src={MenuLateral}
            alt="Logo"
            width="50px"
            height="50px"
            onClick={toggleDisplayMenu}
          />
        </div>
        <div className='Logo'>
          UNICODE
        </div>
        <ul className="Menu" id="Menu">
          <Link to="/" className="lien-reduit">NOUVEAUTÉ</Link>
          <Link to="/" className="lien-reduit">CRÉATEUR</Link>
          <Link to="/" className="lien-reduit">VÊTEMENTS</Link>
          <Link to="/" className="lien-reduit">CHAUSSURES</Link>
          <Link to="/" className="lien-reduit">SACS</Link>
          <Link to="/" className="lien-reduit">ACCESSOIRES</Link>
          <Link to="/" className="lien-reduit">JOAILLERIE</Link>
          <Link to="/" className="lien-reduit">COMMUNAUTÉ</Link>
          <Link to="/" className="lien-reduit">ÉDITOS</Link>
        </ul>
        <div className='Icon'>
          <ul>
            <Link to="/"> <img src={AccountIcon} alt="Account Icon" /></Link>
            <Link to="/"><img src={search} alt="Search Icon" /></Link>
            <Link to="/"><img src={heart} alt="Heart Icon" /></Link>
            <Link to="/"><img src={Cart} alt="Cart Icon" /></Link>
          </ul>
        </div>
      </nav>
      {isIconVisible && shouldDisplayBanner && (
        // Affichez la bannière uniquement si l'icône est visible
        <div className="banniere">Bannière ici</div>
      )}
    </div>
  );
}
