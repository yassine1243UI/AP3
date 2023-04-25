import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ModifierArticles() {
    const { handleSubmit, formState: { errors } } = useForm();
    let { id } = useParams();
    let navigate = useNavigate();

    // Fonction pour supprimer la question en envoyant une requête DELETE au backend
    const ModifierArticles = async () => {
        await axios.put(`http://localhost:8000/modification/` + id)
            .then(res => {
                console.log(res);
                setArticles(res.data[0].Articles)

                setImage(res.data[0].Image)

                setPrix(res.data[0].Prix)

                setQuantite(res.data[0].Quantite)
                if (res.status === 200) {
                    alert("Modification réussie");
                    navigate("/produits");
                }
                else {
                    alert("Erreur de modification");
                }
            });
    }

    const [Articles, setArticles] = useState("")

  const [Image, setImage] = useState("")

  const [Prix, setPrix] = useState("")

    const [Quantite, setQuantite] = useState("")
    

    
      const editQuestion = async () => {

            await axios.put(`http://localhost:8000/modification/` + id, {
        
              Articles: Articles,
        
              Image: Image,
        
              Prix: Prix,
                    
                    Quantite: Quantite

        
            })

              .then(res => {

                    console.log(res)
            
                    if (res.status === 200) {
            
                      alert("Modification réussi")
            
                      navigate("/produits");
            
                    }
            
                    else {
            
                      alert("Erreur d'envoi")
            
                    }
            
                  })
            
              }
            
             
            
              useEffect(() => {
            
                    ModifierArticles()
            
              }, [])

    return (
        <div className='container'>

              <h2> Modifier votre article</h2>        
        
        
        
              <form onSubmit={handleSubmit(editQuestion)}>        
                <label>Articles </label>        
                <input defaultValue={Articles} onChange={(e) => setArticles(e.target.value)} />           
                <label>Image </label>
                        <input defaultValue={Image} onChange={(e) => setImage(e.target.value)} /> 
                <label>Prix </label>        
                <input defaultValue={Prix} onChange={(e) => setPrix(e.target.value)} />
                        <label>Quantité </label>        
                <input defaultValue={Quantite} onChange={(e) => setQuantite(e.target.value)} />             
                {(errors.Articles || errors.Image || errors.Prix || errors.Quantite) ? <span>Tous les champs doivent être remplis</span> : ""}        
                <input type="submit" />
        
              </form>
        
            </div>
    )
}