// App.js
import React, { useState } from 'react';
import '../style/App.css';
import Banniere from './Banniere';
import Accesoires from './Accessoires';
import Chaussures from './Chaussures';
import Communaute from './Communaute';
import Createurs from './Createurs';
import Editos from './Editos';
import Joalerie from './Joalerie';
import Nouveaute from './Nouveaute';
import NavLatéral from './NavLateral';
import Sacs from './Sacs';
import Vetements from './Vetements';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [shouldDisplayBanner, setShouldDisplayBanner] = useState(true);

  // Fonction pour basculer l'état de shouldDisplayBanner
  const toggleBanner = (value) => {
    setShouldDisplayBanner(value);
  };

  const [isNavLateralVisible, setIsNavLateralVisible] = useState(false);

  // Fonction pour basculer l'état de isNavLateralVisible
  const toggleNavLateral = () => {
    setIsNavLateralVisible(!isNavLateralVisible);
  };

  return (
    <div className="App">
      <Banniere toggleNavLateral={toggleNavLateral} />

      <Routes>
        <Route path='/Accesoires' element={<Accesoires/>}/>
        <Route path='/Chaussures' element={<Chaussures/>}/>
        <Route path='/Communaute' element={<Communaute/>}/>
        <Route path='/Createurs' element={<Createurs/>}/>
        <Route path='/Editos' element={<Editos/>}/>
        <Route path='/Joalerie' element={<Joalerie/>}/>
        <Route path='/' element= {<Nouveaute/>}/>
        <Route path='/Sacs' element={<Sacs/>}/>
        <Route path='/Vetements' element={<Vetements/>}/>
        <Route path='/Navl' element={<NavLatéral/>}/>

      </Routes>

      {isNavLateralVisible && <NavLatéral />}
    </div>
  );
}

export default App;
