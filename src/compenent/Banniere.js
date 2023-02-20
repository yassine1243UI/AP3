import React, { useState } from 'react';
import '../style/Banniere.css'
import { Link } from 'react-router-dom';
import Logo from  '../asset/Logo.png'

export default function Banniere() {
  return (
    <div className="header">
        <nav className="navbar">    
                 <ul className="navbar-header-Logo">
                    <Link to="/"> <img src={Logo} width="150px" height='100px'></img> </Link>
                </ul>
                <ul className="navbar-header">
                    <Link to="/"> Accueil </Link>
                </ul>
                <ul className="navbar-header3">
                    <Link to="/inscr"> Inscription </Link>
                </ul>
                <ul className="navbar-header4">
                    <Link to="/connect"> Se connecter </Link>
                </ul>
        </nav>
    </div>
  )
}
