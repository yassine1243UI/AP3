import '../style/Panier.css'
import React, { useState } from 'react';

export default function Panier({input_kingdom, input_op, input_cm, input_choujin, input_danda}) {
    // const [input_kingdom, setInputKingdom]= useState(0)
    // const [input_op, setInputOp]= useState('0')
    // const [input_cm, setInputCm]= useState('0')
    // const [input_choujin, setInputChoujin]= useState('0')
    // const [input_danda, setInputDanda]= useState('0')
    // console.log(input_kingdom)

    return (
      <div id="lateral-panel">   
        <input id="lateral-panel-input" type="checkbox">
        </input>
        <label id="lateral-panel-label" for="lateral-panel-input">
        </label>
        <div id="lateral-panel-bloc">
          <div className="panier">
            <h3>Mon panier</h3>
            <p>Balle de basket : {input_kingdom}</p> 
            <p>Chaussure de basket : {input_op}</p> 
            <p>Maillot de basket : {input_cm}</p>
            <p>Pannier de basket : {input_choujin}</p>
            <p>Total: {input_kingdom + input_op + input_cm + input_choujin}</p>
            {/* <p>Total : {input_kingdom + input_op + input_cm + input_choujin + input_danda}</p> */}
            <button type='button' name='payer'>
              Payer
            </button>
          </div>
        </div>
      </div>
    )
  }