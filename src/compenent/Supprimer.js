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
            <h2> Les produits </h2>
            <div className="box">
                {affichage ?
                    quiz.map(produit => (
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
                    : <p>Chargement...</p> 
                }
                
               <p style={{ marginTop:'20px'}}> <Link to="/Admin"><input type='button' value='Ajouter un article' style={{ width:'200px'}}/></Link>
               <Link to="/Modifier"><input type='button' value='Modifier un articles un article'/></Link>
               <Link to="/AcceuilAdmin">
                        <input type='button' value="Acceuil Admin"/>
                    </Link>
                    </p>
            </div>
        </div>
    )
}
