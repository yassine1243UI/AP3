import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';
import '../style/Produits.css';

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [affichage, setAffichage] = useState(false);
  const [panier, setPanier] = useState([]);
  const [total, setTotal] = useState(0); // Ajout d'un état pour le total initialisé à 0

  const recup = async () => {
    await axios
      .get(`http://localhost:8000/produit`)
      .then((res) => {
        console.log(res);
        setQuiz(res.data);
        setAffichage(true);
      });
  };

  useEffect(() => {
    recup();
  }, []);

  const ajouterAuPanier = (produit) => {
    setPanier([...panier, produit]);
  };

  const calculerTotal = () => {
    let total = 0;
    panier.forEach((produit) => {
      total += produit.Prix;
    });
    setTotal(total);
  };

  useEffect(() => {
    calculerTotal();
  }, [panier]);
  

  return (
    <div className="body">
      <h2>Les produits</h2>
      <div className="box">
        {affichage ? (
          quiz.map((produit) => (
            <div className="cont" style={{ marginTop: '200px' }}>
              <div className="box-title">
                {produit.Articles} {produit.Prix}
              </div>
              <div className="box-body">
                <img
                  src={`${process.env.PUBLIC_URL}/images/${produit.Image}`}
                  width="200px"
                />
                <input type="button" value="+" onClick={() => ajouterAuPanier(produit)}></input>
              </div>
            </div>
          ))
        ) : (
          <p>Chargement...</p>
        )}
      </div>
      <div>
        <h3>Panier</h3>
        <ul>
          {panier.map((produit, index) => (
            <li key={index}>
              {produit.Articles} {produit.Prix}
            </li>
          ))}
        </ul>
        <p>Total : {total} €</p> {/* Affichage du total */}
      </div>
    </div>
  );
}
