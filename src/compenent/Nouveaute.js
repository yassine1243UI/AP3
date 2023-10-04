import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Nouveaute.css';
import BackgroudImg from '../asset/banner-unicode_720.png'

export default function Banniere({ shouldDisplayBanner, toggleBanner }) {


  return (
    <div className="body">
      <div className='BackgroudImg'>
      <img src={BackgroudImg}></img>
      </div>
      <div className='contenue-sur-photo'>
          <div className='Text'>
            <p className='paragraphe-plus-grand'>BODY POSITIVITY</p>
            <p>IS OUR  CELEBRATION</p>
          </div>

          <div className='bouton'>
            <p>LES BELLES MARQUES DU 32 AU 60</p>
          </div>
        </div>
    </div>
  );
}
