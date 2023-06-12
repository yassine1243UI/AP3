// Importez les dépendances nécessaires
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import '../style/Produits.css';

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [affichage, setAffichage] = useState(false);
  const [panier, setPanier] = useState([]);
  const [total, setTotal] = useState(0);
  let { id } = useParams();
  const ls = localStorage;
  const handlePanierChange = (index, event) => {
    const nouveauPanier = [...panier];
    nouveauPanier[index][event.target.name] = event.target.value;
    setPanier(nouveauPanier);
  };
  

  const recup = async () => {
    await axios
      .get(`http://localhost:8000/produit`)
      .then((res) => {
        console.log(res.data);
        setQuiz(res.data);
        setAffichage(true);       
      });
  };

  useEffect(() => {
    recup();
  }, []);

const ajouterAuPanier = (produit) => {
  const index = panier.findIndex((p) => p.id === produit.id);
  if (index !== -1) {
    const nouveauPanier = [...panier];
    nouveauPanier[index].quantite += 1;
    setPanier(nouveauPanier);
  } else {
    setPanier([...panier, { ...produit, quantite: 1 }]);
  }


  // Stocker les articles dans le localStorage
  const articlesDansPanier = JSON.stringify([...panier, { ...produit, quantite: 1 }]);
  localStorage.setItem("Panier", articlesDansPanier);

}
  

  const retirerDuPanier = (index) => {
    const nouveauPanier = [...panier];
    if (nouveauPanier[index].quantite > 1) {
      nouveauPanier[index].quantite -= 1;
    } else {
      nouveauPanier.splice(index, 1);
    }
    setPanier(nouveauPanier);
  };

  const calculerTotal = () => {
    let total = 0;
    panier.forEach((produit) => {
      total += produit.Prix * produit.quantite;
    });
    setTotal(total);
  };

  useEffect(() => {
    calculerTotal();
  }, [panier]);

  const validerPanier = async () => {
    const quantite = panier.map((produit) => produit.Quantite);
    try {
      await axios.put(`http://localhost:8000/Pannier`); 
      console.log('Panier validé !');
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="body">
      <h2>Les produits</h2>

      <div className="box">
        {affichage ? (
          quiz.map((produit) => (
            <div className="cont" style={{ marginTop: '200px' }} key={produit.id}>
              <div className="box-title">
                {produit.Articles} {produit.Prix}
              </div>
              <div className="box-body">
                <img
                  src={`${process.env.PUBLIC_URL}/images/${produit.Image}`}
                  width="200px"
                />
                <input
                  type="button"
                  value="+"
                  onClick={() => ajouterAuPanier(produit)}
                ></input>
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
            
          <input
            type="text"
            name="Prix"
            value={produit.Prix}
            onChange={(event) => handlePanierChange(index, event)}
            placeholder="Prix"
          />
          <input
            type="text"
            name="Articles"
            value={produit.Articles}
            onChange={(event) => handlePanierChange(index, event)}
            placeholder="Articles"
          />
          
             x{produit.quantite}
              <button onClick={() => retirerDuPanier(index)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
        <p>Total : {total} €</p>
        <div className="Valider">
          <button onClick={validerPanier}>Valider</button>
        </div>
      </div>
    </div>
  );
}
