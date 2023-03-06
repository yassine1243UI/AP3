import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { FaTrash, FaPen } from 'react-icons/fa';
import '../style/Produits.css';

export default function Quiz() {
    const [quiz, setQuiz] = useState([]) // état pour stocker les produits récupérés
    const [affichage, setAffichage] = useState(false) // état pour indiquer si la récupération des produits est terminée

    // fonction asynchrone pour récupérer les produits depuis le backend
    const recup = async () => {
        await axios.get(`http://localhost:8000/produit`) // appel à l'API GET pour récupérer les produits
            .then(res => {
                console.log(res)
                setQuiz(res.data) // stockage des produits dans l'état
                setAffichage(true) // indique que la récupération des produits est terminée
            })
    }

    useEffect(() => {
        recup() // appel de la fonction de récupération des produits une fois que le composant est monté
    }, [])

    return (
        <div className='body'>
            <h2> Les produits </h2>
            <div className="box">
                {affichage ?
                    quiz.map(produit => ( // boucle sur les produits stockés dans l'état
                        <div>
                            <div className='box-title' style={{ marginTop:'200px'}}>
                                Produit n°{produit.id} 
                            </div>
                            <div className='box-body'>
                            {produit.Articles}  {produit.Prix} 
                                <img src={`${process.env.PUBLIC_URL}/images/${produit.Image}`} width="200px"/> 
                            </div>
                            <div className='box-footer'>
                                <Link to={'/Del/'+ produit.id}><FaTrash /></Link> 
                            </div>
                            
                        </div>
                    ))
                    : <p>Chargement...</p> // affiche "Chargement..." tant que la récupération des produits n'est pas terminée
                }
                
               <p> <Link to="/Admin"><input type='button' value='Ajouter un article' style={{ width:'200px'}}/></Link></p>
            </div>
        </div>
    )
}
