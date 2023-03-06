// Importer les bibliothèques nécessaires
import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

// Créer et exporter le composant AjoutArticles
export default function AjoutArticles() {
// Initialiser useForm pour la validation de formulaire
const { register, handleSubmit, formState: { errors } } = useForm();
// Initialiser useNavigate pour la navigation de page
let navigate = useNavigate();

// Initialiser les états Articles, Image et Prix pour stocker les données entrées dans les champs de saisie
const [Articles, setArticles] = useState("")
const [Image, setImage] = useState("")
const [Prix, setPrix] = useState("")

// Créer une fonction pour envoyer une requête de post au serveur et ajouter un nouvel article
const AjoutArticles = async () => {
    // Envoyer une requête post à l'API avec les données des champs de saisie
    await axios.post(`http://localhost:8000/Ajt`, {
        Articles: Articles,
        Image: Image,
        Prix: Prix
    })
        .then(res => {
            console.log(res)
            // Vérifier si la requête a réussi ou non
            if (res.status === 200) {
                alert("Ajout réussi")
                // Naviguer vers la page d'accueil après l'ajout réussi
                navigate("/");
            }
            else {
                alert("Erreur d'ajout")
            }
        })
}


return (
    // Afficher le formulaire d'ajout d'article
    <div className='container' style={{ marginTop:'200px'}}>
        <h2> Ajouter un article</h2>

        <form onSubmit={handleSubmit(AjoutArticles)}>
            <label>Articles </label>
            <input {...register("Articles", { required: true })} onChange={(e) => setArticles(e.target.value)} />

            <label>Lien de l'images </label>
            <input {...register("Image", { required: true })} onChange={(e) => setImage(e.target.value)} />

            <label>Prix </label>
            <input {...register("Prix", { required: true })} onChange={(e) => setPrix(e.target.value)} />

           
            {(errors.Articles || errors.Image || errors.Prix) ? <span>Tous les champs doivent être remplis</span> : ""}

            <input type="submit" />
            
            <Link to="/Sup"><input type='button' value='Supprimer un article'/></Link>
        </form>
    </div>
)
}