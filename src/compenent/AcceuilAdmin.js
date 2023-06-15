import React, { useState } from 'react';
import '../style/Banniere.css'
import { Link } from 'react-router-dom';
import Ajouter from '../asset/Ajouter.png';
import Supprimer from '../asset/Supprimer.png'
import Modifier from '../asset/Modifier.png'
import UserLogo from '../asset/UserLogo.png'

import '../style/AcceuilAdmin.css'

export default function Banniere() {
    return (
      <div className="body">
        <nav className="menu" style={{ marginTop: '200px' }} >    
          <Link to="/Admin" className="link">
            <img src={Ajouter} width="200px" height="200px" alt="Ajouter" />
            <span>Ajouter</span>
          </Link>
          <Link to="/Modifier" className="link">
            <img src={Modifier} width="200px" height="200px" alt="Modifier" />
            <span>Modifier</span>
          </Link>
          <Link to="/Sup" className="link">
            <img src={Supprimer} width="200px" height="200px" alt="Supprimer" />
            <span>Supprimer</span>
          </Link>
          <Link to="/User" className="link">
            <img src={UserLogo} width="200px" height="200px" alt="User" />
            <span>User</span>
          </Link>
        </nav>
      </div>
    );
  }
  
