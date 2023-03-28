// On importe les fichiers CSS et les différents composants
import '../style/App.css';
import Banniere from './Banniere';
import Produits from './Produits';
import Panier from './Panier';
import Inscrire from './Inscrire';
import Connecter from './Connecter';
import CoAdmin from './ConnexionAdmin';
import Admin from './Admin';
import Supprimer from './Supprimer';
import Sup from './Suppression';
import Footer from './Footer';

// On importe les composants nécessaires pour utiliser les routes
import { Route, Routes, Link } from "react-router-dom";

// On importe le hook useState de React
import React, { useState } from 'react';

// On crée la fonction App qui va contenir notre application
function App() {
  return (
    // On crée une div qui contiendra notre application
    <div className="App">

      {/* On utilise le composant Banniere pour afficher la bannière */}
      <Banniere />
      <Panier/>

      {/* On utilise le composant Routes pour gérer les différentes routes de l'application */}
      <Routes>
        
        {/* On définit la route pour la page d'inscription */}
        <Route path="/inscr" element={<Inscrire />} />
        {/* On définit la route pour la page de connexion */}
        <Route path="/connect" element={<Connecter />} />
        {/* On définit la route pour la page de connexion à l'interface d'administration */}
        <Route path='/ConAdmin' element={<CoAdmin/>}/>
        {/* On définit la route pour la page de l'interface d'administration */}
        <Route path='/Admin' element={<Admin/>}/>
        {/* On définit la route pour la page de suppression d'articles */}
        <Route path='/Sup' element={<Supprimer/>}/>
        {/* On définit la route pour la page de suppression d'un article spécifique */}
        <Route path='/Del/:id' element={<Sup/>}/>
        {/* On définit la route pour la page d'accueil */}
        <Route path="/" element={<Produits />} />
      </Routes>

      {/* On utilise le composant Footer pour afficher le footer */}
      <Footer/>
    </div>
  );
}

// On exporte la fonction App pour pouvoir l'utiliser dans d'autres fichiers
export default App;
