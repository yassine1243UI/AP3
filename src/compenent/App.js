// App.js
import React, { useState } from 'react';
import '../style/App.css';
import Banniere from './Banniere';
import Nouveaute from './Nouveaute';
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

        <Route path='/' element= {<Nouveaute/>}/>

      </Routes>

    </div>
  );
}

export default App;
