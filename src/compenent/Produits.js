import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';
import '../style/Produits.css';

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [affichage, setAffichage] = useState(false);
  const [panier, setPanier] = useState([]);
  const [Valider, setValider] = useState([]);
  const [Valider2, setValider2] = useState([]);
  const [total, setTotal] = useState(0); 
  let { id } = useParams();
  const ls = localStorage; 



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

  const ValiderPannier = async () => {
    await axios
      .put(`http://localhost:8000/Pannier/` + id)
      .then((res) => {
        console.log(res);
        setValider(res.data);
        setValider2(true);
        console.log(Valider);
      });
  };
  useEffect(() => {
    ValiderPannier();
  }, []);

  const ajouterAuPanier = (produit) => {
    setPanier([...panier, produit]);
    console.log(panier);
  };

  const retirerDuPanier = (index) => {
    const nouveauPanier = [...panier];
    nouveauPanier.splice(index);
    console.log(index);
    setPanier(nouveauPanier);
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
                <input type="button" value="+" onClick={() => ajouterAuPanier(produit) }></input>
                
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
              <button onClick={() => retirerDuPanier(produit)}><FaTrash /></button>
            </li>
          ))}
        </ul>
        <p>Total : {total} €</p>
        <div className='Valider'>
        <button value='valider'>Valider</button>
        </div>
      </div>
    </div>
  );
}
