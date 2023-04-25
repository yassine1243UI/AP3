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
import Footer from './Footer';
import { Route, Routes, Link } from "react-router-dom";
import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Banniere />
      <Routes>
        <Route path="/inscr" element={<Inscrire />} />
        <Route path="/" element={<Connecter />} />
        <Route path='/Admin' element={<Admin/>}/>
        <Route path='/Sup' element={<Supprimer/>}/>
        <Route path='/Del/:id' element={<Sup/>}/>
        <Route path='/Modifier' element={<Modifier/>}/>
        <Route path='/Modification/:id' element={<Modification/>}/>
        <Route path="/produits" element={<Produits />} />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
