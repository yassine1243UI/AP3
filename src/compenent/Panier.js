import '../style/Panier.css'
import React, { useState } from 'react';

export default function Panier({}) {
  const [pannier, setPannier] = useState([]);

    return (
      <div id="lateral-panel">   
        <input id="lateral-panel-input" type="checkbox">
        </input>
        <label id="lateral-panel-label" for="lateral-panel-input">
        </label>
        <div id="lateral-panel-bloc">
          <div className="panier">
          <h3>Panier</h3>
        
          {pannier.map((produit, index) => (
            <li key={index}>
              {produit.Articles} {produit.Prix}
            </li>
          ))}
            <button type='button' name='payer'>
              Payer
            </button>
          </div>
        </div>
      </div>
    )
  }