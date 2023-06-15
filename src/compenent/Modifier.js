import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { FaTrash, FaPen } from 'react-icons/fa';
import '../style/Produits.css';

export default function Quiz() {
    const [quiz, setQuiz] = useState([]) 
    const [affichage, setAffichage] = useState(false) 

    const recup = async () => {
        await axios.get(`http://localhost:8000/produit`)
            .then(res => {
                console.log(res)
                setQuiz(res.data) 
                setAffichage(true) 
            })
    }

    useEffect(() => {
        recup()
    }, [])

    return (
        <div className='body'>
            <h2> Les produits a modifier</h2>
            <div className="box">
                {affichage ?
                    quiz.map(produit => (
                        <div>
                            <div className='box-title' style={{ marginTop:'200px'}}>
                                Produit n°{produit.id} 
                            </div>
                            <div className='box-body'>
                            {produit.Articles}  {produit.Prix} €
                                <img src={`${process.env.PUBLIC_URL}/images/${produit.Image}`} width="200px"/> 
                            </div>
                            <div className='box-footer'>
                                <Link to={'/modification/'+ produit.id}><FaPen /></Link> 
                            </div>
                            
                        </div>
                    ))
                    : <p>Chargement...</p> 
                }
            <div className='button'>
               <p> <Link to="/Admin"><input type='button' value='Ajouter un article' style={{ width:'200px'}}/></Link>
               <Link to="/Sup"><input type='button' value='Supprimer un articles un article'/></Link>
               <Link to="/AcceuilAdmin">
                        <input type='button' value="Acceuil Admin"/>
                    </Link>
                </p>
            </div>
            </div>
        </div>
    )
}
