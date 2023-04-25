import React, { useState } from 'react';
import '../style/Banniere.css'
import { Link } from 'react-router-dom';
import Logo from  '../asset/Logo.png'

export default function Banniere() {
  return (
    <div className="header">
        <nav className="navbar">    
                 <ul className="navbar-header-Logo">
                <Link to="/produits"> <img src={Logo} width="150px" height='100px'></img> </Link>
                </ul>
                <ul className="navbar-header">
                    <Link to="/produits"> Accueil </Link>
                </ul>
                <ul className="navbar-header4">
                    <Link to="/"> Se Déconnecter </Link>
                </ul>
                

        </nav>
    </div>
  )
}
