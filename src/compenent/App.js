import '../style/App.css';
import Banniere from './Banniere';
import Produits from './Produits';
import Panier from './Panier';
import Inscrire from './Inscrire';
import Connecter from './Connecter';
import Footer from './Footer'
import { Route, Routes, Link } from "react-router-dom";
import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Banniere />
      <Routes>
        <Route path="/inscr" element={<Inscrire />} />
        <Route path="/connect" element={<Connecter />} />
        <Route path="/" element={<Produits />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
