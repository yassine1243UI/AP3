import '../style/App.css';
import Banniere from './Banniere';
import Produits from './Produits';
import Panier from './Panier';
import Inscrire from './Inscrire';
import Connecter from './Connecter';
import Admin from './Admin';
import Supprimer from './Supprimer';
import Sup from './Suppression';
import Modifier from './Modifier';
import Modification from './Modification'
import AcceuilAdmin from './AcceuilAdmin'
import User from './User'
import UserModif from './UserModif'
import UserSup from './UserSup'
import Footer from './Footer';
import { Route, Routes, Link, useLocation, Navigate } from "react-router-dom";
import React, { useState } from 'react';

const Security = ({ path, element }) => {
const isLoggedIn = localStorage.getItem('mail') && localStorage.getItem('role'); // Vérifiez le statut de connexion dans le local storage
const location = useLocation();

return isLoggedIn ? (
  element
) : (
  <Navigate to="/" state={{ from: location.pathname }} /> // Utilisateur non connecté, redirection vers la page de connexion
);
};

function App() {
  return (
    <div className="App">
      <Banniere />
      <Routes>
        <Route path="/inscr" element={<Inscrire />} />
        <Route path="/" element={<Connecter />} />
        <Route path='/Admin' element={<Security element = {<Admin/>}/>}/>
        <Route path='/Sup' element={<Security element = {<Supprimer/>}/>}/>
        <Route path='/Del/:id' element={<Security element = {<Sup/>}/>}/>
        <Route path='/Modifier' element={<Security element = {<Modifier/>}/>}/>
        <Route path='/Modification/:id' element={<Security element = {<Modification/>}/>}/>
        <Route path='/AcceuilAdmin' element={<Security element = {<AcceuilAdmin/>}/>}/>
        <Route path='/produits' element={<Security element = {<Produits/>}/>}/>
        <Route path='/User' element={<Security element = {<User/>}/>}/>
        <Route path='/UserModif/:id' element={<Security element = {<UserModif/>}/>}/>
        <Route path='/UserSup/:id' element={<Security element = {<UserSup/>}/>}/>

      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
